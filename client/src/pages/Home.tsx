/*
 * Design: "Control Room" - Audio-visual production control room aesthetic
 * Dark UI with cyan/orange neon accents, VU meter animations, modular grid layout
 * Font: Space Grotesk (headings), JetBrains Mono (data), Inter (body)
 */

import { KPICard } from "@/components/KPICard";
import { VUMeter } from "@/components/VUMeter";
import {
  getKPIs,
  getByTrimestre,
  getByMonth,
  getTopClients,
  getByCategoria,
  getClientConcentration,
  formatCurrency,
  formatCurrencyFull,
  invoices,
} from "@/lib/invoiceData";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Receipt,
  Target,
  Zap,
  Activity,
  PieChart,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart as RPieChart,
  Pie,
} from "recharts";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663288181369/6t3HYbf3PPKVSByz7aMuQ2/hero-bg-hnZbnhdHdpvEs9mFTaheUH.webp";
const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663288181369/6t3HYbf3PPKVSByz7aMuQ2/logo-av-EEidDnMyYobEuac58bPue5.png";
const ILLUSTRATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663288181369/6t3HYbf3PPKVSByz7aMuQ2/dashboard-illustration-CusheZz93cQF2p4DASSCZN.webp";
const PATTERN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663288181369/6t3HYbf3PPKVSByz7aMuQ2/av-pattern-8fJBdxiaahwqFcQjns99KS.webp";

const CYAN = "oklch(0.82 0.15 192)";
const ORANGE = "oklch(0.78 0.16 60)";
const GREEN = "oklch(0.75 0.18 145)";
const RED = "oklch(0.65 0.22 25)";
const PURPLE = "oklch(0.7 0.15 280)";

