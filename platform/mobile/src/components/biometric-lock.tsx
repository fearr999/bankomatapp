"use client";

import { useEffect, useState } from "react";
import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authenticateBiometric } from "@/lib/biometric";

export function BiometricLock({ onUnlock }: { onUnlock: () => void }) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function attempt() {
    setBusy(true);
    setFailed(false);
    const ok = await authenticateBiometric("Войдите, чтобы открыть Corpi");
    setBusy(false);
    if (ok) onUnlock();
    else setFailed(true);
  }

  useEffect(() => {
    attempt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Fingerprint size={26} />
      </div>
      <p className="text-sm text-muted-foreground">
        {failed ? "Не удалось подтвердить личность" : "Разблокируйте приложение"}
      </p>
      <Button onClick={attempt} disabled={busy} className="w-full max-w-xs">
        {busy ? "Проверяем..." : "Повторить"}
      </Button>
    </div>
  );
}
