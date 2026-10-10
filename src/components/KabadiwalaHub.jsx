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
  RotateCcw,
  Volume2,
  Factory,
  Truck,
  Trash2,
  BookOpen,
  HeartPulse,
  Building2,
  CheckCheck
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

const CPCB_SMELTERS = [
  {
    id: 'attero',
    name: 'ATTERO RECYCLING PVT LTD',
    location: 'Roorkee, UK / Greater Noida Hub',
    cpcbReg: 'CPCB/HW-EW/REG/07-2021',
    capacity: '144,000 MT/Year',
    materialFocus: 'High-Grade Telecom PCBs & Multi-Pin ICs',
    bonusPerKg: 25,
    minLotKg: 20,
    factoryPricePerKg: 445,
    pickupSchedule: 'Tomorrow, 09:30 AM (Electric Freight Van)',
    escrowSla: 'Within 60 Mins of Gate Weight Calibration'
  },
  {
    id: 'eparisaraa',
    name: 'E-PARISARAA RECYCLING HUB',
    location: 'Doddaballapur, Bengaluru / Hubballi',
    cpcbReg: 'CPCB/HW-EW/REG/08-2020',
    capacity: '90,000 MT/Year',
    materialFocus: 'Grade 1 Copper Harnesses & Server Motherboards',
    bonusPerKg: 30,
    minLotKg: 35,
    factoryPricePerKg: 770,
    pickupSchedule: 'Daily 02:00 PM (Direct Dock Route)',
    escrowSla: 'Instant RTGS/UPI on Gate Verification'
  },
  {
    id: 'greenwaves',
    name: 'GREEN WAVES ECO SOLUTIONS',
    location: 'Sector 63 Noida / Okhla Phase-II',
    cpcbReg: 'CPCB/HW-EW/REG/12-2023',
    capacity: '60,000 MT/Year',
    materialFocus: 'Swollen Li-Ion & Cobalt Phone Batteries',
    bonusPerKg: 20,
    minLotKg: 15,
    factoryPricePerKg: 215,
    pickupSchedule: 'Today, 06:00 PM (Emergency Hazmat Van)',
    escrowSla: 'Direct CPCB Mandated Escrow Deposit'
  }
];

const INITIAL_KHATA = [
  {
    id: 'kht_01',
    time: '10:15 AM',
    resident: 'Priya Sharma (Barakhamba)',
    material: 'Grade 1 Copper Wire',
    weight: '3.5 kg',
    payout: 2590,
    mode: 'UPI',
    co2Kg: 5.2
  },
  {
    id: 'kht_02',
    time: '11:45 AM',
    resident: 'Apex Clinic (Khan Market)',
    material: 'Solar Inverter PCB',
    weight: '4.2 kg',
    payout: 1764,
    mode: 'Cash',
    co2Kg: 7.8
  },
  {
    id: 'kht_03',
    time: '01:10 PM',
    resident: 'Vikram Mehta (Janpath)',
    material: 'Server Motherboards',
    weight: '1.5 kg',
    payout: 630,
    mode: 'UPI',
    co2Kg: 2.7
  }
];

