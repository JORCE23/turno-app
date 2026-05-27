¡Entendido! No borraremos ni una sola coma de todo lo que ya lograste. Lo que haré es tomar tu archivo base, mantener intacta toda la lista de tareas completadas y la estructura, y le **inyectaremos** la nueva fase en la que estamos entrando: la de Machine Learning local, la Analítica Prescriptiva y las APIs (Twilio y OpenWeather).

También actualicé tu nombre en la sección de fundador para que el documento quede 100% oficializado.

Copia este bloque de código y reemplaza todo tu archivo `CONTEXTO_TURNO.md` en Visual Studio Code:

```markdown
# CONTEXTO_TURNO — Archivo de Sesión
> Pega este archivo completo al inicio de cada sesión con tu IA.
> Actualiza la sección "ESTADO ACTUAL" después de cada sesión de trabajo.

---

## PROYECTO

**Nombre:** Turno SpA
**Tipo:** SaaS B2B · Business Intelligence Predictivo para restaurantes
**Etapa:** MVP — Fase 1 (Transición a automatización con APIs reales + ML)
**Ubicación:** Concepción, Chile
**Fundador:** Jorge Ceballos Segura

---

## QUÉ ES TURNO

NO es un POS ni una caja registradora.
Es un "cerebro estratégico" que se conecta al POS actual del cliente y entrega recomendaciones operativas automáticas (Analítica Prescriptiva).

**Propuesta de valor:**
"Ayudar a locales gastronómicos a ganar más dinero y perder menos por decisiones mal tomadas."

**Canales de entrega:**
- Dashboard web (app.turno.cl)
- Alertas automáticas por WhatsApp

---

## STACK TECNOLÓGICO


```

Frontend:   React 18 + Tailwind CSS + React Router v6
Charts:     Chart.js + react-chartjs-2
Icons:      Lucide React
Backend:    FastAPI (Python 3.12)
ML/Data:    scikit-learn + Pandas + NumPy + joblib (Machine Learning Local)
Auth:       LocalStorage MVP → Supabase (Próximamente)
Deploy:     Vercel (frontend) + Render.com (backend)
DB:         Supabase (PostgreSQL - Plan Free)
WhatsApp:   Twilio API (Sandbox / Plan Free)
Clima:      OpenWeather API (Plan Free)

```

---

## IDENTIDAD DE MARCA


```

Paleta:
--accent:   #f97316  (Naranja fuego — principal)
--accent2:  #f59e0b  (Ámbar)
--accent3:  #ea580c  (Naranja oscuro)
--bg:       #080C10
--surface:  #0D1117
--card:     #111820
--border:   #1C2530
--success:  #00C97A
--warning:  #F5A623
--danger:   #FF4560
--muted:    #5A6878
--text:     #E8EDF2

Tipografías:
Headings:  Syne (800)
Body:      DM Sans
Mono:      DM Mono

Referencias visuales: Stripe, Notion, Palantir, Toast

```

---

## ESTRUCTURA DEL PROYECTO


```

turno-app/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                        ✅ COMPLETADO
│       ├── index.css
│       ├── context/
│       │   └── AuthContext.jsx            ✅ COMPLETADO
│       ├── hooks/
│       │   └── useDashboardData.js        ✅ COMPLETADO
│       ├── pages/
│       │   └── Login.jsx                  ✅ COMPLETADO
│       ├── components/
│       │   ├── layout/
│       │   │   └── Sidebar.jsx            ✅ COMPLETADO
│       │   └── ui/
│       │       └── KpiCard.jsx            ✅ COMPLETADO
│       └── views/
│           ├── Dashboard.jsx              ✅ COMPLETADO
│           ├── Ventas.jsx                 ✅ COMPLETADO
│           ├── Predicciones.jsx           ✅ COMPLETADO
│           ├── Staffing.jsx               ✅ COMPLETADO
│           ├── Stock.jsx                  ✅ COMPLETADO
│           ├── Pricing.jsx                ✅ COMPLETADO
│           ├── Radar.jsx                  ✅ COMPLETADO
│           └── Alertas.jsx                ✅ COMPLETADO
│
├── backend/
│   ├── main.py                            ✅ COMPLETADO
│   ├── requirements.txt                   ✅ COMPLETADO
│   └── (routers/, models/)
│
├── data/
│   ├── ventas_raw.csv                     ✅ COMPLETADO
│   ├── dashboard_data.json                ✅ COMPLETADO
│   └── modelo.pkl                         ⏳ PENDIENTE (Modelo ML exportado)
│
├── turno_generar_csv.py                   ✅ COMPLETADO
├── turno_procesar.py                      ✅ COMPLETADO
└── entrenar_modelo.py                     ⏳ PENDIENTE (Script ML)

