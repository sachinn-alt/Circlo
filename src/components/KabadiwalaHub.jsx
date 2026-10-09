import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Truck, 
  MapPin, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  BookOpen, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { COMMODITY_PRICES } from '../data/mockData';

export default function KabadiwalaHub({ onRequestPickup }) {
  const [activeCertificationStep, setActiveCertificationStep] = useState(2);
  const [simulatedLeads, setSimulatedLeads] = useState([
    {
      id: "lead_701",
      residentName: "Priya Sharma",
      area: "Barakhamba Road, Connaught Place",
      distance: "1.4 km",
      items: "2x Server Motherboards + 1x Copper Cooktop Coil",
      estWeight: "2.8 kg",
      guaranteedPayout: "₹760",
      urgency: "HIGH",
      timeAgo: "4 mins ago"
    },
    {
      id: "lead_702",
      residentName: "Vikram Mehta",
      area: "Janpath Residential Enclave",
      distance: "2.1 km",
      items: "5x Old Android Phones + 1x Lithium Powerbank",
      estWeight: "1.5 kg",
      guaranteedPayout: "₹540",
      urgency: "MEDIUM",
      timeAgo: "12 mins ago"
    },
    {
      id: "lead_703",
      residentName: "Apex Solar Clinic",
      area: "Khan Market Commercial",
      distance: "3.2 km",
      items: "1x Discarded Solar Inverter PCB (110g Copper)",
      estWeight: "4.2 kg",
      guaranteedPayout: "₹1,120",
      urgency: "NORMAL",
      timeAgo: "25 mins ago"
    }
  ]);

  return (
    <div className="kabadiwala-hub-container">
      {/* Top Banner */}
      <div className="hub-hero">
        <div className="hub-hero-text">
          <div className="badge-worker-union">
            <ShieldCheck size={14} />
            <span>Civic Informal Recycler Welfare & Fair Trade Portal</span>
          </div>
          <h2>Dignity, Fair Pricing & Safety for Ground Workers</h2>
          <p>
            Eliminating predatory middlemen and toxic backyard burning. Circlo guarantees direct-from-citizen pickup leads, transparent daily commodity rates, and safety gear certifications.
          </p>
        </div>
        <div className="hub-stat-badges">
          <div className="stat-pill">
            <span className="stat-val">+38.5%</span>
            <span className="stat-desc">Avg Monthly Income Increase</span>
          </div>
          <div className="stat-pill">
            <span className="stat-val">100%</span>
            <span className="stat-desc">Digital UPI Escrow Payouts</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 3 Key Sections */}
      <div className="hub-grid">
        {/* Column 1: Live Pickup Leads */}
        <div className="hub-card leads-card">
          <div className="hub-card-header">
            <div>
              <h3>Live Pickup Requests Nearby</h3>
              <p className="card-sub">Instant leads within your operating zone</p>
            </div>
            <span className="live-pill">● {simulatedLeads.length} Available</span>
          </div>

          <div className="leads-list">
            {simulatedLeads.map(lead => (
              <div key={lead.id} className="lead-item">
                <div className="lead-header-row">
                  <span className="lead-resident">{lead.residentName}</span>
                  <span className="lead-payout">{lead.guaranteedPayout}</span>
                </div>
                <div className="lead-address">
                  <MapPin size={13} className="text-cyan" />
                  <span>{lead.area} ({lead.distance})</span>
                </div>
                <div className="lead-items-desc">
                  <strong>Items:</strong> {lead.items}
                </div>
                <div className="lead-footer">
                  <span className="lead-time">{lead.timeAgo}</span>
                  <button 
                    className="btn-accept-lead"
                    onClick={() => alert(`Pickup accepted for ${lead.residentName}! SMS directions sent to your registered phone with digital scale pass.`)}
                  >
                    Accept & Dispatch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Transparent Commodity Spot Bulletin */}
        <div className="hub-card price-board-card">
          <div className="hub-card-header">
            <div>
              <h3>Daily Civic Scrap Floor Rates</h3>
              <p className="card-sub">Enforced by AWS Cedar Policy #2</p>
            </div>
            <span className="badge-cpcb">MCX Spot Linked</span>
          </div>

          <div className="price-table">
            <div className="price-table-header">
              <span>Scrap Category</span>
              <span>Floor Rate</span>
              <span>24h Shift</span>
            </div>
            {COMMODITY_PRICES.slice(0, 6).map(item => (
              <div key={item.id} className="price-row">
                <div className="price-name-col">
                  <strong>{item.name}</strong>
                  <small>{item.category}</small>
                </div>
                <div className="price-val-col">
                  <span className="price-amount">₹{item.pricePerKg}</span>
                  <span className="price-unit">/kg</span>
                </div>
                <div className={`price-trend-col ${item.trend}`}>
                  {item.change24h}
                </div>
              </div>
            ))}
          </div>

          <div className="price-guarantee-note">
            <ShieldCheck size={16} className="text-emerald" />
            <span>
              Brokers offering below these rates are automatically banned from the Circlo network.
            </span>
          </div>
        </div>

        {/* Column 3: Hazmat L2 Safety Certification Pathway */}
        <div className="hub-card safety-card">
          <div className="hub-card-header">
            <div>
              <h3>Hazmat Safety & Certification Pathway</h3>
              <p className="card-sub">Unlock high-value e-waste jobs safely</p>
            </div>
            <Award size={20} className="text-amber" />
          </div>

          <div className="cert-stepper">
            <div className="cert-step completed">
              <div className="step-num"><CheckCircle size={14} /></div>
              <div className="step-content">
                <h4>Level 1: Safe Sort & Non-Ferrous KYC</h4>
                <p>Digital Aadhaar verification & basic segregation certification.</p>
                <span className="step-badge status-done">Completed & Active</span>
              </div>
            </div>

            <div className="cert-step active">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Level 2: Lithium & PCB Non-Toxic Handling</h4>
                <p>Fire retardant storage kit, ESD gloves, respirator training.</p>
                <span className="step-badge status-progress">In Progress (80%)</span>
              </div>
            </div>

            <div className="cert-step locked">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Level 3: Authorized R2 Hub Franchise</h4>
                <p>E-Loader hydraulic crane grant + direct CPCB compliance license.</p>
                <span className="step-badge status-locked">Unlocks at 500 Pickups</span>
              </div>
            </div>
          </div>

          <div className="safety-kit-checklist">
            <h4>Mandatory Daily PPE Gear:</h4>
            <div className="gear-checklist">
              <label><input type="checkbox" defaultChecked /> Level 5 Cut-Resistant Gloves</label>
              <label><input type="checkbox" defaultChecked /> N95 Toxic Fume Respirator</label>
              <label><input type="checkbox" defaultChecked /> Flame-Retardant Battery Pouch</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
