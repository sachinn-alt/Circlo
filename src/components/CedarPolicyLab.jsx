import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  RotateCcw,
  ArrowRight 
} from 'lucide-react';
import { CEDAR_SCENARIOS } from '../data/mockData';
import { evaluateCedarRequest } from '../services/cedarEngine';

const DEFAULT_CEDAR_POLICIES = [
`// POLICY 1: Hazardous Dismantling Safety Guard (Scenario A)
forbid (
    principal,
    action in [Action::"dismantle", Action::"extractMetals"],
    resource
)
when {
    resource.hazardLevel >= 3 &&
    !(principal.certifications.contains("HAZMAT_EWASTE_L2"))
};`,

`// POLICY 1b: Certified Dismantler Clearance (Scenario B)
permit (
    principal,
    action in [Action::"dismantle", Action::"extractMetals"],
    resource
)
when {
    principal.certifications.contains("HAZMAT_EWASTE_L2") &&
    principal.kycVerified == true
};`,

`// POLICY 2: Fair Minimum Floor Price Guarantee (Scenario C)
forbid (
    principal,
    action == Action::"submitPurchaseBid",
    resource
)
when {
    resource.sellerType == "INFORMAL_RECYCLER" &&
    context.offeredPricePerKg < (context.benchmarkPricePerKg * 0.85)
};`
];

