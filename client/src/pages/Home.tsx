/**
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
  getMissingInvoices,
  getDormantClients,
  getReviewCandidates,
  getCrossSellOpportunities,
  getEquipmentBreakdown,
  getPublicVsPrivate,
  getGrowthRate,
  getParetoThresholds,
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
  AlertTriangle,
  UserCheck,
  ShoppingCart,
  Star,
  Lightbulb,
  Cpu,
  Building2,
  UserX,
  Repeat,
  Mail,
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
  const missingInvoices = getMissingInvoices();
  const dormantClients = getDormantClients();
  const reviewCandidates = getReviewCandidates();
  const crossSell = getCrossSellOpportunities();
  const equipment = getEquipmentBreakdown();
  const pubPriv = getPublicVsPrivate();
  const growth = getGrowthRate();
  const pareto = getParetoThresholds();

  const maxClientBase = topClients[0]?.base || 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection kpis={kpis} growth={growth} />

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
                  con <span className="text-orange-accent font-mono font-semibold">{kpis.clientesUnicos}</span> clientes activos.
                  Crecimiento T1→T4: <span className="text-green-signal font-mono font-semibold">+{growth.growthPct}%</span>
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
                <p className="text-2xl font-mono font-bold text-green-signal">+{growth.growthPct}%</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Crecimiento</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Missing Invoices Alert */}
      {missingInvoices.length > 0 && (
        <section className="container pb-8">
          <motion.div
            {...fadeInUp}
            className="bg-card rounded-lg border border-orange-accent/20 p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-accent via-orange-accent/50 to-transparent" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-orange-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Facturas No Encontradas</h3>
                <p className="text-sm text-muted-foreground">
                  De la factura #1 a la #{Math.max(...invoices.map(i => i.numero))}, faltan {missingInvoices.length} números:{" "}
                  <span className="text-orange-accent font-mono font-semibold">
                    {missingInvoices.map(n => `#${n}`).join(", ")}
                  </span>.
                  Probablemente sean facturas anuladas o rectificativas. Conviene verificar con la asesoría fiscal.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

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

      {/* Client Concentration + Growth Insights */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ConcentrationChart data={concentration.slice(0, 20)} />
          </div>
          <GrowthInsightsPanel kpis={kpis} topClients={topClients} byCategoria={byCategoria} byTrimestre={byTrimestre} growth={growth} pareto={pareto} pubPriv={pubPriv} />
        </div>
      </section>

      {/* ═══ GROWTH MARKETING SECTION ═══ */}
      <section className="container pb-4">
        <motion.div {...fadeInUp} className="flex items-center gap-3 mb-6">
          <div className="h-[2px] w-12 bg-gradient-to-r from-orange-accent to-transparent" />
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Análisis de <span className="text-orange-accent">Crecimiento</span>
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-accent/30 to-transparent" />
        </motion.div>
      </section>

      {/* Equipment Breakdown + Public vs Private */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-2 gap-4">
          <EquipmentPanel equipment={equipment} />
          <PublicPrivatePanel data={pubPriv} totalBase={kpis.totalBase} />
        </div>
      </section>

      {/* Dormant Clients + Review Candidates */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-2 gap-4">
          <DormantClientsPanel clients={dormantClients} />
          <ReviewCandidatesPanel candidates={reviewCandidates} />
        </div>
      </section>

      {/* Cross-sell Opportunities */}
      <section className="container pb-8">
        <CrossSellPanel opportunities={crossSell} />
      </section>

      {/* Actionable Growth Proposals */}
      <section className="container pb-8">
        <GrowthProposalsPanel kpis={kpis} dormant={dormantClients} crossSell={crossSell} growth={growth} pareto={pareto} equipment={equipment} pubPriv={pubPriv} />
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
            Datos basados en {kpis.numFacturas} facturas procesadas · Facturas #{missingInvoices.join(", #")} no encontradas
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ kpis, growth }: { kpis: ReturnType<typeof getKPIs>; growth: ReturnType<typeof getGrowthRate> }) {
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
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-green-signal/10 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 text-green-signal" />
              <span className="text-xs font-mono font-semibold text-green-signal">+{growth.growthPct}% crecimiento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-signal pulse-glow" />
              <span className="text-xs font-mono text-green-signal">EN VIVO</span>
            </div>
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

/* ─── Growth Insights Panel (replaces old InsightsPanel) ─── */
function GrowthInsightsPanel({ kpis, topClients, byCategoria, byTrimestre, growth, pareto, pubPriv }: {
  kpis: ReturnType<typeof getKPIs>;
  topClients: ReturnType<typeof getTopClients>;
  byCategoria: ReturnType<typeof getByCategoria>;
  byTrimestre: ReturnType<typeof getByTrimestre>;
  growth: ReturnType<typeof getGrowthRate>;
  pareto: ReturnType<typeof getParetoThresholds>;
  pubPriv: ReturnType<typeof getPublicVsPrivate>;
}) {
  const top3Revenue = topClients.slice(0, 3).reduce((s, c) => s + c.base, 0);
  const top3Pct = ((top3Revenue / kpis.totalBase) * 100).toFixed(1);
  const bestTrimestre = byTrimestre.reduce((a, b) => (a.base > b.base ? a : b));
  const worstMonth = byTrimestre.reduce((a, b) => (a.base < b.base ? a : b));

  const insights = [
    { icon: TrendingUp, color: "text-green-signal", title: `Crecimiento +${growth.growthPct}%`, text: `De ${formatCurrency(growth.t1)} (T1) a ${formatCurrency(growth.t4)} (T4). El negocio está en clara tendencia alcista.` },
    { icon: Target, color: "text-orange-accent", title: "Riesgo de Concentración", text: `Solo ${pareto.top50} clientes (${((pareto.top50/pareto.totalClients)*100).toFixed(0)}%) generan el 50% de ingresos. ${pareto.top80} clientes generan el 80%.` },
    { icon: ArrowUpRight, color: "text-cyan", title: "Cliente Estrella", text: `${topClients[0]?.cliente} = ${((topClients[0]?.base / kpis.totalBase) * 100).toFixed(1)}% de tu facturación. Los 3 primeros suman ${top3Pct}%.` },
    { icon: Building2, color: "text-purple-400", title: "Público vs Privado", text: `Sector público: ${((pubPriv.publico.base/kpis.totalBase)*100).toFixed(0)}% de facturación (${pubPriv.publico.clientes} clientes). Privado: ${((pubPriv.privado.base/kpis.totalBase)*100).toFixed(0)}% (${pubPriv.privado.clientes} clientes). Las licitaciones públicas ofrecen contratos de mayor volumen y recurrencia.` },
    { icon: Zap, color: "text-green-signal", title: "Mejor Trimestre", text: `${bestTrimestre.trimestre} (${bestTrimestre.label}) con ${formatCurrency(bestTrimestre.base)}. Peor: ${worstMonth.trimestre} con ${formatCurrency(worstMonth.base)}.` },
    { icon: PieChart, color: "text-cyan", title: "Servicio Líder", text: `"${byCategoria[0]?.categoria}" domina con ${((byCategoria[0]?.base / kpis.totalBase) * 100).toFixed(0)}%. Oportunidad en Streaming (ticket medio 6.1k€ pero solo 5 facturas).` },
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
          <p className="text-xs text-muted-foreground mt-0.5">Análisis de growth marketing</p>
        </div>
        <Lightbulb className="w-4 h-4 text-cyan opacity-50" />
      </div>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
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

/* ─── Equipment Breakdown Panel ─── */
function EquipmentPanel({ equipment }: { equipment: ReturnType<typeof getEquipmentBreakdown> }) {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-cyan/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Desglose: Venta de Equipos</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {equipment.totalFacturas} facturas · {formatCurrencyFull(equipment.totalBase)} en base imponible
          </p>
        </div>
        <Cpu className="w-4 h-4 text-cyan opacity-50" />
      </div>

      <div className="mb-5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Productos más vendidos</p>
        <div className="flex flex-wrap gap-2">
          {equipment.keywords.map(([kw, count]) => (
            <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-cyan/10 text-cyan border border-cyan/20 font-mono">
              {kw} <span className="text-muted-foreground">×{count}</span>
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Top 5 ventas más grandes</p>
        <div className="space-y-2">
          {equipment.topSales.slice(0, 5).map((inv) => (
            <div key={inv.numero} className="flex items-start gap-3 p-2 rounded bg-surface-2/30 hover:bg-surface-2/50 transition-colors">
              <span className="text-xs font-mono text-cyan flex-shrink-0">#{inv.numero}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{inv.cliente}</p>
                <p className="text-[10px] text-muted-foreground truncate">{inv.concepto.slice(0, 80)}...</p>
              </div>
              <span className="text-xs font-mono font-semibold text-orange-accent flex-shrink-0">{formatCurrencyFull(inv.base_imponible)}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Public vs Private Panel ─── */
function PublicPrivatePanel({ data, totalBase }: { data: ReturnType<typeof getPublicVsPrivate>; totalBase: number }) {
  const pubPct = ((data.publico.base / totalBase) * 100).toFixed(1);
  const privPct = ((data.privado.base / totalBase) * 100).toFixed(1);

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 via-purple-400/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Sector Público vs Privado</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Distribución de facturación por tipo de cliente</p>
        </div>
        <Building2 className="w-4 h-4 text-purple-400 opacity-50" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-2/30 rounded-lg p-4 border border-cyan/10">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Sector Público</p>
          <p className="text-2xl font-mono font-bold text-cyan">{pubPct}%</p>
          <p className="text-xs text-muted-foreground mt-1">{data.publico.clientes} clientes · {data.publico.count} fact.</p>
          <p className="text-xs font-mono text-cyan mt-1">{formatCurrencyFull(data.publico.base)}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Ticket medio: {formatCurrencyFull(data.publico.ticketMedio)}</p>
        </div>
        <div className="bg-surface-2/30 rounded-lg p-4 border border-orange-accent/10">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Sector Privado</p>
          <p className="text-2xl font-mono font-bold text-orange-accent">{privPct}%</p>
          <p className="text-xs text-muted-foreground mt-1">{data.privado.clientes} clientes · {data.privado.count} fact.</p>
          <p className="text-xs font-mono text-orange-accent mt-1">{formatCurrencyFull(data.privado.base)}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Ticket medio: {formatCurrencyFull(data.privado.ticketMedio)}</p>
        </div>
      </div>

      {/* Visual bar */}
      <div className="relative h-6 rounded-full overflow-hidden bg-surface-2/50">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan to-cyan/70 rounded-l-full" style={{ width: `${pubPct}%` }} />
        <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-orange-accent to-orange-accent/70 rounded-r-full" style={{ width: `${privPct}%` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-mono font-semibold text-foreground">
            Público {pubPct}% — Privado {privPct}%
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 rounded bg-purple-400/5 border border-purple-400/10">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-purple-400 font-semibold">Insight:</span>{" "}
          {data.publico.ticketMedio > data.privado.ticketMedio ? (
            <>El sector público tiene un ticket medio un <span className="text-cyan font-mono">{((data.publico.ticketMedio / data.privado.ticketMedio - 1) * 100).toFixed(0)}%</span> superior al privado. Aumentar la presencia en licitaciones públicas incrementaría la facturación media.</>
          ) : (
            <>El sector público representa el {pubPct}% de tu facturación con {data.publico.clientes} clientes institucionales. Las licitaciones públicas ofrecen contratos de mayor volumen y recurrencia. Registrarte en más plataformas de contratación pública podría duplicar este segmento.</>
          )}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Dormant Clients Panel ─── */
function DormantClientsPanel({ clients }: { clients: ReturnType<typeof getDormantClients> }) {
  const totalDormant = clients.reduce((s, c) => s + c.base, 0);

  return (
    <motion.div
      {...fadeInUp}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-red-500/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Clientes Dormidos</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Activos en T1/T2 pero no en T3/T4 · {formatCurrencyFull(totalDormant)} en riesgo
          </p>
        </div>
        <UserX className="w-4 h-4 text-red-400 opacity-50" />
      </div>

      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        {clients.slice(0, 15).map((client, i) => (
          <motion.div
            key={client.cliente}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-center gap-3 p-2.5 rounded bg-surface-2/30 hover:bg-red-500/5 transition-colors border border-transparent hover:border-red-500/10"
          >
            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-mono text-red-400">{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground truncate">{client.cliente}</p>
              <p className="text-[10px] text-muted-foreground">
                {client.count} fact. · Activo en: {client.trimestres.join(", ")}
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-red-400 flex-shrink-0">{formatCurrencyFull(client.base)}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded bg-red-500/5 border border-red-500/10">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-red-400 font-semibold">Acción:</span> Estos {clients.length} clientes facturaron{" "}
          <span className="text-red-400 font-mono">{formatCurrencyFull(totalDormant)}</span> en la primera mitad del año pero no han vuelto.
          Un email o llamada de reactivación podría recuperar una parte significativa.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Review Candidates Panel ─── */
function ReviewCandidatesPanel({ candidates }: { candidates: ReturnType<typeof getReviewCandidates> }) {
  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-500 via-yellow-500/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Candidatos para Reseñas</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Clientes recurrentes (5+ facturas) ideales para pedir valoraciones
          </p>
        </div>
        <Star className="w-4 h-4 text-yellow-500 opacity-50" />
      </div>

      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        {candidates.map((client, i) => (
          <motion.div
            key={client.cliente}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-center gap-3 p-2.5 rounded bg-surface-2/30 hover:bg-yellow-500/5 transition-colors border border-transparent hover:border-yellow-500/10"
          >
            <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-3 h-3 text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground truncate">{client.cliente}</p>
              <p className="text-[10px] text-muted-foreground">
                {client.count} facturas · {client.numCategories} servicios · {client.numMonths} meses activo
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-yellow-500 flex-shrink-0">{formatCurrencyFull(client.base)}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded bg-yellow-500/5 border border-yellow-500/10">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-yellow-500 font-semibold">Estrategia:</span> Estos {candidates.length} clientes son los más leales.
          Enviarles un email personalizado pidiendo una reseña en Google Business tendría una tasa de respuesta muy alta.
          Prioriza los que usan más servicios diferentes.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Cross-sell Panel ─── */
function CrossSellPanel({ opportunities }: { opportunities: ReturnType<typeof getCrossSellOpportunities> }) {
  const totalPotential = opportunities.reduce((s, c) => s + c.base, 0);

  return (
    <motion.div
      {...fadeInUp}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-signal via-green-signal/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Oportunidades de Cross-Selling</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {opportunities.length} clientes con solo 1 categoría de servicio ({formatCurrencyFull(totalPotential)} en base)
          </p>
        </div>
        <ShoppingCart className="w-4 h-4 text-green-signal opacity-50" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Cliente</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Solo usa</th>
              <th className="text-center py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Fact.</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Base</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.slice(0, 12).map((opp, i) => (
              <motion.tr
                key={opp.cliente}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border-b border-border/20 hover:bg-green-signal/5 transition-colors"
              >
                <td className="py-2.5 px-3 text-xs text-foreground truncate max-w-[250px]">{opp.cliente}</td>
                <td className="py-2.5 px-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-signal/10 text-green-signal border border-green-signal/20">
                    {opp.soloCategoria}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-xs text-muted-foreground">{opp.count}</td>
                <td className="py-2.5 px-3 font-mono text-xs text-right font-semibold text-green-signal">{formatCurrencyFull(opp.base)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 rounded bg-green-signal/5 border border-green-signal/10">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-green-signal font-semibold">Oportunidad:</span> Estos clientes ya confían en AV Sistemas pero solo usan un tipo de servicio.
          Ofrecerles servicios complementarios (ej: un cliente de "Venta de Equipos" podría necesitar "Instalación" o "Mantenimiento")
          podría aumentar su ticket medio un 30-50% sin coste de adquisición.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Growth Proposals Panel ─── */
function GrowthProposalsPanel({ kpis, dormant, crossSell, growth, pareto, equipment, pubPriv }: {
  kpis: ReturnType<typeof getKPIs>;
  dormant: ReturnType<typeof getDormantClients>;
  crossSell: ReturnType<typeof getCrossSellOpportunities>;
  growth: ReturnType<typeof getGrowthRate>;
  pareto: ReturnType<typeof getParetoThresholds>;
  equipment: ReturnType<typeof getEquipmentBreakdown>;
  pubPriv: ReturnType<typeof getPublicVsPrivate>;
}) {
  const dormantTotal = dormant.reduce((s, c) => s + c.base, 0);
  const crossSellTotal = crossSell.reduce((s, c) => s + c.base, 0);

  const proposals = [
    {
      icon: Repeat,
      color: "text-red-400",
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/10",
      title: "Campaña de Reactivación de Clientes Dormidos",
      impact: `+${formatCurrency(dormantTotal * 0.3)} potencial`,
      description: `Tienes ${dormant.length} clientes que facturaron ${formatCurrencyFull(dormantTotal)} en T1/T2 pero desaparecieron. Con una campaña de email + llamada personalizada, podrías recuperar el 30% (${formatCurrencyFull(dormantTotal * 0.3)}). Empieza por los 5 más grandes: ${dormant.slice(0, 3).map(d => d.cliente).join(", ")}...`,
    },
    {
      icon: ShoppingCart,
      color: "text-green-signal",
      bgColor: "bg-green-signal/5",
      borderColor: "border-green-signal/10",
      title: "Programa de Cross-Selling Sistemático",
      impact: `+${formatCurrency(crossSellTotal * 0.2)} potencial`,
      description: `${crossSell.length} clientes solo usan 1 servicio (${formatCurrencyFull(crossSellTotal)} en base). Si el 20% contrata un servicio adicional, son ${formatCurrencyFull(crossSellTotal * 0.2)} extra. Crea paquetes: "Venta + Instalación + Mantenimiento" con descuento del 10%.`,
    },
    {
      icon: Building2,
      color: "text-purple-400",
      bgColor: "bg-purple-400/5",
      borderColor: "border-purple-400/10",
      title: "Expandir Cartera de Clientes Públicos",
      impact: `+${formatCurrency(pubPriv.publico.base * 0.5)} potencial`,
      description: `El sector público ya supone ${formatCurrencyFull(pubPriv.publico.base)} (${((pubPriv.publico.base/kpis.totalBase)*100).toFixed(0)}%) con solo ${pubPriv.publico.clientes} clientes institucionales. Las licitaciones públicas ofrecen contratos recurrentes y de gran volumen. Registrarte en más plataformas de contratación pública y presentar ofertas a ayuntamientos de la provincia podría añadir un 50% más.`,
    },
    {
      icon: Cpu,
      color: "text-cyan",
      bgColor: "bg-cyan/5",
      borderColor: "border-cyan/10",
      title: "Servicio de Mantenimiento Recurrente",
      impact: "Ingresos recurrentes",
      description: `Solo tienes 3 facturas de Mantenimiento (${formatCurrencyFull(2108)}). Con ${equipment.totalFacturas} ventas de equipos, cada cliente debería tener un contrato de mantenimiento anual. Si el 10% de tus clientes de equipos contratan mantenimiento a 500€/año, son ${formatCurrencyFull(Math.round(107 * 0.1) * 500)}/año en ingresos recurrentes.`,
    },
    {
      icon: Activity,
      color: "text-orange-accent",
      bgColor: "bg-orange-accent/5",
      borderColor: "border-orange-accent/10",
      title: "Atacar la Estacionalidad Baja (Ene-Mar)",
      impact: "+40% en T1",
      description: `T1 es tu peor trimestre (${formatCurrency(growth.t1)}). Lanza promociones de "inicio de año" en enero: descuentos en instalaciones, paquetes de renovación de equipos, y ofertas de mantenimiento preventivo para llenar los meses flojos.`,
    },
    {
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/5",
      borderColor: "border-yellow-500/10",
      title: "Potenciar Streaming/Grabación",
      impact: "Ticket medio 6.1k€",
      description: `Streaming/Grabación tiene el ticket medio más alto (6.125€) pero solo 5 facturas. Es un mercado en crecimiento post-COVID. Crear un paquete de "Streaming Profesional para Eventos" y promocionarlo a tus clientes de Eventos podría abrir una línea de negocio muy rentable.`,
    },
  ];

  return (
    <motion.div
      {...fadeInUp}
      className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-accent via-cyan/50 to-green-signal" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Propuestas de Crecimiento</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            6 acciones concretas para aumentar la facturación basadas en tus datos reales
          </p>
        </div>
        <Lightbulb className="w-5 h-5 text-orange-accent opacity-50" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {proposals.map((proposal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            className={`p-4 rounded-lg ${proposal.bgColor} border ${proposal.borderColor} hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-center gap-2 mb-3">
              <proposal.icon className={`w-4 h-4 ${proposal.color}`} />
              <span className={`text-xs font-mono font-semibold ${proposal.color}`}>{proposal.impact}</span>
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-2">{proposal.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{proposal.description}</p>
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
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
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
                <td className="py-2.5 px-3 font-mono text-xs text-right text-foreground">{formatCurrencyFull(inv.base_imponible)}</td>
                <td className="py-2.5 px-3 font-mono text-xs text-right font-semibold text-cyan">{formatCurrencyFull(inv.total)}</td>
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
