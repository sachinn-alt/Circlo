// ==============================================================================
// CIRCLO DOMAIN DATA & ASSETS
// Track 03: Waste & Energy | AI E-Waste & Informal Recycler Network
// ==============================================================================

export const COMMODITY_PRICES = [
  { id: "copper_clean", name: "Copper (Grade 1 / Wire)", pricePerKg: 785, unit: "₹/kg", change24h: "+2.4%", trend: "up", category: "Non-Ferrous" },
  { id: "copper_mixed", name: "Copper (Transformer / Armature)", pricePerKg: 640, unit: "₹/kg", change24h: "+1.1%", trend: "up", category: "Non-Ferrous" },
  { id: "aluminum_extrusion", name: "Aluminum (Extrusion / Heatsinks)", pricePerKg: 215, unit: "₹/kg", change24h: "-0.5%", trend: "down", category: "Non-Ferrous" },
  { id: "pcb_grade_a", name: "Telecom / Server PCBs (Gold-plated)", pricePerKg: 1450, unit: "₹/kg", change24h: "+4.8%", trend: "up", category: "Precious E-Scrap" },
  { id: "pcb_grade_b", name: "Consumer Motherboards (PC/Laptop)", pricePerKg: 520, unit: "₹/kg", change24h: "+0.8%", trend: "up", category: "Precious E-Scrap" },
  { id: "lithium_cells", name: "Li-Ion Black Mass / Cobalt Scrap", pricePerKg: 890, unit: "₹/kg", change24h: "+3.2%", trend: "up", category: "Critical Minerals" },
  { id: "brass_scrap", name: "Brass Terminals & Connectors", pricePerKg: 460, unit: "₹/kg", change24h: "+0.2%", trend: "neutral", category: "Non-Ferrous" },
  { id: "e_steel", name: "Transformer Core CRGO Steel", pricePerKg: 68, unit: "₹/kg", change24h: "-1.2%", trend: "down", category: "Ferrous" }
];

