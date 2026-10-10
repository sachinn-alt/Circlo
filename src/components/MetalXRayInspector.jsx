import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Smartphone, 
  Laptop, 
  BatteryCharging, 
  Zap, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  AlertTriangle,
  Coins
} from 'lucide-react';
import { generateWhatsAppBookingUrl } from '../services/whatsappService';

const GADGET_BLUEPRINTS = [
  {
    id: 'phone',
    icon: Smartphone,
    title: 'DEAD SMARTPHONE',
    sub: 'Old 4G/5G Android or iPhone',
    estWeight: '180 grams',
    cashFloor: '₹380 - ₹480',
    hazard: 'Level 2 (Standard)',
    metals: [
      { name: '24K Gold Flash', amount: '0.034g', value: '₹240', color: '#DFE104' },
      { name: 'Pure Copper Traces', amount: '16g', value: '₹14', color: '#f97316' },
      { name: 'Fine Silver Solder', amount: '0.35g', value: '₹32', color: '#94a3b8' },
      { name: 'Cobalt & Lithium Cell', amount: '4.5g', value: '₹65', color: '#38bdf8' }
    ],
    funFact: '1 ton of recycled smartphones yields 300x more gold than 1 ton of mined gold ore.',
    blueprintPoints: [
      { label: 'Gold Plated SIM & Audio Pins', top: '15%', left: '42%' },
      { label: 'BGA Logic Processor (Gold Wire Bonds)', top: '38%', left: '50%' },
      { label: 'Cobalt Oxide Cathode Battery', top: '65%', left: '35%' }
    ]
  },
  {
    id: 'laptop',
    icon: Laptop,
    title: 'BROKEN LAPTOP',
    sub: 'Dead Motherboard & Obsolete Chassis',
    estWeight: '2.2 kg',
    cashFloor: '₹850 - ₹1,200',
    hazard: 'Level 2 (Standard)',
    metals: [
      { name: '24K Gold Bus Plating', amount: '0.28g', value: '₹1,950/g (₹546)', color: '#DFE104' },
      { name: 'Refined Copper Heatsink', amount: '180g', value: '₹142', color: '#f97316' },
      { name: 'Extruded Aluminum Base', amount: '450g', value: '₹98', color: '#94a3b8' },
      { name: 'Tin-Silver Solder Array', amount: '18g', value: '₹44', color: '#cbd5e1' }
    ],
    funFact: 'A single scrapped laptop circuit board contains enough conductive copper to power a solar micro-inverter.',
    blueprintPoints: [
      { label: 'Gold Plated RAM & PCIe Bus', top: '22%', left: '30%' },
      { label: 'Solid Copper Heatpipes & Fins', top: '25%', left: '70%' },
      { label: 'Multi-layer Logic Motherboard', top: '55%', left: '48%' }
    ]
  },
  {
    id: 'battery',
    icon: BatteryCharging,
    title: 'SWOLLEN LI-ION BATTERY',
    sub: 'Pouched Laptop / Powerbank Cells',
    estWeight: '320 grams',
    cashFloor: '₹220 - ₹290',
    hazard: 'Level 4 (High Hazmat)',
    metals: [
      { name: 'Lithium Cobalt Black Mass', amount: '48g', value: '₹140', color: '#ef4444' },
      { name: 'High Purity Copper Foil', amount: '26g', value: '₹21', color: '#f97316' },
      { name: 'Aluminum Pouch Casing', amount: '35g', value: '₹8', color: '#94a3b8' },
      { name: 'Synthetic Graphite Anode', amount: '38g', value: '₹12', color: '#64748b' }
    ],
    funFact: 'Puncturing a swollen battery causes a 600°C thermal runaway. Circlo routes these directly to Hazmat L2 hydrometallurgical refiners.',
    blueprintPoints: [
      { label: '⚠️ Pressurized Swelling Seam', top: '28%', left: '35%' },
      { label: 'Lithium Cobalt Oxide Cathode', top: '52%', left: '55%' },
      { label: 'BMS Protection Circuit', top: '78%', left: '40%' }
    ]
  },
  {
    id: 'motor',
    icon: Zap,
    title: 'COPPER MOTOR / CHOKE COIL',
    sub: 'Ceiling Fan, Microwave, Induction Coil',
    estWeight: '1.8 kg',
    cashFloor: '₹480 - ₹620',
    hazard: 'Level 1 (Safe/Clean)',
    metals: [
      { name: 'Grade 1 Copper Magnet Wire', amount: '520g', value: '₹410', color: '#f97316' },
      { name: 'Silicon CRGO Core Steel', amount: '1.1kg', value: '₹75', color: '#94a3b8' },
      { name: 'Brass Terminals', amount: '45g', value: '₹21', color: '#eab308' }
    ],
    funFact: 'Burning motor wires in backyards releases cancer-causing dioxins. Circlo kabadiwalas use mechanical strippers for clean recovery.',
    blueprintPoints: [
      { label: 'Pure Enameled Copper Windings', top: '30%', left: '50%' },
      { label: 'Laminated Transformer Steel Core', top: '65%', left: '45%' }
    ]
  }
];

