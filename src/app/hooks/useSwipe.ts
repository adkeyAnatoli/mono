'use client';

import React, { useCallback, useRef } from 'react';

const DEFAULT_THRESHOLD_PX = 48;

export function useSwipe(
  onLeft: () => void,
  onRight: () => void,
  thresholdPx = DEFAULT_THRESHOLD_PX
) {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    startRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!startRef.current) return;
      const start = startRef.current;
      startRef.current = null;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.abs(dx) < thresholdPx || Math.abs(dx) <= Math.abs(dy)) return;
      if (dx < 0) onLeft();
      else onRight();
    },
    [onLeft, onRight, thresholdPx]
  );

  return {
    onPointerDown,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
  };
}
