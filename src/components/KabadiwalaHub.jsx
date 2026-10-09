import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Scale, 
  Coins, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { COMMODITY_PRICES } from '../data/mockData';

export default function KabadiwalaHub({ onRequestPickup }) {
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
      <div className="commodity-ticker-grid">
        {COMMODITY_PRICES.map((item, idx) => (
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
              transition: 'background-color 0.2s ease'
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
        padding: 'clamp(16px, 4vw, 32px)' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase' }}>
            ACTIVE PICKUP LEADS IN YOUR SECTOR
          </h3>
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
          {leads.map((lead, lIdx) => (
            <motion.div 
              key={lead.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: lIdx * 0.1 }}
              whileHover={{ y: -4, borderColor: 'var(--accent-color)' }}
              style={{
                backgroundColor: 'var(--bg-color)',
                border: '2px solid var(--border-color)',
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

              <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', display: 'block' }}>WEIGHT: {lead.weight}</span>
                  <strong style={{ fontFamily: 'var(--font-space)', fontSize: '20px', color: 'var(--accent-color)' }}>
                    {lead.payout}
                  </strong>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-kinetic-primary"
                  style={{ height: '36px', padding: '0 14px', fontSize: '12px' }}
                  onClick={() => alert(`Accepted pickup lead from ${lead.resident}! Route dispatched.`)}
                >
                  <span>ACCEPT</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
