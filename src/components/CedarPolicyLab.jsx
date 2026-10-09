import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Play, 
  Code, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle,
  FileCode,
  Zap,
  RotateCcw
} from 'lucide-react';
import { CEDAR_SCENARIOS } from '../data/mockData';
import { evaluateCedarRequest, CEDAR_POLICIES_SOURCE } from '../services/cedarEngine';

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
    // Construct modified principal and resource based on interactive controls
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
    <div className="cedar-lab-container">
      {/* Top Banner */}
      <div className="tab-banner">
        <div>
          <h2>AWS Cedar Authorization & Policy Engine Workbench</h2>
          <p>
            AWS Cedar is AWS's open source authorization language. In Circlo, Cedar strictly enforces worker safety rules, prevents price exploitation of informal collectors, and verifies EPR credit integrity.
          </p>
        </div>
        <div className="cedar-brand-badge">
          <Zap size={16} className="text-amber" />
          <span>AWS Open Source • Cedar Policy Engine</span>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="scenario-selector-grid">
        {CEDAR_SCENARIOS.map((sc, idx) => (
          <div 
            key={sc.id}
            className={`scenario-card ${selectedScenarioIndex === idx ? 'active' : ''}`}
            onClick={() => handleSelectScenario(idx)}
          >
            <div className="sc-header">
              <span className="sc-idx">Scenario 0{idx + 1}</span>
              <span className={`sc-badge ${sc.expectedDecision === 'ALLOW' ? 'allow' : 'deny'}`}>
                Expected: {sc.expectedDecision}
              </span>
            </div>
            <h4 className="sc-title">{sc.title}</h4>
            <p className="sc-rationale">{sc.triggerPolicy}</p>
          </div>
        ))}
      </div>

      {/* Main Split: Code Viewer & Interactive Evaluator */}
      <div className="cedar-workbench-split">
        {/* Left Column: Cedar Policy Code Viewer */}
        <div className="code-viewer-card">
          <div className="card-header-row">
            <div className="flex-align">
              <FileCode size={16} className="text-cyan" />
              <span>policies.cedar (Active AWS Policy Definitions)</span>
            </div>
            <span className="code-lang-tag">Cedar v2.4</span>
          </div>
          <div className="code-scroll-area">
            <pre className="cedar-code-pre">
              <code>{CEDAR_POLICIES_SOURCE}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: Interactive Test Bench & Result */}
        <div className="evaluator-card">
          <div className="card-header-row">
            <div className="flex-align">
              <Play size={16} className="text-emerald" />
              <span>Interactive Evaluation Inspector</span>
            </div>
            <button className="btn-run-eval" onClick={handleRunEvaluation}>
              <Play size={14} />
              <span>Run Cedar Check</span>
            </button>
          </div>

          {/* Live Decision Display Banner */}
          <div className={`decision-banner ${evaluationResult.decision.toLowerCase()}`}>
            <div className="decision-status-row">
              <div className="flex-align">
                {evaluationResult.decision === 'ALLOW' ? (
                  <CheckCircle2 size={32} className="icon-allow" />
                ) : (
                  <XCircle size={32} className="icon-deny" />
                )}
                <div>
                  <div className="decision-title">
                    AUTHORIZATION DECISION: {evaluationResult.decision}
                  </div>
                  <div className="decision-latency">
                    <Clock size={12} /> Evaluated in {evaluationResult.evaluationTimeMs} ms • AWS Cedar Engine
                  </div>
                </div>
              </div>
            </div>
            <p className="decision-reason">{evaluationResult.reason}</p>
          </div>

          {/* Interactive Parameters Editor */}
          <div className="param-editor-panel">
            <h4>Live Test Parameters (Tweak & Re-evaluate):</h4>

            <div className="param-form-grid">
              {/* Parameter 1: Principal Certifications */}
              <div className="param-item">
                <label className="param-label">Principal Hazmat L2 Certified?</label>
                <div className="toggle-chip-group">
                  <button 
                    className={`btn-chip ${hasHazmatCert ? 'selected' : ''}`}
                    onClick={() => setHasHazmatCert(true)}
                  >
                    Yes (HAZMAT_EWASTE_L2)
                  </button>
                  <button 
                    className={`btn-chip ${!hasHazmatCert ? 'selected' : ''}`}
                    onClick={() => setHasHazmatCert(false)}
                  >
                    No (Uncertified)
                  </button>
                </div>
              </div>

              {/* Parameter 2: Resource Hazard Level */}
              <div className="param-item">
                <label className="param-label">Scrap Hazard Level (1 - 5):</label>
                <div className="hazard-range-row">
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={hazardLevel} 
                    onChange={(e) => setHazardLevel(Number(e.target.value))}
                    className="range-slider"
                  />
                  <strong className={`hazard-num lvl-${hazardLevel}`}>Level {hazardLevel}</strong>
                </div>
              </div>

              {/* Parameter 3: Pricing Check (if applicable) */}
              {currentScenario.action.includes('submitPurchaseBid') && (
                <div className="param-item full-width">
                  <label className="param-label">
                    Broker Offered Price vs Civic Floor Benchmark (₹/kg):
                  </label>
                  <div className="price-inputs-row">
                    <div>
                      <small>Offered Bid Price:</small>
                      <input 
                        type="number" 
                        value={offeredPrice} 
                        onChange={(e) => setOfferedPrice(Number(e.target.value))}
                        className="param-input"
                      />
                    </div>
                    <div>
                      <small>Civic Benchmark Rate:</small>
                      <input 
                        type="number" 
                        value={benchmarkPrice} 
                        onChange={(e) => setBenchmarkPrice(Number(e.target.value))}
                        className="param-input"
                      />
                    </div>
                    <div className="calc-note">
                      Min Allowed (85%): ₹{(benchmarkPrice * 0.85).toFixed(1)}/kg
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="eval-btn-row">
              <button className="btn-re-evaluate" onClick={handleRunEvaluation}>
                <RotateCcw size={14} />
                <span>Evaluate with modified parameters</span>
              </button>
            </div>
          </div>

          {/* Matched Policies Diagnostic */}
          <div className="diagnostics-panel">
            <h4>Evaluation Trace:</h4>
            {evaluationResult.matchedForbids.length > 0 && (
              <div className="trace-item forbid">
                <strong>Matching Forbid Policies:</strong>
                {evaluationResult.matchedForbids.map((f, i) => (
                  <p key={i}>⛔ {f.clause}: {f.description}</p>
                ))}
              </div>
            )}
            {evaluationResult.matchedPermits.length > 0 && (
              <div className="trace-item permit">
                <strong>Matching Permit Policies:</strong>
                {evaluationResult.matchedPermits.map((p, i) => (
                  <p key={i}>✅ {p.clause}: {p.description}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
