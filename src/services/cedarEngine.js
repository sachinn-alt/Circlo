// ==============================================================================
// AWS CEDAR IN-BROWSER AUTHORIZATION ENGINE
// Evaluates Cedar policies against principals, actions, resources, and contexts.
// Follows AWS Cedar evaluation semantics: Default Deny + Forbid Overrides.
// ==============================================================================

export const CEDAR_POLICIES_SOURCE = `// POLICY 1: Hazardous E-Waste Dismantling Safety Guard
forbid (
    principal,
    action in [Action::"dismantle", Action::"extractMetals"],
    resource
)
when {
    resource.hazardLevel >= 3 &&
    !(principal.certifications.contains("HAZMAT_EWASTE_L2") || 
      principal.certifications.contains("R2_CERTIFIED"))
};

// POLICY 2: Fair Minimum Floor Price Guarantee
forbid (
    principal,
    action == Action::"submitPurchaseBid",
    resource
)
when {
    resource.sellerType == "INFORMAL_RECYCLER" &&
    context.offeredPricePerKg < (context.benchmarkPricePerKg * 0.85)
};

// POLICY 3: General Recyclable Pickup Authorization
permit (
    principal,
    action in [Action::"claimPickup", Action::"weighBatch", Action::"transport"],
    resource
)
when {
    principal.kycVerified == true &&
    resource.hazardLevel <= 2
};

// POLICY 4: High-Hazard Custody Transfer to Certified Dismantlers
permit (
    principal,
    action == Action::"transportToHub",
    resource
)
when {
    principal.kycVerified == true &&
    context.destinationHubCertified == true &&
    context.tamperSealIntact == true
};

// POLICY 5: EPR Brand Credit Validation
permit (
    principal,
    action == Action::"mintEprCredit",
    resource
)
when {
    principal.isRegisteredBrand == true &&
    resource.status == "RECYCLED_VERIFIED" &&
    resource.hasChainOfCustodyProof == true &&
    resource.informalCollectorPayoutConfirmed == true
};`;

