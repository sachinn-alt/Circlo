# 🏛️ Architecture & System Design Document — Circlo
**System Architecture:** Hybrid Decentralized Event-Driven Architecture  
**Target Runtimes:** LocalStack (Local Zero-Cost) & AWS Cloud (Production)  
**Security Standard:** AWS Well-Architected Framework (Sustainability & Security Pillars)  

---

## 1. C4 Architecture Specification

### 1.1 Context Diagram (Level 1)
```mermaid
C4Context
    title System Context Diagram for Circlo E-Waste Network

    Person(citizen, "Urban Citizen", "Household user disposing of electronic scrap")
    Person(kabadiwala, "Informal Recycler", "Ground collector seeking fair rates & pickups")
    Person(brand, "EPR Corporate Brand", "OEM buying compliance recycling credits")
    System(circlo, "Circlo Platform", "AI E-Waste intake, OpenSearch geo-radar, Cedar policy guard")

    System_Ext(mcx, "Commodity Spot Oracle", "Live MCX/LME copper, aluminum & precious metal rates")
    System_Ext(cpcb, "CPCB EPR Portal", "National pollution control board compliance registry")
    System_Ext(sms, "Civic SMS / WhatsApp Gateway", "Dispatches OTP handover & alerts to workers")

    Rel(citizen, circlo, "Uploads scrap photos, views valuation, schedules pickups")
    Rel(kabadiwala, circlo, "Accepts nearby leads, tracks daily floor rates, verifies weights")
    Rel(brand, circlo, "Audits batch custody, mints certified EPR carbon credits")
    Rel(circlo, mcx, "Fetches spot rates for benchmark calculation")
    Rel(circlo, cpcb, "Syncs batch hashes for regulatory compliance")
    Rel(circlo, sms, "Sends dispatch alerts & OTPs to feature phones")
```

---

### 1.2 Container Diagram (Level 2)
```mermaid
C4Container
    title Container Diagram for Circlo

    Container(spa, "Single Page App", "React, Leaflet, Vanilla CSS", "User dashboard, interactive scanner, map, Cedar lab")
    
    Container(api_gateway, "API Gateway / Envoy", "HTTP/REST", "Routes traffic, rate limiting, JWT validation")

    Container(lambda_scan, "Intake & Vision Service", "Python 3.11 / Lambda", "Image normalization, AI spectrometry, hazard grading")
    Container(lambda_cedar, "Cedar Policy Engine", "Rust / Wasm / Verified Permissions", "Zero-trust policy validation against policies.cedar")
    Container(lambda_geo, "Geo-Dispatch Service", "Python 3.11 / Lambda", "Executes OpenSearch spatial queries and nearest-neighbor matching")

    ContainerDb(opensearch, "AWS OpenSearch Cluster", "OpenSearch 2.11", "Geospatial indexing (geo_point), text search, and metrics aggregation")
    ContainerDb(dynamo, "Amazon DynamoDB", "Single-Table NoSQL", "Scrap batches, escrow status, collector KYC records")
    ContainerDb(s3, "S3 Object Store", "S3 Bucket", "Encrypted raw and bounding-box annotated e-waste photos")

    Rel(spa, api_gateway, "API calls via HTTPS")
    Rel(api_gateway, lambda_scan, "Invokes photo processing")
    Rel(api_gateway, lambda_cedar, "Invokes policy evaluations")
    Rel(api_gateway, lambda_geo, "Invokes geospatial queries")
    Rel(lambda_scan, s3, "Stores images")
    Rel(lambda_scan, dynamo, "Writes batch state")
    Rel(lambda_geo, opensearch, "Queries geo_distance")
    Rel(lambda_cedar, dynamo, "Validates principal credentials")
```

---

## 2. End-to-End Sequence Diagram: Lifecycle of an E-Waste Batch

