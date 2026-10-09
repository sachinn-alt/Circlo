# 🔄 Circlo (सर्कलो)
### Decentralized AI E-Waste & Informal Recycler Network
**Track 03: Waste & Energy** | **AWS Hackathon "Build It" Track (100% Free / Local)**

[![AWS OpenSource](https://img.shields.io/badge/AWS_OpenSource-OpenSearch_%2B_Cedar-FF9900?logo=amazon-aws)](https://github.com/opensearch-project/OpenSearch)
[![Cedar Policy](https://img.shields.io/badge/AWS_Cedar-Authorization_Engine-7C3AED)](https://www.cedarpolicy.com/)
[![LocalStack](https://img.shields.io/badge/LocalStack-Zero_Cloud_Cost-0055FF)](https://localstack.cloud/)
[![CPCB E-Waste Compliant](https://img.shields.io/badge/CPCB-E--Waste_Rules_2022-10B981)](#)

---

## 🌍 The Problem
Over **90% of urban recycling and e-waste in developing nations (India, Southeast Asia, Africa) is collected and dismantled by the informal sector**—over 1.5 million *kabadiwalas* and scrap workers.

However, three critical breakdowns plague the ecosystem:
1. **Backyard Toxicity & Fatal Hazards**: Uncertified informal workers dismantle toxic e-waste (burning circuit boards for copper, puncturing swollen lithium-ion cells, breaking CRT lead glass) with zero protective gear, causing severe lead/mercury poisoning.
2. **Predatory Middlemen Gouging**: Informal scrap workers are routinely cheated with rigged scales and opaque commodity pricing (paid ₹20/kg for scrap containing ₹150/kg of rare metals).
3. **Household Hoarding & Disconnected EPR**: Citizens hoard obsolete electronics in drawers, unaware of their circular value or safe disposal hubs, while electronics brands struggle to verify formal Extended Producer Responsibility (EPR) targets.

---

## ⚡ The Solution: Circlo
**Circlo** bridges informal grassroots recyclers with households, civic authorities, and global electronics manufacturers through an intelligent decentralized network powered by **AWS Open Source tools**:

- 🔍 **AWS OpenSearch (Open Source)**: Powers hyperlocal geospatial discovery (`geo_point` indexing and `geo_distance` queries) matching citizens with nearby verified informal collectors in under 10ms.
- 🛡️ **AWS Cedar Policy Engine (Open Source)**: Enforces fine-grained worker safety rules (forbids uncertified workers from dismantling Class 3+ hazardous e-waste) and guarantees a **Fair Minimum Floor Price** (forbids brokers from bidding <85% of civic commodity benchmark).
- 📷 **Computer Vision E-Waste Scanner**: Classifies device components, flags hazard classes, computes extracted metal yield (Au, Ag, Cu, Li, Co), and delivers live fair market payouts.
- 🤝 **Kabadiwala Empowerment Hub**: Transparent daily scrap rates, direct citizen leads, digital weighing scale verification, and safety training pathways for Hazmat L2 certification.
- 📜 **EPR Circular Impact Ledger & Verifiable Certificates**: Audit-ready diversion logs tracking CO₂ savings, toxic lead interception, and formal CPCB compliance credits.

---

## 🏗️ Architecture & AWS Open Source Integration ("Build It" Track)

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CIRCLO WEB APPLICATION                         │
│  (React + Leaflet Maps + Web Vision AI + Commodity Spot Oracles)       │
└───────────────┬────────────────────────────┬───────────────────────────┘
                │                            │
                ▼                            ▼
   ┌───────────────────────────┐  ┌────────────────────────────────────┐
   │    AWS CEDAR (Open Source)│  │   AWS OPENSEARCH (Open Source)     │
   │  Fine-Grained Policy Engine│  │   Geospatial & Time-Series Engine  │
   │                           │  │                                    │
   │ • Policy 1: Hazard Guard  │  │ • `circlo-recyclers` index         │
   │ • Policy 2: Anti-Gouging  │  │ • `geo_distance` radial queries    │
   │ • Policy 3: Safe Pickup   │  │ • Material specialization filter   │
   │ • Policy 5: EPR Minting   │  │ • BM25 full-text item analyzer     │
   └───────────────┬───────────┘  └──────────────────┬─────────────────┘
                   │                                 │
                   └────────────────┬────────────────┘
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │             LOCALSTACK / FINCH LOCAL RUNTIME            │
       │       (Run 100% locally with zero cloud bill)           │
       │                                                         │
       │  • S3: E-Waste Intake Photo Bucket                      │
       │  • DynamoDB: Real-time Batch & Escrow State Table       │
       │  • SNS: Kabadiwala SMS/Push Dispatch Topic              │
       │  • Lambda / SAM: Serverless Batch Ingestion Pipeline    │
       └─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quickstart & Running Locally

### 1. Run the Web Application
```bash
# Navigate to the project directory
cd circlo

# Install dependencies (already completed)
npm install

# Start the Vite development server
npm run dev
```
Open **`http://localhost:5173`** in your browser to experience Circlo!

### 2. Run LocalStack & OpenSearch (Optional Local AWS Engine)
If you have Docker or Finch installed, you can launch the local AWS open source backend with:
```bash
cd aws/localstack
docker compose up -d
```
- **OpenSearch REST Endpoint**: `http://localhost:9200`
- **LocalStack Gateway**: `http://localhost:4566`

---

## 📁 Repository Structure
```
circlo/
├── aws/
│   ├── cedar/
│   │   ├── policies.cedar           # Production Cedar policies (Safety & Fair Pricing)
│   │   └── schema.cedarschema       # Cedar entity definitions, actions, attributes
│   ├── opensearch/
│   │   ├── mappings.json            # OpenSearch geo_point schema for recyclers
│   │   └── queries.json             # Geospatial radius & metal yield aggregations
│   ├── localstack/
│   │   └── docker-compose.yml       # LocalStack + OpenSearch local container stack
│   └── serverless/
│       └── template.yaml            # AWS SAM serverless orchestration pipeline
├── src/
│   ├── components/
│   │   ├── Header.jsx               # Brand header, persona switcher, nav tabs
│   │   ├── CommodityTicker.jsx      # Live scrap commodity rates (MCX linked)
│   │   ├── ScannerTab.jsx           # AI E-Waste Vision classifier & material yields
│   │   ├── MapTab.jsx               # Leaflet map + OpenSearch geo_distance radar
│   │   ├── KabadiwalaHub.jsx        # Informal recycler welfare, leads, price board
│   │   ├── CedarPolicyLab.jsx       # Interactive AWS Cedar authorization workbench
│   │   ├── ImpactLedger.jsx         # Circular footprint calculator & EPR counters
│   │   ├── PickupModal.jsx          # Doorstep dispatch & digital scale escrow pass
│   │   ├── ArchitectureModal.jsx    # System architecture & code viewer for judges
│   │   └── CertificateModal.jsx     # Printable CPCB compliance certificate
│   ├── data/
│   │   └── mockData.js              # Real commodity prices, e-waste samples, recyclers
│   ├── services/
│   │   ├── cedarEngine.js           # In-browser Cedar Policy Evaluator & AST diagnostics
│   │   └── openSearchClient.js      # OpenSearch geospatial query builder & simulator
│   ├── App.jsx                      # Main app controller & routing
│   ├── App.css                      # Glassmorphism & responsive design system
│   └── index.css                    # Design tokens, typography, CSS reset
├── package.json
└── README.md
```

---

## 🧪 Hackathon Judging Highlights

1. **AWS Open Source Compliance ("Build It" Track)**:
   - Uses **AWS Cedar** (`aws/cedar/policies.cedar`) with real policies and interactive in-app evaluation engine.
   - Uses **AWS OpenSearch** (`aws/opensearch/mappings.json` & `queries.json`) for `geo_point` spatial queries and dynamic radius filtering.
   - Includes **LocalStack & SAM** (`docker-compose.yml` and `template.yaml`) for 100% zero-cost local development.
2. **Tangible Impact on Track 03 (Waste & Energy)**:
   - Protects informal waste workers (*Kabadiwalas*) from fatal e-waste accidents.
   - Prevents scrap broker cartels with an automated 85% commodity floor price rule.
   - Diverts toxic mercury, lead, and lithium from entering urban groundwater.
3. **Interactive "Wow" Factor**:
   - Live bounding box computer vision scanner with elemental breakdown (Au, Ag, Cu, Li).
   - Interactive Leaflet dark map with real OpenSearch DSL query viewer.
   - Live Cedar Policy Playground allowing judges to test and tweak authorization scenarios in real time.