```

---

## MODELO DE NEGOCIO

| Plan     | Precio CLP | Incluye |
|----------|-----------|---------|
| Starter  | $25.000   | Excel manual + alertas básicas |
| Pro      | $65.000   | WhatsApp diario + staffing + eventos + dashboard |
| Premium  | $120.000  | API POS + multi-sucursal + radar competencia |

**Objetivo actual:** 3 clientes piloto en Concepción (Plaza Perú, Barrio Brasil, San Pedro de la Paz)

---

## FUNCIONALIDADES DEL PRODUCTO

### Beta vendible (Construido / En curso)
- [x] Dashboard con KPIs + gráficos
- [x] Alertas de stock crítico
- [ ] **NUEVO:** API Clima integrada (OpenWeather)
- [ ] **NUEVO:** Alerta automática WhatsApp (Twilio API)
- [ ] **NUEVO:** Motor ML Local + Analítica Prescriptiva (Brecha de Metas)

### Fase 2 (Post primer pago)
- [ ] Base de datos en la nube (Supabase)
- [ ] Radar competencia (scraping Instagram)
- [ ] Pricing dinámico
- [ ] Integración API POS

---

## LÓGICA CORE: ML + ANALÍTICA PRESCRIPTIVA ("Cerebro Estratégico")

El sistema no solo predice (Analítica Predictiva), dice *cómo* llegar a la meta (Analítica Prescriptiva).

**Flujo de Inteligencia (Pipeline):**
1. **Entrenamiento (Offline Local):** Un script `entrenar_modelo.py` usa `scikit-learn` para aprender del historial de ventas y exporta un `modelo.pkl`.
2. **Predicción (En vivo Backend):** FastAPI carga el `modelo.pkl`, consulta el clima real en OpenWeather API y calcula la `Prediccion_Base`.
3. **Prescripción:** Se calcula la `Brecha` (Meta_Usuario - Prediccion_Base). El Motor de Reglas genera recomendaciones operativas según el clima actual para alcanzar la meta.
4. **Acción:** Se envía la alerta estratégica al cliente por Twilio API (WhatsApp).

---

## CREDENCIALES DEMO (MVP local)


```

Admin SaaS:  usuario: admin   | contraseña: admin123
Cliente:     usuario: cliente | contraseña: cliente123

```

---

## COMANDOS ÚTILES

```bash
# Correr backend
cd backend && uvicorn main:app --reload --port 8000

# Correr frontend
cd frontend && npm run dev

# Regenerar datos y entrenar ML
python turno_generar_csv.py
python entrenar_modelo.py
python turno_procesar.py

# Deploy frontend
cd frontend && vercel

```

---

## COMPETENCIA ANALIZADA

| Competidor | Qué hace | Diferencia con Turno |
| --- | --- | --- |
| FUDO | POS / gestión operativa | FUDO mira adentro, Turno mira adelante |
| TuDelivery by FUDO | Bot IA para clientes finales + delivery | Orientado al cliente final, no al dueño |

**Frase de diferenciación:**

> "FUDO es tu caja. Turno es tu socio estratégico."

---

## ESTADO ACTUAL

> ✏️ Actualiza esta sección al final de cada sesión

**Última sesión:** 26 de mayo de 2026
**Completado histórico:**

* [x] Dashboard MVP HTML (prototipo visual replicado 100% en React)
* [x] Pipeline Python: generar_csv.py + procesar.py → dashboard_data.json
* [x] Web app React: Login, Auth, Sidebar, Dashboard completo, KpiCard
* [x] Backend FastAPI básico sirviendo el JSON
* [x] Análisis competencia FUDO y TuDelivery
* [x] Estrategia go-to-market: flujo de venta + trial 14 días
* [x] Vistas: Ventas, Stock, Radar, Predicciones, Staffing, Pricing, Alertas.
* [x] Unificación del repositorio Git (Monorepo)
* [x] Configuración de variables de entorno para API (VITE_API_URL)
* [x] Deploy en Vercel (Frontend) y Render (Backend - Plan Free)
* [x] Conexión Vercel -> Render verificada y enlazada
* [x] Probar el flujo en producción y Fix de Timeout de 10s (Cold Starts).
* [x] Pivote Estratégico: Transición de Mago de Oz a Automatización con APIs reales y Machine Learning.

**Próxima sesión — construir (SPRINT ACTUAL):**

* [x] **Modelo ML:** Crear el script local (`entrenar_modelo.py`) usando scikit-learn y datos simulados/históricos para generar y exportar el modelo predictivo base (`.pkl`).
* [x] **API Clima:** Integrar OpenWeather API (Free Tier) en FastAPI y cargar modelo ML.
* [ ] **Analítica Prescriptiva:** Desarrollar la función de cálculo de `Brecha` cruzada con reglas de negocio en base al clima.
* [ ] **API WhatsApp:** Configurar Twilio Sandbox en FastAPI para disparar las recomendaciones operativas generadas directamente al celular.

**Decisiones tomadas:**

* Stack: React + Tailwind + FastAPI + Vercel + Render
* Inteligencia: Pasar de Analítica Predictiva simple a Prescriptiva (Cálculo de brechas).
* Automatización: Uso exclusivo de capas gratuitas (scikit-learn local, Twilio Sandbox, OpenWeather Free) para no elevar costos del MVP.
* Precio entrada: Plan Pro $65.000 CLP.

---

## INSTRUCCIÓN PARA GEMINI

Cuando recibas este archivo:

1. Confirma que leíste el contexto con: "Contexto Turno cargado. [ESTADO ACTUAL resumido]. ¿Qué construimos hoy?"
2. Mantén el stack y la paleta de colores definidos
3. Todo código React usa Tailwind (no CSS inline)
4. Nomenclatura en español para labels, inglés para código
5. Prioriza velocidad de entrega y uso de Free Tiers (APIs y herramientas open source).
6. Piensa siempre como CTO + fundador de startup + Senior Data Engineer: asegura que el modelo ML esté modularizado (entrenado localmente) para no saturar el servidor en producción.

```

---


```