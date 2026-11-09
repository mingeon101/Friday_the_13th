# Friday the 13th — 캠프 탈출

브라우저에서 플레이하는 한국어 생존 팬 게임. `index.html`을 정적 서버에서 제공합니다.

## 조작

WASD / 방향키: 이동 · Shift: 달리기 · E: 은신 · P: 일시 정지

## 난이도와 은신

Easy / Hard를 선택할 수 있습니다. Hard는 감지·추적과 적 증원이 더 빠르고 체력과 시야가 더 제한됩니다. 텐트·동굴·감시초소 입구에서 E로 실제 내부에 들어갑니다. 은신 시간과 재사용 대기시간이 있습니다. 자세한 수치는 WORLD.md를 참고하세요.

## Firebase Authentication

`firebase-config.js`에 Firebase 웹 앱의 공개 설정이 연결되어 있습니다.

Firebase Authentication에서 익명 / Google / 이메일·비밀번호 제공자를 활성화하고, 승인된 도메인에 `mingeon101.github.io`를 등록합니다.

익명 로그인, Google 로그인, 이메일 로그인, 회원가입, 로그아웃, 로그인 유지 및 오류 처리가 구현되어 있습니다.

## GitHub Pages

저장소 Settings → Pages → Build and deployment에서 `Deploy from a branch`, `main`, `/ (root)`를 선택하고 저장합니다. 이후 main 업데이트가 자동으로 배포됩니다.

예상 주소: https://mingeon101.github.io/Friday_the_13th/