"use client";

import { useEffect, useMemo, useState } from "react";

// Лого собирается из плиток на старте приложения — заменяет заставку
// Capacitor по умолчанию (нейтральный белый экран в нативном сплэше,
// см. android/.../styles.xml) на брендированную анимацию. Фиксированная
// длительность, не привязана к реальной загрузке данных — чисто
// декоративное приветствие при каждом холодном старте.
const GRID = 4;
const LOGO_SRC = "/logo.png";
const DISPLAY_SIZE = 112;
const TILE_SIZE = DISPLAY_SIZE / GRID;
const TILE_DURATION_MS = 650;
const HOLD_MS = 300;
const FADE_MS = 350;

type Tile = { row: number; col: number; tx: string; ty: string; rot: string; delay: string };

function makeTiles(): Tile[] {
  const tiles: Tile[] = [];
  const center = (GRID - 1) / 2;
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 90;
      const distFromCenter = Math.hypot(row - center, col - center);
      tiles.push({
        row,
        col,
        tx: `${Math.cos(angle) * distance}px`,
        ty: `${Math.sin(angle) * distance}px`,
        rot: `${(Math.random() - 0.5) * 160}deg`,
        delay: `${Math.round(distFromCenter * 55 + Math.random() * 90)}ms`,
      });
    }
  }
  return tiles;
}

export function AppSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const tiles = useMemo(makeTiles, []);

  useEffect(() => {
    const totalAssembleMs = TILE_DURATION_MS + 320; // + макс. задержка последней плитки
    const fadeTimer = setTimeout(() => setFading(true), totalAssembleMs + HOLD_MS);
    const removeTimer = setTimeout(() => setVisible(false), totalAssembleMs + HOLD_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-background ${fading ? "app-splash-fade-out" : ""}`}
      aria-hidden
    >
      <div className="relative" style={{ width: DISPLAY_SIZE, height: DISPLAY_SIZE }}>
        {tiles.map((tile) => (
          <div
            key={`${tile.row}-${tile.col}`}
            className="app-splash-tile absolute"
            style={
              {
                width: TILE_SIZE,
                height: TILE_SIZE,
                top: tile.row * TILE_SIZE,
                left: tile.col * TILE_SIZE,
                backgroundImage: `url(${LOGO_SRC})`,
                backgroundSize: `${DISPLAY_SIZE}px ${DISPLAY_SIZE}px`,
                backgroundPosition: `-${tile.col * TILE_SIZE}px -${tile.row * TILE_SIZE}px`,
                "--tile-tx": tile.tx,
                "--tile-ty": tile.ty,
                "--tile-rot": tile.rot,
                "--tile-delay": tile.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
