---
name: 🛡️ Propose Cedar Policy
about: Propose a new safety, anti-gouging, or EPR compliance policy in AWS Cedar
title: '[CEDAR] '
labels: ['cedar-policy', 'security']
assignees: ''
---

**Policy Objective**
What safety hazard, worker protection, or fair-pricing rule does this policy enforce? (e.g., *Mandatory neutralization equipment for sulfuric acid handling in lead-acid battery dismantling*).

**Target Entities**
- **Principal**: `Circlo::Actor::"..."` (e.g. `Collector`, `HouseholdUser`, `EnterpriseDismantler`)
- **Action**: `Circlo::Action::"..."` (e.g. `Dismantle`, `BidPrice`, `MintEprCertificate`)
- **Resource**: `Circlo::Device::"..."` or `Circlo::Batch::"..."`

**Proposed Cedar Code**
```cedar
// Paste your proposed Cedar policy below
permit (
    principal is Circlo::Actor::Collector,
    action == Circlo::Action::Dismantle,
    resource is Circlo::Device::Batch
)
when {
    // Conditions here
};
```

**Regulatory / Safety Justification**
Reference Central Pollution Control Board (CPCB) rules, Basel Convention guidelines, or OSHA/Hazmat standards supporting this policy.
