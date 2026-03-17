# Brainstorm de Diseño - Dashboard AV Sistemas

## Contexto
Dashboard de inteligencia de facturación para Danny de AV Sistemas Audiovisuales (Valladolid). Empresa de alquiler de medios audiovisuales con ~1.300 clientes, ~393 facturas en 2025. Necesita causar un efecto "guau" mostrando datos que nunca ha visto de su negocio.

---

<response>
<idea>

## Idea 1: "Control Room" - Estética de Centro de Control Audiovisual

**Design Movement**: Inspirado en las consolas de control de producción audiovisual y salas de mezclas. Dark UI con acentos neón que recuerdan a los VU meters y paneles LED.

**Core Principles**:
1. Dark-first con acentos de color vibrantes (como una mesa de mezclas)
2. Información densa pero organizada en "módulos" como un rack de equipos
3. Datos en tiempo real con animaciones que recuerdan medidores de audio
4. Jerarquía visual clara con tipografía técnica

**Color Philosophy**: Fondo oscuro (casi negro azulado) con acentos en cian eléctrico y naranja cálido. El cian representa la tecnología y precisión, el naranja la energía del sector de eventos. Gradientes sutiles que recuerdan a las luces de escenario.

**Layout Paradigm**: Grid modular asimétrico que recuerda a un panel de control. Sidebar izquierdo estrecho con navegación tipo rack. Área principal con cards de diferentes tamaños como módulos de una consola.

**Signature Elements**:
1. Barras de progreso animadas tipo VU meter para métricas
2. Bordes con glow sutil en cian para las cards activas
3. Números grandes con fuente monoespaciada tipo display digital

**Interaction Philosophy**: Hover effects que "iluminan" las cards como botones de una consola. Transiciones suaves que recuerdan el fade de luces.

**Animation**: Números que cuentan hacia arriba al cargar (count-up). Gráficos que se dibujan progresivamente. Glow pulsante sutil en elementos activos.

**Typography System**: Space Grotesk para headings (técnica, moderna), Inter para body text. Números en JetBrains Mono para datos financieros.

</idea>
<text>Un dashboard oscuro inspirado en consolas de producción audiovisual, con acentos neón y animaciones tipo VU meter. Conecta directamente con el mundo de Danny.</text>
<probability>0.08</probability>
</response>

<response>
<idea>

## Idea 2: "Blueprint" - Estética de Plano Técnico Premium

**Design Movement**: Swiss Design meets Technical Drawing. Limpio, preciso, con la elegancia de un plano técnico de alta gama. Fondo claro con líneas de cuadrícula sutiles.

**Core Principles**:
1. Precisión y claridad como un plano técnico profesional
2. Uso del espacio negativo como elemento de diseño
3. Tipografía como protagonista con jerarquía estricta
4. Color mínimo pero impactante en puntos clave

**Color Philosophy**: Base blanca con gris grafito para texto. Un único color de acento: azul eléctrico profundo (#1a56db) para datos clave y CTAs. Rojo coral solo para alertas. La restricción cromática comunica profesionalismo y seriedad.

**Layout Paradigm**: Layout de periódico financiero con columnas asimétricas. Header compacto, contenido organizado en secciones con separadores finos. Sidebar derecho con resumen ejecutivo.

**Signature Elements**:
1. Líneas de cuadrícula sutiles en el fondo (como papel milimetrado)
2. Badges con bordes finos y esquinas rectas para categorías
3. Separadores con puntos (dot leaders) entre labels y valores

**Interaction Philosophy**: Micro-animaciones precisas. Hover que revela datos adicionales con elegancia. Tooltips informativos con datos contextuales.

**Animation**: Transiciones de entrada tipo "reveal" de izquierda a derecha. Gráficos que se construyen con líneas precisas. Números que se "escriben" como en una máquina de escribir.

**Typography System**: Instrument Serif para títulos (elegante, editorial), DM Sans para body. Tabular nums en IBM Plex Mono para cifras financieras.

</idea>
<text>Un dashboard minimalista inspirado en planos técnicos y diseño suizo, con precisión tipográfica y un solo color de acento. Comunica profesionalismo absoluto.</text>
<probability>0.06</probability>
</response>

<response>
<idea>

## Idea 3: "Backstage" - Estética Industrial Premium

**Design Movement**: Industrial Luxe - La elegancia del backstage de un gran evento. Texturas oscuras con detalles dorados, como el contraste entre el backstage técnico y el escenario glamuroso.

**Core Principles**:
1. Contraste entre lo técnico (datos) y lo premium (presentación)
2. Profundidad visual con capas y sombras dramáticas
3. Detalles dorados/ámbar que elevan la percepción de valor
4. Estructura robusta como un truss de escenario

**Color Philosophy**: Fondo en gris carbón profundo (#0f1117) con superficies en gris oscuro (#1a1d27). Acento principal en ámbar/dorado (#f59e0b) que evoca las luces cálidas de escenario. Acento secundario en esmeralda (#10b981) para datos positivos. El dorado comunica valor y premium.

**Layout Paradigm**: Full-width con secciones apiladas tipo "actos" de un evento. Hero section con KPIs gigantes. Secciones con bordes laterales dorados como cortinas de escenario. Grid de 12 columnas con variaciones dramáticas.

**Signature Elements**:
1. Bordes laterales dorados en secciones clave (como cortinas de escenario)
2. Iconografía personalizada con trazos finos en dorado
3. Cards con efecto "glass" sutil y bordes brillantes

**Interaction Philosophy**: Hover con efecto de "spotlight" - como un foco que ilumina el elemento. Click con feedback visual tipo flash. Scroll con parallax sutil.

**Animation**: Entrada con fade-up escalonado (como telones que se levantan). Counters animados con easing dramático. Gráficos con animación de "revelación" tipo cortina.

**Typography System**: Sora para headings (geométrica, moderna, con personalidad), Inter para body. Cifras en Space Mono para datos financieros.

</idea>
<text>Un dashboard oscuro con detalles dorados inspirado en el backstage premium de grandes eventos. Combina lo técnico con lo glamuroso del sector audiovisual.</text>
<probability>0.07</probability>
</response>

---

## Decisión

**Elijo la Idea 1: "Control Room"** - Es la que más conecta directamente con el mundo de Danny (audiovisuales, consolas, producción). El dark UI con acentos neón es visualmente impactante y diferente a cualquier dashboard genérico. Los elementos tipo VU meter y la estética de sala de control harán que Danny se sienta inmediatamente identificado con la herramienta.