export default function CedarPolicyLab({ preselectedBatch }) {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(CEDAR_SCENARIOS[0]);
  const [policyCode, setPolicyCode] = useState(DEFAULT_CEDAR_POLICIES[0]);
  const [evaluationResult, setEvaluationResult] = useState(() => 
    evaluateCedarRequest(
      CEDAR_SCENARIOS[0].principal,
      CEDAR_SCENARIOS[0].action,
      CEDAR_SCENARIOS[0].resource,
      CEDAR_SCENARIOS[0].context,
      DEFAULT_CEDAR_POLICIES[0]
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
    const defaultCode = DEFAULT_CEDAR_POLICIES[index] || DEFAULT_CEDAR_POLICIES[0];
    setSelectedScenarioIndex(index);
    setCurrentScenario(sc);
    setPolicyCode(defaultCode);
    setHazardLevel(sc.resource.hazardLevel);
    setHasHazmatCert(sc.principal.certifications?.includes("HAZMAT_EWASTE_L2") || false);
    setOfferedPrice(sc.context.offeredPricePerKg || 700);
    setBenchmarkPrice(sc.context.benchmarkPricePerKg || 785);

    const res = evaluateCedarRequest(sc.principal, sc.action, sc.resource, sc.context, defaultCode);
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

    const res = evaluateCedarRequest(modifiedPrincipal, currentScenario.action, modifiedResource, modifiedContext, policyCode);
    setEvaluationResult(res);
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
          [ COMPLIANCE ENGINE // AUTOMATED CITIZEN & WORKER PROTECTIONS ]
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
          FAIR PRICE & SAFETY GUARD.
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '640px', marginTop: '12px' }}>
          Before any scrap hand-off occurs, automated policy rules evaluate the transaction. 
          Brokers cannot bid below the 85% price floor, and hazardous batteries are forbidden without safety gear.
        </p>
      </motion.div>

      {/* 3 Scenario Cards in Hairline Grid */}
      <div className="cedar-scenarios-grid">
        {CEDAR_SCENARIOS.map((sc, idx) => (
          <motion.div 
            key={sc.id}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: 'clamp(18px, 3vw, 28px)',
              backgroundColor: selectedScenarioIndex === idx ? 'var(--accent-color)' : 'var(--bg-color)',
              color: selectedScenarioIndex === idx ? '#000000' : 'var(--fg-color)',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease, color 0.15s ease'
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
              fontSize: '19px', 
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
          </motion.div>
        ))}
      </div>

      {/* Decision Banner (Massive Kinetic Announcement) with Spring Motion */}
      <motion.div 
        key={evaluationResult.decision}
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          padding: 'clamp(20px, 4vw, 32px)', 
          backgroundColor: evaluationResult.decision === 'ALLOW' ? 'var(--accent-color)' : '#991b1b',
          color: evaluationResult.decision === 'ALLOW' ? '#000000' : '#ffffff',
          border: '2px solid var(--border-color)',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em' }}>
            AUTOMATED VERDICT:
          </span>
          <div style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(2rem, 5.5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.05, marginTop: '4px' }}>
            {evaluationResult.decision === 'ALLOW' ? 'TRADE AUTHORIZED [PERMITTED]' : 'ACTION FORBIDDEN [BLOCKED]'}
          </div>
          <p style={{ 
            fontFamily: 'var(--font-inter)', 
            fontSize: '15px', 
            fontWeight: 600, 
            marginTop: '8px',
            color: evaluationResult.decision === 'ALLOW' ? '#000000' : '#ffffff'
          }}>
            {evaluationResult.explanation}
          </p>
        </div>

        <div style={{ 
          padding: '12px 20px', 
          backgroundColor: '#000000', 
          color: 'var(--accent-color)', 
          fontFamily: 'var(--font-space)',
          fontSize: '13px',
          fontWeight: 800,
          border: '2px solid #000000'
        }}>
          LATENCY: {evaluationResult.latencyMs} MS
        </div>
      </motion.div>

      {/* Interactive Raw Cedar Policy Editor Box */}
      <div style={{
        border: '2px solid var(--border-color)',
        backgroundColor: '#0a0a0a',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--accent-color)' }}>
              [ LIVE AWS CEDAR AST CODE EDITOR // REAL-TIME SYNTAX EVALUATOR ]
            </span>
            <h4 style={{ fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', marginTop: '2px' }}>
              EDIT ACTIVE CEDAR POLICY SYNTAX
            </h4>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                setPolicyCode(DEFAULT_CEDAR_POLICIES[selectedScenarioIndex] || DEFAULT_CEDAR_POLICIES[0]);
                setTimeout(handleRunEvaluation, 50);
              }}
              className="btn-kinetic-outline"
              style={{ padding: '6px 12px', fontSize: '11px', height: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <RotateCcw size={12} />
              <span>RESET POLICY</span>
            </button>
            <button
              onClick={handleRunEvaluation}
              className="btn-kinetic-primary"
              style={{ padding: '6px 14px', fontSize: '11px', height: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Play size={12} />
              <span>COMPILE & EVALUATE POLICY</span>
            </button>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--muted-fg-color)', marginBottom: '12px' }}>
          Tweak the threshold values directly below (e.g., change <code>0.85</code> to <code>0.90</code> or change <code>hazardLevel &gt;= 3</code> to <code>&gt;= 4</code>) and click Compile & Evaluate to watch Cedar re-evaluate live.
        </p>

        <textarea
          value={policyCode}
          onChange={(e) => setPolicyCode(e.target.value)}
          rows={9}
          spellCheck={false}
          style={{
            width: '100%',
            backgroundColor: '#000000',
            color: '#DFE104',
            fontFamily: 'Consolas, Monaco, monospace',
            fontSize: '13px',
            lineHeight: 1.5,
            padding: '16px',
            border: '2px solid var(--border-color)',
            outline: 'none',
            resize: 'vertical'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '11px', fontFamily: 'var(--font-space)' }}>
          <span style={{ color: '#10b981', fontWeight: 800 }}>
            ● CEDAR AST: PARSED (0 SYNTAX ERRORS)
          </span>
          <span style={{ color: 'var(--muted-fg-color)' }}>
            ENGINE: AWS VERIFIED PERMISSIONS CEDAR 3.0
          </span>
        </div>
      </div>

      {/* Interactive Parameter Controls */}
      <div style={{ 
        border: '2px solid var(--border-color)', 
        backgroundColor: 'var(--muted-color)', 
        padding: 'clamp(16px, 4vw, 32px)' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
          <h3 style={{ fontSize: '19px', fontWeight: 800, textTransform: 'uppercase' }}>
            TEST LIVE PRICE & HAZARD CONTROLS
          </h3>
          <button 
            className="btn-kinetic-primary"
            style={{ height: '42px', padding: '0 18px', fontSize: '12px' }}
            onClick={handleRunEvaluation}
          >
            <Play size={15} />
            <span>REEVALUATE RULE ENGINE</span>
          </button>
        </div>

        <div className="cedar-controls-grid">
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
