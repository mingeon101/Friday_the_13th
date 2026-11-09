import { firebaseConfig } from './firebase-config.js';

const el = id => document.getElementById(id);
const dialog = el('auth-dialog');
let auth, sdk, user = null, busy = false;
const messages = {
  'auth/invalid-credential': '이메일 또는 비밀번호를 확인해주세요.',
  'auth/invalid-email': '이메일 주소를 확인해주세요.',
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
  'auth/popup-blocked': '팝업을 허용한 뒤 다시 시도해주세요.',
  'auth/popup-closed-by-user': '로그인이 취소되었습니다.',
  'auth/cancelled-popup-request': '로그인이 취소되었습니다.',
  'auth/network-request-failed': '네트워크 연결을 확인해주세요.',
  'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
  'auth/unauthorized-domain': '이 사이트의 로그인 도메인 설정이 필요합니다.',
  'auth/operation-not-allowed': '이 로그인 방식이 아직 활성화되지 않았습니다.',
};

function showError(error) {
  el('auth-error').textContent = messages[error.code] || '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';
}
function renderUser(next) {
  user = next;
  el('account').textContent = user ? (user.isAnonymous ? '익명 플레이어' : user.displayName || user.email || '플레이어') : '';
  el('login-open').textContent = user ? '로그아웃' : '로그인';
  if (user && dialog.open) dialog.close();
}
function setBusy(value) {
  busy = value;
  ['email-login', 'email-signup', 'google-login', 'guest', 'login-open'].forEach(id => el(id).disabled = value);
}
async function perform(action) {
  if (busy) return;
  el('auth-error').textContent = '';
  if (!auth) {
    el('auth-error').textContent = '로그인 설정을 준비 중입니다. 게스트로 플레이할 수 있습니다.';
    return;
  }
  setBusy(true);
  try { await action(); } catch (error) { showError(error); } finally { setBusy(false); }
}

el('login-open').addEventListener('click', () => {
  if (user) {
    perform(() => sdk.signOut(auth)).catch(showError);
    return;
  }
  // Pause the game using its existing keyboard control.
  document.dispatchEvent(new CustomEvent('auth-open'));
  el('auth-error').textContent = '';
  dialog.showModal();
});
el('auth-close').addEventListener('click', () => dialog.close());
el('guest').textContent = '익명으로 계속하기';
el('guest').addEventListener('click', () => perform(() => sdk.signInAnonymously(auth)));
el('auth-form').addEventListener('submit', event => {
  event.preventDefault();
  perform(() => sdk.signInWithEmailAndPassword(auth, el('email').value.trim(), el('password').value));
});
el('email-signup').addEventListener('click', () => {
  if (!el('auth-form').reportValidity()) return;
  perform(() => sdk.createUserWithEmailAndPassword(auth, el('email').value.trim(), el('password').value));
});
el('google-login').addEventListener('click', () => perform(() => sdk.signInWithPopup(auth, new sdk.GoogleAuthProvider())));
dialog.addEventListener('close', () => { el('password').value = ''; });

if (firebaseConfig?.apiKey && firebaseConfig?.authDomain && firebaseConfig?.projectId && firebaseConfig?.appId) {
  setBusy(true);
  try {
    const [appSdk, authSdk] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js'),
    ]);
    sdk = authSdk;
    auth = sdk.getAuth(appSdk.initializeApp(firebaseConfig));
    await sdk.setPersistence(auth, sdk.browserLocalPersistence);
    sdk.onAuthStateChanged(auth, renderUser, showError);
  } catch (error) {
    auth = undefined;
    showError(error);
  } finally { setBusy(false); }
}