const CHART_COLORS = [CYAN, ORANGE, GREEN, PURPLE, RED, "oklch(0.7 0.12 330)", "oklch(0.65 0.1 210)"];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "50px" as const },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Home() {
  const kpis = getKPIs();
  const byTrimestre = getByTrimestre();
  const byMonth = getByMonth();
  const topClients = getTopClients(10);
  const byCategoria = getByCategoria();
  const concentration = getClientConcentration();

  const maxClientBase = topClients[0]?.base || 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection kpis={kpis} />

      {/* Main KPIs */}
      <section className="container py-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <KPICard title="Facturación Total" value={kpis.totalFacturado} suffix="€" icon={TrendingUp} accent="cyan" delay={0} />
          <KPICard title="Base Imponible" value={kpis.totalBase} suffix="€" icon={Receipt} accent="orange" delay={0.1} />
          <KPICard title="Facturas Emitidas" value={kpis.numFacturas} icon={FileText} accent="green" delay={0.2} />
          <KPICard title="Clientes Únicos" value={kpis.clientesUnicos} icon={Users} accent="cyan" delay={0.3} />
        </div>
      </section>

      {/* Secondary KPIs */}
      <section className="container pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <KPICard title="Ticket Medio" value={kpis.ticketMedio} suffix="€" icon={Target} accent="orange" delay={0.1} />
          <KPICard title="IVA Repercutido" value={kpis.totalIVA} suffix="€" icon={BarChart3} accent="cyan" delay={0.2} />
          <KPICard title="Fact./Trimestre" value={kpis.numFacturas / 4} icon={Activity} accent="green" delay={0.3} />
          <KPICard title="Fact./Cliente" value={kpis.numFacturas / kpis.clientesUnicos} decimals={1} icon={Zap} accent="orange" delay={0.4} />
        </div>
      </section>

      {/* Summary Banner */}
      <section className="container pb-8">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-card rounded-lg border border-cyan/10 p-6 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.04]">
            <img src={PATTERN_BG} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-cyan/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-cyan" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Resumen Ejecutivo 2025</h3>
                <p className="text-sm text-muted-foreground">
                  Danny, tu negocio ha generado <span className="text-cyan font-mono font-semibold">{formatCurrency(kpis.totalFacturado)}</span> en facturación
                  con <span className="text-orange-accent font-mono font-semibold">{kpis.clientesUnicos}</span> clientes activos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-cyan">{formatCurrency(kpis.ticketMedio)}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Ticket Medio</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-orange-accent">{(kpis.numFacturas / kpis.clientesUnicos).toFixed(1)}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Fact/Cliente</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Charts Row 1: Monthly Revenue + Trimester Comparison */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <MonthlyRevenueChart data={byMonth} />
          </div>
          <div>
            <TrimestreChart data={byTrimestre} />
          </div>
        </div>
      </section>

      {/* Charts Row 2: Top Clients + Categories */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-2 gap-4">
          <TopClientsPanel clients={topClients} maxBase={maxClientBase} />
          <CategoriesPanel categories={byCategoria} totalBase={kpis.totalBase} />
        </div>
      </section>

      {/* Client Concentration + Insights */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ConcentrationChart data={concentration.slice(0, 20)} />
          </div>
          <InsightsPanel kpis={kpis} topClients={topClients} byCategoria={byCategoria} byTrimestre={byTrimestre} />
        </div>
      </section>

      {/* Recent Invoices Table */}
      <section className="container pb-8">
        <RecentInvoicesTable />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="AV Sistemas" className="h-8 w-auto opacity-60" />
            <span className="text-sm text-muted-foreground">Dashboard de Inteligencia 2025</span>
          </div>
          <span className="text-xs text-muted-foreground/60 font-mono">
            Datos basados en {kpis.numFacturas} facturas procesadas
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ kpis }: { kpis: ReturnType<typeof getKPIs> }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </div>

      <div className="relative container pt-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="AV Sistemas" className="h-10 w-auto" />
            <div>
              <h2 className="text-sm font-semibold text-foreground tracking-wide">AV SISTEMAS</h2>
              <p className="text-xs text-muted-foreground">Audiovisuales Valladolid</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-signal pulse-glow" />
            <span className="text-xs font-mono text-green-signal">EN VIVO</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[2px] w-8 bg-cyan" />
            <span className="text-xs uppercase tracking-[0.2em] text-cyan font-medium">Panel de Control</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Inteligencia de{" "}
            <span className="text-cyan glow-text-cyan">Facturación</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-xl leading-relaxed">
            Análisis completo de tu actividad comercial en 2025. Datos extraídos de{" "}
            <span className="text-foreground font-medium">{kpis.numFacturas} facturas</span> procesadas automáticamente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute right-0 top-8 w-[400px] h-[250px] hidden xl:block"
        >
          <img src={ILLUSTRATION} alt="AV Setup" className="w-full h-full object-contain opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Monthly Revenue Chart ─── */
function MonthlyRevenueChart({ data }: { data: ReturnType<typeof getByMonth> }) {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-cyan/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Facturación Mensual</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Base imponible por mes (2025)</p>
        </div>
        <Activity className="w-4 h-4 text-cyan opacity-50" />
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CYAN} stopOpacity={0.3} />
                <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.015 260 / 0.5)" />
            <XAxis dataKey="mesCorto" tick={{ fill: "oklch(0.6 0.01 250)", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "oklch(0.28 0.015 260)" }} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.6 0.01 250)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="base" stroke={CYAN} strokeWidth={2} fill="url(#cyanGrad)" dot={{ fill: CYAN, r: 3, strokeWidth: 0 }} activeDot={{ fill: CYAN, r: 5, strokeWidth: 2, stroke: "oklch(0.14 0.018 260)" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ─── Trimestre Chart ─── */
function TrimestreChart({ data }: { data: ReturnType<typeof getByTrimestre> }) {
  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-accent via-orange-accent/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Por Trimestre</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Comparativa trimestral</p>
        </div>
        <BarChart3 className="w-4 h-4 text-orange-accent opacity-50" />
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.015 260 / 0.5)" />
            <XAxis dataKey="trimestre" tick={{ fill: "oklch(0.6 0.01 250)", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "oklch(0.28 0.015 260)" }} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.6 0.01 250)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="base" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ─── Top Clients Panel ─── */
function TopClientsPanel({ clients, maxBase }: { clients: ReturnType<typeof getTopClients>; maxBase: number }) {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-cyan/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Top 10 Clientes</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Ranking por facturación</p>
        </div>
        <Users className="w-4 h-4 text-cyan opacity-50" />
      </div>

      <div className="space-y-3">
        {clients.map((client, i) => (
          <VUMeter
            key={client.cliente}
            value={(client.base / maxBase) * 100}
            label={`${i + 1}. ${client.cliente}`}
            sublabel={formatCurrency(client.base)}
            delay={i * 0.05}
            color={i === 0 ? "cyan" : i < 3 ? "orange" : "cyan"}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Categories Panel ─── */
function CategoriesPanel({ categories, totalBase }: { categories: ReturnType<typeof getByCategoria>; totalBase: number }) {
  const pieData = categories.slice(0, 7).map((c, i) => ({
    name: c.categoria,
    value: c.base,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-accent via-orange-accent/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Servicios por Categoría</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Distribución de ingresos</p>
        </div>
        <PieChart className="w-4 h-4 text-orange-accent opacity-50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RPieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RPieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2.5 flex flex-col justify-center">
          {categories.slice(0, 7).map((cat, i) => (
            <div key={cat.categoria} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{cat.categoria}</p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  {((cat.base / totalBase) * 100).toFixed(1)}% · {formatCurrency(cat.base)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Concentration Chart ─── */
function ConcentrationChart({ data }: { data: ReturnType<typeof getClientConcentration> }) {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-signal via-green-signal/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Concentración de Clientes</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Análisis Pareto: ¿cuántos clientes generan el 80% de ingresos?</p>
        </div>
        <Target className="w-4 h-4 text-green-signal opacity-50" />
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GREEN} stopOpacity={0.3} />
                <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.015 260 / 0.5)" />
            <XAxis dataKey="rank" tick={{ fill: "oklch(0.6 0.01 250)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "oklch(0.28 0.015 260)" }} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.6 0.01 250)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v.toFixed(0)}%`} domain={[0, 100]} />
            <Tooltip content={<ParetoTooltip />} />
            <Area type="monotone" dataKey="cumulative" stroke={GREEN} strokeWidth={2} fill="url(#greenGrad)" dot={{ fill: GREEN, r: 3, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ─── Insights Panel ─── */
function InsightsPanel({ kpis, topClients, byCategoria, byTrimestre }: {
  kpis: ReturnType<typeof getKPIs>;
  topClients: ReturnType<typeof getTopClients>;
  byCategoria: ReturnType<typeof getByCategoria>;
  byTrimestre: ReturnType<typeof getByTrimestre>;
}) {
  const top3Revenue = topClients.slice(0, 3).reduce((s, c) => s + c.base, 0);
  const top3Pct = ((top3Revenue / kpis.totalBase) * 100).toFixed(1);
  const bestTrimestre = byTrimestre.reduce((a, b) => (a.base > b.base ? a : b));
  const topCategory = byCategoria[0];

  const insights = [
    { icon: ArrowUpRight, color: "text-cyan", title: "Cliente Estrella", text: `${topClients[0]?.cliente} representa el ${((topClients[0]?.base / kpis.totalBase) * 100).toFixed(1)}% de tu facturación total.` },
    { icon: Target, color: "text-orange-accent", title: "Concentración Alta", text: `Tus 3 mejores clientes generan el ${top3Pct}% de los ingresos. Diversificar reduciría el riesgo.` },
    { icon: Zap, color: "text-green-signal", title: "Mejor Trimestre", text: `${bestTrimestre.trimestre} (${bestTrimestre.label}) fue tu mejor periodo con ${formatCurrency(bestTrimestre.base)} facturados.` },
    { icon: PieChart, color: "text-cyan", title: "Servicio Líder", text: `"${topCategory?.categoria}" es tu categoría más rentable con ${formatCurrency(topCategory?.base || 0)}.` },
    { icon: TrendingUp, color: "text-orange-accent", title: "Potencial de Crecimiento", text: `Con ${kpis.clientesUnicos} clientes activos y un ticket medio de ${formatCurrency(kpis.ticketMedio)}, hay margen para upselling.` },
  ];

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-orange-accent/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Insights Clave</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Análisis automático de tus datos</p>
        </div>
        <Zap className="w-4 h-4 text-cyan opacity-50" />
      </div>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            className="flex gap-3 group"
          >
            <div className={`mt-0.5 ${insight.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
              <insight.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-0.5">{insight.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Recent Invoices Table ─── */
function RecentInvoicesTable() {
  const recentInvoices = [...invoices].sort((a, b) => b.numero - a.numero).slice(0, 15);

  return (
    <motion.div
      {...fadeInUp}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-orange-accent/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Últimas Facturas Emitidas</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Registro de las 15 facturas más recientes</p>
        </div>
        <FileText className="w-4 h-4 text-cyan opacity-50" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Nº</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Fecha</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Cliente</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Categoría</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Base</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((inv, i) => (
              <motion.tr
                key={inv.numero}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border-b border-border/20 hover:bg-surface-2/50 transition-colors"
              >
                <td className="py-2.5 px-3 font-mono text-xs text-cyan">{inv.numero}</td>
                <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground">{inv.fecha}</td>
                <td className="py-2.5 px-3 text-xs text-foreground truncate max-w-[200px]">{inv.cliente}</td>
                <td className="py-2.5 px-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 text-muted-foreground border border-border/50">
                    {inv.categoria}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-mono text-xs text-right text-foreground">{formatCurrency(inv.base_imponible)}</td>
                <td className="py-2.5 px-3 font-mono text-xs text-right font-semibold text-cyan">{formatCurrency(inv.total)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ─── Custom Tooltips ─── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-2 border border-border rounded-md px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label || payload[0]?.name}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-sm font-mono font-semibold" style={{ color: p.color || CYAN }}>
          {formatCurrencyFull(p.value)}
        </p>
      ))}
    </div>
  );
}

function ParetoTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  return (
    <div className="bg-surface-2 border border-border rounded-md px-3 py-2 shadow-lg">
      <p className="text-xs text-foreground font-medium mb-1 truncate max-w-[200px]">
        #{data?.rank} {data?.cliente}
      </p>
      <p className="text-xs text-muted-foreground">
        Individual: <span className="text-cyan font-mono">{data?.percentage?.toFixed(1)}%</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Acumulado: <span className="text-green-signal font-mono">{data?.cumulative?.toFixed(1)}%</span>
      </p>
    </div>
  );
}
