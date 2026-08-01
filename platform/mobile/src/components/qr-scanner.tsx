"use client";

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { X } from "lucide-react";

/** Полноэкранный сканер QR через камеру устройства (jsqr — бесплатно, без внешних сервисов). */
export function QrScannerModal({ onDetect, onClose }: { onDetect: (text: string) => void; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        tick();
      } catch {
        setError("Нет доступа к камере");
      }
    }

    function tick() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(frame.data, frame.width, frame.height);
          if (code?.data) {
            onDetect(code.data);
            return;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    start();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white">
        <X size={20} />
      </button>
      {error ? (
        <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-white">{error}</div>
      ) : (
        <>
          <video ref={videoRef} className="flex-1 object-cover" playsInline muted />
          <p className="bg-black py-3 text-center text-xs text-white/70">
            Наведите камеру на QR-код на объекте
          </p>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
