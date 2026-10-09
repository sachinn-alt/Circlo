import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Server, 
  Code, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  Cpu,
  Database
} from 'lucide-react';
import { CEDAR_POLICIES_SOURCE } from '../services/cedarEngine';

export default function ArchitectureModal({ onClose }) {
  const [activeFileTab, setActiveFileTab] = useState('cedar');
  const [copied, setCopied] = useState(false);

  const fileContents = {
    cedar: CEDAR_POLICIES_SOURCE,
    docker: `version: '3.8'
# Circlo 100% Local Development Stack (Zero AWS Bill)
services:
  localstack:
    image: localstack/localstack:latest
    ports: ["4566:4566"]
    environment:
      - SERVICES=s3,lambda,dynamodb,sns,sqs,eventbridge
      - AWS_DEFAULT_REGION=ap-south-1

  opensearch:
    image: opensearchproject/opensearch:2.11.1
    environment:
      - discovery.type=single-node
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
      - DISABLE_SECURITY_PLUGIN=true
    ports: ["9200:9200"]`,
    sam: `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Circlo Serverless OpenSearch & Cedar Pipeline
Resources:
  EwasteImageBucket:
    Type: AWS::S3::Bucket
  ScrapBatchTable:
    Type: AWS::DynamoDB::Table
    Properties:
      BillingMode: PAY_PER_REQUEST
      KeySchema: [{AttributeName: batchId, KeyType: HASH}]
  RecyclerDispatchTopic:
    Type: AWS::SNS::Topic
  ProcessEwasteScanFunction:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: python3.11
      Handler: scan_handler.lambda_handler`,
    opensearch: `{
  "mappings": {
    "properties": {
      "recycler_id": { "type": "keyword" },
      "name": { "type": "text" },
      "collector_type": { "type": "keyword" },
      "kyc_verified": { "type": "boolean" },
      "fair_price_pledge": { "type": "boolean" },
      "location": { "type": "geo_point" },
      "accepted_materials": { "type": "keyword" }
    }
  }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContents[activeFileTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align">
            <Layers size={22} className="text-cyan" />
            <div>
              <h3>AWS Open Source Architecture Blueprint</h3>
              <small className="text-muted">Built for the "Build It" 100% Free / Local Hackathon Track</small>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Architecture Summary Cards */}
          <div className="arch-pillars-grid">
            <div className="pillar-card">
              <div className="pillar-header">
                <ShieldCheck size={18} className="text-amber" />
                <strong>AWS Cedar (Open Source)</strong>
              </div>
              <p>
                AWS's high-performance authorization engine. Guarantees e-waste hazard safety policies, blocks price-gouging against informal workers, and validates EPR brand claims.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-header">
                <Database size={18} className="text-emerald" />
                <strong>AWS OpenSearch (Open Source)</strong>
              </div>
              <p>
                Powers real-time geospatial search with <code>geo_point</code> indexing and <code>geo_distance</code> queries to match citizens with nearby verified informal collectors within milliseconds.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-header">
                <Server size={18} className="text-cyan" />
                <strong>LocalStack & Finch Runtimes</strong>
              </div>
              <p>
                Enables full local cloud emulation (S3 image bucket, DynamoDB state table, SNS SMS notifications) with zero AWS account, zero credit card, and zero cloud bill.
              </p>
            </div>
          </div>

          {/* Interactive Code Viewer for AWS Configuration Files */}
          <div className="arch-code-section">
            <div className="arch-code-tabs">
              <button 
                className={`code-tab ${activeFileTab === 'cedar' ? 'active' : ''}`}
                onClick={() => setActiveFileTab('cedar')}
              >
                policies.cedar (AWS Cedar)
              </button>
              <button 
                className={`code-tab ${activeFileTab === 'docker' ? 'active' : ''}`}
                onClick={() => setActiveFileTab('docker')}
              >
                docker-compose.yml (LocalStack)
              </button>
              <button 
                className={`code-tab ${activeFileTab === 'opensearch' ? 'active' : ''}`}
                onClick={() => setActiveFileTab('opensearch')}
              >
                mappings.json (OpenSearch Geo)
              </button>
              <button 
                className={`code-tab ${activeFileTab === 'sam' ? 'active' : ''}`}
                onClick={() => setActiveFileTab('sam')}
              >
                template.yaml (AWS SAM)
              </button>

              <button className="btn-copy-code" onClick={handleCopy}>
                {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy File"}</span>
              </button>
            </div>

            <div className="arch-code-viewport">
              <pre><code>{fileContents[activeFileTab]}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
