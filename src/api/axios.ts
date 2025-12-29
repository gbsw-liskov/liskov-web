import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_SPRING_API;

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USERNAME_KEY = "username";

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function setTokens(tokens: { accessToken?: string; refreshToken?: string }) {
  if (tokens.accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  if (tokens.refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

function clearAuthStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

function redirectToSignIn() {
  // react-router navigate는 여기서 직접 쓸 수 없어서, 전역 리다이렉트로 처리
  if (window.location.pathname !== "/signin") {
    window.location.replace("/signin");
  }
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearAuthStorage();
    redirectToSignIn();
    throw new Error("No refresh token");
  }

  // NOTE:
  // - withCredentials: true → 서버가 refreshToken을 쿠키로 쓰는 경우 지원
  // - body에 refreshToken도 같이 보내서(호환성↑) 서버 구현에 따라 사용 가능
  // - Authorization 헤더에도 refreshToken을 넣어주는 케이스까지 커버
  const res = await axios.post(
    `${BASE_URL}/api/auth/refresh`,
    { refreshToken },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  const accessToken =
    res.data?.accessToken ??
    res.data?.data?.accessToken ??
    res.data?.token ??
    res.data?.data?.token;
  const newRefreshToken = res.data?.refreshToken ?? res.data?.data?.refreshToken;

  if (!accessToken) {
    throw new Error("Refresh succeeded but accessToken missing in response");
  }

  setTokens({ accessToken, refreshToken: newRefreshToken });
  return accessToken;
}

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 요청마다 최신 accessToken을 자동으로 붙입니다.
// (기존에 헤더를 수동으로 넣어도 여기서 최신 토큰으로 덮어씁니다.)
API.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as RetryableConfig | undefined;

    if (!originalRequest) throw error;

    // refresh/login/signup 같은 인증 엔드포인트에서 401이 나는 경우에는 refresh 시도하지 않음
    const url = typeof originalRequest.url === "string" ? originalRequest.url : "";
    const isAuthEndpoint = url.startsWith("/api/auth/");
    const isRefreshEndpoint = url === "/api/auth/refresh";

    if (!status || (status !== 401 && status !== 403)) throw error;
    if (originalRequest._retry) throw error;
    if (isRefreshEndpoint) {
      // refresh 자체가 401/403 → refreshToken 만료/무효
      clearAuthStorage();
      redirectToSignIn();
      throw error;
    }
    if (isAuthEndpoint) throw error;

    originalRequest._retry = true;

    try {
      refreshPromise = refreshPromise ?? refreshAccessToken();
      const newAccessToken = await refreshPromise;

      // 재시도 요청에도 토큰을 명시해주고(안전), request interceptor에서 최신 토큰으로 다시 덮어씁니다.
      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return API(originalRequest);
    } catch (refreshErr) {
      clearAuthStorage();
      redirectToSignIn();
      throw refreshErr;
    } finally {
      refreshPromise = null;
    }
  },
);

export default API;