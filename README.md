# Friday the 13th — 캠프 탈출

브라우저에서 플레이하는 한국어 생존 팬 게임. `index.html`을 정적 서버에서 제공합니다.

## 조작

WASD / 방향키: 이동 · Shift: 달리기 · E: 은신 · P: 일시 정지

## 난이도

| | Easy | Hard |
| --- | --- | --- |
| 추격 속도 | 112 | 145 |
| 감지 거리 | 330 | 480 |
| 달리기 소음 감지 | 520 | 800 |
| 체력 소모 / 초 | 28 | 40 |
| 체력 회복 / 초 | 16 | 9 |
| 시야 반경 | 380 | 230 |
| 마지막 위치 추적 / 초 | 6 | 12 |
| 미니맵 부품 표시 | 표시 | 숨김 |

탈진 후에는 체력이 35 이상 회복되어야 다시 달릴 수 있습니다.

## Firebase Authentication

`firebase-config.js`에 Firebase 웹 앱의 공개 설정이 연결되어 있습니다.

Firebase Authentication에서 익명 / Google / 이메일·비밀번호 제공자를 활성화하고, 승인된 도메인에 `mingeon101.github.io`를 등록합니다.

익명 로그인, Google 로그인, 이메일 로그인, 회원가입, 로그아웃, 로그인 유지 및 오류 처리가 구현되어 있습니다.

## GitHub Pages

저장소 Settings → Pages → Build and deployment에서 `Deploy from a branch`, `main`, `/ (root)`를 선택하고 저장합니다. 이후 main 업데이트가 자동으로 배포됩니다.

예상 주소: https://mingeon101.github.io/Friday_the_13th/