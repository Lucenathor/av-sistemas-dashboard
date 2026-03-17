// AUTO-GENERATED from 495 real invoices of AV Sistemas (Audiovisual Experience SL)
// Data extracted from PDF invoices - January to December 2025
// DO NOT EDIT MANUALLY

import RAW_INVOICES from "./rawInvoices.json";

// ─── Types ───
export interface RawInvoice {
  numero: number;
  trimestre: string;
  fecha: string;
  cliente: string;
  num_cliente?: number;
  cif?: string;
  base_imponible: number;
  iva: number;
  total: number;
  concepto: string;
  categoria: string;
  mes: number;
}

// ─── Raw data ───
export const invoices: RawInvoice[] = RAW_INVOICES as RawInvoice[];

// ─── Formatters ───
export function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toFixed(0);
}

export function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

// ─── KPIs ───
export function getKPIs() {
  const totalFacturado = invoices.reduce((s, i) => s + i.total, 0);
  const totalBase = invoices.reduce((s, i) => s + i.base_imponible, 0);
  const totalIVA = invoices.reduce((s, i) => s + i.iva, 0);
  const numFacturas = invoices.length;
  const clientesUnicos = new Set(invoices.map((i) => i.cliente)).size;
  const ticketMedio = totalFacturado / numFacturas;

  return { totalFacturado, totalBase, totalIVA, numFacturas, clientesUnicos, ticketMedio };
}

// ─── By Trimestre ───
export function getByTrimestre() {
  const map: Record<string, { base: number; total: number; count: number }> = {};
  for (const inv of invoices) {
    if (!map[inv.trimestre]) map[inv.trimestre] = { base: 0, total: 0, count: 0 };
    map[inv.trimestre].base += inv.base_imponible;
    map[inv.trimestre].total += inv.total;
    map[inv.trimestre].count += 1;
  }
  const labels: Record<string, string> = {
    T1: "Ene-Mar",
    T2: "Abr-Jun",
    T3: "Jul-Sep",
    T4: "Oct-Dic",
  };
  return ["T1", "T2", "T3", "T4"].map((t) => ({
    trimestre: t,
    label: labels[t],
    base: Math.round((map[t]?.base || 0) * 100) / 100,
    total: Math.round((map[t]?.total || 0) * 100) / 100,
    count: map[t]?.count || 0,
  }));
}

// ─── By Month ───
const MONTH_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export function getByMonth() {
  const map: Record<number, { base: number; total: number; count: number }> = {};
  for (const inv of invoices) {
    const m = inv.mes;
    if (!m) continue;
    if (!map[m]) map[m] = { base: 0, total: 0, count: 0 };
    map[m].base += inv.base_imponible;
    map[m].total += inv.total;
    map[m].count += 1;
  }
  return Array.from({ length: 12 }, (_, i) => ({
    mes: i + 1,
    mesCorto: MONTH_SHORT[i],
    base: Math.round((map[i + 1]?.base || 0) * 100) / 100,
    total: Math.round((map[i + 1]?.total || 0) * 100) / 100,
    count: map[i + 1]?.count || 0,
  }));
}

// ─── Top Clients ───
export function getTopClients(n = 10) {
  const map: Record<string, { base: number; total: number; count: number }> = {};
  for (const inv of invoices) {
    const c = inv.cliente;
    if (!map[c]) map[c] = { base: 0, total: 0, count: 0 };
    map[c].base += inv.base_imponible;
    map[c].total += inv.total;
    map[c].count += 1;
  }
  return Object.entries(map)
    .map(([cliente, data]) => ({ cliente, ...data }))
    .sort((a, b) => b.base - a.base)
    .slice(0, n);
}

// ─── By Categoria ───
export function getByCategoria() {
  const map: Record<string, { base: number; total: number; count: number }> = {};
  for (const inv of invoices) {
    const cat = inv.categoria || "Otros";
    if (!map[cat]) map[cat] = { base: 0, total: 0, count: 0 };
    map[cat].base += inv.base_imponible;
    map[cat].total += inv.total;
    map[cat].count += 1;
  }
  return Object.entries(map)
    .map(([categoria, data]) => ({ categoria, ...data }))
    .sort((a, b) => b.base - a.base);
}

// ─── Client Concentration (Pareto) ───
export function getClientConcentration() {
  const map: Record<string, number> = {};
  for (const inv of invoices) {
    map[inv.cliente] = (map[inv.cliente] || 0) + inv.base_imponible;
  }
  const totalBase = Object.values(map).reduce((s, v) => s + v, 0);
  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  let cumulative = 0;
  return sorted.map(([cliente, base], i) => {
    cumulative += base;
    return {
      rank: i + 1,
      cliente,
      base: Math.round(base * 100) / 100,
      percentage: (base / totalBase) * 100,
      cumulative: (cumulative / totalBase) * 100,
    };
  });
}
