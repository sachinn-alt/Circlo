# GSD Project Manifest — Circlo (सर्कलो)

## 🎯 1. Project Core
- **Project Name:** Circlo (सर्कलो)
- **Tagline:** Decentralized AI E-Waste & Informal Recycler Network
- **Track:** Track 03: Waste & Energy | Bharat Builds Tour / WeMakeDevs Environmental Hacks
- **Target Category:** "Build It" (100% Free / Local Open Source Track)
- **Status:** Active (Production Prototype Completed)
- **Repository:** `C:\Users\DELL\.gemini\antigravity-ide\scratch\circlo`

---

## 🌍 2. Problem Statement & Impact
- **Problem:** Over 90% of urban recycling in India is handled by 1.5M+ informal workers (*kabadiwalas*). Today, high-hazard e-waste (Li-ion batteries, PCBs, CRTs) is burned over open fires in slums, causing toxic lead/mercury poisoning and groundwater contamination, while workers are shortchanged by scrap cartels.
- **Solution:** A decentralized civic platform using:
  1. Multimodal Computer Vision to classify e-waste, flag hazards, and value precious metals.
  2. AWS OpenSearch geospatial index (`geo_point`) to match households with nearby verified collectors.
  3. AWS Cedar zero-trust policy engine to forbid toxic backyard burns and enforce an 85% commodity floor price.
  4. Digital scale escrow & Extended Producer Responsibility (EPR) compliance ledger.

---

## 🛠️ 3. Technology Stack & AWS Open Source Integration
- **Frontend / Client:** React 18, Vite 8, Vanilla CSS (Dark Obsidian Theme), Leaflet GIS, Canvas Confetti.
- **AWS Open Source Engines ("Build It"):**
  - **AWS Cedar:** Declarative zero-trust authorization (`policies.cedar`, `schema.cedarschema`).
  - **AWS OpenSearch:** Geospatial indexing (`mappings.json`, `queries.json`).
  - **LocalStack & Finch:** Local AWS S3, DynamoDB, Lambda, SNS container runtime (`docker-compose.yml`).
  - **AWS SAM CLI:** Serverless Application Model pipeline (`template.yaml`).

---

## 📋 4. Primary Deliverables
1. **Interactive Web Application:** Live on `http://localhost:5173/` in Dark Obsidian Black theme matching WeMakeDevs AWS Env.
2. **Interactive Policy Workbench:** Live Cedar authorization playground testing 4 scenarios.
3. **OpenSearch Civic Radar:** Hyperlocal map with real-time DSL query inspection.
4. **Automated Test CLI:** `npm run simulate` running full 5-step pipeline.
5. **Enterprise Documentation:** PRD, TRD, System Design, Multi-Agent LLM, Monitoring, Pitch Script.
