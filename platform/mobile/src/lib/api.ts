export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("fsm_mobile_token");
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ? JSON.stringify(body.error) : `Ошибка запроса: ${res.status}`);
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const data = await apiFetch<{ token: string; user: CurrentUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("fsm_mobile_token", data.token);
  localStorage.setItem("fsm_mobile_user", JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem("fsm_mobile_token");
  localStorage.removeItem("fsm_mobile_user");
}

export function getCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("fsm_mobile_user");
  return raw ? JSON.parse(raw) : null;
}
