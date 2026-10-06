#!/usr/bin/env node
// Generate SVG lesson diagrams for remaining lessons

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'course', 'images');

function svgDiagram(filename, w, h, content) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <style>text { font-family: 'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif; }</style>
  </defs>
  <rect width="${w}" height="${h}" fill="#0a0a0c" rx="20"/>
  ${Array.from({length: Math.floor(w/50)}, (_, i) =>
    Array.from({length: Math.floor(h/50)}, (_, j) =>
      `<circle cx="${30 + i * 50}" cy="${30 + j * 50}" r="0.7" fill="rgba(255,255,255,0.03)"/>`
    ).join('')
  ).join('')}
  ${content}
</svg>`;
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), svg);
  console.log(`✓ ${filename}`);
}

// Lesson 11: Long-form vs Short-form
svgDiagram('lesson-11-long-short-form.svg', 1200, 700, `
  <text x="600" y="50" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Long-Form vs Short-Form</text>
  <text x="600" y="70" text-anchor="middle" fill="#6e6e73" font-size="11">Change the Architecture, Not Just the Runtime</text>

  <!-- Short-form column -->
  <rect x="120" y="110" width="420" height="480" rx="16" fill="#1a1a1c" stroke="#0066cc" stroke-width="1.5"/>
  <text x="330" y="150" text-anchor="middle" fill="#2997ff" font-size="14" font-weight="600" letter-spacing="1">SHORT-FORM</text>
  <text x="330" y="170" text-anchor="middle" fill="#6e6e73" font-size="10">25–60 seconds · One complete movement</text>

  ${['Legible first image or question', 'Enough context to understand', 'One main proof or demo', 'One change in understanding', 'Complete payoff'].map((item, i) => `
    <rect x="150" y="${200 + i * 55}" width="360" height="40" rx="8" fill="rgba(0,102,204,0.08)" stroke="rgba(0,102,204,0.2)" stroke-width="1"/>
    <text x="170" y="${225 + i * 55}" fill="#f5f5f7" font-size="12">${item}</text>
  `).join('')}
  <text x="330" y="490" text-anchor="middle" fill="#0066cc" font-size="11" font-weight="600">ONE QUESTION · ONE PAYOFF</text>

  <!-- Long-form column -->
  <rect x="660" y="110" width="420" height="480" rx="16" fill="#1a1a1c" stroke="#2997ff" stroke-width="1.5"/>
  <text x="870" y="150" text-anchor="middle" fill="#2997ff" font-size="14" font-weight="600" letter-spacing="1">LONG-FORM</text>
  <text x="870" y="170" text-anchor="middle" fill="#6e6e73" font-size="10">6–20 minutes · Earn extra time</text>

  ${['Fuller test & multiple examples', 'Competing explanations', 'Application & nuance', 'Chapter signposts', 'Genuine midpoint turns'].map((item, i) => `
    <rect x="690" y="${200 + i * 55}" width="360" height="40" rx="8" fill="rgba(41,151,255,0.08)" stroke="rgba(41,151,255,0.2)" stroke-width="1"/>
    <text x="710" y="${225 + i * 55}" fill="#f5f5f7" font-size="12">${item}</text>
  `).join('')}
  <text x="870" y="490" text-anchor="middle" fill="#2997ff" font-size="11" font-weight="600">DEPTH · EVIDENCE · NUANCE</text>

  <!-- Format selector -->
  <text x="600" y="630" text-anchor="middle" fill="#6e6e73" font-size="10" letter-spacing="1">FORMATS: Explainer · Tutorial · Story · Experiment · Opinion · Case Study · Review · List · Interview</text>
  <text x="600" y="670" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Phase 8</text>
`);

// Lesson 12: Brief-to-Script Workflow
svgDiagram('lesson-12-brief-to-script.svg', 1400, 600, `
  <text x="700" y="45" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">The Professional Workflow</text>
  <text x="700" y="65" text-anchor="middle" fill="#6e6e73" font-size="11">Brief → Think → Write → Review → Rewrite → Finalize</text>

  ${['IDEA', 'BRIEF', 'RESEARCH', 'THESIS', 'OUTLINE', 'HOOK', 'DRAFT', 'REVISE', 'FINALIZE'].map((stage, i) => {
    const x = 80 + i * 142;
    const isLoop = stage === 'REVISE';
    return `
    <rect x="${x}" y="120" width="120" height="60" rx="30" fill="#1a1a1c" stroke="#0066cc" stroke-width="1.5"/>
    <text x="${x + 60}" y="156" text-anchor="middle" fill="#f5f5f7" font-size="11" font-weight="600">${stage}</text>
    ${i < 8 ? `<line x1="${x + 120}" y1="150" x2="${x + 142}" y2="150" stroke="#0066cc" stroke-width="1.5" marker-end="url(#arrow)"/>` : ''}
    `;
  }).join('')}

  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M 0 0 L 8 4 L 0 8 Z" fill="#0066cc"/>
    </marker>
  </defs>

  <!-- Loop-back arrow -->
  <path d="M 1128 190 Q 1128 280 568 280 Q 228 280 228 190" fill="none" stroke="#2997ff" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.5"/>
  <text x="700" y="300" text-anchor="middle" fill="#2997ff" font-size="10">Loop back when new evidence changes the thesis</text>

  <!-- Stage details -->
  ${[
    { stage: 'IDEA', input: 'Topic', action: 'Define question', output: 'Idea card' },
    { stage: 'BRIEF', input: 'Idea card', action: 'Set scope', output: 'One-page brief' },
    { stage: 'RESEARCH', input: 'Claims', action: 'Check sources', output: 'Claim ledger' },
    { stage: 'OUTLINE', input: 'Evidence', action: '5-10 beats', output: 'Beat sheet' },
    { stage: 'DRAFT', input: 'Outline', action: 'Write complete', output: 'Full draft' },
    { stage: 'REVISE', input: 'Draft', action: 'Structural pass', output: 'v2 + log' },
  ].map((s, i) => {
    const x = 100 + i * 200;
    return `
    <rect x="${x}" y="340" width="180" height="160" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <text x="${x + 90}" y="370" text-anchor="middle" fill="#0066cc" font-size="10" font-weight="600" letter-spacing="1">${s.stage}</text>
    <text x="${x + 90}" y="400" text-anchor="middle" fill="#86868b" font-size="9">IN: ${s.input}</text>
    <text x="${x + 90}" y="425" text-anchor="middle" fill="#f5f5f7" font-size="10">→ ${s.action}</text>
    <text x="${x + 90}" y="460" text-anchor="middle" fill="#86868b" font-size="9">OUT: ${s.output}</text>
    `;
  }).join('')}

  <text x="700" y="550" text-anchor="middle" fill="#4e4e53" font-size="9">Each stage should reduce uncertainty · The Scriptwriter's Atlas · Phase 9</text>
`);

// Lesson 13: Diagnose a Weak Script
svgDiagram('lesson-13-diagnose-weak-script.svg', 1200, 700, `
  <text x="600" y="50" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Diagnose Before You Rewrite</text>
  <text x="600" y="70" text-anchor="middle" fill="#6e6e73" font-size="11">Four diagnostic levels · Problem → Viewer Effect → Repair → Test</text>

  ${[
    { level: 'CONTRACT', color: '#0066cc', items: ['Is audience clear?', 'Does opening promise?', 'Title ↔ video fit?'] },
    { level: 'ARCHITECTURE', color: '#0077ed', items: ['Each beat changes?', 'Evidence in right order?', 'Ending closes question?'] },
    { level: 'PARAGRAPH', color: '#2997ff', items: ['Each thought follows?', 'Transition shows cause?', 'Genuine next question?'] },
    { level: 'LINE', color: '#0066cc', items: ['Specific & supported?', 'Natural to say?', 'Worth listener time?'] },
  ].map((layer, i) => {
    const y = 110 + i * 130;
    return `
    <rect x="60" y="${y}" width="1080" height="110" rx="14" fill="#1a1a1c" stroke="${layer.color}" stroke-width="1" opacity="0.9"/>
    <rect x="60" y="${y}" width="6" height="110" rx="3" fill="${layer.color}"/>
    <text x="90" y="${y + 30}" fill="${layer.color}" font-size="12" font-weight="600" letter-spacing="1.5">${layer.level}</text>
    ${layer.items.map((item, j) => `
      <rect x="${280 + j * 280}" y="${y + 15}" width="250" height="35" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="${405 + j * 280}" y="${y + 38}" text-anchor="middle" fill="#d2d2d7" font-size="11">${item}</text>
    `).join('')}
    `;
  }).join('')}

  <!-- Diagnostic chain -->
  <text x="600" y="650" text-anchor="middle" fill="#2997ff" font-size="11" font-weight="600">PROBLEM → VIEWER EFFECT → REPAIR → TEST</text>
  <text x="600" y="680" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Phase 10</text>
`);

// Lesson 14: Revise in Right Order
svgDiagram('lesson-14-revise-right-order.svg', 1200, 700, `
  <text x="600" y="50" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Revision Priority Ladder</text>
  <text x="600" y="70" text-anchor="middle" fill="#6e6e73" font-size="11">Fix the biggest problem first · Don't polish what you might cut</text>

  ${[
    { step: '1', label: 'STRUCTURE', desc: 'Does each beat change understanding?', opacity: 1 },
    { step: '2', label: 'TRUTH & EVIDENCE', desc: 'Are claims supported and bounded?', opacity: 0.85 },
    { step: '3', label: 'CLARITY', desc: 'Can a new reader follow every step?', opacity: 0.7 },
    { step: '4', label: 'VOICE & PACE', desc: 'Does it sound like a person thinking?', opacity: 0.55 },
    { step: '5', label: 'POLISH', desc: 'Grammar, word choice, rhythm', opacity: 0.4 },
  ].map((item, i) => {
    const y = 120 + i * 100;
    const w2 = 900 - i * 80;
    const x = (1200 - w2) / 2;
    return `
    <rect x="${x}" y="${y}" width="${w2}" height="75" rx="12" fill="rgba(0,102,204,${0.03 + item.opacity * 0.08})" stroke="rgba(0,102,204,${item.opacity * 0.4})" stroke-width="1.5"/>
    <text x="${x + 30}" y="${y + 32}" fill="#2997ff" font-size="28" font-weight="700">${item.step}</text>
    <text x="${x + 70}" y="${y + 30}" fill="#f5f5f7" font-size="16" font-weight="600" letter-spacing="-0.3">${item.label}</text>
    <text x="${x + 70}" y="${y + 52}" fill="#86868b" font-size="11">${item.desc}</text>
    ${i < 4 ? `<path d="M ${600} ${y + 75} L ${600} ${y + 100}" stroke="rgba(0,102,204,0.3)" stroke-width="1.5" stroke-dasharray="4 3"/>` : ''}
    `;
  }).join('')}

  <!-- Arrow on left -->
  <text x="80" y="350" text-anchor="middle" fill="#0066cc" font-size="12" font-weight="600" transform="rotate(-90 80 350)">FIX BIGGEST FIRST →</text>

  <text x="600" y="670" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Phase 10</text>
`);

// Lesson 15: Control the Lens
svgDiagram('lesson-15-lens-emphasis-omission.svg', 1200, 700, `
  <text x="600" y="50" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Control the Lens, Emphasis & Omission</text>
  <text x="600" y="70" text-anchor="middle" fill="#6e6e73" font-size="11">One event · Multiple honest lenses · Choose one</text>

  <!-- Central event -->
  <circle cx="600" cy="300" r="60" fill="rgba(0,102,204,0.12)" stroke="#0066cc" stroke-width="2"/>
  <text x="600" y="296" text-anchor="middle" fill="#f5f5f7" font-size="13" font-weight="600">SAME</text>
  <text x="600" y="314" text-anchor="middle" fill="#f5f5f7" font-size="13" font-weight="600">EVENT</text>

  ${[
    { label: 'TUTORIAL', angle: -Math.PI/2, desc: 'What can viewer repair?' },
    { label: 'PERSONAL', angle: -Math.PI/6, desc: 'What did it cost?' },
    { label: 'RESEARCH', angle: Math.PI/6, desc: 'How do viewers interpret?' },
    { label: 'BUSINESS', angle: Math.PI/2, desc: 'What are constraints?' },
  ].map((lens, i) => {
    const lx = 600 + 240 * Math.cos(lens.angle);
    const ly = 300 + 200 * Math.sin(lens.angle);
    return `
    <line x1="600" y1="300" x2="${lx}" y2="${ly}" stroke="#0066cc" stroke-width="1.5" opacity="0.2" stroke-dasharray="6 4"/>
    <rect x="${lx - 90}" y="${ly - 35}" width="180" height="70" rx="10" fill="#1a1a1c" stroke="#2997ff" stroke-width="1.5"/>
    <text x="${lx}" y="${ly - 10}" text-anchor="middle" fill="#2997ff" font-size="12" font-weight="600">${lens.label}</text>
    <text x="${lx}" y="${ly + 12}" text-anchor="middle" fill="#86868b" font-size="9">${lens.desc}</text>
    `;
  }).join('')}

  <!-- Argument structure -->
  <rect x="150" y="530" width="900" height="80" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <text x="600" y="560" text-anchor="middle" fill="#f5f5f7" font-size="13" font-weight="600">DURABLE ARGUMENT</text>
  ${['POSITION', 'EVIDENCE', 'ALTERNATIVE', 'QUALIFICATION'].map((step, i) => `
    <text x="${280 + i * 180}" y="590" text-anchor="middle" fill="#0066cc" font-size="11" font-weight="600">${step}</text>
    ${i < 3 ? `<text x="${370 + i * 180}" y="590" text-anchor="middle" fill="#4e4e53" font-size="14">→</text>` : ''}
  `).join('')}

  <text x="600" y="660" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Phase 11</text>
`);

// Lesson 16: Production-Ready Package
svgDiagram('lesson-16-production-ready-package.svg', 1200, 700, `
  <text x="600" y="50" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Build a Production-Ready Package</text>
  <text x="600" y="70" text-anchor="middle" fill="#6e6e73" font-size="11">Long-form + Short-form · Defensible · Complete</text>

  <!-- Central document -->
  <rect x="450" y="120" width="300" height="200" rx="16" fill="#1a1a1c" stroke="#0066cc" stroke-width="2"/>
  <text x="600" y="170" text-anchor="middle" fill="#0066cc" font-size="12" font-weight="600" letter-spacing="1">SCRIPT PACKAGE</text>
  ${['Defensible promise', 'Evidence-backed claims', 'AV production notes', 'Clean recording copy', 'Editor copy + sources'].map((item, i) => `
    <text x="490" y="${200 + i * 22}" fill="#d2d2d7" font-size="11">✓ ${item}</text>
  `).join('')}

  <!-- Surrounding elements -->
  ${[
    { label: 'IDEA', x: 150, y: 150 },
    { label: 'RESEARCH', x: 150, y: 280 },
    { label: 'STRUCTURE', x: 900, y: 150 },
    { label: '3 HOOKS', x: 900, y: 280 },
    { label: 'REVISE', x: 300, y: 420 },
    { label: 'POSTMORTEM', x: 750, y: 420 },
  ].map((el, i) => `
    <rect x="${el.x - 55}" y="${el.y - 20}" width="110" height="40" rx="20" fill="rgba(255,255,255,0.03)" stroke="rgba(0,102,204,0.3)" stroke-width="1"/>
    <text x="${el.x}" y="${el.y + 5}" text-anchor="middle" fill="#2997ff" font-size="11" font-weight="600">${el.label}</text>
    <line x1="${el.x > 600 ? el.x - 55 : el.x + 55}" y1="${el.y}" x2="${el.x > 600 ? 750 : 450}" y2="${el.y < 350 ? 220 : 300}" stroke="#0066cc" stroke-width="1" opacity="0.2" stroke-dasharray="4 3"/>
  `).join('')}

  <!-- Short-form package -->
  <rect x="150" y="510" width="400" height="120" rx="14" fill="rgba(41,151,255,0.05)" stroke="rgba(41,151,255,0.2)" stroke-width="1"/>
  <text x="350" y="545" text-anchor="middle" fill="#2997ff" font-size="12" font-weight="600">SHORT-FORM DELIVERABLE</text>
  <text x="350" y="570" text-anchor="middle" fill="#86868b" font-size="10">One idea · One proof · 25-60s · Stands alone</text>
  <text x="350" y="595" text-anchor="middle" fill="#6e6e73" font-size="9">Must make sense without the long video</text>

  <!-- Long-form package -->
  <rect x="650" y="510" width="400" height="120" rx="14" fill="rgba(0,102,204,0.05)" stroke="rgba(0,102,204,0.2)" stroke-width="1"/>
  <text x="850" y="545" text-anchor="middle" fill="#0066cc" font-size="12" font-weight="600">LONG-FORM DELIVERABLE</text>
  <text x="850" y="570" text-anchor="middle" fill="#86868b" font-size="10">6-20 min · Multiple beats · Full evidence</text>
  <text x="850" y="595" text-anchor="middle" fill="#6e6e73" font-size="9">Let evidence determine the length</text>

  <text x="600" y="680" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Phase 12 · Capstone</text>
`);

console.log('\nAll lesson diagrams generated.');