export const PRELOADED_EWASTE_SAMPLES = [
  {
    id: "sample_laptop_battery",
    title: "Swollen Lithium-Ion Laptop Battery",
    category: "LITHIUM_ION_BATTERY",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    confidence: 0.98,
    hazardLevel: 4,
    hazardName: "High Chemical & Thermal Runaway Risk",
    hazardColor: "#ef4444",
    detectedFeatures: [
      { label: "Pouched Cell Swelling Detected", box: [22, 18, 58, 64] },
      { label: "Cobalt Oxide Cathode Markings", box: [55, 30, 25, 35] },
      { label: "BMS Protection Circuit", box: [72, 60, 20, 28] }
    ],
    materials: {
      lithiumCobaltOxide: "48g",
      copperFoil: "22g",
      aluminumCasing: "35g",
      graphiteAnode: "38g",
      plasticCasing: "15g"
    },
    recoveryValue: {
      min: 190,
      max: 245,
      fairBenchmark: 215
    },
    requiredCertifications: ["HAZMAT_EWASTE_L2", "R2_CERTIFIED"],
    handlingNotice: "DO NOT puncture or expose to heat. Store in fire-retardant vermiculite. Mandatory PPE: Nitrile gloves + face shield.",
    safeDismantleDirective: "Disassembly forbidden in informal residential yards. Must route to certified R2 hydrometallurgical recovery hub."
  },
  {
    id: "sample_motherboard",
    title: "High-Spec Motherboard & Server PCB",
    category: "PRINTED_CIRCUIT_BOARDS",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    confidence: 0.99,
    hazardLevel: 2,
    hazardName: "Moderate - Leaded Solder & Brominated Retardants",
    hazardColor: "#f59e0b",
    detectedFeatures: [
      { label: "Gold Flash Plated RAM Bus", box: [15, 20, 30, 25] },
      { label: "Solid Aluminum Electrolytic Caps", box: [45, 55, 20, 30] },
      { label: "Northbridge BGA Chipset", box: [35, 35, 25, 25] }
    ],
    materials: {
      goldPPM: "0.082g",
      silverPPM: "0.45g",
      palladiumPPM: "0.018g",
      copperTraces: "125g",
      fiberglassSubstrate: "240g"
    },
    recoveryValue: {
      min: 420,
      max: 510,
      fairBenchmark: 465
    },
    requiredCertifications: ["SAFE_SORT"],
    handlingNotice: "Do not open-air incinerate or acid leach! Solder contains trace lead. Depopulate chips mechanically with filtered exhaust.",
    safeDismantleDirective: "Authorized for collection by verified informal pickers. Shredding & smelting reserved for authorized refiners."
  },
  {
    id: "sample_copper_transformer",
    title: "Induction Cooktop Transformer & Choke Coil",
    category: "COPPER_WINDINGS",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    confidence: 0.96,
    hazardLevel: 1,
    hazardName: "Low Hazard - Pure Circular Scrap",
    hazardColor: "#10b981",
    detectedFeatures: [
      { label: "Heavy Gauge Enamelled Copper", box: [20, 25, 50, 45] },
      { label: "Silicon Steel Core Laminations", box: [50, 15, 35, 60] }
    ],
    materials: {
      cleanCopperWire: "340g",
      siliconSteelLaminations: "410g",
      phenolicResinBobbin: "45g"
    },
    recoveryValue: {
      min: 275,
      max: 310,
      fairBenchmark: 295
    },
    requiredCertifications: ["SAFE_SORT"],
    handlingNotice: "High recovery purity. Strip enamel cleanly without chemical burning. Unwind wire manually.",
    safeDismantleDirective: "Full clearance for local informal Kabadiwala recycling and mechanical manual stripping."
  },
  {
    id: "sample_crt_monitor",
    title: "Vintage CRT Television Tube",
    category: "CRT_MONITOR",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80",
    confidence: 0.94,
    hazardLevel: 5,
    hazardName: "Critical - Heavy Lead Funnel & Mercury Phosphors",
    hazardColor: "#dc2626",
    detectedFeatures: [
      { label: "Vacuum Glass Envelope", box: [15, 15, 70, 65] },
      { label: "Deflection Copper Yoke", box: [40, 60, 25, 30] },
      { label: "Leaded Funnel Glass (up to 2kg Lead)", box: [30, 30, 40, 40] }
    ],
    materials: {
      leadedGlass: "1850g",
      phosphorCoating: "12g",
      copperYoke: "180g",
      ironChassis: "650g"
    },
    recoveryValue: {
      min: 110,
      max: 160,
      fairBenchmark: 135
    },
    requiredCertifications: ["HAZMAT_EWASTE_L2", "R2_CERTIFIED"],
    handlingNotice: "CRITICAL: Never break funnel glass! Releases toxic lead dust and phosphor gas. Vacuum implosion risk.",
    safeDismantleDirective: "Informal breaking is strictly FORBIDDEN by CPCB guidelines. Mandatory transport to hazardous glass smelter."
  },
  {
    id: "sample_solar_inverter",
    title: "Discarded Solar Micro-Inverter PCB",
    category: "POWER_ELECTRONICS",
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    confidence: 0.97,
    hazardLevel: 2,
    hazardName: "Moderate - Heavy Capacitive Storage",
    hazardColor: "#f59e0b",
    detectedFeatures: [
      { label: "MOSFET Transistor Heatsink Array", box: [15, 30, 40, 35] },
      { label: "Ferrite Core Inductor", box: [55, 20, 30, 30] },
      { label: "High Voltage Aluminum Capacitors", box: [60, 55, 25, 35] }
    ],
    materials: {
      anodizedAluminum: "520g",
      thickCopperBusbar: "110g",
      tinSilverSolder: "18g",
      fiberglassPCB: "210g"
    },
    recoveryValue: {
      min: 340,
      max: 420,
      fairBenchmark: 380
    },
    requiredCertifications: ["SAFE_SORT"],
    handlingNotice: "Verify zero residual capacitor voltage before stripping copper busbars. Recyclable aluminum body.",
    safeDismantleDirective: "Authorized for certified informal collectors with electrical isolation training."
  }
];

