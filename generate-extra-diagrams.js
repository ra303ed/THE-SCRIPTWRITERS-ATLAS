#!/usr/bin/env node
// Generate additional SVG lesson diagrams

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'course', 'images');

function svgDiagram(filename, w, h, content) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <style>text { font-family: 'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif; }</style>
    <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M 0 0 L 8 4 L 0 8 Z" fill="#0066cc"/>
    </marker>
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

// Lesson 11: Compress vs Expand
svgDiagram('lesson-11-compress-expand.svg', 1200, 650, `
  <text x="600" y="50" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Compress vs Expand</text>
  <text x="600" y="72" text-anchor="middle" fill="#6e6e73" font-size="11">Select, don't speed up · Develop, don't repeat</text>

  <!-- COMPRESS column -->
  <rect x="60" y="110" width="500" height="440" rx="16" fill="#1a1a1c" stroke="#0066cc" stroke-width="1.5"/>
  <rect x="60" y="110" width="500" height="50" rx="16" fill="rgba(0,102,204,0.12)"/>
  <rect x="60" y="140" width="500" height="20" fill="#1a1a1c"/>
  <text x="310" y="142" text-anchor="middle" fill="#0066cc" font-size="14" font-weight="600" letter-spacing="1.5">COMPRESS</text>

  ${['Keep the central question', 'Keep the proof that answers it', 'Keep the final useful thought', 'Move out tool history', 'Remove extra examples', 'Cut background not required'].map((item, i) => `
    <rect x="90" y="${185 + i * 55}" width="440" height="40" rx="8" fill="rgba(0,102,204,0.06)"/>
    <text x="115" y="${210 + i * 55}" fill="#d2d2d7" font-size="12">${i < 3 ? '✓' : '✗'} ${item}</text>
  `).join('')}
  <text x="310" y="525" text-anchor="middle" fill="#0066cc" font-size="11" font-weight="600">NOT: talk faster at double speed</text>

  <!-- EXPAND column -->
  <rect x="640" y="110" width="500" height="440" rx="16" fill="#1a1a1c" stroke="#2997ff" stroke-width="1.5"/>
  <rect x="640" y="110" width="500" height="50" rx="16" fill="rgba(41,151,255,0.12)"/>
  <rect x="640" y="140" width="500" height="20" fill="#1a1a1c"/>
  <text x="890" y="142" text-anchor="middle" fill="#2997ff" font-size="14" font-weight="600" letter-spacing="1.5">EXPAND</text>

  ${['New proof & counterexamples', 'More context & application', 'Competing explanations', 'Chapter signposts for memory', 'Genuine midpoint turns', 'Recaps only if complex enough'].map((item, i) => `
    <rect x="670" y="${185 + i * 55}" width="440" height="40" rx="8" fill="rgba(41,151,255,0.06)"/>
    <text x="695" y="${210 + i * 55}" fill="#d2d2d7" font-size="12">+ ${item}</text>
  `).join('')}
  <text x="890" y="525" text-anchor="middle" fill="#2997ff" font-size="11" font-weight="600">NOT: more minutes of the same</text>

  <text x="600" y="610" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Phase 8</text>
`);

// Lesson 12: Workshop Stage Detail
svgDiagram('lesson-12-workshop-stages.svg', 1400, 650, `
  <text x="700" y="45" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Workshop Stages — What Enters, What Leaves</text>
  <text x="700" y="67" text-anchor="middle" fill="#6e6e73" font-size="11">Each stage reduces uncertainty and produces something the next stage can use</text>

  ${[
    { stage: 'IDEA', input: 'Topic', action: 'Define question', output: 'Idea card', stop: 'Question + evidence path' },
    { stage: 'BRIEF', input: 'Idea card', action: 'Set scope', output: 'One-page brief', stop: 'Clear what video won\'t answer' },
    { stage: 'RESEARCH', input: 'Claims', action: 'Check sources', output: 'Claim ledger', stop: 'Claims supported or marked' },
    { stage: 'OUTLINE', input: 'Evidence', action: '5-10 beats', output: 'Beat sheet', stop: 'Every beat changes understanding' },
    { stage: 'DRAFT', input: 'Outline', action: 'Write complete', output: 'Full draft', stop: 'No hidden logic gaps' },
    { stage: 'REVISE', input: 'Draft', action: 'Structural pass', output: 'v2 + log', stop: 'Skeptical reader can follow' },
    { stage: 'FINALIZE', input: 'Approved', action: 'Verify all', output: 'Handoff', stop: 'Another person can produce' },
  ].map((s, i) => {
    const x = 40 + i * 192;
    return `
    <rect x="${x}" y="100" width="175" height="440" rx="14" fill="#1a1a1c" stroke="${i === 6 ? '#2997ff' : '#0066cc'}" stroke-width="1.5"/>
    <text x="${x + 87}" y="135" text-anchor="middle" fill="${i === 6 ? '#2997ff' : '#0066cc'}" font-size="11" font-weight="700" letter-spacing="1.5">${s.stage}</text>

    <rect x="${x + 12}" y="155" width="151" height="2" rx="1" fill="rgba(255,255,255,0.06)"/>

    <text x="${x + 87}" y="185" text-anchor="middle" fill="#6e6e73" font-size="8" letter-spacing="1">INPUT</text>
    <rect x="${x + 15}" y="195" width="145" height="35" rx="8" fill="rgba(255,255,255,0.03)"/>
    <text x="${x + 87}" y="218" text-anchor="middle" fill="#d2d2d7" font-size="10">${s.input}</text>

    <text x="${x + 87}" y="260" text-anchor="middle" fill="#6e6e73" font-size="8" letter-spacing="1">ACTION</text>
    <rect x="${x + 15}" y="270" width="145" height="45" rx="8" fill="rgba(0,102,204,0.08)"/>
    <text x="${x + 87}" y="298" text-anchor="middle" fill="#f5f5f7" font-size="11" font-weight="600">${s.action}</text>

    <text x="${x + 87}" y="345" text-anchor="middle" fill="#6e6e73" font-size="8" letter-spacing="1">OUTPUT</text>
    <rect x="${x + 15}" y="355" width="145" height="35" rx="8" fill="rgba(255,255,255,0.03)"/>
    <text x="${x + 87}" y="378" text-anchor="middle" fill="#d2d2d7" font-size="10">${s.output}</text>

    <text x="${x + 87}" y="425" text-anchor="middle" fill="#6e6e73" font-size="8" letter-spacing="1">STOP WHEN</text>
    <text x="${x + 87}" y="445" text-anchor="middle" fill="#2997ff" font-size="9" font-weight="500">${s.stop}</text>

    ${i < 6 ? `<line x1="${x + 175}" y1="320" x2="${x + 192}" y2="320" stroke="#0066cc" stroke-width="1.5" marker-end="url(#arrow-blue)"/>` : ''}
    `;
  }).join('')}

  <text x="700" y="590" text-anchor="middle" fill="#4e4e53" font-size="9">Stages can loop back · The Scriptwriter's Atlas · Phase 9</text>
`);

// Lesson 13: Autopsy Walkthrough
svgDiagram('lesson-13-autopsy-example.svg', 1200, 700, `
  <text x="600" y="45" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Script Autopsy — A Deliberately Weak Draft</text>
  <text x="600" y="67" text-anchor="middle" fill="#6e6e73" font-size="11">Diagnose the symptom · Name the cause · Suggest a repair</text>

  <!-- Weak draft -->
  <rect x="60" y="95" width="520" height="260" rx="14" fill="#1a1a1c" stroke="rgba(255,60,60,0.3)" stroke-width="1.5"/>
  <text x="80" y="125" fill="rgba(255,60,60,0.6)" font-size="9" font-weight="600" letter-spacing="1">WEAK DRAFT</text>
  ${[
    '"Welcome back! In today\'s fast-paced world..."',
    '"Storytelling is more important than ever."',
    '"We tried a few tools and got amazing results."',
    '"Let\'s talk about the history of AI."',
    '"You won\'t believe what happened next."',
    '"In conclusion, subscribe for the secret method."',
  ].map((line, i) => `
    <text x="80" y="${155 + i * 30}" fill="#86868b" font-size="11" font-style="italic">${line}</text>
  `).join('')}

  <!-- Diagnosis arrows -->
  ${[
    { problem: 'Delays viewer question', effect: 'New viewer lost', fix: 'Show first useful example early' },
    { problem: 'Broad claim, no proof', effect: 'Nothing to verify', fix: 'Name specific evidence' },
    { problem: 'Hides who, what, why', effect: 'No credibility', fix: 'State method and limits' },
    { problem: 'Unrelated tangent', effect: 'Breaks promise', fix: 'Cut or connect to question' },
    { problem: 'Fake suspense', effect: 'Viewer distrust', fix: 'Deliver value continuously' },
    { problem: 'CTA before value', effect: 'Premature ask', fix: 'Answer first, ask later' },
  ].map((d, i) => {
    const y = 105 + i * 40;
    return `
    <line x1="590" y1="${y + 15}" x2="630" y2="${y + 15}" stroke="#0066cc" stroke-width="1" marker-end="url(#arrow-blue)"/>
    <text x="640" y="${y + 10}" fill="rgba(255,60,60,0.5)" font-size="8" letter-spacing="0.5">PROBLEM</text>
    <text x="640" y="${y + 24}" fill="#d2d2d7" font-size="10">${d.problem}</text>
    `;
  }).join('')}

  <!-- Effects -->
  ${[
    { y: 105, text: 'Viewer lost' },
    { y: 145, text: 'Nothing to verify' },
    { y: 185, text: 'No credibility' },
    { y: 225, text: 'Promise broken' },
    { y: 265, text: 'Distrust built' },
    { y: 305, text: 'Premature ask' },
  ].map((e, i) => `
    <text x="870" y="${e.y + 15}" fill="#86868b" font-size="10">→ ${e.text}</text>
  `).join('')}

  <!-- Repair -->
  <rect x="60" y="400" width="1080" height="180" rx="14" fill="rgba(0,102,204,0.04)" stroke="rgba(0,102,204,0.2)" stroke-width="1"/>
  <text x="600" y="430" text-anchor="middle" fill="#0066cc" font-size="12" font-weight="600" letter-spacing="1">REPAIR PATTERN: Problem → Viewer Effect → Fix → Test</text>
  ${[
    '1. Name the specific failure (not "make it stronger")',
    '2. Explain why it matters to the viewer',
    '3. Suggest a repair that respects the facts',
    '4. Define how to test if the fix worked',
  ].map((step, i) => `
    <rect x="90" y="${445 + i * 30}" width="400" height="22" rx="6" fill="rgba(255,255,255,0.02)"/>
    <text x="110" y="${461 + i * 30}" fill="#d2d2d7" font-size="11">${step}</text>
  `).join('')}

  <text x="600" y="670" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Phase 10</text>
`);

// Lesson 14: Ten Revision Passes
svgDiagram('lesson-14-ten-passes.svg', 1200, 700, `
  <text x="600" y="45" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">The Ten Revision Passes</text>
  <text x="600" y="67" text-anchor="middle" fill="#6e6e73" font-size="11">From highest-cost problem to final polish · Each pass has a job</text>

  ${[
    { n: '01', label: 'STRUCTURE', desc: 'Does each beat change understanding?', color: '#0066cc' },
    { n: '02', label: 'TRUTH', desc: 'Are claims supported and bounded?', color: '#0066cc' },
    { n: '03', label: 'ORDER', desc: 'Is proof near the claim it supports?', color: '#0077ed' },
    { n: '04', label: 'CLARITY', desc: 'Can a new reader follow every step?', color: '#0077ed' },
    { n: '05', label: 'TRANSITIONS', desc: 'Do thoughts connect honestly?', color: '#2997ff' },
    { n: '06', label: 'VOICE', desc: 'Does it sound like a person thinking?', color: '#2997ff' },
    { n: '07', label: 'PACE', desc: 'Read aloud — natural breath rhythm?', color: '#0066cc' },
    { n: '08', label: 'VISUALS', desc: 'Does every image prove or compare?', color: '#0066cc' },
    { n: '09', label: 'TITLE/HOOK', desc: 'Does opening match final result?', color: '#0077ed' },
    { n: '10', label: 'POLISH', desc: 'Grammar, word choice, rhythm', color: '#2997ff' },
  ].map((pass, i) => {
    const y = 100 + i * 55;
    return `
    <rect x="100" y="${y}" width="1000" height="42" rx="10" fill="rgba(${pass.color === '#0066cc' ? '0,102,204' : pass.color === '#0077ed' ? '0,119,237' : '41,151,255'},0.04)" stroke="${pass.color}" stroke-width="1" opacity="${1 - i * 0.06}"/>
    <rect x="100" y="${y}" width="5" height="42" rx="2" fill="${pass.color}"/>
    <text x="130" y="${y + 27}" fill="${pass.color}" font-size="20" font-weight="700">${pass.n}</text>
    <text x="180" y="${y + 25}" fill="#f5f5f7" font-size="13" font-weight="600" letter-spacing="-0.3">${pass.label}</text>
    <text x="380" y="${y + 25}" fill="#86868b" font-size="12">${pass.desc}</text>
    `;
  }).join('')}

  <text x="600" y="660" text-anchor="middle" fill="#4e4e53" font-size="9">Save v1 and v2 · Log significant changes · The Scriptwriter's Atlas · Phase 10</text>
`);

// Lesson 15: Persuasion Structure
svgDiagram('lesson-15-persuasion.svg', 1200, 600, `
  <text x="600" y="50" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Persuade Without Cornering the Viewer</text>
  <text x="600" y="72" text-anchor="middle" fill="#6e6e73" font-size="11">A durable argument has four parts — the qualification doesn't cancel the idea</text>

  <!-- Four-part structure -->
  ${[
    { label: 'CLEAR POSITION', desc: 'Your defensible answer', x: 100, w: 230, color: '#0066cc' },
    { label: 'RELEVANT EVIDENCE', desc: 'What supports it', x: 360, w: 230, color: '#0077ed' },
    { label: 'REASONABLE ALTERNATIVE', desc: 'What else could be true', x: 620, w: 260, color: '#2997ff' },
    { label: 'WHAT REMAINS TRUE', desc: 'The boundary', x: 910, w: 200, color: '#0066cc' },
  ].map((step, i) => `
    <rect x="${step.x}" y="110" width="${step.w}" height="100" rx="14" fill="#1a1a1c" stroke="${step.color}" stroke-width="1.5"/>
    <text x="${step.x + step.w/2}" y="150" text-anchor="middle" fill="${step.color}" font-size="11" font-weight="600" letter-spacing="1">${step.label}</text>
    <text x="${step.x + step.w/2}" y="175" text-anchor="middle" fill="#86868b" font-size="11">${step.desc}</text>
    ${i < 3 ? `<line x1="${step.x + step.w}" y1="160" x2="${step.x + step.w + 30}" y2="160" stroke="#0066cc" stroke-width="1.5" marker-end="url(#arrow-blue)"/>` : ''}
  `).join('')}

  <!-- Example -->
  <rect x="100" y="260" width="1000" height="180" rx="14" fill="rgba(0,102,204,0.04)" stroke="rgba(0,102,204,0.15)" stroke-width="1"/>
  <text x="130" y="295" fill="#0066cc" font-size="10" font-weight="600" letter-spacing="1">EXAMPLE</text>

  <text x="130" y="325" fill="#d2d2d7" font-size="12">"For a researched explainer, writing the claim and evidence before filming can reveal</text>
  <text x="130" y="345" fill="#d2d2d7" font-size="12">a missing source before the edit."</text>

  <text x="130" y="380" fill="#2997ff" font-size="12" font-style="italic">"In an interview, scripting the questions may help, but scripting the guest's answers</text>
  <text x="130" y="400" fill="#2997ff" font-size="12" font-style="italic">can suppress a discovery. The workflow should change with the material."</text>

  <text x="130" y="425" fill="#6e6e73" font-size="10">The qualification does not cancel the idea — it makes the advice transferable.</text>

  <!-- Information control -->
  <rect x="100" y="480" width="1000" height="70" rx="14" fill="rgba(41,151,255,0.04)" stroke="rgba(41,151,255,0.15)" stroke-width="1"/>
  <text x="600" y="510" text-anchor="middle" fill="#f5f5f7" font-size="12" font-weight="600">ETHICAL INFORMATION CONTROL</text>
  <text x="600" y="532" text-anchor="middle" fill="#86868b" font-size="11">Fair to hold final outcome while showing attempts · Not fair to hide safety risk or major counterexample</text>

  <text x="600" y="580" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Phase 11</text>
`);

// Lesson 16: Capstone Rubric
svgDiagram('lesson-16-capstone-rubric.svg', 1200, 700, `
  <text x="600" y="45" text-anchor="middle" fill="#f5f5f7" font-size="20" font-weight="600" letter-spacing="-0.5">Capstone Rubric — What "Production-Ready" Means</text>
  <text x="600" y="67" text-anchor="middle" fill="#6e6e73" font-size="11">A skeptical viewer can tell what is known, inferred, and still uncertain</text>

  ${[
    { category: 'IDEA', criteria: ['Viewer question defined', 'Audience prior knowledge named', 'Promise is bounded and testable', 'Omission rule stated'] },
    { category: 'RESEARCH', criteria: ['Claim ledger with sources', 'Real counterpoint included', 'Health/finance claims held to higher standard', 'Dates and rights checked'] },
    { category: 'STRUCTURE', criteria: ['6-10 causal beats', 'Each beat changes understanding', 'Proof near the claim it supports', 'Ending closes the question'] },
    { category: 'HOOK', criteria: ['Three genuinely different openings', 'Chosen hook matches final evidence', 'Title/thumbnail/video aligned', 'Opening delivers early value'] },
    { category: 'PRODUCTION', criteria: ['Recording copy speakable', 'Editor copy has timed beats', 'Visuals prove, not decorate', 'Sources and rights logged'] },
    { category: 'POSTMORTEM', criteria: ['What you predicted vs observed', 'What you cannot infer', 'Next evidence or production test', 'Honest feedback with action'] },
  ].map((cat, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 60 + col * 380;
    const y = 100 + row * 270;
    return `
    <rect x="${x}" y="${y}" width="360" height="250" rx="14" fill="#1a1a1c" stroke="#0066cc" stroke-width="1"/>
    <text x="${x + 180}" y="${y + 30}" text-anchor="middle" fill="#0066cc" font-size="12" font-weight="700" letter-spacing="1.5">${cat.category}</text>
    <rect x="${x + 15}" y="${y + 42}" width="330" height="1" rx="0.5" fill="rgba(255,255,255,0.06)"/>
    ${cat.criteria.map((c, j) => `
      <text x="${x + 30}" y="${y + 72 + j * 42}" fill="#d2d2d7" font-size="11">✓ ${c}</text>
    `).join('')}
    `;
  }).join('')}

  <text x="600" y="670" text-anchor="middle" fill="#4e4e53" font-size="9">Good judgment is the graduation standard · The Scriptwriter's Atlas · Phase 12</text>
`);

console.log('\nAll extra diagrams generated.');