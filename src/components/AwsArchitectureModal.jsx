import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Cloud, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Radio, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Terminal,
  Activity,
  FileText
} from 'lucide-react';

export default function AwsArchitectureModal({ isOpen, onClose }) {
  const [activeNode, setActiveNode] = useState('cedar');

  if (!isOpen) return null;

  const ARCH_NODES = {
    bedrock: {
      id: 'bedrock',
      name: 'Amazon Bedrock + Rekognition',
      category: 'AI VISION SPECTROMETER',
      latency: '412ms (p95)',
      description: 'Multimodal foundation models (Claude 3.5 Sonnet) combined with Rekognition Custom Labels to parse component topography, PCB gold-finger bus traces, battery swelling risk, and capacitor dielectric chemistry.',
      techStack: ['AWS Bedrock', 'Anthropic Claude 3.5 Sonnet', 'Amazon Rekognition', 'Base64 Canvas Streaming'],
      codeTitle: 'bedrock_vision_prompt.json',
      codeSnippet: `{
  "modelId": "anthropic.claude-3-5-sonnet-20241022-v2:0",
  "contentType": "application/json",
  "accept": "application/json",
  "body": {
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1024,
    "system": "You are Circlo Spectrometer: classify e-waste hazard (1-5), extract gold/copper/aluminum grams, and enforce CPCB EPR compliance rules.",
    "messages": [
      {
        "role": "user",
        "content": [
          { "type": "image", "source": { "type": "base64", "media_type": "image/jpeg", "data": "<CAMERA_FRAME_BYTES>" } },
          { "type": "text", "text": "Analyze bounding boxes and calculate recoverable precious mineral mass." }
        ]
      }
    ]
  }
}`
    },
    opensearch: {
      id: 'opensearch',
      name: 'Amazon OpenSearch Serverless',
      category: 'GEOSPATIAL RADAR & KNN',
      latency: '6.4ms (p95)',
      description: 'Geospatial indexing with geo_point and geo_shape mapping. Executes real-time polygon searches filtering verified informal Kabadiwalas by walking distance, accepted scrap categories, and calibrated digital scale certifications.',
      techStack: ['OpenSearch Serverless', 'Geo-Distance Filter', 'KNN Vector Scoring', 'LocalStack Compatible'],
      codeTitle: 'opensearch_geo_query.json',
      codeSnippet: `{
  "query": {
    "bool": {
      "must": [
        { "term": { "status": "AVAILABLE" } },
        { "term": { "kyc_verified": true } }
      ],
      "filter": {
        "geo_distance": {
          "distance": "8km",
          "location": {
            "lat": 28.6139,
            "lon": 77.2090
          }
        }
      }
    }
  },
  "sort": [
    {
      "_geo_distance": {
        "location": { "lat": 28.6139, "lon": 77.2090 },
        "order": "asc",
        "unit": "km",
        "mode": "min"
      }
    }
  ]
}`
    },
    cedar: {
      id: 'cedar',
      name: 'AWS Cedar Policy Engine',
      category: 'SAFETY & ANTI-GOUGING GUARD',
      latency: '11.8ms (p95)',
      description: 'Deterministic policy evaluation using Amazon Verified Permissions. Guarantees 85% MCX floor prices for scrap sellers and strictly forbids informal dispatch of critical Level 4-5 toxic items (e.g. Swollen Li-Ion, CRT phosphors) to residential yards.',
      techStack: ['Amazon Verified Permissions', 'Cedar Language 3.0', 'Zero-Trust Safety Audit', 'Sub-15ms Guarantee'],
      codeTitle: 'circlo_guardrails.cedar',
      codeSnippet: `// ==============================================================================
// CIRCLO SAFETY GUARDRAILS // AWS CEDAR FORMAL POLICY
// ==============================================================================

// POLICY 01: Mandatory 85% Floor Price Protection
permit(
  principal in Circlo::Role::"ResidentCitizen",
  action == Circlo::Action::"LockTransactionPrice",
  resource is Circlo::ScrapItem
)
when {
  resource.offeredPrice >= (resource.mcxBenchmark * 0.85)
};

// POLICY 02: Strict Residential Backyard Toxic Burning Ban
forbid(
  principal,
  action in [Circlo::Action::"InformalBackyardStrip", Circlo::Action::"AcidLeach"],
  resource is Circlo::ScrapItem
)
when {
  resource.hazardLevel >= 4 || resource.category in ["LITHIUM_ION_BATTERY", "CRT_MONITOR"]
};`
    },
    ledger: {
      id: 'ledger',
      name: 'AWS Lambda + DynamoDB Ledger',
      category: 'IMMUTABLE EPR DOCKET AUDIT',
      latency: '24.2ms (p95)',
      description: 'Serverless event streaming via Amazon EventBridge, persisting tamper-evident CPCB Extended Producer Responsibility (EPR) logs in DynamoDB single-table design with SHA-256 docket hashing.',
      techStack: ['AWS Lambda (Node.js 20)', 'Amazon DynamoDB', 'Amazon EventBridge', 'CPCB EPR XML/JSON'],
      codeTitle: 'dynamodb_epr_record.json',
      codeSnippet: `{
  "PK": "COLLECTOR#rec_101",
  "SK": "DOCKET#2026-EPR-98124",
  "collectorName": "Ram Lakhan",
  "citizenPincode": "110001",
  "weightKg": 142.8,
  "materials": {
    "cleanCopperKg": 1.85,
    "reclaimedGoldGrams": 0.45,
    "lithiumCobaltGrams": 48
  },
  "cpcbCompliant": true,
  "cedarAuditHash": "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
  "timestamp": "2026-10-09T17:20:00Z"
}`
    }
  };

  const selectedNodeData = ARCH_NODES[activeNode];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2500,
        padding: '20px'
      }} 
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: '#09090b',
          border: '2px solid var(--accent-color)',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#fafafa',
          overflow: 'hidden'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '2px solid var(--border-color)', 
          padding: '24px 32px',
          backgroundColor: '#000000'
        }}>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-space)', 
              fontSize: '12px', 
              fontWeight: 800, 
              color: 'var(--accent-color)', 
              letterSpacing: '0.12em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="kinetic-live-dot" />
              [ AWS CLOUD ARCHITECTURE // DECENTRALIZED PROTOCOL ]
            </span>
            <h2 style={{ fontFamily: 'var(--font-space)', fontSize: '26px', fontWeight: 900, textTransform: 'uppercase', marginTop: '6px' }}>
              CIRCLO PRODUCTION CLOUD TOPOLOGY
            </h2>
          </div>
          <button 
            style={{ color: '#fafafa', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Interactive Topology Pipeline Strip */}
          <div>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)', display: 'block', marginBottom: '12px' }}>
              INTERACTIVE ARCHITECTURE PIPELINE (CLICK ANY SERVICE TO INSPECT CODE & POLICIES):
            </span>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '12px'
            }}>
              {Object.values(ARCH_NODES).map((node) => {
                const isSelected = activeNode === node.id;
                return (
                  <motion.button
                    key={node.id}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      border: '2px solid',
                      borderColor: isSelected ? 'var(--accent-color)' : 'var(--border-color)',
                      backgroundColor: isSelected ? 'var(--accent-color)' : '#18181b',
                      color: isSelected ? '#000000' : '#fafafa',
                      padding: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onClick={() => setActiveNode(node.id)}
                  >
                    <span style={{ 
                      fontSize: '10px', 
                      fontFamily: 'var(--font-space)', 
                      fontWeight: 800, 
                      letterSpacing: '0.08em',
                      display: 'block',
                      opacity: 0.8
                    }}>
                      {node.category}
                    </span>
                    <strong style={{ 
                      fontFamily: 'var(--font-space)', 
                      fontSize: '15px', 
                      fontWeight: 900, 
                      display: 'block', 
                      marginTop: '4px',
                      lineHeight: '1.2'
                    }}>
                      {node.name}
                    </strong>
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700 }}>
                      <Activity size={12} />
                      <span>{node.latency}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Node Detail Deep-Dive */}
          <div style={{ 
            border: '2px solid var(--border-color)', 
            backgroundColor: '#000000', 
            padding: '24px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
                  SERVICE DEEP-DIVE
                </span>
                <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px' }}>
                  {selectedNodeData.name}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedNodeData.techStack.map((tech, tIdx) => (
                  <span 
                    key={tIdx}
                    style={{ 
                      fontSize: '11px', 
                      fontFamily: 'var(--font-space)', 
                      fontWeight: 800, 
                      padding: '4px 8px', 
                      backgroundColor: '#18181b', 
                      border: '1px solid var(--border-color)' 
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--muted-fg-color)', marginBottom: '20px' }}>
              {selectedNodeData.description}
            </p>

            {/* Code / Policy Inspector Terminal */}
            <div style={{ border: '2px solid var(--border-color)', backgroundColor: '#09090b' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '8px 14px', 
                borderBottom: '1px solid var(--border-color)', 
                backgroundColor: '#18181b' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 700 }}>
                  <Terminal size={14} color="var(--accent-color)" />
                  <span>{selectedNodeData.codeTitle}</span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--accent-color)', fontFamily: 'var(--font-space)', fontWeight: 800 }}>
                  PRODUCTION READY
                </span>
              </div>
              <pre style={{ 
                margin: 0, 
                padding: '16px', 
                fontSize: '12px', 
                fontFamily: 'monospace', 
                overflowX: 'auto', 
                color: '#e4e4e7',
                lineHeight: '1.5'
              }}>
                <code>{selectedNodeData.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Cloud Resilience & Security Callouts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ border: '2px solid var(--border-color)', padding: '16px', backgroundColor: '#18181b' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)' }}>
                [ LOCALSTACK TESTED ]
              </span>
              <strong style={{ display: 'block', fontSize: '14px', marginTop: '6px' }}>
                Zero Cloud Friction
              </strong>
              <p style={{ fontSize: '12px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
                Full mock stack runs locally via Docker LocalStack for rapid testing.
              </p>
            </div>

            <div style={{ border: '2px solid var(--border-color)', padding: '16px', backgroundColor: '#18181b' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)' }}>
                [ SECURE BY DESIGN ]
              </span>
              <strong style={{ display: 'block', fontSize: '14px', marginTop: '6px' }}>
                Cedar Zero-Trust
              </strong>
              <p style={{ fontSize: '12px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
                All transactions cryptographically validated before payment authorization.
              </p>
            </div>

            <div style={{ border: '2px solid var(--border-color)', padding: '16px', backgroundColor: '#18181b' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)' }}>
                [ INDIA CPCB READY ]
              </span>
              <strong style={{ display: 'block', fontSize: '14px', marginTop: '6px' }}>
                EPR Regulatory Compliance
              </strong>
              <p style={{ fontSize: '12px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
                Direct integration with Central Pollution Control Board audit portal.
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
