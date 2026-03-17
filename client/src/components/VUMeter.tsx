/*
 * Design: Control Room / VU Meter aesthetic
 * Animated horizontal bar that fills like a VU meter
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface VUMeterProps {
  value: number; // 0-100
  label: string;
  sublabel?: string;
  delay?: number;
  color?: "cyan" | "orange" | "green";
}

export function VUMeter({ value, label, sublabel, delay = 0, color = "cyan" }: VUMeterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  const segments = 20;
  const filledSegments = Math.round((value / 100) * segments);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground truncate mr-2">{label}</span>
        {sublabel && (
          <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{sublabel}</span>
        )}
      </div>
      <div className="flex gap-[2px] h-5 items-end">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledSegments;
          const isHigh = i >= segments * 0.7;
          const isPeak = i >= segments * 0.9;

          let segColor = "bg-cyan/80";
          if (color === "orange") segColor = "bg-orange-accent/80";
          if (color === "green") segColor = "bg-green-signal/80";
          if (isPeak && isFilled) segColor = "bg-red-signal/90";
          else if (isHigh && isFilled) segColor = "bg-orange-accent/80";

          return (
            <motion.div
              key={i}
              className={`flex-1 rounded-[1px] ${isFilled ? segColor : "bg-surface-2"}`}
              initial={{ height: 4, opacity: 0.3 }}
              animate={
                isInView
                  ? {
                      height: isFilled ? 20 : 8,
                      opacity: isFilled ? 1 : 0.3,
                    }
                  : {}
              }
              transition={{
                duration: 0.4,
                delay: delay + i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
