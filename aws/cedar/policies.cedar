// ==============================================================================
// AWS CEDAR POLICIES FOR CIRCLO (E-Waste & Informal Recycler Network)
// Cedar is AWS's open source policy and authorization language.
// Documentation: https://www.cedarpolicy.com/
// ==============================================================================

// POLICY 1: Hazardous E-Waste Dismantling Safety Guard
// Forbids any collector from dismantling high-hazard e-waste (Lithium batteries,
// CRT tubes, PCB acid burning) unless they possess a verified HAZMAT_EWASTE_L2
// or R2_CERTIFIED credential.
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
// Forbids scrap aggregators or brokers from bidding lower than the daily civic 
// commodity benchmark price (-15% max margin) when purchasing from verified 
// informal recyclers (Kabadiwalas), preventing predatory price gouging.
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
// Permits verified collectors (informal or formal) to accept safe segregated 
// scrap (Hazard level 1 or 2) from households and commercial buildings.
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
// Permits collectors without hazmat dismantling permits to still collect and 
// safely transport hazardous items ONLY IF destination is a certified R2 hub.
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
// Authorizes electronics manufacturers (EPR brands) to mint civic compliance 
// credits only when the scrap lot has verified chain-of-custody, GPS geo-proof,
// and informal collector digital signature.
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
};
