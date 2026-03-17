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
  getReviewCandidates,
  getCrossSellOpportunities,
  getVentaBreakdown,
  getPublicVsPrivate,
  getGrowthRate,
  getParetoThresholds,
  getRecurrenceAnalysis,
  getSeasonality,
  getNewClientsPerTrimestre,
  getAlquilerTicketEvolution,
  getBusinessVelocity,
  getAllDormantClients,
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
  Clock,
  CalendarDays,
  Flame,
  Shield,
  Heart,
  TrendingDown,
  DollarSign,
  BarChart2,
  UserPlus,
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
  LineChart,
  Line,
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

const CHART_COLORS = [CYAN, ORANGE, GREEN, PURPLE, RED, "oklch(0.7 0.12 330)", "oklch(0.65 0.1 210)", "oklch(0.8 0.12 90)", "oklch(0.7 0.14 160)"];

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
  const reviewCandidates = getReviewCandidates();
  const crossSell = getCrossSellOpportunities();
  const equipment = getVentaBreakdown();
  const pubPriv = getPublicVsPrivate();
  const growth = getGrowthRate();
  const pareto = getParetoThresholds();
  const recurrence = getRecurrenceAnalysis();
  const seasonality = getSeasonality();
  const newClients = getNewClientsPerTrimestre();
  const alquilerEvolution = getAlquilerTicketEvolution();
  const velocity = getBusinessVelocity();
  const dormant = getAllDormantClients();

  const maxClientBase = topClients[0]?.base || 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection kpis={kpis} growth={growth} velocity={velocity} />

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
          <KPICard title="€/Día Laborable" value={velocity.euroPerLaborDay} suffix="€" icon={Clock} accent="green" delay={0.3} />
          <KPICard title="€/Semana" value={velocity.euroPerWeek} suffix="€" icon={CalendarDays} accent="orange" delay={0.4} />
        </div>
      </section>

      {/* ═══ EXECUTIVE SUMMARY BANNER ═══ */}
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
                  Danny, tu negocio ha generado <span className="text-cyan font-mono font-semibold">{formatCurrencyFull(kpis.totalFacturado)}</span> con{" "}
                  <span className="text-orange-accent font-mono font-semibold">{kpis.numFacturas}</span> facturas a{" "}
                  <span className="text-cyan font-mono font-semibold">{kpis.clientesUnicos}</span> clientes.
                  Tu negocio genera <span className="text-green-signal font-mono font-semibold">{formatCurrencyFull(velocity.euroPerLaborDay)}</span>/día laborable y ha crecido un{" "}
                  <span className="text-green-signal font-mono font-semibold">+{growth.growthPct}%</span> de T1 a T4.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-cyan">{formatCurrencyFull(kpis.ticketMedio)}</p>
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
                <h3 className="text-sm font-semibold text-foreground mb-1">Facturas No Encontradas en el Archivo</h3>
                <p className="text-sm text-muted-foreground">
                  De la factura #1 a la #{Math.max(...invoices.map(i => i.numero))}, faltan {missingInvoices.length} números:{" "}
                  <span className="text-orange-accent font-mono font-semibold">
                    {missingInvoices.map(n => `#${n}`).join(", ")}
                  </span>.
                  Probablemente sean facturas anuladas o rectificativas. Conviene verificar con la asesoría fiscal para asegurar la secuencia correcta.
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

      {/* ═══ WOW INSIGHTS SECTION ═══ */}
      <section className="container pb-4">
        <motion.div {...fadeInUp} className="flex items-center gap-3 mb-2">
          <div className="h-[2px] w-12 bg-gradient-to-r from-cyan to-transparent" />
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Radiografía <span className="text-cyan">Estratégica</span>
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan/30 to-transparent" />
        </motion.div>
        <p className="text-sm text-muted-foreground mb-6 ml-16">10 descubrimientos clave que revelan el ADN de tu negocio</p>
      </section>

      {/* WOW Insight Cards Grid */}
      <section className="container pb-8">
        <WowInsightsGrid
          kpis={kpis}
          growth={growth}
          recurrence={recurrence}
          seasonality={seasonality}
          pareto={pareto}
          topClients={topClients}
          alquilerEvolution={alquilerEvolution}
          velocity={velocity}
          dormant={dormant}
          newClients={newClients}
          pubPriv={pubPriv}
          byCategoria={byCategoria}
        />
      </section>

      {/* Alquiler Ticket Evolution Chart */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-2 gap-4">
          <AlquilerEvolutionChart data={alquilerEvolution} />
          <NewClientsChart data={newClients} />
        </div>
      </section>

      {/* Client Concentration */}
      <section className="container pb-8">
        <ConcentrationChart data={concentration.slice(0, 20)} />
      </section>

      {/* ═══ GROWTH MARKETING SECTION ═══ */}
      <section className="container pb-4">
        <motion.div {...fadeInUp} className="flex items-center gap-3 mb-2">
          <div className="h-[2px] w-12 bg-gradient-to-r from-orange-accent to-transparent" />
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Plan de <span className="text-orange-accent">Crecimiento</span>
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-accent/30 to-transparent" />
        </motion.div>
        <p className="text-sm text-muted-foreground mb-6 ml-16">Acciones concretas para multiplicar tu facturación</p>
      </section>

      {/* Ventas Reales + Public vs Private */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-2 gap-4">
          <VentaRealPanel equipment={equipment} />
          <PublicPrivatePanel data={pubPriv} totalBase={kpis.totalBase} />
        </div>
      </section>

      {/* Dormant Clients + Review Candidates */}
      <section className="container pb-8">
        <div className="grid lg:grid-cols-2 gap-4">
          <DormantClientsPanel dormant={dormant} />
          <ReviewCandidatesPanel candidates={reviewCandidates} />
        </div>
      </section>

      {/* Cross-sell */}
      <section className="container pb-8">
        <CrossSellPanel opportunities={crossSell} />
      </section>

      {/* Actionable Growth Proposals */}
      <section className="container pb-8">
        <GrowthProposalsPanel
          kpis={kpis}
          dormant={dormant}
          crossSell={crossSell}
          growth={growth}
          pareto={pareto}
          equipment={equipment}
          pubPriv={pubPriv}
          recurrence={recurrence}
          seasonality={seasonality}
        />
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
            Datos basados en {kpis.numFacturas} facturas reales procesadas · Facturas #{missingInvoices.join(", #")} no encontradas en archivo
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ kpis, growth, velocity }: { kpis: ReturnType<typeof getKPIs>; growth: ReturnType<typeof getGrowthRate>; velocity: ReturnType<typeof getBusinessVelocity> }) {
  return (
    <div className="relative overflow-hidden bg-card">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="container relative py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO} alt="AV Sistemas" className="h-12 w-auto" />
                <div className="h-8 w-px bg-border" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Dashboard de Inteligencia</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Audiovisuales <span className="text-cyan">AV Sistemas</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Análisis completo de <span className="text-cyan font-mono">{kpis.numFacturas}</span> facturas · Enero a Diciembre 2025
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <div className="bg-card/60 backdrop-blur-sm border border-cyan/20 rounded-lg px-4 py-3">
                <p className="text-2xl font-mono font-bold text-cyan">{formatCurrencyFull(kpis.totalFacturado)}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Facturación Total</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-green-signal/20 rounded-lg px-4 py-3">
                <p className="text-2xl font-mono font-bold text-green-signal">+{growth.growthPct}%</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Crecimiento T1→T4</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-orange-accent/20 rounded-lg px-4 py-3">
                <p className="text-2xl font-mono font-bold text-orange-accent">{formatCurrencyFull(velocity.euroPerLaborDay)}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Por Día Laborable</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block w-80 flex-shrink-0"
          >
            <img src={ILLUSTRATION} alt="Dashboard" className="w-full h-auto drop-shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── WOW Insights Grid ─── */
function WowInsightsGrid({ kpis, growth, recurrence, seasonality, pareto, topClients, alquilerEvolution, velocity, dormant, newClients, pubPriv, byCategoria }: {
  kpis: ReturnType<typeof getKPIs>;
  growth: ReturnType<typeof getGrowthRate>;
  recurrence: ReturnType<typeof getRecurrenceAnalysis>;
  seasonality: ReturnType<typeof getSeasonality>;
  pareto: ReturnType<typeof getParetoThresholds>;
  topClients: ReturnType<typeof getTopClients>;
  alquilerEvolution: ReturnType<typeof getAlquilerTicketEvolution>;
  velocity: ReturnType<typeof getBusinessVelocity>;
  dormant: ReturnType<typeof getAllDormantClients>;
  newClients: ReturnType<typeof getNewClientsPerTrimestre>;
  pubPriv: ReturnType<typeof getPublicVsPrivate>;
  byCategoria: ReturnType<typeof getByCategoria>;
}) {
  const ticketGrowth = alquilerEvolution[3].ticketMedio > 0 && alquilerEvolution[0].ticketMedio > 0
    ? Math.round(((alquilerEvolution[3].ticketMedio / alquilerEvolution[0].ticketMedio) - 1) * 100)
    : 0;

  const repeatValue = recurrence.repeat.count > 0 ? Math.round(recurrence.repeat.base / recurrence.repeat.count) : 0;
  const oneTimeValue = recurrence.oneTime.count > 0 ? Math.round(recurrence.oneTime.base / recurrence.oneTime.count) : 0;
  const repeatMultiplier = oneTimeValue > 0 ? (repeatValue / oneTimeValue).toFixed(1) : "N/A";

  const totalNewClients = newClients.slice(1).reduce((s, t) => s + t.nuevos, 0);

  const insights = [
    {
      icon: Flame,
      color: "text-green-signal",
      bgColor: "bg-green-signal/5",
      borderColor: "border-green-signal/15",
      metric: `+${growth.growthPct}%`,
      title: "Motor de Crecimiento Brutal",
      text: `De ${formatCurrencyFull(growth.t1)} en T1 a ${formatCurrencyFull(growth.t4)} en T4. No solo facturas más, facturas MEJOR: tu ticket medio de alquiler ha subido de ${formatCurrencyFull(alquilerEvolution[0].ticketMedio)} a ${formatCurrencyFull(alquilerEvolution[3].ticketMedio)} (+${ticketGrowth}%).`,
    },
    {
      icon: Heart,
      color: "text-cyan",
      bgColor: "bg-cyan/5",
      borderColor: "border-cyan/15",
      metric: `${repeatMultiplier}x`,
      title: "El Poder de la Recurrencia",
      text: `El ${((recurrence.repeat.count / recurrence.total) * 100).toFixed(0)}% de tus clientes (${recurrence.repeat.count}) son recurrentes y generan el ${((recurrence.repeat.base / kpis.totalBase) * 100).toFixed(0)}% de tu facturación (${formatCurrencyFull(recurrence.repeat.base)}). Cada cliente que repite vale ${repeatMultiplier}x más que uno nuevo.`,
    },
    {
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/5",
      borderColor: "border-yellow-500/15",
      metric: formatCurrencyFull(seasonality.bestTicket.ticketMedio),
      title: `${seasonality.bestTicket.mes}: Tu Mes de Oro`,
      text: `${seasonality.bestTicket.mes} tiene un ticket medio de ${formatCurrencyFull(seasonality.bestTicket.ticketMedio)} (${(seasonality.bestTicket.ticketMedio / (kpis.totalBase / kpis.numFacturas)).toFixed(1)}x la media). ${seasonality.best.mes} es el mes con más facturación (${formatCurrencyFull(seasonality.best.base)}). ${seasonality.worst.mes} es el peor (${formatCurrencyFull(seasonality.worst.base)}): ${seasonality.ratio}x menos.`,
    },
    {
      icon: Shield,
      color: "text-red-400",
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/15",
      metric: `${pareto.top50} clientes`,
      title: "Alerta: Concentración de Riesgo",
      text: `Solo ${pareto.top50} clientes (${((pareto.top50 / pareto.totalClients) * 100).toFixed(0)}% del total) generan el 50% de tu facturación. ${topClients[0]?.cliente} sola representa el ${((topClients[0]?.base / kpis.totalBase) * 100).toFixed(1)}% (${formatCurrencyFull(topClients[0]?.base)}). Si la perdieras, sería un golpe duro.`,
    },
    {
      icon: UserX,
      color: "text-orange-accent",
      bgColor: "bg-orange-accent/5",
      borderColor: "border-orange-accent/15",
      metric: `${dormant.total} clientes`,
      title: `${formatCurrencyFull(dormant.totalBase)} Durmiendo`,
      text: `${dormant.total} clientes facturaron en la primera mitad del año pero no han vuelto. Eso son ${formatCurrencyFull(dormant.totalBase)} en riesgo. Una campaña de reactivación al 10% de éxito = ${formatCurrencyFull(dormant.totalBase * 0.1)} recuperados.`,
    },
    {
      icon: UserPlus,
      color: "text-purple-400",
      bgColor: "bg-purple-400/5",
      borderColor: "border-purple-400/15",
      metric: `${totalNewClients} nuevos`,
      title: "Máquina de Captar Clientes",
      text: `Has captado ${totalNewClients} clientes nuevos entre T2-T4 (${newClients[1].nuevos} + ${newClients[2].nuevos} + ${newClients[3].nuevos}). Eso son ~${Math.round(totalNewClients / 9)} clientes nuevos por mes. Tu marca tiene tirón en el mercado.`,
    },
    {
      icon: BarChart2,
      color: "text-cyan",
      bgColor: "bg-cyan/5",
      borderColor: "border-cyan/15",
      metric: `${((byCategoria[0]?.base / kpis.totalBase) * 100).toFixed(0)}%`,
      title: "Alquiler: Tu Core Business",
      text: `"${byCategoria[0]?.categoria}" domina con ${formatCurrencyFull(byCategoria[0]?.base)} (${((byCategoria[0]?.base / kpis.totalBase) * 100).toFixed(1)}%). ${byCategoria[0]?.count} facturas con ticket medio de ${formatCurrencyFull(byCategoria[0]?.base / byCategoria[0]?.count)}. Cada euro invertido en stock de alquiler se multiplica.`,
    },
    {
      icon: DollarSign,
      color: "text-green-signal",
      bgColor: "bg-green-signal/5",
      borderColor: "border-green-signal/15",
      metric: formatCurrencyFull(velocity.euroPerWeek),
      title: "Velocidad del Negocio",
      text: `Tu negocio genera ${formatCurrencyFull(velocity.euroPerLaborDay)} cada día laborable, ${formatCurrencyFull(velocity.euroPerWeek)} por semana, y ${formatCurrencyFull(velocity.euroPerMonth)} al mes. Emites ${velocity.facturasPerDay} facturas por día natural.`,
    },
    {
      icon: Building2,
      color: "text-purple-400",
      bgColor: "bg-purple-400/5",
      borderColor: "border-purple-400/15",
      metric: `${((pubPriv.publico.base / kpis.totalBase) * 100).toFixed(0)}% público`,
      title: "Público vs Privado",
      text: `Sector público: ${formatCurrencyFull(pubPriv.publico.base)} (${pubPriv.publico.clientes} clientes, ticket ${formatCurrencyFull(pubPriv.publico.ticketMedio)}). Privado: ${formatCurrencyFull(pubPriv.privado.base)} (${pubPriv.privado.clientes} clientes, ticket ${formatCurrencyFull(pubPriv.privado.ticketMedio)}). ${pubPriv.publico.ticketMedio > pubPriv.privado.ticketMedio ? "El público paga más por servicio." : "El privado tiene más volumen de operaciones."}`,
    },
    {
      icon: TrendingUp,
      color: "text-orange-accent",
      bgColor: "bg-orange-accent/5",
      borderColor: "border-orange-accent/15",
      metric: `+${ticketGrowth}%`,
      title: "Cobras Más por Servicio",
      text: `Tu ticket medio de alquiler ha subido cada trimestre: ${alquilerEvolution.map(t => `${t.trimestre}: ${formatCurrencyFull(t.ticketMedio)}`).join(" → ")}. Esto demuestra que estás posicionándote como proveedor premium, no compitiendo en precio.`,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {insights.map((insight, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
          className={`p-5 rounded-lg ${insight.bgColor} border ${insight.borderColor} hover:scale-[1.01] transition-transform relative overflow-hidden`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
              <insight.icon className={`w-5 h-5 ${insight.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-lg font-mono font-bold ${insight.color}`}>{insight.metric}</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1.5">{insight.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.text}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Monthly Revenue Chart ─── */
function MonthlyRevenueChart({ data }: { data: ReturnType<typeof getByMonth> }) {
  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-cyan/50 to-transparent" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Facturación Mensual</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Base imponible por mes</p>
        </div>
        <BarChart3 className="w-4 h-4 text-cyan opacity-50" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0 / 30%)" />
            <XAxis dataKey="mesCorto" tick={{ fill: "oklch(0.6 0 0)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
            <YAxis tick={{ fill: "oklch(0.6 0 0)", fontSize: 10, fontFamily: "JetBrains Mono" }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="base" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={i % 2 === 0 ? CYAN : ORANGE} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ─── Trimestre Chart ─── */
function TrimestreChart({ data }: { data: ReturnType<typeof getByTrimestre> }) {
  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-accent via-orange-accent/50 to-transparent" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Por Trimestre</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Evolución trimestral</p>
        </div>
        <Activity className="w-4 h-4 text-orange-accent opacity-50" />
      </div>
      <div className="space-y-4">
        {data.map((t, i) => {
          const maxBase = Math.max(...data.map((d) => d.base));
          const pct = (t.base / maxBase) * 100;
          return (
            <motion.div key={t.trimestre} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-foreground">{t.trimestre}</span>
                  <span className="text-[10px] text-muted-foreground">{t.label}</span>
                </div>
                <span className="text-xs font-mono text-cyan">{formatCurrencyFull(t.base)}</span>
              </div>
              <VUMeter value={pct} color={i < 2 ? "cyan" : "orange"} />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">{t.count} facturas</span>
                <span className="text-[10px] text-muted-foreground">ticket: {formatCurrencyFull(t.base / t.count)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Top Clients Panel ─── */
function TopClientsPanel({ clients, maxBase }: { clients: ReturnType<typeof getTopClients>; maxBase: number }) {
  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-orange-accent/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Top 10 Clientes</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Por base imponible</p>
        </div>
        <Users className="w-4 h-4 text-cyan opacity-50" />
      </div>
      <div className="space-y-2.5">
        {clients.map((client, i) => (
          <motion.div key={client.cliente} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }} className="group">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-muted-foreground w-4 text-right">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground truncate pr-2">{client.cliente}</span>
                  <span className="text-xs font-mono text-cyan flex-shrink-0">{formatCurrencyFull(client.base)}</span>
                </div>
                <VUMeter value={(client.base / maxBase) * 100} color={i < 3 ? "cyan" : "orange"} height={4} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Categories Panel ─── */
function CategoriesPanel({ categories, totalBase }: { categories: ReturnType<typeof getByCategoria>; totalBase: number }) {
  const pieData = categories.map((c, i) => ({
    name: c.categoria,
    value: Math.round(c.base),
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-accent via-orange-accent/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Categorías de Servicio</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Distribución por tipo (extraído del encabezado de cada factura)</p>
        </div>
        <PieChart className="w-4 h-4 text-orange-accent opacity-50" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RPieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrencyFull(value)} />
            </RPieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {categories.map((cat, i) => {
            const pct = ((cat.base / totalBase) * 100).toFixed(1);
            return (
              <div key={cat.categoria} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                <span className="text-xs text-foreground flex-1 truncate">{cat.categoria}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{cat.count} fact.</span>
                <span className="text-xs font-mono text-cyan">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Alquiler Ticket Evolution Chart ─── */
function AlquilerEvolutionChart({ data }: { data: ReturnType<typeof getAlquilerTicketEvolution> }) {
  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-signal via-green-signal/50 to-transparent" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Evolución Ticket Medio Alquiler</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Cada trimestre cobras más por servicio</p>
        </div>
        <TrendingUp className="w-4 h-4 text-green-signal opacity-50" />
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0 / 30%)" />
            <XAxis dataKey="trimestre" tick={{ fill: "oklch(0.6 0 0)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
            <YAxis tick={{ fill: "oklch(0.6 0 0)", fontSize: 10, fontFamily: "JetBrains Mono" }} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            <Tooltip formatter={(value: number) => formatCurrencyFull(value)} labelStyle={{ color: "#999" }} contentStyle={{ backgroundColor: "oklch(0.18 0.005 285)", border: "1px solid oklch(0.3 0 0)", borderRadius: "8px", fontSize: "12px" }} />
            <Line type="monotone" dataKey="ticketMedio" stroke={GREEN} strokeWidth={3} dot={{ fill: GREEN, r: 6 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ─── New Clients Chart ─── */
function NewClientsChart({ data }: { data: ReturnType<typeof getNewClientsPerTrimestre> }) {
  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 via-purple-400/50 to-transparent" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Captación de Clientes Nuevos</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Nuevos vs recurrentes por trimestre</p>
        </div>
        <UserPlus className="w-4 h-4 text-purple-400 opacity-50" />
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0 / 30%)" />
            <XAxis dataKey="trimestre" tick={{ fill: "oklch(0.6 0 0)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
            <YAxis tick={{ fill: "oklch(0.6 0 0)", fontSize: 10, fontFamily: "JetBrains Mono" }} />
            <Tooltip contentStyle={{ backgroundColor: "oklch(0.18 0.005 285)", border: "1px solid oklch(0.3 0 0)", borderRadius: "8px", fontSize: "12px" }} />
            <Bar dataKey="nuevos" name="Nuevos" fill={PURPLE} radius={[4, 4, 0, 0]} />
            <Bar dataKey="total" name="Total Activos" fill={CYAN} radius={[4, 4, 0, 0]} fillOpacity={0.4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ─── Concentration Chart ─── */
function ConcentrationChart({ data }: { data: ReturnType<typeof getClientConcentration> }) {
  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-red-400/50 to-transparent" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Concentración de Clientes (Pareto)</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Top 20 clientes · % acumulado de facturación</p>
        </div>
        <Target className="w-4 h-4 text-cyan opacity-50" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0 / 30%)" />
            <XAxis dataKey="rank" tick={{ fill: "oklch(0.6 0 0)", fontSize: 10, fontFamily: "JetBrains Mono" }} label={{ value: "# Cliente", position: "insideBottom", offset: -2, style: { fill: "oklch(0.5 0 0)", fontSize: 10 } }} />
            <YAxis tick={{ fill: "oklch(0.6 0 0)", fontSize: 10, fontFamily: "JetBrains Mono" }} tickFormatter={(v: number) => `${v.toFixed(0)}%`} domain={[0, 100]} />
            <Tooltip content={<ParetoTooltip />} />
            <defs>
              <linearGradient id="paretoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CYAN} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CYAN} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="cumulative" stroke={CYAN} strokeWidth={2} fill="url(#paretoGrad)" dot={{ fill: CYAN, r: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

/* ─── Venta Real Panel ─── */
function VentaRealPanel({ equipment }: { equipment: ReturnType<typeof getVentaBreakdown> }) {
  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-cyan/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Ventas Reales de Material</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {equipment.totalFacturas} facturas verificadas · {formatCurrencyFull(equipment.totalBase)} en base imponible
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5 italic">
            Cada factura verificada manualmente: encabezado dice "VENTA DE MATERIAL AUDIOVISUAL"
          </p>
        </div>
        <Cpu className="w-4 h-4 text-cyan opacity-50" />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Top ventas más grandes</p>
        <div className="space-y-2">
          {equipment.topSales.slice(0, 6).map((inv) => (
            <div key={inv.numero} className="flex items-start gap-3 p-2 rounded bg-surface-2/30 hover:bg-surface-2/50 transition-colors">
              <span className="text-xs font-mono text-cyan flex-shrink-0">#{inv.numero}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{inv.cliente}</p>
                <p className="text-[10px] text-muted-foreground truncate">{inv.concepto.slice(0, 80)}</p>
              </div>
              <span className="text-xs font-mono font-semibold text-orange-accent flex-shrink-0">{formatCurrencyFull(inv.base)}</span>
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
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 via-purple-400/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Sector Público vs Privado</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Análisis por tipo de cliente</p>
        </div>
        <Building2 className="w-4 h-4 text-purple-400 opacity-50" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="p-4 rounded-lg bg-purple-400/5 border border-purple-400/10">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Público</p>
          <p className="text-xl font-mono font-bold text-purple-400">{pubPct}%</p>
          <p className="text-xs text-muted-foreground mt-1">{formatCurrencyFull(data.publico.base)}</p>
          <p className="text-[10px] text-muted-foreground">{data.publico.clientes} clientes · {data.publico.count} fact.</p>
          <p className="text-[10px] text-muted-foreground">Ticket: {formatCurrencyFull(data.publico.ticketMedio)}</p>
        </div>
        <div className="p-4 rounded-lg bg-cyan/5 border border-cyan/10">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Privado</p>
          <p className="text-xl font-mono font-bold text-cyan">{privPct}%</p>
          <p className="text-xs text-muted-foreground mt-1">{formatCurrencyFull(data.privado.base)}</p>
          <p className="text-[10px] text-muted-foreground">{data.privado.clientes} clientes · {data.privado.count} fact.</p>
          <p className="text-[10px] text-muted-foreground">Ticket: {formatCurrencyFull(data.privado.ticketMedio)}</p>
        </div>
      </div>

      <div className="w-full h-3 rounded-full bg-surface-2/50 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-400/70" style={{ width: `${pubPct}%` }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-purple-400">Público {pubPct}%</span>
        <span className="text-[10px] text-cyan">Privado {privPct}%</span>
      </div>
    </motion.div>
  );
}

/* ─── Dormant Clients Panel ─── */
function DormantClientsPanel({ dormant }: { dormant: ReturnType<typeof getAllDormantClients> }) {
  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-400 via-red-400/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Clientes Dormidos</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {dormant.total} clientes · {formatCurrencyFull(dormant.totalBase)} en riesgo
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5">Activos en T1/T2 pero no han vuelto en T3/T4</p>
        </div>
        <UserX className="w-4 h-4 text-red-400 opacity-50" />
      </div>

      <div className="mb-4 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
        <div className="flex items-center gap-2 mb-1">
          <Mail className="w-3.5 h-3.5 text-red-400" />
          <span className="text-xs font-semibold text-foreground">Acción recomendada</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Envía un email personalizado a estos clientes con una oferta especial de "vuelta". Si recuperas solo el 10%, son {formatCurrencyFull(dormant.totalBase * 0.1)} extra.
        </p>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {dormant.topDormant.slice(0, 15).map((client, i) => (
          <motion.div
            key={client.cliente}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
            className="flex items-center gap-3 p-2 rounded bg-surface-2/30 hover:bg-surface-2/50 transition-colors"
          >
            <span className="text-[10px] font-mono text-muted-foreground w-4 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground truncate">{client.cliente}</p>
              <p className="text-[10px] text-muted-foreground">{client.count} fact. en {client.trimestres.join(", ")}</p>
            </div>
            <span className="text-xs font-mono text-red-400 flex-shrink-0">{formatCurrencyFull(client.base)}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Review Candidates Panel ─── */
function ReviewCandidatesPanel({ candidates }: { candidates: ReturnType<typeof getReviewCandidates> }) {
  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-500 via-yellow-500/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Candidatos para Reseñas en Google</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {candidates.length} clientes leales (5+ facturas) · Ideales para pedir reseña
          </p>
        </div>
        <Star className="w-4 h-4 text-yellow-500 opacity-50" />
      </div>

      <div className="mb-4 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
        <div className="flex items-center gap-2 mb-1">
          <Mail className="w-3.5 h-3.5 text-yellow-500" />
          <span className="text-xs font-semibold text-foreground">Estrategia de reseñas</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Estos clientes ya confían en ti (5+ facturas). Envíales un email personalizado agradeciéndoles y pidiéndoles una reseña en Google. Tasa de respuesta esperada: 15-25%.
        </p>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {candidates.map((c, i) => (
          <motion.div
            key={c.cliente}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
            className="flex items-center gap-3 p-2 rounded bg-surface-2/30 hover:bg-surface-2/50 transition-colors"
          >
            <div className="flex items-center gap-1 flex-shrink-0">
              {[...Array(Math.min(5, Math.ceil(c.count / 3)))].map((_, j) => (
                <Star key={j} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground truncate">{c.cliente}</p>
              <p className="text-[10px] text-muted-foreground">{c.count} facturas · {c.numMonths} meses activo</p>
            </div>
            <span className="text-xs font-mono text-cyan flex-shrink-0">{formatCurrencyFull(c.base)}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Cross-sell Panel ─── */
function CrossSellPanel({ opportunities }: { opportunities: ReturnType<typeof getCrossSellOpportunities> }) {
  const totalPotential = opportunities.reduce((s, c) => s + c.base, 0);
  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-signal via-green-signal/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Oportunidades de Cross-Selling</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {opportunities.length} clientes usan solo 1 servicio · {formatCurrencyFull(totalPotential)} en base
          </p>
        </div>
        <ShoppingCart className="w-4 h-4 text-green-signal opacity-50" />
      </div>

      <div className="mb-4 p-3 rounded-lg bg-green-signal/5 border border-green-signal/10">
        <p className="text-xs text-muted-foreground">
          Si el 20% de estos clientes contrata un servicio adicional, son <span className="text-green-signal font-mono font-semibold">{formatCurrencyFull(totalPotential * 0.2)}</span> extra en facturación.
          Crea paquetes combinados: "Alquiler + Asistencia Técnica" con descuento del 10%.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
        {opportunities.slice(0, 12).map((opp, i) => (
          <motion.div
            key={opp.cliente}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 + i * 0.03 }}
            className="p-2.5 rounded bg-surface-2/30 hover:bg-surface-2/50 transition-colors"
          >
            <p className="text-xs text-foreground truncate mb-1">{opp.cliente}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan/10 text-cyan">{opp.soloCategoria}</span>
              <span className="text-[10px] font-mono text-orange-accent">{formatCurrencyFull(opp.base)}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Growth Proposals Panel ─── */
function GrowthProposalsPanel({ kpis, dormant, crossSell, growth, pareto, equipment, pubPriv, recurrence, seasonality }: {
  kpis: ReturnType<typeof getKPIs>;
  dormant: ReturnType<typeof getAllDormantClients>;
  crossSell: ReturnType<typeof getCrossSellOpportunities>;
  growth: ReturnType<typeof getGrowthRate>;
  pareto: ReturnType<typeof getParetoThresholds>;
  equipment: ReturnType<typeof getVentaBreakdown>;
  pubPriv: ReturnType<typeof getPublicVsPrivate>;
  recurrence: ReturnType<typeof getRecurrenceAnalysis>;
  seasonality: ReturnType<typeof getSeasonality>;
}) {
  const crossSellTotal = crossSell.reduce((s, c) => s + c.base, 0);

  const proposals = [
    {
      icon: Repeat,
      color: "text-red-400",
      bgColor: "bg-red-500/5",
      borderColor: "border-red-500/10",
      title: "Campaña de Reactivación de Clientes Dormidos",
      impact: `+${formatCurrency(dormant.totalBase * 0.3)} potencial`,
      priority: "URGENTE",
      priorityColor: "text-red-400 bg-red-500/10",
      description: `${dormant.total} clientes con ${formatCurrencyFull(dormant.totalBase)} facturados no han vuelto. Envía email personalizado + llamada a los top 10. Objetivo: recuperar 30% = ${formatCurrencyFull(dormant.totalBase * 0.3)}.`,
    },
    {
      icon: Heart,
      color: "text-cyan",
      bgColor: "bg-cyan/5",
      borderColor: "border-cyan/10",
      title: "Programa de Fidelización VIP",
      impact: "+15% retención",
      priority: "ALTO",
      priorityColor: "text-orange-accent bg-orange-accent/10",
      description: `El ${((recurrence.oneTime.count / recurrence.total) * 100).toFixed(0)}% de clientes solo compran 1 vez. Crea un programa VIP: descuento 5% en 2a factura, 10% en 5a. Convertir el 10% de one-time en recurrentes = ${formatCurrencyFull(recurrence.oneTime.base * 0.1)} extra.`,
    },
    {
      icon: ShoppingCart,
      color: "text-green-signal",
      bgColor: "bg-green-signal/5",
      borderColor: "border-green-signal/10",
      title: "Cross-Selling Sistemático",
      impact: `+${formatCurrency(crossSellTotal * 0.2)} potencial`,
      priority: "ALTO",
      priorityColor: "text-orange-accent bg-orange-accent/10",
      description: `${crossSell.length} clientes solo usan 1 servicio. Crea paquetes: "Alquiler + Técnico" con 10% descuento. Si el 20% contrata servicio adicional = ${formatCurrencyFull(crossSellTotal * 0.2)} extra.`,
    },
    {
      icon: TrendingDown,
      color: "text-orange-accent",
      bgColor: "bg-orange-accent/5",
      borderColor: "border-orange-accent/10",
      title: `Atacar ${seasonality.worst.mes} (Mes Más Flojo)`,
      impact: "+40% en mes bajo",
      priority: "MEDIO",
      priorityColor: "text-cyan bg-cyan/10",
      description: `${seasonality.worst.mes} solo factura ${formatCurrencyFull(seasonality.worst.base)} (${seasonality.ratio}x menos que ${seasonality.best.mes}). Lanza promociones de temporada baja: descuentos en instalaciones, paquetes de renovación, mantenimiento preventivo.`,
    },
    {
      icon: Building2,
      color: "text-purple-400",
      bgColor: "bg-purple-400/5",
      borderColor: "border-purple-400/10",
      title: "Expandir Sector Público",
      impact: `+${formatCurrency(pubPriv.publico.base * 0.5)} potencial`,
      priority: "MEDIO",
      priorityColor: "text-cyan bg-cyan/10",
      description: `El sector público ya genera ${formatCurrencyFull(pubPriv.publico.base)} con solo ${pubPriv.publico.clientes} clientes. Registrarte en más plataformas de contratación pública y presentar ofertas a ayuntamientos de la provincia podría añadir un 50% más.`,
    },
    {
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/5",
      borderColor: "border-yellow-500/10",
      title: "Potenciar Streaming/Grabación",
      impact: "Nueva línea de negocio",
      priority: "OPORTUNIDAD",
      priorityColor: "text-green-signal bg-green-signal/10",
      description: `Solo 3 facturas de Streaming pero con ticket medio alto. Es un mercado en crecimiento. Crea un paquete de "Streaming Profesional para Eventos" y promuévelo a tus clientes de Alquiler.`,
    },
  ];

  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-accent via-cyan/50 to-green-signal" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">6 Propuestas de Crecimiento</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Acciones concretas priorizadas por impacto y facilidad de implementación
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
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <proposal.icon className={`w-4 h-4 ${proposal.color}`} />
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${proposal.priorityColor}`}>{proposal.priority}</span>
              </div>
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
  const recent = [...invoices].sort((a, b) => b.numero - a.numero).slice(0, 15);
  return (
    <motion.div {...fadeInUp} className="bg-card rounded-lg border border-border/50 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-orange-accent/50 to-transparent" />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Últimas 15 Facturas</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Ordenadas por número de factura</p>
        </div>
        <FileText className="w-4 h-4 text-cyan opacity-50" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-2 font-mono text-muted-foreground font-medium">#</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Fecha</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Cliente</th>
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Categoría</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Base</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((inv) => (
              <tr key={inv.numero} className="border-b border-border/20 hover:bg-surface-2/30 transition-colors">
                <td className="py-2 px-2 font-mono text-cyan">{inv.numero}</td>
                <td className="py-2 px-2 text-muted-foreground">{inv.fecha}</td>
                <td className="py-2 px-2 text-foreground truncate max-w-[200px]">{inv.cliente}</td>
                <td className="py-2 px-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan/10 text-cyan">{inv.categoria}</span>
                </td>
                <td className="py-2 px-2 text-right font-mono text-foreground">{formatCurrencyFull(inv.base)}</td>
                <td className="py-2 px-2 text-right font-mono text-orange-accent">{formatCurrencyFull(inv.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ─── Tooltip Components ─── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-mono font-semibold text-cyan">{formatCurrencyFull(payload[0].value)}</p>
    </div>
  );
}

function ParetoTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
      <p className="text-xs text-foreground font-semibold mb-1">#{data.rank} {data.cliente}</p>
      <p className="text-xs text-muted-foreground">Base: {formatCurrencyFull(data.base)}</p>
      <p className="text-xs text-cyan font-mono">Acumulado: {data.cumulative.toFixed(1)}%</p>
    </div>
  );
}
