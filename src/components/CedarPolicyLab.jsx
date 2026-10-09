import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  RotateCcw 
} from 'lucide-react';
import { CEDAR_SCENARIOS } from '../data/mockData';
import { evaluateCedarRequest } from '../services/cedarEngine';

export default function CedarPolicyLab({ preselectedBatch }) {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(CEDAR_SCENARIOS[0]);
  const [evaluationResult, setEvaluationResult] = useState(() => 
    evaluateCedarRequest(
      CEDAR_SCENARIOS[0].principal,
      CEDAR_SCENARIOS[0].action,
      CEDAR_SCENARIOS[0].resource,
      CEDAR_SCENARIOS[0].context
    )
  );

  // Editable parameters for live testing
  const [hazardLevel, setHazardLevel] = useState(currentScenario.resource.hazardLevel);
  const [hasHazmatCert, setHasHazmatCert] = useState(
    currentScenario.principal.certifications?.includes("HAZMAT_EWASTE_L2") || false
  );
  const [offeredPrice, setOfferedPrice] = useState(currentScenario.context.offeredPricePerKg || 700);
  const [benchmarkPrice, setBenchmarkPrice] = useState(currentScenario.context.benchmarkPricePerKg || 785);

  const handleSelectScenario = (index) => {
    const sc = CEDAR_SCENARIOS[index];
    setSelectedScenarioIndex(index);
    setCurrentScenario(sc);
    setHazardLevel(sc.resource.hazardLevel);
    setHasHazmatCert(sc.principal.certifications?.includes("HAZMAT_EWASTE_L2") || false);
    setOfferedPrice(sc.context.offeredPricePerKg || 700);
    setBenchmarkPrice(sc.context.benchmarkPricePerKg || 785);

    const res = evaluateCedarRequest(sc.principal, sc.action, sc.resource, sc.context);
    setEvaluationResult(res);
  };

  const handleRunEvaluation = () => {
    const modifiedPrincipal = {
      ...currentScenario.principal,
      certifications: hasHazmatCert 
        ? [...(currentScenario.principal.certifications || []), "HAZMAT_EWASTE_L2"]
        : (currentScenario.principal.certifications || []).filter(c => c !== "HAZMAT_EWASTE_L2")
    };

    const modifiedResource = {
      ...currentScenario.resource,
      hazardLevel: Number(hazardLevel)
    };

    const modifiedContext = {
      ...currentScenario.context,
      offeredPricePerKg: Number(offeredPrice),
      benchmarkPricePerKg: Number(benchmarkPrice)
    };

    const res = evaluateCedarRequest(modifiedPrincipal, currentScenario.action, modifiedResource, modifiedContext);
    setEvaluationResult(res);
  };

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      
      {/* Section Header */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '13px', 
          fontWeight: 800, 
          letterSpacing: '0.12em', 
          color: 'var(--accent-color)' 
        }}>
          [ COMPLIANCE ENGINE // AUTOMATED CITIZEN & WORKER PROTECTIONS ]
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
          FAIR PRICE & SAFETY GUARD.
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '640px', marginTop: '12px' }}>
          Before any scrap hand-off occurs, automated policy rules evaluate the transaction. 
          Brokers cannot bid below the 85% price floor, and hazardous batteries are forbidden without safety gear.
        </p>
      </div>

      {/* 3 Scenario Cards in Hairline Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2px', 
        backgroundColor: 'var(--border-color)',
        border: '2px solid var(--border-color)',
        marginBottom: '32px'
      }}>
        {CEDAR_SCENARIOS.map((sc, idx) => (
          <div 
            key={sc.id}
            style={{
              padding: '28px',
              backgroundColor: selectedScenarioIndex === idx ? 'var(--accent-color)' : 'var(--bg-color)',
              color: selectedScenarioIndex === idx ? '#000000' : 'var(--fg-color)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onClick={() => handleSelectScenario(idx)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 800 }}>
              <span>RULE 0{idx + 1}</span>
              <span style={{ 
                padding: '2px 8px', 
                backgroundColor: sc.expectedDecision === 'ALLOW' ? '#000000' : '#dc2626',
                color: sc.expectedDecision === 'ALLOW' ? 'var(--accent-color)' : '#ffffff',
                fontSize: '11px'
              }}>
                {sc.expectedDecision}
              </span>
            </div>
            <h4 style={{ 
              fontSize: '20px', 
              fontWeight: 800, 
              textTransform: 'uppercase',
              color: selectedScenarioIndex === idx ? '#000000' : 'var(--fg-color)'
            }}>
              {sc.title}
            </h4>
            <p style={{ 
              fontSize: '13px', 
              color: selectedScenarioIndex === idx ? 'rgba(0,0,0,0.8)' : 'var(--muted-fg-color)',
              marginTop: '6px'
            }}>
              {sc.triggerPolicy}
            </p>
          </div>
        ))}
      </div>

      {/* Decision Banner (Massive Kinetic Announcement) */}
      <div style={{ 
        padding: '32px', 
        backgroundColor: evaluationResult.decision === 'ALLOW' ? 'var(--accent-color)' : '#991b1b',
        color: evaluationResult.decision === 'ALLOW' ? '#000000' : '#ffffff',
        border: '2px solid var(--border-color)',
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '14px', fontWeight: 800, letterSpacing: '0.1em' }}>
            AUTOMATED VERDICT:
          </span>
          <div style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1 }}>
            {evaluationResult.decision === 'ALLOW' ? 'TRADE AUTHORIZED [PERMITTED]' : 'ACTION FORBIDDEN [BLOCKED]'}
          </div>
          <p style={{ 
            fontFamily: 'var(--font-inter)', 
            fontSize: '16px', 
            fontWeight: 600, 
            marginTop: '8px',
            color: evaluationResult.decision === 'ALLOW' ? '#000000' : '#ffffff'
          }}>
            {evaluationResult.explanation}
          </p>
        </div>

        <div style={{ 
          padding: '16px 24px', 
          backgroundColor: '#000000', 
          color: 'var(--accent-color)', 
          fontFamily: 'var(--font-space)',
          fontSize: '14px',
          fontWeight: 800,
          border: '2px solid #000000'
        }}>
          LATENCY: {evaluationResult.latencyMs} MS
        </div>
      </div>

      {/* Interactive Parameter Controls */}
      <div style={{ 
        border: '2px solid var(--border-color)', 
        backgroundColor: 'var(--muted-color)', 
        padding: '32px' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase' }}>
            TEST LIVE PRICE & HAZARD CONTROLS
          </h3>
          <button 
            className="btn-kinetic-primary"
            style={{ height: '42px', padding: '0 20px', fontSize: '13px' }}
            onClick={handleRunEvaluation}
          >
            <Play size={15} />
            <span>REEVALUATE RULE ENGINE</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              OFFERED PRICE PER KG: ₹{offeredPrice}
            </label>
            <input 
              type="range" 
              min="200" 
              max="1000" 
              step="10" 
              value={offeredPrice}
              onChange={(e) => setOfferedPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-color)' }}
            />
            <span style={{ fontSize: '12px', color: 'var(--muted-fg-color)' }}>
              Benchmark floor: ₹{(benchmarkPrice * 0.85).toFixed(0)} (85% rule)
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              MATERIAL HAZARD LEVEL: LVL {hazardLevel}
            </label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={hazardLevel}
              onChange={(e) => setHazardLevel(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-color)' }}
            />
            <span style={{ fontSize: '12px', color: 'var(--muted-fg-color)' }}>
              Levels 3-5 require Hazmat certification
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              WORKER CERTIFICATION
            </label>
            <button
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--border-color)',
                backgroundColor: hasHazmatCert ? 'var(--accent-color)' : 'var(--bg-color)',
                color: hasHazmatCert ? '#000000' : 'var(--fg-color)',
                fontWeight: 800,
                fontSize: '13px'
              }}
              onClick={() => setHasHazmatCert(!hasHazmatCert)}
            >
              {hasHazmatCert ? '✅ HAZMAT L2 CERTIFIED' : '❌ STANDARD COLLECTOR'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