export default function MetalXRayInspector({ onRequestPickup, onExploreKabadiwala, onExploreGovt }) {
  const [selectedGadget, setSelectedGadget] = useState(GADGET_BLUEPRINTS[0]);

  const handleWhatsAppBooking = () => {
    const url = generateWhatsAppBookingUrl({
      itemName: selectedGadget.title,
      estimatedWeight: selectedGadget.estWeight,
      payout: selectedGadget.cashFloor,
      city: "Kolkata / Salt Lake (Doorstep Dispatch)"
    });
    window.open(url, '_blank');
  };

  return (
    <section className="kinetic-section" style={{ borderBottom: '2px solid var(--border-color)', backgroundColor: 'var(--bg-color)' }}>
      <div className="kinetic-container">
        
        {/* Section Eyebrow */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ 
            fontFamily: 'var(--font-space)', 
            fontSize: '13px', 
            fontWeight: 800, 
            color: 'var(--accent-color)', 
            letterSpacing: '0.12em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} />
            [ DISCOVERY LAB // HIDDEN WEALTH IN OLD ELECTRONICS ]
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '10px' }}>
            WHAT'S REALLY INSIDE YOUR JUNK TECH?
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '700px', marginTop: '10px' }}>
            People hoard dead electronics in drawers because they don't realize they are sitting on an urban goldmine. Click any device to see its hidden precious metals and real cash value.
          </p>
        </div>

        {/* 4 Gadget Selector Buttons */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '12px', 
          marginBottom: '32px' 
        }}>
          {GADGET_BLUEPRINTS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedGadget.id === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedGadget(item)}
                style={{
                  padding: '16px',
                  border: isSelected ? '2px solid var(--accent-color)' : '2px solid var(--border-color)',
                  backgroundColor: isSelected ? 'var(--muted-color)' : 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: isSelected ? 'var(--accent-color)' : 'var(--border-color)',
                  color: isSelected ? '#000000' : 'var(--fg-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, color: isSelected ? 'var(--accent-color)' : 'var(--fg-color)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted-fg-color)' }}>
                    {item.cashFloor}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* The X-Ray Visualizer Box */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px',
          border: '2px solid var(--border-color)',
          padding: 'clamp(20px, 4vw, 36px)',
          backgroundColor: '#050505',
          position: 'relative'
        }}>
          
          {/* Left: Holographic Schematic Blueprint */}
          <div style={{ 
            border: '2px solid rgba(223, 225, 4, 0.3)', 
            padding: '24px', 
            position: 'relative',
            minHeight: '340px',
            backgroundColor: '#0a0a0a',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)' }}>
                X-RAY MULTI-SPECTRAL BLUEPRINT
              </span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                ● 100% CPCB AUDITABLE
              </span>
            </div>

            {/* Simulated Neon Circuit Traces & Hotspot Callouts */}
            <div style={{ position: 'relative', height: '220px', margin: '20px 0' }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
                <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dfe104" strokeWidth="0.8" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#gridPattern)" />
                <path d="M 30 50 L 120 50 L 160 110 L 260 110" fill="none" stroke="#dfe104" strokeWidth="2" />
                <path d="M 50 180 L 140 180 L 180 130 L 280 130" fill="none" stroke="#f97316" strokeWidth="2" />
              </svg>

              {/* Dynamic Blueprint Hotspots */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedGadget.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedGadget.blueprintPoints.map((pt, i) => (
                    <div 
                      key={i}
                      style={{ 
                        position: 'absolute', 
                        top: pt.top, 
                        left: pt.left,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ 
                        width: '10px', 
                        height: '10px', 
                        backgroundColor: 'var(--accent-color)', 
                        border: '2px solid #000',
                        boxShadow: '0 0 8px #dfe104'
                      }} />
                      <span style={{ 
                        backgroundColor: 'rgba(0,0,0,0.85)', 
                        border: '1px solid var(--accent-color)', 
                        padding: '3px 8px', 
                        fontFamily: 'var(--font-space)', 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        color: 'var(--fg-color)',
                        whiteSpace: 'nowrap'
                      }}>
                        {pt.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Educational Environmental Fact */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.04)', 
              padding: '10px 14px', 
              borderLeft: '3px solid var(--accent-color)', 
              fontSize: '12px', 
              color: 'var(--muted-fg-color)' 
            }}>
              💡 <strong>Did You Know:</strong> {selectedGadget.funFact}
            </div>
          </div>

          {/* Right: Extracted Precious Metals Valuation & Instant Booking */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, color: 'var(--muted-fg-color)' }}>
                  ESTIMATED SCRAP YIELD
                </span>
                <span style={{ 
                  fontFamily: 'var(--font-space)', 
                  fontSize: '12px', 
                  fontWeight: 800, 
                  color: selectedGadget.hazard.includes('High') ? '#ef4444' : '#10b981',
                  border: `1px solid ${selectedGadget.hazard.includes('High') ? '#ef4444' : '#10b981'}`,
                  padding: '2px 8px'
                }}>
                  {selectedGadget.hazard}
                </span>
              </div>

              {/* Big Cash Valuation Banner */}
              <div style={{ 
                border: '2px solid var(--accent-color)', 
                padding: '20px', 
                backgroundColor: 'rgba(223, 225, 4, 0.05)',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-space)', fontWeight: 800, color: 'var(--muted-fg-color)' }}>
                  CIVIC GUARANTEED CASH PAYOUT
                </div>
                <div style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', fontWeight: 800, color: 'var(--accent-color)', lineHeight: 1.1, margin: '6px 0' }}>
                  {selectedGadget.cashFloor}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted-fg-color)', fontWeight: 600 }}>
                  Weight: {selectedGadget.estWeight} · Paid instantly via UPI on digital scale handover
                </div>
              </div>

              {/* Breakdown List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {selectedGadget.metals.map((metal, idx) => (
                  <div 
                    key={idx}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '10px 14px',
                      backgroundColor: 'var(--muted-color)',
                      border: '1px solid var(--border-color)',
                      fontSize: '13px'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: metal.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', backgroundColor: metal.color }} />
                      {metal.name} ({metal.amount})
                    </span>
                    <span style={{ fontFamily: 'var(--font-space)', fontWeight: 800, color: 'var(--fg-color)' }}>
                      {metal.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: 1-Tap WhatsApp Dispatch + In-App Modal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppBooking}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#25D366',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '14px',
                  fontFamily: 'var(--font-space)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <MessageCircle size={18} />
                <span>BOOK THIS PICKUP VIA WHATSAPP (1-TAP)</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRequestPickup && onRequestPickup({ name: selectedGadget.title, payout: selectedGadget.cashFloor })}
                className="btn-kinetic-primary"
                style={{ width: '100%' }}
              >
                <span>BOOK PICKUP IN-APP</span>
                <span className="btn-icon">
                  <ArrowRight size={16} />
                </span>
              </motion.button>
            </div>

          </div>

        </div>

        {/* 🧭 Dual Sense of Exploration Cards (Consumer & Kabadiwala) */}
        <div style={{ 
          marginTop: '36px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          
          {/* Card 1: For Kabadiwalas */}
          <div style={{ 
            border: '2px solid var(--border-color)', 
            padding: '24px', 
            backgroundColor: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)' }}>
                [ PARTNER ROZGAR PORTAL ]
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '6px', textTransform: 'uppercase' }}>
                ARE YOU A SCRAP WORKER OR KABADIWALA?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '8px' }}>
                Get direct pickup leads from local residents, check today's live MCX mandi scrap rates, and use our free digital weighing scale receipt generator.
              </p>
            </div>
            <button 
              onClick={onExploreKabadiwala}
              className="btn-kinetic-outline"
              style={{ marginTop: '18px', width: '100%' }}
            >
              <span>OPEN KABADIWALA HUB</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: For Govt & Enterprises */}
          <div style={{ 
            border: '2px solid var(--border-color)', 
            padding: '24px', 
            backgroundColor: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)' }}>
                [ CIVIC & BRAND COMPLIANCE ]
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '6px', textTransform: 'uppercase' }}>
                GOVERNMENT & BRAND EPR COMPLIANCE
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '8px' }}>
                Inspect our automated worker safety rules against toxic burning, audit verified local recycler radius matching, and mint verifiable CPCB Green Stewardship Certificates.
              </p>
            </div>
            <button 
              onClick={onExploreGovt}
              className="btn-kinetic-outline"
              style={{ marginTop: '18px', width: '100%', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            >
              <span>INSPECT WORKER SAFETY RULES</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