```mermaid
sequenceDiagram
    autonumber
    actor Citizen as Citizen / Household
    participant UI as Circlo Web UI
    participant Vision as AI Vision Engine
    participant Cedar as AWS Cedar Engine
    participant OS as AWS OpenSearch
    actor Collector as Informal Kabadiwala
    participant Escrow as Digital Escrow
    actor Brand as Corporate Brand (EPR)

    Citizen->>UI: Snaps photo of swollen laptop battery
    UI->>Vision: Ingests photo & analyzes features
    Vision-->>UI: Output: Li-Ion Battery, Hazard Level 4, 48g LiCoO2, Est: ₹215
    
    Citizen->>UI: Clicks "Find Verified Recycler"
    UI->>OS: POST /circlo-recyclers/_search (lat, lon, radius=8km, cert=HAZMAT_L2)
    OS-->>UI: Returns 2 nearby certified collectors (Aarti Devi, EcoMetals)

    Citizen->>UI: Selects "Aarti Devi (Solar Trike)" & clicks Dispatch
    UI->>Cedar: Evaluates Policy 1 & Policy 3 (dismantle vs transportToHub)
    Cedar-->>UI: ALLOW (Aarti holds HAZMAT_EWASTE_L2 badge)

    UI->>Collector: Dispatches SMS lead with address & OTP token
    Collector->>Citizen: Arrives in Solar Trike with calibrated scale
    Citizen->>Collector: Weighs batch (1.8 kg) & enters OTP: 7492
    Collector->>Escrow: Confirms digital scale verification
    Escrow-->>Collector: Instant UPI transfer to collector wallet (₹387)

    Collector->>Brand: Batch delivered to formal R2 hydrometallurgical hub
    Brand->>Cedar: Evaluates Policy 5 (mintEprCredit)
    Cedar-->>Brand: ALLOW (Custody chain verified, worker payout confirmed)
    Brand->>UI: Mints verified CPCB Circular Stewardship Certificate
```

---

## 3. Deep Dive: AWS OpenSearch Geospatial Subsystem

### 3.1 Spatial Indexing Architecture
1. **Coordinate Projection:** WGS 84 coordinate system (`EPSG:4326`) indexed into OpenSearch via `geo_point` fields.
2. **Spatial Data Structure:** OpenSearch utilizes **BKD-trees (Block Krylov Distance trees)** under Lucene for sub-millisecond range and radius traversals.
3. **Haversine Distance Metric:** Arc distance type (`arc`) calculated over the spherical earth model to deliver exact metric distance in kilometers.

### 3.2 Dynamic Spatial Clustering & Ward Aggregations
OpenSearch performs real-time geo-hash grid aggregation to show municipal authorities where e-waste recovery density is highest:
```json
{
  "aggs": {
    "zones": {
      "geohash_grid": {
        "field": "location",
        "precision": 6
      },
      "aggs": {
        "total_gold_grams": {
          "sum": { "field": "recovered_gold_g" }
        }
      }
    }
  }
}
```

---

## 4. Deep Dive: AWS Cedar Policy Engine Subsystem

```mermaid
graph LR
    Request["Authorization Request<br/>(Principal, Action, Resource, Context)"] --> Parser["Cedar AST Parser"]
    Parser --> ForbidEvaluator["Forbid Policy Evaluator<br/>(Policy 1, Policy 2)"]
    
    ForbidEvaluator -->|Any Match| DenyOutcome["Outcome: DENY<br/>(Forbid Overrides Permit)"]
    ForbidEvaluator -->|No Match| PermitEvaluator["Permit Policy Evaluator<br/>(Policy 3, Policy 4, Policy 5)"]
    
    PermitEvaluator -->|Match Found| AllowOutcome["Outcome: ALLOW"]
    PermitEvaluator -->|No Match| DefaultDeny["Outcome: DENY<br/>(Default Deny Guard)"]
```

### 4.1 Strict Cedar Security Invariants
1. **Default Deny:** Unless an explicit `permit` policy evaluates to `true`, authorization is denied.
2. **Forbid Precedence:** A single matching `forbid` statement immediately terminates authorization in `DENY`, regardless of any `permit` rules.
3. **Formal Verification:** Cedar policies are mathematically verifiable using automated reasoning (SMT solvers) to prove absence of security regressions.

---

## 5. Privacy, PII & Data Protection

- **Spatial Obfuscation:** Citizen home coordinates are fuzzed by $\pm 250\text{ meters}$ during public search queries until a pickup lead is officially accepted by a KYC-verified collector.
- **Phone Masking:** Resident contact numbers are never exposed in plaintext; SMS and call relays occur through automated virtual numbers.
- **Audit Immutability:** Every scrap batch creation and handover is cryptographically signed with SHA-256 hashes containing `(citizen_id, batch_id, weight_kg, timestamp)`.
