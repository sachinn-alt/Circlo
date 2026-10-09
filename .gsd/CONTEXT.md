# 🧠 GSD Architectural Context & Key Decisions — Circlo

## 1. Architectural Decisions (ADRs)

### ADR-01: Why AWS Cedar instead of application if-else checks?
- **Decision:** Use AWS Cedar declarative policy engine (`policies.cedar`).
- **Rationale:** If-else checks scatter authorization logic across controllers, risking bypass bugs. Cedar centralizes safety policies with default-deny semantics and mathematically guaranteed forbid precedence.

### ADR-02: Why OpenSearch `geo_point` over Relational Haversine math?
- **Decision:** Index coordinates into OpenSearch BKD-tree spatial indices.
- **Rationale:** BKD-tree spatial indexing allows sub-10ms bounding box and radius queries across millions of collector pins while enabling concurrent full-text filtering on scrap certifications.

### ADR-03: Zero-Cost "Build It" Local Architecture vs Cloud "Ship It"
- **Decision:** Provide dual runtimes: LocalStack + Finch for zero AWS costs, plus production SAM templates for AWS Cloud.
- **Rationale:** Ensures 100% eligibility under the hackathon's "Build It" track (no card, no bill), while leaving an effortless path to production deployment.

### ADR-04: Dark Obsidian Black Theme & WeMakeDevs Layout
- **Decision:** Align visual identity with the official WeMakeDevs AWS Env hackathon portal using pure obsidian `#000000` with emerald `#10b981` accents.
- **Rationale:** Maximizes judge resonance, gives a retro-clean industrial aesthetic, and immediately feels native to the Bharat Builds Tour brand.