export const MOCK_RECYCLERS = [
  {
    id: "rec_101",
    name: "Ram Lakhan (Lakhan Scrap Solns)",
    collectorType: "INFORMAL_RECYCLER",
    kycVerified: true,
    fairPricePledge: true,
    certifications: ["SAFE_SORT", "CIRCLO_FAIR_PRICE_HONORED"],
    vehicleType: "Electric Cargo Rickshaw (EV)",
    phone: "+91 98112 40219",
    rating: 4.9,
    totalBatchesCollected: 642,
    location: {
      lat: 28.6189,
      lon: 77.2140
    },
    operatingRadiusKm: 6.5,
    acceptedMaterials: ["PRINTED_CIRCUIT_BOARDS", "COPPER_WINDINGS", "POWER_ELECTRONICS", "APPLIANCES"],
    status: "AVAILABLE",
    currentEtaMinutes: 14,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rec_102",
    name: "Aarti Devi (Green Women Scrap Collective)",
    collectorType: "INFORMAL_RECYCLER",
    kycVerified: true,
    fairPricePledge: true,
    certifications: ["SAFE_SORT", "HAZMAT_EWASTE_L2", "CIRCLO_FAIR_PRICE_HONORED"],
    vehicleType: "Solar-Assisted Trike",
    phone: "+91 98731 82910",
    rating: 5.0,
    totalBatchesCollected: 890,
    location: {
      lat: 28.6075,
      lon: 77.2012
    },
    operatingRadiusKm: 8.0,
    acceptedMaterials: ["LITHIUM_ION_BATTERY", "PRINTED_CIRCUIT_BOARDS", "COPPER_WINDINGS", "SMARTPHONES"],
    status: "AVAILABLE",
    currentEtaMinutes: 22,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rec_103",
    name: "Mohammad Irfan & Sons",
    collectorType: "INFORMAL_RECYCLER",
    kycVerified: true,
    fairPricePledge: true,
    certifications: ["SAFE_SORT"],
    vehicleType: "Traditional Push Cart (Mechanical)",
    phone: "+91 98104 59281",
    rating: 4.7,
    totalBatchesCollected: 415,
    location: {
      lat: 28.6250,
      lon: 77.2210
    },
    operatingRadiusKm: 3.5,
    acceptedMaterials: ["COPPER_WINDINGS", "POWER_ELECTRONICS", "FERROUS_METALS"],
    status: "ON_DUTY",
    currentEtaMinutes: 35,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rec_104",
    name: "EcoMetals R2 Clean Refiners Hub",
    collectorType: "FORMAL_R2_FACILITY",
    kycVerified: true,
    fairPricePledge: true,
    certifications: ["HAZMAT_EWASTE_L2", "R2_CERTIFIED", "CPCB_REGISTERED"],
    vehicleType: "EV Recovery Van",
    phone: "+91 11 4982 7100",
    rating: 4.95,
    totalBatchesCollected: 3120,
    location: {
      lat: 28.6380,
      lon: 77.1950
    },
    operatingRadiusKm: 25.0,
    acceptedMaterials: ["LITHIUM_ION_BATTERY", "CRT_MONITOR", "PRINTED_CIRCUIT_BOARDS", "HAZARDOUS_EWASTE"],
    status: "AVAILABLE",
    currentEtaMinutes: 45,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "rec_105",
    name: "Sunil Kumar (Unverified Scrap Dealer)",
    collectorType: "INFORMAL_RECYCLER",
    kycVerified: false,
    fairPricePledge: false,
    certifications: [],
    vehicleType: "Diesel Auto Rickshaw",
    phone: "+91 98990 12398",
    rating: 3.6,
    totalBatchesCollected: 78,
    location: {
      lat: 28.6110,
      lon: 77.2340
    },
    operatingRadiusKm: 5.0,
    acceptedMaterials: ["ALL"],
    status: "FLAGGED_UNVERIFIED",
    currentEtaMinutes: 19,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

export const CEDAR_SCENARIOS = [
  {
    id: "scen_unauth_battery",
    title: "Scenario A: Uncertified Collector attempting to dismantle Swollen Li-Ion Battery",
    principal: {
      id: "Recycler::\"rec_101\"",
      name: "Ram Lakhan (Informal Kabadiwala)",
      kycVerified: true,
      certifications: ["SAFE_SORT"]
    },
    action: "Action::\"dismantle\"",
    resource: {
      id: "ScrapBatch::\"batch_881\"",
      category: "LITHIUM_ION_BATTERY",
      hazardLevel: 4,
      sellerType: "INFORMAL_RECYCLER"
    },
    context: {
      offeredPricePerKg: 750,
      benchmarkPricePerKg: 890
    },
    expectedDecision: "DENY",
    triggerPolicy: "POLICY 1 (Hazardous E-Waste Dismantling Safety Guard)",
    rationale: "Lithium-Cobalt batteries have Hazard Level 4. Ram Lakhan lacks HAZMAT_EWASTE_L2 or R2_CERTIFIED. Cedar automatically denies dismantling to protect worker from toxic fumes and thermal explosion."
  },
  {
    id: "scen_certified_hazmat",
    title: "Scenario B: Certified Female Collector Dismantling with Hazmat L2",
    principal: {
      id: "Recycler::\"rec_102\"",
      name: "Aarti Devi (Green Women Collective)",
      kycVerified: true,
      certifications: ["SAFE_SORT", "HAZMAT_EWASTE_L2"]
    },
    action: "Action::\"dismantle\"",
    resource: {
      id: "ScrapBatch::\"batch_881\"",
      category: "LITHIUM_ION_BATTERY",
      hazardLevel: 4,
      sellerType: "INFORMAL_RECYCLER"
    },
    context: {
      offeredPricePerKg: 850,
      benchmarkPricePerKg: 890
    },
    expectedDecision: "ALLOW",
    triggerPolicy: "POLICY 1 Passed + POLICY 3 Permit",
    rationale: "Aarti Devi holds verified HAZMAT_EWASTE_L2 credentials and operates an equipped dismantling workspace. Cedar permits the extraction."
  },
  {
    id: "scen_predatory_undercut",
    title: "Scenario C: Scrap Broker Bidding Below Fair Civic Floor Rate",
    principal: {
      id: "Aggregator::\"broker_99\"",
      name: "Urban Metal Aggregator Ltd",
      kycVerified: true,
      certifications: []
    },
    action: "Action::\"submitPurchaseBid\"",
    resource: {
      id: "ScrapBatch::\"copper_lot_12\"",
      category: "COPPER_WINDINGS",
      hazardLevel: 1,
      sellerType: "INFORMAL_RECYCLER"
    },
    context: {
      offeredPricePerKg: 520, // 520 is < 785 * 0.85 = 667.25
      benchmarkPricePerKg: 785
    },
    expectedDecision: "DENY",
    triggerPolicy: "POLICY 2 (Fair Minimum Floor Price Guarantee)",
    rationale: "Offered price (₹520/kg) is 33.7% below the daily civic copper benchmark (₹785/kg). Cedar forbids any bid below the 85% safety threshold, preventing exploitation of informal collectors."
  },
  {
    id: "scen_epr_brand_credit",
    title: "Scenario D: Electronic Brand Minting EPR Recycled Credit",
    principal: {
      id: "EprBrand::\"dell_india\"",
      name: "Dell Tech India Ltd",
      isRegisteredBrand: true,
      cpcbRegistrationNo: "CPCB/EPR/2026/0914"
    },
    action: "Action::\"mintEprCredit\"",
    resource: {
      id: "ScrapBatch::\"verified_batch_404\"",
      hazardLevel: 2,
      status: "RECYCLED_VERIFIED",
      hasChainOfCustodyProof: true,
      informalCollectorPayoutConfirmed: true
    },
    context: {},
    expectedDecision: "ALLOW",
    triggerPolicy: "POLICY 5 (EPR Brand Credit Validation)",
    rationale: "Batch contains immutable GPS geo-trace, photo hash, and confirmed digital UPI transfer to the informal kabadiwala. Authorized for CPCB compliance credit."
  }
];

export const IMPACT_STATISTICS = {
  totalEwasteDivertedKg: 142850,
  toxicLeadPreventedKg: 3420,
  mercuryContaminationSavedLiters: 18500000,
  co2EmissionsAvoidedKg: 896200,
  fairLivelihoodsSupported: 1240,
  informalWageIncreasePercent: 38.5,
  eprCreditsMintedGramsGold: 4850
};
