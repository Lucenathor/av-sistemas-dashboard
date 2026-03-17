import invoicesRaw from "@/data/invoices.json";

export interface Invoice {
  archivo: string;
  trimestre: string;
  numero: number;
  fecha: string;
  cliente: string;
  concepto: string;
  base_imponible: number;
  iva: number;
  total: number;
  mes?: string;
  mes_num?: number;
  categoria: string;
}

export const invoices: Invoice[] = invoicesRaw as Invoice[];

// KPI calculations
export function getKPIs() {
  const totalBase = invoices.reduce((s, i) => s + i.base_imponible, 0);
  const totalIVA = invoices.reduce((s, i) => s + i.iva, 0);
  const totalFacturado = invoices.reduce((s, i) => s + i.total, 0);
  const numFacturas = invoices.length;
  const clientesUnicos = new Set(invoices.map((i) => i.cliente)).size;
  const ticketMedio = totalBase / numFacturas;

  return { totalBase, totalIVA, totalFacturado, numFacturas, clientesUnicos, ticketMedio };
}

// By trimester
export function getByTrimestre() {
  const map: Record<string, { facturas: number; base: number; total: number }> = {};
  for (const inv of invoices) {
    if (!map[inv.trimestre]) map[inv.trimestre] = { facturas: 0, base: 0, total: 0 };
    map[inv.trimestre].facturas++;
    map[inv.trimestre].base += inv.base_imponible;
    map[inv.trimestre].total += inv.total;
  }
  return ["T1", "T2", "T3", "T4"].map((t) => ({
    trimestre: t,
    label: t === "T1" ? "Ene-Mar" : t === "T2" ? "Abr-Jun" : t === "T3" ? "Jul-Sep" : "Oct-Dic",
    ...map[t],
  }));
}

// By month
export function getByMonth() {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const map: Record<string, { facturas: number; base: number }> = {};
  months.forEach((m) => (map[m] = { facturas: 0, base: 0 }));

  for (const inv of invoices) {
    const mes = inv.mes || months[(inv.mes_num || 1) - 1];
    if (map[mes]) {
      map[mes].facturas++;
      map[mes].base += inv.base_imponible;
    }
  }
  return months.map((m) => ({ mes: m, mesCorto: m.substring(0, 3), ...map[m] }));
}

// Top clients
export function getTopClients(limit: number = 10) {
  const map: Record<string, { base: number; facturas: number }> = {};
  for (const inv of invoices) {
    if (!map[inv.cliente]) map[inv.cliente] = { base: 0, facturas: 0 };
    map[inv.cliente].base += inv.base_imponible;
    map[inv.cliente].facturas++;
  }
  return Object.entries(map)
    .map(([cliente, data]) => ({ cliente, ...data }))
    .sort((a, b) => b.base - a.base)
    .slice(0, limit);
}

// By category
export function getByCategoria() {
  const map: Record<string, { base: number; facturas: number }> = {};
  for (const inv of invoices) {
    const cat = inv.categoria || "Otros";
    if (!map[cat]) map[cat] = { base: 0, facturas: 0 };
    map[cat].base += inv.base_imponible;
    map[cat].facturas++;
  }
  return Object.entries(map)
    .map(([categoria, data]) => ({ categoria, ...data }))
    .sort((a, b) => b.base - a.base);
}

// Client concentration (Pareto)
export function getClientConcentration() {
  const clients = getTopClients(100);
  const totalBase = clients.reduce((s, c) => s + c.base, 0);
  let cumulative = 0;
  return clients.map((c, i) => {
    cumulative += c.base;
    return {
      ...c,
      rank: i + 1,
      percentage: (c.base / totalBase) * 100,
      cumulative: (cumulative / totalBase) * 100,
    };
  });
}

// Format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
