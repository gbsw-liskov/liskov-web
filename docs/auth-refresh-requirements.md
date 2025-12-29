# 토큰 자동 재발급(Refresh) 요구사항

## 목적
- Access Token 만료 시 사용자에게 재로그인을 강요하지 않고 **Refresh API로 자동 재발급**한다.
- Refresh Token까지 만료/무효인 경우에는 **로그아웃 처리 후 로그인 페이지(`/signin`)로 이동**시킨다.

## 토큰 저장소(클라이언트)
- **accessToken**: `localStorage["accessToken"]`
- **refreshToken**: `localStorage["refreshToken"]`
- **username**: `localStorage["username"]` (로그아웃 시 함께 제거)

## 기본 동작(성공 시나리오)
1. 모든 API 요청은 `src/api/axios.ts`의 `API` 인스턴스를 사용한다.
2. 요청 직전에 `API`는 `localStorage["accessToken"]` 값을 읽어 `Authorization: Bearer <accessToken>` 헤더를 **자동으로 첨부**한다.
3. 서버가 만료로 인해 401/403을 응답하면, 클라이언트는 `/api/auth/refresh`로 refresh 요청을 보낸다.
4. refresh 응답으로 새 accessToken(및 선택적으로 refreshToken)을 받으면:
   - `localStorage["accessToken"]`을 **갱신**한다.
   - (있다면) `localStorage["refreshToken"]`도 **갱신**한다.
5. 실패했던 원래 요청을 **1회만 재시도**한다.

## 실패 동작(Refresh Token 만료/무효)
- 다음 중 하나라도 해당하면 “인증 만료”로 간주하고 즉시 로그아웃 처리한다.
  - refresh 요청(`/api/auth/refresh`) 자체가 401/403 응답
  - refreshToken이 로컬스토리지에 없음
  - refresh 응답에 accessToken이 없음(계약 위반)
- 로그아웃 처리:
  - `localStorage["accessToken"]`, `localStorage["refreshToken"]`, `localStorage["username"]` 제거
  - 로그인 페이지(`/signin`)로 이동

## 동시성(중복 refresh 방지)
- 여러 요청이 동시에 401/403을 받더라도 refresh는 **한 번만** 수행한다.
- refresh 진행 중인 동안 발생한 나머지 요청들은 동일한 refresh 결과(새 accessToken)를 공유한다.

## 무한 루프 방지
- refresh 성공 후 원요청 재시도는 **최대 1회**만 허용한다.
- 재시도 후에도 401/403이면 에러를 호출자에게 전달한다(추가 refresh 반복 금지).

## 구현 위치(참고)
- `src/api/axios.ts`
  - request interceptor: 최신 accessToken 자동 첨부
  - response interceptor: 401/403 → refresh → 재시도 / refresh 실패 → 로그아웃 + `/signin`


