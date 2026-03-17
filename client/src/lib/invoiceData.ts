// AUTO-GENERATED from 495 real invoices of AV Sistemas (Audiovisual Experience SL)
// Data extracted from PDF invoices - January to December 2025
// Categories verified against invoice headers (ALQUILER, VENTA, etc.)
// DO NOT EDIT MANUALLY

import RAW_INVOICES from "../data/rawInvoices.json";

// ─── Types ───
export interface RawInvoice {
  numero: number;
  trimestre: string;
  fecha: string;
  cliente: string;
  base: number;
  iva: number;
  total: number;
  concepto: string;
  categoria: string;
  mes: string;
  descripcion?: string;
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

// ─── Month helpers ───
const MONTH_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
function mesIndex(mes: string): number {
  const idx = MONTH_SHORT.indexOf(mes);
  return idx >= 0 ? idx + 1 : 0;
}

// ─── KPIs ───
export function getKPIs() {
  const totalFacturado = invoices.reduce((s, i) => s + i.total, 0);
  const totalBase = invoices.reduce((s, i) => s + i.base, 0);
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
    map[inv.trimestre].base += inv.base;
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
export function getByMonth() {
  const map: Record<number, { base: number; total: number; count: number }> = {};
  for (const inv of invoices) {
    const m = mesIndex(inv.mes);
    if (!m) continue;
    if (!map[m]) map[m] = { base: 0, total: 0, count: 0 };
    map[m].base += inv.base;
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
    map[c].base += inv.base;
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
    map[cat].base += inv.base;
    map[cat].total += inv.total;
    map[cat].count += 1;
  }
  return Object.entries(map)
    .map(([categoria, data]) => ({ categoria, ...data }))
    .sort((a, b) => b.base - a.base);
}

// ─── Missing Invoices ───
export function getMissingInvoices(): number[] {
  const nums = new Set(invoices.map((i) => i.numero));
  const max = Math.max(...Array.from(nums));
  const missing: number[] = [];
  for (let n = 1; n <= max; n++) {
    if (!nums.has(n)) missing.push(n);
  }
  return missing;
}

// ─── Dormant Clients (active T1/T2 but not T3/T4) ───
export function getDormantClients() {
  const clientTrims: Record<string, Set<string>> = {};
  const clientBase: Record<string, number> = {};
  const clientCount: Record<string, number> = {};
  for (const inv of invoices) {
    if (!clientTrims[inv.cliente]) clientTrims[inv.cliente] = new Set();
    clientTrims[inv.cliente].add(inv.trimestre);
    clientBase[inv.cliente] = (clientBase[inv.cliente] || 0) + inv.base;
    clientCount[inv.cliente] = (clientCount[inv.cliente] || 0) + 1;
  }
  return Object.entries(clientTrims)
    .filter(([_, trims]) => (trims.has('T1') || trims.has('T2')) && !trims.has('T3') && !trims.has('T4'))
    .filter(([c]) => clientBase[c] > 2000)
    .map(([cliente, trims]) => ({
      cliente,
      base: Math.round(clientBase[cliente] * 100) / 100,
      count: clientCount[cliente],
      trimestres: Array.from(trims).sort(),
    }))
    .sort((a, b) => b.base - a.base);
}

// ─── Review Candidates (recurrent + high value) ───
export function getReviewCandidates() {
  const clientData: Record<string, { base: number; count: number; categories: Set<string>; months: Set<string> }> = {};
  for (const inv of invoices) {
    if (!clientData[inv.cliente]) clientData[inv.cliente] = { base: 0, count: 0, categories: new Set(), months: new Set() };
    clientData[inv.cliente].base += inv.base;
    clientData[inv.cliente].count += 1;
    clientData[inv.cliente].categories.add(inv.categoria);
    clientData[inv.cliente].months.add(inv.mes);
  }
  return Object.entries(clientData)
    .filter(([_, d]) => d.count >= 5)
    .map(([cliente, d]) => ({
      cliente,
      base: Math.round(d.base * 100) / 100,
      count: d.count,
      numCategories: d.categories.size,
      numMonths: d.months.size,
    }))
    .sort((a, b) => b.base - a.base);
}

// ─── Cross-sell Opportunities (single category clients) ───
export function getCrossSellOpportunities() {
  const clientData: Record<string, { base: number; count: number; categories: Set<string> }> = {};
  for (const inv of invoices) {
    if (!clientData[inv.cliente]) clientData[inv.cliente] = { base: 0, count: 0, categories: new Set() };
    clientData[inv.cliente].base += inv.base;
    clientData[inv.cliente].count += 1;
    clientData[inv.cliente].categories.add(inv.categoria);
  }
  return Object.entries(clientData)
    .filter(([_, d]) => d.categories.size === 1 && d.base > 5000)
    .map(([cliente, d]) => ({
      cliente,
      base: Math.round(d.base * 100) / 100,
      count: d.count,
      soloCategoria: Array.from(d.categories)[0],
    }))
    .sort((a, b) => b.base - a.base);
}

// ─── Venta (real sales) Breakdown ───
export function getVentaBreakdown() {
  const ventaInvoices = invoices.filter((i) =>
    i.categoria === 'Venta' || i.categoria === 'Venta e Instalación'
  );
  const topSales = [...ventaInvoices].sort((a, b) => b.base - a.base).slice(0, 10);
  return {
    totalFacturas: ventaInvoices.length,
    totalBase: Math.round(ventaInvoices.reduce((s, i) => s + i.base, 0) * 100) / 100,
    topSales,
  };
}

// ─── Alquiler Breakdown ───
export function getAlquilerBreakdown() {
  const alqInvoices = invoices.filter((i) => i.categoria === 'Alquiler');
  const topAlquileres = [...alqInvoices].sort((a, b) => b.base - a.base).slice(0, 10);
  const avgTicket = alqInvoices.reduce((s, i) => s + i.base, 0) / Math.max(alqInvoices.length, 1);
  return {
    totalFacturas: alqInvoices.length,
    totalBase: Math.round(alqInvoices.reduce((s, i) => s + i.base, 0) * 100) / 100,
    avgTicket: Math.round(avgTicket * 100) / 100,
    topAlquileres,
  };
}

// ─── Public vs Private ───
export function getPublicVsPrivate() {
  const publicKw = ['ayuntamiento', 'diputación', 'diputacion', 'junta', 'universidad', 'fundación', 'fundacion', 'consejería', 'consejeria', 'ministerio', 'gobierno', 'colegio', 'instituto', 'hospital', 'museo', 'guardia civil', 'ceip', 'ies ', 'feria de valladolid'];
  let pubBase = 0, pubCount = 0, privBase = 0, privCount = 0;
  const pubClients = new Set<string>();
  const privClients = new Set<string>();
  for (const inv of invoices) {
    const isPub = publicKw.some((kw) => inv.cliente.toLowerCase().includes(kw));
    if (isPub) {
      pubBase += inv.base;
      pubCount += 1;
      pubClients.add(inv.cliente);
    } else {
      privBase += inv.base;
      privCount += 1;
      privClients.add(inv.cliente);
    }
  }
  return {
    publico: { base: Math.round(pubBase * 100) / 100, count: pubCount, clientes: pubClients.size, ticketMedio: Math.round((pubBase / Math.max(pubCount, 1)) * 100) / 100 },
    privado: { base: Math.round(privBase * 100) / 100, count: privCount, clientes: privClients.size, ticketMedio: Math.round((privBase / Math.max(privCount, 1)) * 100) / 100 },
  };
}

// ─── Growth Rate T1 to T4 ───
export function getGrowthRate() {
  const trimBases: Record<string, number> = {};
  for (const inv of invoices) {
    trimBases[inv.trimestre] = (trimBases[inv.trimestre] || 0) + inv.base;
  }
  const t1 = trimBases['T1'] || 1;
  const t4 = trimBases['T4'] || 0;
  return { t1: Math.round(t1), t4: Math.round(t4), growthPct: Math.round(((t4 - t1) / t1) * 1000) / 10 };
}

// ─── Client Concentration (Pareto) ───
export function getClientConcentration() {
  const map: Record<string, number> = {};
  for (const inv of invoices) {
    map[inv.cliente] = (map[inv.cliente] || 0) + inv.base;
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

// ─── Pareto thresholds ───
export function getParetoThresholds() {
  const conc = getClientConcentration();
  const p50 = conc.find((c) => c.cumulative >= 50);
  const p80 = conc.find((c) => c.cumulative >= 80);
  return {
    top50: p50 ? p50.rank : 0,
    top80: p80 ? p80.rank : 0,
    totalClients: conc.length,
  };
}
