# Contributing to Circlo (सर्कलो) 🌍⚡

Thank you for your interest in contributing to **Circlo**! Circlo is an open-source decentralized e-waste formalization platform bridging informal grassroots collectors (*kabadiwalas*), urban households, and certified recyclers using **AWS Open Source tooling** (AWS Cedar & OpenSearch).

Whether you are fixing a typo, adding regional Indian languages, expanding Cedar safety policies, or integrating real open data feeds, your contributions make a direct impact.

---

## 🧭 Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to `sachinsingh13112004@gmail.com`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, Vite, Framer Motion, Leaflet.js, Lucide Icons, Space Grotesk kinetic typography.
- **Security & Authorization**: [AWS Cedar Policy Engine](https://www.cedarpolicy.com/) (`aws/cedar/policies.cedar`).
- **Geospatial & Search Engine**: [OpenSearch](https://opensearch.org/) (`aws/opensearch/mappings.json`).
- **Cloud & Emulation**: LocalStack, Finch / Docker Compose (`aws/localstack/docker-compose.yml`).
- **Testing & Quality**: Playwright End-to-End Suite (`tests/e2e.spec.js`), Oxlint.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Docker** *(Optional, for running local OpenSearch & LocalStack)*: Docker Desktop / Finch

### 1. Fork & Clone
```bash
git clone https://github.com/sachinn-alt/Circlo.git
cd Circlo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Automated E2E Tests
We maintain 100% test coverage across all tabs and interactive modals:
```bash
# Run headless test suite
npx playwright test

# Or run interactive UI mode
npm run test:ui
```

### 5. Run the End-to-End Simulation Pipeline
```bash
npm run simulate
```

---

## 🎯 Contribution Tracks

### 🌐 Track A: Localization & Accessibility
Help bridge the digital divide for informal scrap workers by adding regional Indian languages (Bengali, Tamil, Telugu, Marathi, Kannada):
- Translations are managed in `src/translations/` or components via localization hooks.
- Mobile touch accessibility: Ensure touch targets remain $\ge 44\text{px}$ and zero horizontal scrolling (`scrollWidth == clientWidth`).

### 🛡️ Track B: AWS Cedar Policy Engine
Help protect informal recyclers and prevent price gouging:
- Inspect `aws/cedar/policies.cedar` and `aws/cedar/schema.cedarschema`.
- Propose new policies (e.g., maximum travel radius for informal collectors, mandatory chemical neutralizers for lead-acid batteries, formal EPR certificate minting validation).
- Use Cedar CLI to test policies: `cedar authorize --policies aws/cedar/policies.cedar ...`

### 🗺️ Track C: OpenSearch & Real Recycler Datasets
- Enhance geospatial indexing in `aws/opensearch/mappings.json`.
- Add ingest scrapers for Central Pollution Control Board (CPCB) registered dismantlers.
- Integrate OpenStreetMap (OSM) Overpass API queries for community recycling hubs.

### 📷 Track D: E-Waste Vision & Spectrometer Models
- Extend device classification presets in `src/components/ScannerTab.jsx`.
- Contribute labeled e-waste component datasets (lithium-ion batteries, transformers, circuit boards) or ONNX / TensorFlow.js models.

---

## 🌿 Contribution Workflow

### 1. Create a Topic Branch
```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Follow Conventional Commits
We follow standard Conventional Commit conventions:
- `feat: add Bengali language localization`
- `fix: resolve mobile layout overflow on small screens`
- `docs: update AWS Cedar policy tutorial`
- `test: add Playwright test for pickup modal flow`
- `ci: configure GitHub Actions deployment workflow`

### 3. Verify Code Quality & Tests
Before opening a Pull Request, ensure tests and linters pass:
```bash
npm run lint
npx playwright test
```

### 4. Open a Pull Request
1. Push your branch to your GitHub fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request against the `main` branch of `sachinn-alt/Circlo`.
3. Provide a clear summary of changes, screenshots/screen recordings for UI changes, and linked issues.

---

## ❓ Need Help?
- Open an issue on GitHub.
- Reach out via GitHub Discussions.
- Maintainer: Sachin Kumar Singh ([@sachinn-alt](https://github.com/sachinn-alt)).
