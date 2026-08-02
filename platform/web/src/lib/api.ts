export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("fsm_token");
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
    // Токен истёк/недействителен на уже авторизованном запросе — вместо
    // зависания на странице с баннером ошибки отправляем обратно на вход.
    if (res.status === 401 && token) {
      localStorage.removeItem("fsm_token");
      localStorage.removeItem("fsm_user");
      window.location.href = "/login";
      return new Promise<T>(() => {});
    }
    // Пробный период истёк и организация ещё не оплатила — блокируем весь
    // кабинет экраном "свяжитесь с нами" вместо обычных ошибок по каждому запросу.
    if (res.status === 402 && token && window.location.pathname !== "/trial-expired") {
      window.location.href = "/trial-expired";
      return new Promise<T>(() => {});
    }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ? JSON.stringify(body.error) : `Ошибка запроса: ${res.status}`);
  }
  return res.json();
}

interface CurrentUser {
  id: string;
  name: string;
  role: string;
  contractorOrganizationId: string | null;
}

export async function login(email: string, password: string) {
  const data = await apiFetch<{ token: string; user: CurrentUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("fsm_token", data.token);
  localStorage.setItem("fsm_user", JSON.stringify(data.user));
  return data;
}

export async function register(organizationName: string, name: string, email: string, password: string) {
  const data = await apiFetch<{
    token: string;
    user: CurrentUser;
    organization: { id: string; name: string };
  }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ organizationName, name, email, password }),
  });
  localStorage.setItem("fsm_token", data.token);
  localStorage.setItem("fsm_user", JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem("fsm_token");
  localStorage.removeItem("fsm_user");
}

export function getCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("fsm_user");
  return raw ? JSON.parse(raw) : null;
}

export function isContractor(user?: CurrentUser | null): boolean {
  const u = user ?? getCurrentUser();
  return !!u?.contractorOrganizationId;
}

export interface SubscriptionStatus {
  trialEndsAt: string | null;
  subscriptionActive: boolean;
  daysLeft: number | null;
  expired: boolean;
}

export function getSubscriptionStatus() {
  return apiFetch<SubscriptionStatus>("/auth/subscription");
}

const FALLBACK_SUPPORT_LINK = "https://t.me/thecorpi";

// Публичный роут, без токена — узнаём актуальный username support-бота,
// чтобы не хардкодить его и не привязываться к конкретному боту в коде.
export async function getSupportLink(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/public/support-bot`);
    const data = await res.json();
    return data.configured && data.username ? `https://t.me/${data.username}` : FALLBACK_SUPPORT_LINK;
  } catch {
    return FALLBACK_SUPPORT_LINK;
  }
}
