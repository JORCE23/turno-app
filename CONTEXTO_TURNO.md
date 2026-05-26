# CONTEXTO_TURNO — Archivo de Sesión
> Pega este archivo completo al inicio de cada sesión con Claude.
> Actualiza la sección "ESTADO ACTUAL" después de cada sesión de trabajo.

---

## PROYECTO

**Nombre:** Turno SpA
**Tipo:** SaaS B2B · Business Intelligence Predictivo para restaurantes
**Etapa:** MVP — Fase 1 (Mago de Oz)
**Ubicación:** Concepción, Chile
**Fundador:** [Tu nombre]

---

## QUÉ ES TURNO

NO es un POS ni una caja registradora.
Es un "cerebro estratégico" que se conecta al POS actual del cliente y entrega recomendaciones operativas automáticas.

**Propuesta de valor:**
"Ayudar a locales gastronómicos a ganar más dinero y perder menos por decisiones mal tomadas."

**Canales de entrega:**
- Dashboard web (app.turno.cl)
- Alertas diarias por WhatsApp

---

## STACK TECNOLÓGICO

```
Frontend:   React 18 + Tailwind CSS + React Router v6
Charts:     Chart.js + react-chartjs-2
Icons:      Lucide React
Backend:    FastAPI (Python 3.12)
Data:       Pandas + NumPy
Auth:       LocalStorage MVP → Supabase en Fase 2
Deploy:     Vercel (frontend) + Render.com (backend)
DB Futura:  Supabase (PostgreSQL)
WhatsApp:   Twilio (Fase 2)
Clima:      OpenWeather API (Fase 2)
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
│   └── (routers/, models/ → Fase 2)
│
├── data/
│   ├── ventas_raw.csv                     ✅ COMPLETADO
│   └── dashboard_data.json                ✅ COMPLETADO
│
├── turno_generar_csv.py                   ✅ COMPLETADO
└── turno_procesar.py                      ✅ COMPLETADO
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

### Beta vendible (construir primero)
- [x] Dashboard con KPIs + gráficos
- [x] Alerta diaria WhatsApp (Botón de copiado automático en Dashboard)
- [x] Alertas de stock crítico

### Fase 2 (post primer pago)
- [ ] Radar competencia (scraping Instagram)
- [ ] Pricing dinámico
- [ ] Staffing avanzado
- [ ] Optimización de atmósfera
- [ ] Integración API POS

---

## FLUJO OPERATIVO MVP (MAGO DE OZ)

```
Cliente manda cierre de caja (foto WhatsApp o Google Sheet)
        ↓
Tú corres: python turno_procesar.py
        ↓
Se genera dashboard_data.json
        ↓
Dashboard web se actualiza automáticamente
        ↓
Tú mandas mensaje WhatsApp al cliente (manual por ahora)
```

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

# Regenerar datos demo
python turno_generar_csv.py
python turno_procesar.py

# Deploy frontend
cd frontend && vercel

# Ver API docs
http://localhost:8000/docs
```

---

## COMPETENCIA ANALIZADA

| Competidor | Qué hace | Diferencia con Turno |
|---|---|---|
| FUDO | POS / gestión operativa | FUDO mira adentro, Turno mira adelante |
| TuDelivery by FUDO | Bot IA para clientes finales + delivery | Orientado al cliente final, no al dueño |

**Frase de diferenciación:**
> "FUDO es tu caja. Turno es tu socio estratégico."

---

## ESTADO ACTUAL
> ✏️ Actualiza esta sección al final de cada sesión

**Última sesión:** 25 de mayo de 2026
**Completado hoy:**
- [x] Dashboard MVP HTML (prototipo visual replicado 100% en React)
- [x] Pipeline Python: generar_csv.py + procesar.py → dashboard_data.json
- [x] Web app React: Login, Auth, Sidebar, Dashboard completo, KpiCard
- [x] Backend FastAPI básico sirviendo el JSON
- [x] Análisis competencia FUDO y TuDelivery
- [x] Estrategia go-to-market: flujo de venta + trial 14 días
- [x] Vista Ventas.jsx (gráficos detallados 30 días)
- [x] Vista Stock.jsx (completo con acciones)
- [x] Vista Radar.jsx
- [x] Vista Predicciones.jsx (demanda proyectada)
- [x] Vista Staffing.jsx (brechas de personal)
- [x] Vista Pricing.jsx (ajustes y sensibilidad)
- [x] Vista Alertas.jsx (notificaciones)
- [x] Unificación del repositorio Git (Monorepo)
- [x] Configuración de variables de entorno para API (VITE_API_URL)
- [x] Deploy en Vercel (Frontend)
- [x] Deploy en Render (Backend - Plan Free)
- [x] Conexión Vercel -> Render verificada y enlazada
- [x] Configurar `VITE_API_URL` en Vercel con la URL de Render.
- [x] Probar el flujo "Mago de Oz" en producción (Generar datos locales -> Push a Github -> Ver actualización en Vercel).
- [x] Fix: Timeout de 10s en frontend para manejar "Cold Starts" de Render.

**Próxima sesión — construir:**
- [x] Definir formato del mensaje de Alerta diaria por WhatsApp (para envío manual).
- [ ] Conectar Dominio turno.cl (opcional)

**Decisiones tomadas:**
- Stack: React + Tailwind + FastAPI + Vercel + Render
- Auth MVP: localStorage → Supabase en Fase 2
- Datos MVP: JSON estático generado por Python → API real en Fase 2
- Precio entrada: Plan Pro $65.000 CLP

**Preguntas pendientes del fundador:**
- [ ] ¿Tienes dominio turno.cl ya comprado?
- [ ] ¿Tienes cuenta en Vercel y Render?
- [ ] ¿Primer contacto en Concepción ya identificado?

---

## INSTRUCCIÓN PARA gemenis

Cuando recibas este archivo:
1. Confirma que leíste el contexto con: "Contexto Turno cargado. [ESTADO ACTUAL resumido]. ¿Qué construimos hoy?"
2. Mantén el stack y la paleta de colores definidos
3. Todo código React usa Tailwind (no CSS inline)
4. Nomenclatura en español para labels, inglés para código
5. Prioriza velocidad de entrega sobre perfección técnica
6. Piensa siempre como CTO + fundador de startup
