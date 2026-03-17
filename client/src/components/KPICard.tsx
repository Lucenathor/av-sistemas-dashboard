/*
 * Design: Control Room - KPI display module
 * Large monospace numbers with glow, like a digital readout
 */

import { useCountUp } from "@/hooks/useCountUp";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  delay?: number;
  accent?: "cyan" | "orange" | "green";
}

export function KPICard({
  title,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  icon: Icon,
  trend,
  accent = "cyan",
}: KPICardProps) {
  const animatedValue = useCountUp(value, 2000, decimals);

  const accentColors = {
    cyan: {
      border: "border-cyan/20",
      glow: "hover:shadow-[0_0_30px_oklch(0.82_0.15_192/0.12)]",
      icon: "text-cyan",
      indicator: "bg-cyan",
      text: "text-cyan",
    },
    orange: {
      border: "border-orange-accent/20",
      glow: "hover:shadow-[0_0_30px_oklch(0.78_0.16_60/0.12)]",
      icon: "text-orange-accent",
      indicator: "bg-orange-accent",
      text: "text-orange-accent",
    },
    green: {
      border: "border-green-signal/20",
      glow: "hover:shadow-[0_0_30px_oklch(0.75_0.18_145/0.12)]",
      icon: "text-green-signal",
      indicator: "bg-green-signal",
      text: "text-green-signal",
    },
  };

  const colors = accentColors[accent];

  const formatNumber = (n: number | string) => {
    const num = typeof n === "string" ? parseFloat(n) : n;
    if (decimals > 0) {
      return num.toLocaleString("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }
    return Math.round(num).toLocaleString("es-ES");
  };

  return (
    <div
      className={`group relative bg-card rounded-lg border ${colors.border} p-5 transition-all duration-500 ${colors.glow} overflow-hidden`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${colors.indicator} opacity-60`} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] grid-bg pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {title}
          </span>
          <Icon className={`w-4 h-4 ${colors.icon} opacity-60`} />
        </div>

        <div className="flex items-baseline gap-1">
          {prefix && (
            <span className={`text-lg font-mono ${colors.text} opacity-70`}>{prefix}</span>
          )}
          <span className={`text-3xl font-mono font-bold tracking-tight ${colors.text}`}>
            {formatNumber(animatedValue)}
          </span>
          {suffix && (
            <span className={`text-sm font-mono ${colors.text} opacity-70 ml-0.5`}>{suffix}</span>
          )}
        </div>

        {trend && (
          <div className="mt-2 flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                trend.value >= 0 ? "bg-green-signal" : "bg-red-signal"
              }`}
            />
            <span className="text-xs text-muted-foreground">
              <span className={trend.value >= 0 ? "text-green-signal" : "text-red-signal"}>
                {trend.value >= 0 ? "+" : ""}
                {trend.value}%
              </span>{" "}
              {trend.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
