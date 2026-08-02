import { Capacitor } from "@capacitor/core";
import { BiometricAuth, BiometryError } from "@aparajita/capacitor-biometric-auth";

const STORAGE_KEY = "fsm_mobile_biometric_enabled";

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

export function isBiometricEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "1";
}

export function setBiometricEnabled(enabled: boolean) {
  if (enabled) localStorage.setItem(STORAGE_KEY, "1");
  else localStorage.removeItem(STORAGE_KEY);
}

/** Доступна ли биометрия на устройстве. На web/PWA всегда false — там просто нет плагина. */
export async function isBiometryAvailable(): Promise<boolean> {
  if (!isNativeApp()) return false;
  try {
    const result = await BiometricAuth.checkBiometry();
    return result.isAvailable;
  } catch {
    return false;
  }
}

/** Показывает системный диалог Face ID / отпечатка. true — прошёл, false — отменил/не прошёл. */
export async function authenticateBiometric(reason: string): Promise<boolean> {
  if (!isNativeApp()) return false;
  try {
    await BiometricAuth.authenticate({ reason, cancelTitle: "Отмена", allowDeviceCredential: true });
    return true;
  } catch (err) {
    if (err instanceof BiometryError) return false;
    return false;
  }
}