export default function KabadiwalaHub({ onRequestPickup, onExploreScanner, onExploreCedar, onExploreMap }) {
  const commodityPrices = getLiveCommodityPrices();
  const oracleMeta = getOracleMetadata();

  // Sub-Navigation State (Segmented control)
  const [activeHubSubTab, setActiveHubSubTab] = useState('scale'); // 'scale' | 'smelter' | 'khata'

  // Digital Scale State
  const [selectedScrap, setSelectedScrap] = useState(SCALE_SCRAP_ITEMS[0]);
  const [weightKg, setWeightKg] = useState(3.5);
  const [customerName, setCustomerName] = useState('Priya Sharma');
  const [customerArea, setCustomerArea] = useState('Barakhamba Road');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('CIRCLO-KANTA-8821');
  const [isUpiPaid, setIsUpiPaid] = useState(false);

  // Multi-Item Weighing Cart State
  const [cartItems, setCartItems] = useState([]);

  // Soundbox Voice Readout State
  const [isSoundboxActive, setIsSoundboxActive] = useState(false);
  const [soundboxMessage, setSoundboxMessage] = useState('');

  // Bulk Smelter Off-Take State
  const [selectedSmelter, setSelectedSmelter] = useState(null);
  const [showConsignmentModal, setShowConsignmentModal] = useState(false);
  const [consignmentManifestId, setConsignmentManifestId] = useState('');

  // Aaj Ka Khata State
  const [khataEntries, setKhataEntries] = useState(INITIAL_KHATA);
  const [showAddKhataForm, setShowAddKhataForm] = useState(false);
  const [newKhataResident, setNewKhataResident] = useState('');
  const [newKhataMaterial, setNewKhataMaterial] = useState('Grade 1 Copper Wire');
  const [newKhataWeight, setNewKhataWeight] = useState('2.0');
  const [newKhataPayout, setNewKhataPayout] = useState('1480');
  const [newKhataMode, setNewKhataMode] = useState('UPI');

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

  // Calculations for Single vs Multi-Item Scale
  const currentItemPayout = Math.round(weightKg * selectedScrap.rate);

  const effectiveItems = cartItems.length > 0 
    ? cartItems 
    : [{
        cartId: 'single-current',
        id: selectedScrap.id,
        name: selectedScrap.name,
        rate: selectedScrap.rate,
        unit: selectedScrap.unit,
        icon: selectedScrap.icon,
        weight: parseFloat(weightKg),
        payout: currentItemPayout
      }];

  const totalEffectiveWeight = effectiveItems.reduce((acc, it) => acc + it.weight, 0);
  const totalEffectivePayout = effectiveItems.reduce((acc, it) => acc + it.payout, 0);

  // Cart Handlers
  const handleAddToCart = () => {
    const newItem = {
      cartId: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      id: selectedScrap.id,
      name: selectedScrap.name,
      rate: selectedScrap.rate,
      unit: selectedScrap.unit,
      icon: selectedScrap.icon,
      weight: parseFloat(weightKg),
      payout: currentItemPayout
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const handleRemoveFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Soundbox Voice Readout Handler
  const handleTriggerSoundbox = () => {
    const amount = totalEffectivePayout;
    const weight = totalEffectiveWeight;
    setIsSoundboxActive(true);
    setSoundboxMessage(`CIRCLO KANTA: ${weight.toFixed(2)} KG • ₹${amount.toLocaleString('en-IN')} VERIFIED`);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const hindiUtterance = new SpeechSynthesisUtterance(
        `सर्कलो डिजिटल कांटा. कुल वजन ${weight.toFixed(1)} किलो. कुल भुगतान ${amount} रुपये सफल!`
      );
      hindiUtterance.rate = 0.92;
      hindiUtterance.pitch = 1.0;

      hindiUtterance.onerror = () => {
        const engUtterance = new SpeechSynthesisUtterance(
          `Circlo digital scale. Net weight ${weight.toFixed(1)} kilograms. Total payment ${amount} rupees confirmed!`
        );
        engUtterance.rate = 0.95;
        window.speechSynthesis.speak(engUtterance);
      };

      window.speechSynthesis.speak(hindiUtterance);
    }

    setTimeout(() => {
      setIsSoundboxActive(false);
    }, 4500);
  };

  // Consignment Handlers
  const handleOpenConsignmentModal = (smelter) => {
    setSelectedSmelter(smelter);
    setConsignmentManifestId(`CPCB-MANIFEST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setShowConsignmentModal(true);
  };

  // Khata Handlers
  const handleAddKhataEntry = (e) => {
    e.preventDefault();
    if (!newKhataResident.trim()) return;

    const newEntry = {
      id: `kht_${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      resident: newKhataResident.trim(),
      material: newKhataMaterial,
      weight: `${parseFloat(newKhataWeight || 1.0).toFixed(1)} kg`,
      payout: parseInt(newKhataPayout || 500, 10),
      mode: newKhataMode,
      co2Kg: +(parseFloat(newKhataWeight || 1.0) * 1.5).toFixed(1)
    };

    setKhataEntries(prev => [newEntry, ...prev]);
    setNewKhataResident('');
    setShowAddKhataForm(false);
  };

  const handleClaimLead = (lead) => {
    setClaimedLeads(prev => ({ ...prev, [lead.id]: true }));
  };

  const handleOpenReceiptModal = () => {
    setReceiptNumber(`CIRCLO-KANTA-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsUpiPaid(false);
    setShowReceiptModal(true);
  };

  const getWhatsAppReceiptUrl = () => {
    const itemLines = effectiveItems.map((it, idx) => 
      `${idx + 1}. ${it.name}: ${it.weight.toFixed(2)} kg @ ₹${it.rate}/kg = ₹${it.payout.toLocaleString('en-IN')}`
    ).join('\n');

    const text = 
`*⚖️ CIRCLO VERIFIED DIGITAL SCALE RECEIPT (डिजिटल कांटा रसीद)*
----------------------------------------
🧾 *Receipt #:* ${receiptNumber}
👤 *Resident:* ${customerName}
📍 *Location:* ${customerArea}
📦 *Scrap Items:*
${itemLines}
----------------------------------------
⚖️ *Total Net Weight:* ${totalEffectiveWeight.toFixed(2)} kg
💵 *Total Paid Cash / UPI:* ₹${totalEffectivePayout.toLocaleString('en-IN')}
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
        style={{ marginBottom: '24px' }}
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

      {/* 🧭 Neo-Brutalist 3-Pill Segmented Hub Navigator */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '28px',
        backgroundColor: 'var(--muted-color)',
        padding: '6px',
        border: '2px solid var(--border-color)'
      }}>
        {[
          { id: 'scale', label: '01 // DIGITAL SCALE & SOUNDBOX (कांटा)', icon: Scale },
          { id: 'smelter', label: '02 // DIRECT CPCB REFINERY PASS (बड़ी रिफाइनरी)', icon: Factory },
          { id: 'khata', label: '03 // AAJ KA KHATA & DIGNITY (खाता व सुरक्षा)', icon: BookOpen }
        ].map((tab) => {
          const isActive = activeHubSubTab === tab.id;
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveHubSubTab(tab.id)}
              style={{
                flex: '1 1 200px',
                padding: '12px 16px',
                backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                color: isActive ? '#000000' : 'var(--fg-color)',
                border: isActive ? '2px solid #000000' : '2px solid transparent',
                fontFamily: 'var(--font-space)',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <IconComp size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-VIEW 1: ⚖️ DIGITAL WEIGHING SCALE (कांटा) & SOUNDBOX */}
      {activeHubSubTab === 'scale' && (
        <motion.div 
          key="scale-subtab"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
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

              {/* 🔊 Soundbox Trigger Button */}
              <button
                onClick={handleTriggerSoundbox}
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '11px',
                  fontWeight: 900,
                  padding: '5px 12px',
                  backgroundColor: isSoundboxActive ? '#dfe104' : '#000000',
                  color: isSoundboxActive ? '#000000' : '#dfe104',
                  border: '2px solid var(--accent-color)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Volume2 size={15} />
                <span>SOUNDBOX READOUT (बोलने वाला कांटा)</span>
              </button>
            </div>
          </div>

          {/* Soundbox Voice Broadcast Banner */}
          {isSoundboxActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: '#dfe104',
                color: '#000000',
                padding: '12px 18px',
                marginBottom: '20px',
                border: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-space)',
                fontWeight: 900,
                fontSize: '13px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Volume2 size={20} />
                <span>🔊 SOUNDBOX BROADCAST: "{soundboxMessage}"</span>
              </div>
              <span style={{ fontSize: '11px', backgroundColor: '#000000', color: '#ffffff', padding: '2px 8px' }}>
                AUDIO ANNOUNCEMENT ACTIVE
              </span>
            </motion.div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Left Column: Scrap Selector & Weight Controls */}
            <div>
              <label style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--muted-fg-color)', display: 'block', marginBottom: '8px' }}>
                SELECT SCRAP CATEGORY
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '16px' }}>
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
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px' }}>
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

              {/* Multi-Item Cart Actions */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button
                  onClick={handleAddToCart}
                  className="btn-kinetic-primary"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '12px', gap: '6px' }}
                >
                  <Plus size={15} />
                  <span>+ ADD THIS ITEM TO PARCHI BATCH</span>
                </button>
                {cartItems.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="btn-kinetic-outline"
                    style={{ padding: '10px 14px', fontSize: '12px' }}
                  >
                    CLEAR BATCH
                  </button>
                )}
              </div>

              {/* Cart Items List */}
              {cartItems.length > 0 && (
                <div style={{
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--muted-color)',
                  padding: '14px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-space)', fontWeight: 800, marginBottom: '8px', color: 'var(--accent-color)' }}>
                    <span>ITEMS IN CURRENT BATCH ({cartItems.length})</span>
                    <span>NET: {totalEffectiveWeight.toFixed(2)} KG</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {cartItems.map((cItem) => (
                      <div 
                        key={cItem.cartId}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'var(--bg-color)',
                          padding: '6px 10px',
                          border: '1px solid var(--border-color)',
                          fontSize: '12px'
                        }}
                      >
                        <div>
                          <strong>{cItem.icon} {cItem.name}</strong>
                          <span style={{ color: 'var(--muted-fg-color)', marginLeft: '8px', fontSize: '11px' }}>
                            ({cItem.weight.toFixed(1)} kg @ ₹{cItem.rate})
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-space)' }}>
                            ₹{cItem.payout.toLocaleString('en-IN')}
                          </strong>
                          <button
                            onClick={() => handleRemoveFromCart(cItem.cartId)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                            title="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                    {cartItems.length > 0 ? `BATCH TOTAL (${cartItems.length} ITEMS)` : 'STATUTORY MANDI PAYOUT'}
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
                  ₹{totalEffectivePayout.toLocaleString('en-IN')}
                </div>

                <div style={{ fontSize: '13px', color: 'var(--muted-fg-color)', lineHeight: 1.5 }}>
                  {cartItems.length > 0 ? (
                    <span>Total Net Weight: <strong>{totalEffectiveWeight.toFixed(2)} kg</strong> across {cartItems.length} scrap items</span>
                  ) : (
                    <span>{weightKg.toFixed(2)} kg × ₹{selectedScrap.rate}/kg ({selectedScrap.name})</span>
                  )}
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
      )}

      {/* SUB-VIEW 2: 🏭 DIRECT CPCB REFINERY WHOLESALE OFF-TAKE BOARD */}
      {activeHubSubTab === 'smelter' && (
        <motion.div 
          key="smelter-subtab"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--bg-color)',
            padding: 'clamp(20px, 4vw, 36px)',
            marginBottom: '36px'
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
              [ BROKER BYPASS // सीधा बड़ी रिफाइनरी से बिक्री ]
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
              CPCB TIER-1 SMELTER & REFINERY OFF-TAKE BOARD
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '8px', maxWidth: '720px' }}>
              Predatory middlemen take 30-40% cuts from informal scrap workers. Circlo connects certified collectors directly with CPCB registered hydrometallurgical refineries with guaranteed floor bonuses and direct escrow deposits.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px' }}>
            {CPCB_SMELTERS.map((smelter) => (
              <div 
                key={smelter.id}
                style={{
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--muted-color)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ 
                      fontFamily: 'var(--font-space)', 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      backgroundColor: '#10b98120', 
                      color: '#10b981', 
                      padding: '3px 8px', 
                      border: '1px solid #10b981' 
                    }}>
                      +{smelter.bonusPerKg} ₹/KG FACTORY PREMIUM
                    </span>
                    <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', color: 'var(--muted-fg-color)' }}>
                      LOT: &gt;{smelter.minLotKg} KG
                    </span>
                  </div>

                  <h4 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase' }}>
                    {smelter.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
                    📍 {smelter.location}
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--accent-color)', marginTop: '4px' }}>
                    REG: {smelter.cpcbReg}
                  </div>

                  <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted-fg-color)' }}>
                      MATERIAL FOCUS: <strong style={{ color: 'var(--fg-color)' }}>{smelter.materialFocus}</strong>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
                      NEXT TRUCK: <strong style={{ color: 'var(--fg-color)' }}>{smelter.pickupSchedule}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '20px', borderTop: '2px solid var(--border-color)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)' }}>
                      DIRECT MANDI RATE:
                    </span>
                    <strong style={{ fontFamily: 'var(--font-space)', fontSize: '26px', color: 'var(--accent-color)' }}>
                      ₹{smelter.factoryPricePerKg}
                      <small style={{ fontSize: '12px', color: 'var(--fg-color)' }}>/kg</small>
                    </strong>
                  </div>

                  <button
                    onClick={() => handleOpenConsignmentModal(smelter)}
                    className="btn-kinetic-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '12px', gap: '6px' }}
                  >
                    <Truck size={15} />
                    <span>GENERATE BULK CONSIGNMENT PASS (FORM 6)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* SUB-VIEW 3: 🛡️ AAJ KA KHATA & DIGNITY PASSPORT */}
      {activeHubSubTab === 'khata' && (
        <motion.div 
          key="khata-subtab"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--bg-color)',
            padding: 'clamp(20px, 4vw, 36px)',
            marginBottom: '36px'
          }}
        >
          {/* Summary Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            <div style={{ border: '2px solid var(--border-color)', backgroundColor: 'var(--muted-color)', padding: '16px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)', fontWeight: 800 }}>
                TODAY'S CASH EARNED
              </span>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '28px', fontWeight: 900, color: 'var(--accent-color)', margin: '4px 0' }}>
                ₹{khataEntries.reduce((sum, e) => sum + e.payout, 0).toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>✓ DIRECT BANK & CASH</span>
            </div>

            <div style={{ border: '2px solid var(--border-color)', backgroundColor: 'var(--muted-color)', padding: '16px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)', fontWeight: 800 }}>
                E-WASTE INTERCEPTED
              </span>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '28px', fontWeight: 900, color: 'var(--fg-color)', margin: '4px 0' }}>
                9.2 KG
              </div>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', fontWeight: 800 }}>ACROSS {khataEntries.length} PICKUPS</span>
            </div>

            <div style={{ border: '2px solid var(--border-color)', backgroundColor: 'var(--muted-color)', padding: '16px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)', fontWeight: 800 }}>
                CO₂ EMISSIONS SAVED
              </span>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '28px', fontWeight: 900, color: '#10b981', margin: '4px 0' }}>
                15.7 KG
              </div>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>DIVERTED FROM BURNING</span>
            </div>

            <div style={{ border: '2px solid var(--border-color)', backgroundColor: 'var(--muted-color)', padding: '16px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)', fontWeight: 800 }}>
                SAFETY LEVEL
              </span>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '28px', fontWeight: 900, color: 'var(--accent-color)', margin: '4px 0' }}>
                HAZMAT L2
              </div>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>CPCB NO-BURN COMPLIANT</span>
            </div>
          </div>

          {/* Social Security & Dignity Passport */}
          <div style={{
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--muted-color)',
            padding: '20px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--accent-color)' }}>
                [ GRASSROOTS SOCIAL DIGNITY PASSPORT // श्रम कार्ड एवं सुरक्षा ]
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: '#10b981', fontWeight: 800 }}>
                ● ACTIVE GOVT WELFARE LINKAGE
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '14px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', display: 'block' }}>E-SHRAM IDENTITY CARD</span>
                <strong style={{ fontFamily: 'var(--font-space)', fontSize: '15px' }}>#IN-DL-882194-EW</strong>
                <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>✓ Ministry of Labour & Employment Verified</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '14px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', display: 'block' }}>AYUSHMAN BHARAT (PM-JAY)</span>
                <strong style={{ fontFamily: 'var(--font-space)', fontSize: '15px' }}>₹5,00,000 / YR FAMILY COVER</strong>
                <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>✓ Free Tetanus & Lead Screening Active</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '14px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', display: 'block' }}>CPCB HAZMAT CERTIFICATION</span>
                <strong style={{ fontFamily: 'var(--font-space)', fontSize: '15px' }}>LEVEL 2 (ZERO OPEN BURNING)</strong>
                <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>✓ Free N95 & Nitrile Safety Kit Claimed</div>
              </div>
            </div>
          </div>

          {/* Daily Ledger Table Header & Add Entry */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase' }}>
                AAJ KA KHATA (TODAY'S COLLECTION ENTRIES)
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--muted-fg-color)' }}>
                Offline and online door-to-door scrap ledger. Never lose track of payments.
              </p>
            </div>

            <button
              onClick={() => setShowAddKhataForm(prev => !prev)}
              className="btn-kinetic-primary"
              style={{ padding: '8px 16px', fontSize: '12px', gap: '6px' }}
            >
              <Plus size={15} />
              <span>{showAddKhataForm ? 'CLOSE ENTRY FORM' : '+ ADD QUICK ENTRY (खाते में जोड़ें)'}</span>
            </button>
          </div>

          {/* Add Entry Form */}
          {showAddKhataForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddKhataEntry}
              style={{
                border: '2px solid var(--accent-color)',
                backgroundColor: 'var(--muted-color)',
                padding: '16px',
                marginBottom: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px'
              }}
            >
              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)', display: 'block', marginBottom: '4px' }}>
                  RESIDENT / LOCATION
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma (Rohini)"
                  value={newKhataResident}
                  onChange={(e) => setNewKhataResident(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--fg-color)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)', display: 'block', marginBottom: '4px' }}>
                  MATERIAL
                </label>
                <select
                  value={newKhataMaterial}
                  onChange={(e) => setNewKhataMaterial(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--fg-color)', outline: 'none' }}
                >
                  {SCALE_SCRAP_ITEMS.map(it => (
                    <option key={it.id} value={it.name}>{it.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)', display: 'block', marginBottom: '4px' }}>
                  WEIGHT (KG)
                </label>
                <input 
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={newKhataWeight}
                  onChange={(e) => setNewKhataWeight(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--fg-color)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontFamily: 'var(--font-space)', color: 'var(--muted-fg-color)', display: 'block', marginBottom: '4px' }}>
                  PAYOUT AMOUNT (₹)
                </label>
                <input 
                  type="number"
                  min="10"
                  value={newKhataPayout}
                  onChange={(e) => setNewKhataPayout(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--fg-color)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  type="submit"
                  className="btn-kinetic-primary"
                  style={{ width: '100%', padding: '8px', fontSize: '12px' }}
                >
                  SAVE ENTRY TO KHATA
                </button>
              </div>
            </motion.form>
          )}

          {/* Ledger Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-space)', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--muted-color)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>TIME</th>
                  <th style={{ padding: '10px 12px' }}>RESIDENT / SECTOR</th>
                  <th style={{ padding: '10px 12px' }}>MATERIAL</th>
                  <th style={{ padding: '10px 12px' }}>WEIGHT</th>
                  <th style={{ padding: '10px 12px' }}>PAYOUT</th>
                  <th style={{ padding: '10px 12px' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {khataEntries.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '10px 12px', color: 'var(--muted-fg-color)' }}>{row.time}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 800 }}>{row.resident}</td>
                    <td style={{ padding: '10px 12px' }}>{row.material}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 800 }}>{row.weight}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 900, color: 'var(--accent-color)' }}>
                      ₹{row.payout.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#10b981', fontWeight: 800 }}>
                      ✓ {row.mode} SETTLED
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Daily Scrap Market Ticker Grid (Always visible for real-time commodity transparency & Playwright tests) */}
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

      {/* 🧾 DIGITAL PARCHI (रसीद) MODAL WITH MULTI-ITEM SUPPORT & DYNAMIC UPI QR */}
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
                maxWidth: '480px',
                padding: '28px',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              {/* Receipt Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px dashed var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
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

              {/* Customer & Location */}
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>RESIDENT:</span>
                  <strong>{customerName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>SECTOR:</span>
                  <strong>{customerArea}</strong>
                </div>
              </div>

              {/* Itemized Table */}
              <div style={{
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--muted-color)',
                padding: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-space)', fontWeight: 800, color: 'var(--accent-color)', marginBottom: '8px' }}>
                  ITEMIZED WEIGHING DOCKET:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  {effectiveItems.map((item, iIdx) => (
                    <div key={item.cartId || iIdx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '4px' }}>
                      <div>
                        <strong>{item.name}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--muted-fg-color)' }}>
                          {item.weight.toFixed(2)} kg × ₹{item.rate}/kg
                        </div>
                      </div>
                      <strong style={{ fontFamily: 'var(--font-space)', color: 'var(--accent-color)' }}>
                        ₹{item.payout.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '2px solid var(--border-color)', fontSize: '12px', fontWeight: 800 }}>
                  <span>NET CERTIFIED WEIGHT:</span>
                  <span>{totalEffectiveWeight.toFixed(2)} KG</span>
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
                  ₹{totalEffectivePayout.toLocaleString('en-IN')}
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
                  {isUpiPaid ? '✓ ₹' + totalEffectivePayout.toLocaleString('en-IN') + ' UPI PAYMENT CONFIRMED' : 'SIMULATE INSTANT UPI PAYMENT'}
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

      {/* 📦 CPCB FORM 6 BULK CONSIGNMENT PASS MODAL */}
      <AnimatePresence>
        {showConsignmentModal && selectedSmelter && (
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
            onClick={() => setShowConsignmentModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--bg-color)',
                border: '3px solid var(--accent-color)',
                width: '100%',
                maxWidth: '520px',
                padding: '28px',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ textAlign: 'center', borderBottom: '2px dashed var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.12em' }}>
                  CENTRAL POLLUTION CONTROL BOARD (CPCB)
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
                  HAZARDOUS MOVEMENT MANIFEST (FORM 6)
                </h3>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', color: 'var(--muted-fg-color)' }}>
                  MANIFEST #: {consignmentManifestId}
                </span>
              </div>

              <div style={{
                backgroundColor: 'var(--muted-color)',
                border: '1px solid var(--border-color)',
                padding: '16px',
                marginBottom: '18px',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>CONSIGNOR (COLLECTOR):</span>
                  <strong>RAM LAKHAN (ID #IN-DL-88219)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>CONSIGNEE (REFINERY):</span>
                  <strong style={{ color: 'var(--accent-color)' }}>{selectedSmelter.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>CPCB REGISTRATION:</span>
                  <strong>{selectedSmelter.cpcbReg}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>DIRECT FACTORY RATE:</span>
                  <strong>₹{selectedSmelter.factoryPricePerKg} / KG (+₹{selectedSmelter.bonusPerKg} PREMIUM)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>MINIMUM CONSIGNMENT:</span>
                  <strong>&gt;{selectedSmelter.minLotKg} KG BATCH</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-fg-color)' }}>ESCROW SETTLEMENT:</span>
                  <strong style={{ color: '#10b981' }}>{selectedSmelter.escrowSla}</strong>
                </div>
              </div>

              {/* Truck Route Status */}
              <div style={{
                border: '1px solid #10b981',
                backgroundColor: '#10b98115',
                padding: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Truck size={22} color="#10b981" />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: '#10b981', fontFamily: 'var(--font-space)' }}>
                    LOGISTICS PICKUP CONFIRMED:
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--fg-color)' }}>
                    {selectedSmelter.pickupSchedule}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => {
                    const text = `*📦 CPCB HAZARDOUS MOVEMENT MANIFEST (FORM 6)*\nManifest: ${consignmentManifestId}\nRefinery: ${selectedSmelter.name}\nDirect Rate: ₹${selectedSmelter.factoryPricePerKg}/kg\nCollector: Ram Lakhan (#IN-DL-88219)\nTruck: ${selectedSmelter.pickupSchedule}\nUnder CPCB E-Waste Rules 2022.`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
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
                  <span>DISPATCH MANIFEST TO TRUCK DRIVER VIA WHATSAPP</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="btn-kinetic-outline"
                  style={{ width: '100%', gap: '8px' }}
                >
                  <Printer size={16} />
                  <span>PRINT STATUTORY MANIFEST (FORM 6)</span>
                </button>

                <button
                  onClick={() => setShowConsignmentModal(false)}
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
