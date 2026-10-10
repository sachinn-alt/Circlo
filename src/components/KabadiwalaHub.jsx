import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Scale, 
  Coins, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Receipt,
  Printer,
  Sparkles,
  Plus,
  RotateCcw
} from 'lucide-react';
import { getLiveCommodityPrices, getOracleMetadata } from '../services/commodityOracle';
import { generateWhatsAppLeadAcceptUrl } from '../services/whatsappService';

const SCALE_SCRAP_ITEMS = [
  { id: 'copper', name: 'Grade 1 Copper Wire', rate: 740, unit: 'kg', icon: '⚡' },
  { id: 'pcb', name: 'Server / Laptop Motherboards', rate: 420, unit: 'kg', icon: '💾' },
  { id: 'brass', name: 'Brass Terminals & Pins', rate: 460, unit: 'kg', icon: '🔩' },
  { id: 'battery', name: 'Swollen Li-Ion Batteries', rate: 190, unit: 'kg', icon: '🔋' },
  { id: 'aluminum', name: 'Extruded Aluminum Casing', rate: 185, unit: 'kg', icon: '🪟' },
  { id: 'steel', name: 'Iron / Mild Steel Scrap', rate: 38, unit: 'kg', icon: '⚙️' },
];

export default function KabadiwalaHub({ onRequestPickup, onExploreScanner, onExploreCedar, onExploreMap }) {
  const commodityPrices = getLiveCommodityPrices();
  const oracleMeta = getOracleMetadata();

  // Digital Scale State
  const [selectedScrap, setSelectedScrap] = useState(SCALE_SCRAP_ITEMS[0]);
  const [weightKg, setWeightKg] = useState(3.5);
  const [customerName, setCustomerName] = useState('Priya Sharma');
  const [customerArea, setCustomerArea] = useState('Barakhamba Road');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('CIRCLO-KANTA-8821');
  const [isUpiPaid, setIsUpiPaid] = useState(false);

  // Leads State
  const [claimedLeads, setClaimedLeads] = useState({});
  const [leads] = useState([
    {
      id: "lead_701",
      resident: "PRIYA SHARMA",
      area: "BARAKHAMBA ROAD (1.4 KM)",
      items: "2X SERVER BOARDS + 1X COPPER MOTOR",
      weight: "2.8 KG",
      payout: "₹760",
      urgency: "HIGH"
    },
    {
      id: "lead_702",
      resident: "VIKRAM MEHTA",
      area: "JANPATH ENCLAVE (2.1 KM)",
      items: "5X ANDROID PHONES + 1X POWERBANK",
      weight: "1.5 KG",
      payout: "₹540",
      urgency: "MEDIUM"
    },
    {
      id: "lead_703",
      resident: "APEX CLINIC",
      area: "KHAN MARKET (3.2 KM)",
      items: "1X DISCARDED SOLAR INVERTER PCB",
      weight: "4.2 KG",
      payout: "₹1,120",
      urgency: "NORMAL"
    }
  ]);

  const totalScalePayout = Math.round(weightKg * selectedScrap.rate);

  const handleClaimLead = (lead) => {
    setClaimedLeads(prev => ({ ...prev, [lead.id]: true }));
  };

  const handleOpenReceiptModal = () => {
    setReceiptNumber(`CIRCLO-KANTA-${Math.floor(1000 + Math.random() * 9000)}`);
    setShowReceiptModal(true);
  };

  const getWhatsAppReceiptUrl = () => {
    const text = 
`*⚖️ CIRCLO VERIFIED DIGITAL SCALE RECEIPT (डिजिटल कांटा रसीद)*
----------------------------------------
🧾 *Receipt #:* ${receiptNumber}
👤 *Resident:* ${customerName}
📍 *Location:* ${customerArea}
📦 *Scrap Item:* ${selectedScrap.name}
⚖️ *Net Weight:* ${weightKg.toFixed(2)} kg
💰 *Today's Mandi Rate:* ₹${selectedScrap.rate}/kg
💵 *Total Paid Cash:* ₹${totalScalePayout.toLocaleString('en-IN')}
🛡️ *Protocol:* Zero-Tampering Scale + Instant UPI
----------------------------------------
_Under CPCB E-Waste Management Rules 2022._`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '32px' }}
      >
        <span style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '13px', 
          fontWeight: 800, 
          letterSpacing: '0.12em', 
          color: 'var(--accent-color)',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
          <span className="kinetic-live-dot" />
          [ WELFARE PORTAL // GRASSROOTS RECYCLER DIGNITY & TRANSPARENCY ]
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
          COLLECTOR WELFARE & LIVE RATES.
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '640px', marginTop: '12px' }}>
          Direct pickup leads from citizens, live commodity market rates, and safety certifications. Eliminating predatory brokers and guaranteeing fair livelihoods.
        </p>
      </motion.div>

      {/* Daily Scrap Market Ticker Grid */}
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--accent-color)' }}>
        <span className="kinetic-live-dot" />
        <span>ORACLE FEED: {oracleMeta.exchange} | SIGNATURE: {oracleMeta.signature.slice(0, 14)}... | STATUTORY FLOOR: {oracleMeta.floorRule}</span>
      </div>
      <div className="commodity-ticker-grid" style={{ marginBottom: '36px' }}>
        {commodityPrices.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -4, backgroundColor: 'var(--muted-color)' }}
            style={{ 
              backgroundColor: 'var(--bg-color)', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'background-color 0.2s ease',
              border: '2px solid var(--border-color)'
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
                {item.commodity}
              </span>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '32px', fontWeight: 900, color: 'var(--accent-color)', margin: '8px 0' }}>
                ₹{item.pricePerKg}
                <small style={{ fontSize: '13px', color: 'var(--fg-color)' }}>/{item.unit}</small>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-space)', fontWeight: 800, color: '#10b981' }}>
              <span>{item.change24h} TODAY</span>
              <span style={{ color: 'var(--muted-fg-color)' }}>MCX LINKED</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ⚖️ DIGITAL WEIGHING SCALE (कांटा) & PARCHI GENERATOR */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          border: '2px solid var(--border-color)',
          backgroundColor: 'var(--bg-color)',
          padding: 'clamp(20px, 4vw, 36px)',
          marginBottom: '36px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
              [ ZERO-CHEATING TOOL // प्रमाणित डिजिटल कांटा ]
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
              DIGITAL SCALE CALCULATOR & PARCHI (रसीद) SLIP
            </h3>
          </div>
          <span style={{
            fontFamily: 'var(--font-space)',
            fontSize: '11px',
            fontWeight: 800,
            padding: '4px 10px',
            backgroundColor: 'var(--muted-color)',
            border: '1px solid var(--border-color)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldCheck size={14} color="#10b981" />
            CPCB CERTIFIED CALIBRATION
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* Left Column: Scrap Selector & Weight Controls */}
          <div>
            <label style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--muted-fg-color)', display: 'block', marginBottom: '8px' }}>
              SELECT SCRAP CATEGORY
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '20px' }}>
              {SCALE_SCRAP_ITEMS.map((item) => {
                const isSelected = selectedScrap.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedScrap(item)}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: isSelected ? 'var(--accent-color)' : 'var(--muted-color)',
                      color: isSelected ? '#000000' : 'var(--fg-color)',
                      border: '2px solid var(--border-color)',
                      fontWeight: 800,
                      fontSize: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{item.icon} {item.name}</span>
                    <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', marginTop: '6px', opacity: 0.85 }}>
                      ₹{item.rate}/{item.unit}
                    </span>
                  </button>
                );
              })}
            </div>

            <label style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--muted-fg-color)', display: 'block', marginBottom: '8px' }}>
              SCALE WEIGHT (KG)
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <input 
                type="number"
                step="0.1"
                min="0.1"
                max="500"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '24px',
                  fontWeight: 900,
                  padding: '8px 14px',
                  width: '120px',
                  backgroundColor: 'var(--muted-color)',
                  color: 'var(--fg-color)',
                  border: '2px solid var(--border-color)',
                  outline: 'none'
                }}
              />
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '16px', fontWeight: 800 }}>KG</span>

              {/* Quick Increment Buttons */}
              <button 
                onClick={() => setWeightKg(prev => +(prev + 0.5).toFixed(1))}
                className="btn-kinetic-outline"
                style={{ padding: '6px 10px', fontSize: '11px', height: 'auto' }}
              >
                +0.5
              </button>
              <button 
                onClick={() => setWeightKg(prev => +(prev + 1.0).toFixed(1))}
                className="btn-kinetic-outline"
                style={{ padding: '6px 10px', fontSize: '11px', height: 'auto' }}
              >
                +1.0
              </button>
              <button 
                onClick={() => setWeightKg(prev => +(prev + 5.0).toFixed(1))}
                className="btn-kinetic-outline"
                style={{ padding: '6px 10px', fontSize: '11px', height: 'auto' }}
              >
                +5.0
              </button>
              <button 
                onClick={() => setWeightKg(1.0)}
                title="Reset weight"
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: '2px solid var(--border-color)',
                  color: 'var(--muted-fg-color)',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: LED Readout & Receipt Actions */}
          <div style={{
            backgroundColor: 'var(--muted-color)',
            border: '2px solid var(--border-color)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--muted-fg-color)' }}>
                  STATUTORY MANDI PAYOUT
                </span>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', color: '#10b981', fontWeight: 800 }}>
                  ● 100% AUDIT ACCURACY
                </span>
              </div>

              <div style={{
                fontFamily: 'var(--font-space)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                color: 'var(--accent-color)',
                lineHeight: 1,
                margin: '12px 0'
              }}>
                ₹{totalScalePayout.toLocaleString('en-IN')}
              </div>

              <div style={{ fontSize: '13px', color: 'var(--muted-fg-color)', lineHeight: 1.5 }}>
                {weightKg.toFixed(2)} kg × ₹{selectedScrap.rate}/kg ({selectedScrap.name})
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <button 
                onClick={handleOpenReceiptModal}
                className="btn-kinetic-primary"
                style={{ width: '100%', gap: '8px' }}
              >
                <Receipt size={16} />
                <span>GENERATE DIGITAL PARCHI (रसीद)</span>
              </button>

              <button 
                onClick={() => {
                  window.open(getWhatsAppReceiptUrl(), '_blank');
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#25D366',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '12px',
                  fontFamily: 'var(--font-space)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={15} />
                <span>WHATSAPP PARCHI TO RESIDENT</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Citizen Leads Grid */}
      <div style={{ 
        border: '2px solid var(--border-color)', 
        backgroundColor: 'var(--muted-color)', 
        padding: 'clamp(16px, 4vw, 32px)',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase' }}>
              ACTIVE PICKUP LEADS IN YOUR SECTOR
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
              Verified doorsteps requesting calibrated scale pickup. Tap to claim directly via WhatsApp.
            </p>
          </div>
          <span style={{ 
            fontFamily: 'var(--font-space)', 
            fontSize: '12px', 
            fontWeight: 800, 
            padding: '4px 10px', 
            backgroundColor: 'var(--accent-color)', 
            color: '#000000',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: '#000000', display: 'inline-block' }} />
            {leads.length} LIVE REQUESTS
          </span>
        </div>

        <div className="leads-grid">
          {leads.map((lead, lIdx) => {
            const isClaimed = !!claimedLeads[lead.id];
            return (
              <motion.div 
                key={lead.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: lIdx * 0.1 }}
                whileHover={{ y: -4, borderColor: 'var(--accent-color)' }}
                style={{
                  backgroundColor: 'var(--bg-color)',
                  border: isClaimed ? '2px solid #10b981' : '2px solid var(--border-color)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: 'var(--accent-color)', marginBottom: '6px' }}>
                    <span>{lead.area}</span>
                    <span>{lead.urgency}</span>
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, textTransform: 'uppercase' }}>
                    {lead.resident}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--muted-fg-color)', margin: '8px 0 16px 0' }}>
                    {lead.items}
                  </p>
                </div>

                <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', display: 'block' }}>WEIGHT: {lead.weight}</span>
                      <strong style={{ fontFamily: 'var(--font-space)', fontSize: '20px', color: 'var(--accent-color)' }}>
                        {lead.payout}
                      </strong>
                    </div>
                    {isClaimed && (
                      <span style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-space)',
                        fontWeight: 900,
                        color: '#10b981',
                        backgroundColor: '#10b98115',
                        padding: '4px 8px',
                        border: '1px solid #10b981'
                      }}>
                        ✓ CLAIMED BY YOU
                      </span>
                    )}
                  </div>

                  {!isClaimed ? (
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-kinetic-primary"
                      style={{ width: '100%', height: '38px', fontSize: '12px' }}
                      onClick={() => handleClaimLead(lead)}
                    >
                      <span>ACCEPT PICKUP LEAD</span>
                    </motion.button>
                  ) : (
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        const url = generateWhatsAppLeadAcceptUrl(lead);
                        window.open(url, '_blank');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#25D366',
                        color: '#000000',
                        fontWeight: 900,
                        fontSize: '12px',
                        fontFamily: 'var(--font-space)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <MessageCircle size={14} />
                      <span>DISPATCH VIA WHATSAPP (1-TAP)</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🧭 Dual Sense of Exploration Cards for Kabadiwala Portal */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {/* Card 1: Explore Metal X-Ray */}
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
              [ EDUCATION & EXPLORATION ]
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '6px', textTransform: 'uppercase' }}>
              INSPECT PRECIOUS METALS IN SCRAP GADGETS
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '8px' }}>
              Explore the gold, silver, copper, and cobalt yields inside dead phones, laptops, and batteries before quoting rates.
            </p>
          </div>
          <button 
            onClick={onExploreScanner}
            className="btn-kinetic-outline"
            style={{ marginTop: '18px', width: '100%' }}
          >
            <span>LAUNCH AI SPECTROMETER & X-RAY</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 2: Explore CPCB / Cedar Govt Compliance */}
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
              [ RECYCLER NETWORK & COMPLIANCE ]
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '6px', textTransform: 'uppercase' }}>
              CPCB AUTHORIZED FACILITY DIRECTORY
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '8px' }}>
              Find CPCB Tier-1 hydrometallurgical smelters, review Cedar safety policies against hazardous burning, and claim formal recognition.
            </p>
          </div>
          <button 
            onClick={onExploreCedar}
            className="btn-kinetic-outline"
            style={{ marginTop: '18px', width: '100%', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
          >
            <span>INSPECT CEDAR SAFETY POLICIES</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 🧾 DIGITAL PARCHI (रसीद) MODAL */}
      <AnimatePresence>
        {showReceiptModal && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px'
            }}
            onClick={() => setShowReceiptModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--bg-color)',
                border: '3px solid var(--border-color)',
                width: '100%',
                maxWidth: '460px',
                padding: '28px',
                position: 'relative'
              }}
            >
              {/* Receipt Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px dashed var(--border-color)', paddingBottom: '18px', marginBottom: '18px' }}>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.12em' }}>
                  CIRCLO CIVIC FAIR-TRADE PROTOCOL
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
                  मंडी वजन रसीद (DIGITAL SLIP)
                </h3>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', color: 'var(--muted-fg-color)' }}>
                  SLIP #: {receiptNumber}
                </span>
              </div>

              {/* Line items */}
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>RESIDENT:</span>
                  <strong>{customerName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>SECTOR:</span>
                  <strong>{customerArea}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>MATERIAL:</span>
                  <strong>{selectedScrap.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>CERTIFIED WEIGHT:</span>
                  <strong>{weightKg.toFixed(2)} KG</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>ORACLE MANDI RATE:</span>
                  <strong>₹{selectedScrap.rate} / KG</strong>
                </div>
              </div>

              {/* Net Payout */}
              <div style={{
                backgroundColor: 'var(--muted-color)',
                border: '2px solid var(--border-color)',
                padding: '16px',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--muted-fg-color)', display: 'block' }}>
                  CIVIC GUARANTEED CASH PAID
                </span>
                <div style={{ fontFamily: 'var(--font-space)', fontSize: '36px', fontWeight: 900, color: 'var(--accent-color)' }}>
                  ₹{totalScalePayout.toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>
                  ✓ ZERO-TAMPERING CALIBRATION AUDITED
                </span>
              </div>

              {/* Dynamic UPI Payment QR Code Pass */}
              <div style={{
                border: '2px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                padding: '16px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)' }}>
                    DIRECT UPI INSTANT TRANSFER
                  </span>
                  <span style={{ fontSize: '11px', color: isUpiPaid ? '#10b981' : 'var(--muted-fg-color)', fontWeight: 800 }}>
                    {isUpiPaid ? '● PAID & VERIFIED' : '● SCAN TO PAY'}
                  </span>
                </div>

                {/* Scannable High-Contrast UPI QR Code */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #000000',
                  width: '130px',
                  height: '130px',
                  margin: '0 auto 10px auto'
                }}>
                  <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                    <rect x="0" y="0" width="30" height="30" fill="#000" />
                    <rect x="4" y="4" width="22" height="22" fill="#fff" />
                    <rect x="8" y="8" width="14" height="14" fill="#000" />

                    <rect x="80" y="0" width="30" height="30" fill="#000" />
                    <rect x="84" y="4" width="22" height="22" fill="#fff" />
                    <rect x="88" y="8" width="14" height="14" fill="#000" />

                    <rect x="0" y="80" width="30" height="30" fill="#000" />
                    <rect x="4" y="84" width="22" height="22" fill="#fff" />
                    <rect x="8" y="88" width="14" height="14" fill="#000" />

                    <rect x="38" y="4" width="8" height="8" fill="#000" />
                    <rect x="54" y="8" width="8" height="8" fill="#000" />
                    <rect x="66" y="16" width="8" height="8" fill="#000" />
                    <rect x="42" y="24" width="8" height="8" fill="#000" />
                    
                    <rect x="12" y="42" width="8" height="8" fill="#000" />
                    <rect x="26" y="50" width="8" height="8" fill="#000" />
                    <rect x="46" y="46" width="18" height="18" fill="#dfe104" stroke="#000" strokeWidth="2" />
                    <text x="55" y="59" fontSize="10" fontWeight="900" textAnchor="middle" fill="#000">₹</text>

                    <rect x="74" y="42" width="8" height="8" fill="#000" />
                    <rect x="92" y="50" width="8" height="8" fill="#000" />
                    <rect x="38" y="74" width="8" height="8" fill="#000" />
                    <rect x="58" y="82" width="8" height="8" fill="#000" />
                    <rect x="74" y="90" width="8" height="8" fill="#000" />
                    <rect x="92" y="82" width="8" height="8" fill="#000" />
                  </svg>
                </div>

                <div style={{ fontFamily: 'var(--font-space)', fontSize: '11px', color: 'var(--muted-fg-color)' }}>
                  VPA: <strong style={{ color: 'var(--fg-color)' }}>circlo.escrow@icici</strong>
                </div>
                <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800, marginTop: '2px' }}>
                  GOOGLE PAY • PHONEPE • PAYTM • BHIM
                </div>

                <button
                  onClick={() => setIsUpiPaid(prev => !prev)}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-space)',
                    fontWeight: 800,
                    backgroundColor: isUpiPaid ? '#10b98125' : 'var(--muted-color)',
                    border: isUpiPaid ? '1px solid #10b981' : '1px solid var(--border-color)',
                    color: isUpiPaid ? '#10b981' : 'var(--fg-color)',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  {isUpiPaid ? '✓ ₹' + totalScalePayout.toLocaleString('en-IN') + ' UPI PAYMENT CONFIRMED' : 'SIMULATE INSTANT UPI PAYMENT'}
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  onClick={() => {
                    window.open(getWhatsAppReceiptUrl(), '_blank');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#25D366',
                    color: '#000000',
                    fontWeight: 900,
                    fontSize: '13px',
                    fontFamily: 'var(--font-space)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>SHARE PARCHI VIA WHATSAPP</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="btn-kinetic-outline"
                  style={{ width: '100%', gap: '8px' }}
                >
                  <Printer size={16} />
                  <span>PRINT PHYSICAL DOCKET</span>
                </button>

                <button 
                  onClick={() => setShowReceiptModal(false)}
                  style={{
                    padding: '10px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--muted-fg-color)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  CLOSE
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