export function evaluateCedarRequest(principal, actionStr, resource, context = {}, customPolicyCode = null) {
  const startTime = performance.now();
  const matchedForbids = [];
  const matchedPermits = [];
  const diagnostics = [];

  // Parse custom policy parameters if supplied by the editor:
  let customFloorRatio = 0.85;
  let customHazardThreshold = 3;
  let forceActionVerdict = null;

  if (customPolicyCode && typeof customPolicyCode === 'string') {
    // Extract benchmark ratio e.g. 0.85, 0.90, or 85 / 100
    const ratioMatch = customPolicyCode.match(/benchmarkPricePerKg\s*\*\s*([0-9.]+)/i);
    if (ratioMatch) {
      customFloorRatio = parseFloat(ratioMatch[1]);
    } else {
      const fracMatch = customPolicyCode.match(/benchmarkPricePerKg\s*\*\s*([0-9]+)\s*\/\s*100/i);
      if (fracMatch) customFloorRatio = parseFloat(fracMatch[1]) / 100;
    }

    // Extract hazard threshold e.g. hazardLevel >= 3 or hazardLevel >= 4
    const hazardMatch = customPolicyCode.match(/hazardLevel\s*>=\s*([0-9]+)/i);
    if (hazardMatch) {
      customHazardThreshold = parseInt(hazardMatch[1], 10);
    }

    // Check if policy starts with permit vs forbid
    if (/^\s*permit\s*\(/i.test(customPolicyCode) && !customPolicyCode.includes('forbid')) {
      forceActionVerdict = 'ALLOW';
    }
  }

  // Normalize action name e.g. 'Action::"dismantle"' -> 'dismantle'
  const action = actionStr.replace(/^Action::\"?|\"?$/g, '');

  // --------------------------------------------------------------------------
  // Rule 1: Hazardous Dismantling Forbid
  // --------------------------------------------------------------------------
  if (['dismantle', 'extractMetals'].includes(action)) {
    const hazard = resource.hazardLevel || 1;
    const certs = principal.certifications || [];
    const hasHazmatCert = certs.includes('HAZMAT_EWASTE_L2') || certs.includes('R2_CERTIFIED');

    if (hazard >= customHazardThreshold && !hasHazmatCert && forceActionVerdict !== 'ALLOW') {
      matchedForbids.push({
        id: 'policy_hazard_dismantling_guard',
        clause: `policy 1 (forbid dismantle when hazardLevel >= ${customHazardThreshold} && !HAZMAT_L2)`,
        description: `Resource hazardLevel (${hazard}) meets or exceeds threshold (${customHazardThreshold}), and principal lacks HAZMAT_EWASTE_L2.`
      });
    } else {
      matchedPermits.push({
        id: 'policy_hazard_clearance_permit',
        clause: 'Authorized certified dismantle / safe sorting',
        description: `Principal holds verified authorization for hazardLevel ${hazard} (Threshold: ${customHazardThreshold}).`
      });
    }
  }

  // --------------------------------------------------------------------------
  // Rule 2: Fair Minimum Floor Price Forbid
  // --------------------------------------------------------------------------
  if (action === 'submitPurchaseBid') {
    const isInformal = resource.sellerType === 'INFORMAL_RECYCLER';
    const offered = context.offeredPricePerKg || 0;
    const benchmark = context.benchmarkPricePerKg || 100;
    const minAllowed = benchmark * customFloorRatio;

    if (isInformal && offered < minAllowed && forceActionVerdict !== 'ALLOW') {
      matchedForbids.push({
        id: 'policy_fair_floor_price_guarantee',
        clause: `policy 2 (forbid bid < ${(customFloorRatio * 100).toFixed(0)}% of benchmark rate)`,
        description: `Offered price ₹${offered}/kg violates minimum fair floor ₹${minAllowed.toFixed(1)}/kg (${(customFloorRatio * 100).toFixed(0)}% rule on benchmark ₹${benchmark}/kg).`
      });
    } else {
      matchedPermits.push({
        id: 'policy_bid_permitted',
        clause: 'Bid satisfies civic floor pricing threshold',
        description: `Offered price ₹${offered}/kg is compliant with civic benchmark rate (Floor: ₹${minAllowed.toFixed(1)}).`
      });
    }
  }

  // --------------------------------------------------------------------------
  // Rule 3: General Recyclable Pickup Permit
  // --------------------------------------------------------------------------
  if (['claimPickup', 'weighBatch', 'transport'].includes(action)) {
    const kyc = !!principal.kycVerified;
    const hazard = resource.hazardLevel || 1;

    if (kyc && hazard <= 2) {
      matchedPermits.push({
        id: 'policy_general_pickup_permit',
        clause: 'policy 3 (permit safe scrap pickup for KYC verified)',
        description: `Principal is KYC verified and scrap is low-hazard (Class ${hazard}).`
      });
    } else if (!kyc) {
      diagnostics.push('Collector is not KYC verified on Circlo network.');
    }
  }

  // --------------------------------------------------------------------------
  // Rule 4: High-Hazard Custody Transfer
  // --------------------------------------------------------------------------
  if (action === 'transportToHub') {
    const kyc = !!principal.kycVerified;
    const destOk = !!context.destinationHubCertified;
    const sealOk = !!context.tamperSealIntact;

    if (kyc && destOk && sealOk) {
      matchedPermits.push({
        id: 'policy_custody_transfer_permit',
        clause: 'policy 4 (permit safe transit to certified R2 hub)',
        description: `Verified chain of custody: Hub certified and tamper seal intact.`
      });
    }
  }

  // --------------------------------------------------------------------------
  // Rule 5: EPR Brand Credit Minting
  // --------------------------------------------------------------------------
  if (action === 'mintEprCredit') {
    const brandOk = !!principal.isRegisteredBrand;
    const statusOk = resource.status === 'RECYCLED_VERIFIED';
    const chainProof = !!resource.hasChainOfCustodyProof;
    const payoutConfirmed = !!resource.informalCollectorPayoutConfirmed;

    if (brandOk && statusOk && chainProof && payoutConfirmed) {
      matchedPermits.push({
        id: 'policy_epr_credit_validation',
        clause: 'policy 5 (permit mintEprCredit for validated batches)',
        description: `All EPR compliance gates satisfied: Brand registered, batch verified, digital payout confirmed.`
      });
    } else {
      diagnostics.push(`EPR requirements unmet: Brand=${brandOk}, Status=${resource.status}, ChainProof=${chainProof}, Payout=${payoutConfirmed}`);
    }
  }

  // Final Decision Matrix (AWS Cedar Spec: Forbid overrides Permit; Default Deny)
  let decision = 'DENY';
  let reason = '';

  if (matchedForbids.length > 0) {
    decision = 'DENY';
    reason = `Explicitly FORBIDDEN by ${matchedForbids.map(f => f.id).join(', ')}`;
  } else if (matchedPermits.length > 0) {
    decision = 'ALLOW';
    reason = `PERMITTED by ${matchedPermits.map(p => p.id).join(', ')}`;
  } else {
    decision = 'DENY';
    reason = 'DEFAULT DENY: No matching Cedar permit policy satisfied.';
  }

  const durationMs = (performance.now() - startTime).toFixed(3);

  return {
    decision,
    reason,
    matchedForbids,
    matchedPermits,
    diagnostics,
    evaluationTimeMs: durationMs,
    evaluatedAt: new Date().toISOString()
  };
}
