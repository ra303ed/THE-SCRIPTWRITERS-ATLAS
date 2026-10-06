#!/usr/bin/env node
// Generate SVG mindmaps for each phase of The Scriptwriter's Atlas

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'course', 'images');

const phases = [
  {
    number: 1,
    title: "Foundations",
    color: "#0066cc",
    center: "From Topic\nto Video Idea",
    nodes: [
      { label: "Topic", desc: "Name the territory" },
      { label: "Question", desc: "What uncertainty?" },
      { label: "Audience", desc: "Who needs this?" },
      { label: "Angle", desc: "What lens?" },
      { label: "Thesis", desc: "Your defensible answer" },
      { label: "Promise", desc: "What viewer gets" },
    ],
  },
  {
    number: 2,
    title: "The Scripting Mindset",
    color: "#0077ed",
    center: "Decisions Before\nPolishing",
    nodes: [
      { label: "Who?", desc: "Viewer knowledge" },
      { label: "What Changes?", desc: "Beat purpose" },
      { label: "What's Supported?", desc: "Evidence type" },
      { label: "What Order?", desc: "Sequence logic" },
      { label: "What to Show?", desc: "Visual proof" },
      { label: "What Contract?", desc: "Title ↔ promise" },
    ],
  },
  {
    number: 3,
    title: "Story & Structure",
    color: "#2997ff",
    center: "Cause, Choice &\nConsequence",
    nodes: [
      { label: "Desire", desc: "What's wanted" },
      { label: "Obstacle", desc: "What blocks it" },
      { label: "Attempt", desc: "First try" },
      { label: "New Info", desc: "What changed" },
      { label: "Choice", desc: "Decision made" },
      { label: "Consequence", desc: "What happened" },
    ],
  },
  {
    number: 4,
    title: "Ideas & Research",
    color: "#0066cc",
    center: "Question, Claim\n& Evidence",
    nodes: [
      { label: "Viewer Q", desc: "Not a keyword" },
      { label: "Observation", desc: "What you saw" },
      { label: "Test Result", desc: "What happened" },
      { label: "External Fact", desc: "Identified source" },
      { label: "Inference", desc: "May have alternatives" },
      { label: "Stop Rule", desc: "When to stop" },
    ],
  },
  {
    number: 5,
    title: "Hooks & Retention",
    color: "#0077ed",
    center: "Earn Attention\nThen Pay It Back",
    nodes: [
      { label: "Scene", desc: "Real moment" },
      { label: "Question", desc: "Meaningful answer" },
      { label: "Contradiction", desc: "True paradox" },
      { label: "Demonstration", desc: "Real comparison" },
      { label: "Open Loops", desc: "Close them" },
      { label: "Micro-Payoffs", desc: "Value each step" },
    ],
  },
  {
    number: 6,
    title: "The Human Ear",
    color: "#2997ff",
    center: "Voice Without\nPerforming",
    nodes: [
      { label: "Voice", desc: "Stable pattern" },
      { label: "Tone", desc: "Current stance" },
      { label: "Observation", desc: "What you notice" },
      { label: "Judgment", desc: "How you evaluate" },
      { label: "Rhythm", desc: "Breath & pace" },
      { label: "Specificity", desc: "Defend every line" },
    ],
  },
  {
    number: 7,
    title: "Visual & Audio",
    color: "#0066cc",
    center: "Image, Sound\n& Edit",
    nodes: [
      { label: "Script", desc: "Meaning & cause" },
      { label: "Visual", desc: "Proves & compares" },
      { label: "Audio", desc: "Shapes energy" },
      { label: "Edit", desc: "Controls timing" },
      { label: "Silence", desc: "Let them think" },
      { label: "Viewer XP", desc: "Intended change" },
    ],
  },
  {
    number: 8,
    title: "Long & Short Form",
    color: "#0077ed",
    center: "Architecture\nNot Runtime",
    nodes: [
      { label: "Short", desc: "One question" },
      { label: "Long", desc: "Earn extra time" },
      { label: "Compress", desc: "Select, don't speed" },
      { label: "Expand", desc: "New proof & depth" },
      { label: "Format", desc: "Match expectation" },
      { label: "Time It", desc: "Read aloud" },
    ],
  },
  {
    number: 9,
    title: "Professional Workflow",
    color: "#2997ff",
    center: "Brief to Script\nWorkshop",
    nodes: [
      { label: "Idea", desc: "Question + evidence" },
      { label: "Brief", desc: "Scope & omission" },
      { label: "Research", desc: "Claim ledger" },
      { label: "Outline", desc: "Causal beats" },
      { label: "Draft", desc: "[VERIFY] marks" },
      { label: "Finalize", desc: "Handoff-ready" },
    ],
  },
  {
    number: 10,
    title: "Autopsy & Revision",
    color: "#0066cc",
    center: "Diagnose Before\nRewriting",
    nodes: [
      { label: "Contract", desc: "Title ↔ video" },
      { label: "Architecture", desc: "Beat changes" },
      { label: "Transitions", desc: "Real connections" },
      { label: "Line Edit", desc: "Specific & sayable" },
      { label: "Priority", desc: "Biggest first" },
      { label: "Feedback", desc: "Actionable next" },
    ],
  },
  {
    number: 11,
    title: "Advanced Craft",
    color: "#0077ed",
    center: "Lens, Emphasis\n& Omission",
    nodes: [
      { label: "Lens", desc: "Choose one" },
      { label: "Persuade", desc: "Position + evidence" },
      { label: "Reveal Order", desc: "Ethical timing" },
      { label: "Analogy", desc: "Where it breaks" },
      { label: "Humor", desc: "When it clarifies" },
      { label: "Emotion", desc: "Show via action" },
    ],
  },
  {
    number: 12,
    title: "Capstone",
    color: "#2997ff",
    center: "Production-Ready\nPackage",
    nodes: [
      { label: "Choose Idea", desc: "Genuine research" },
      { label: "Research", desc: "Counterpoint" },
      { label: "Structure", desc: "6-10 beats" },
      { label: "3 Hooks", desc: "Choose best" },
      { label: "Revise", desc: "Structural pass" },
      { label: "Postmortem", desc: "What you learned" },
    ],
  },
];

function svgMindmap(phase) {
  const w = 1200, h = 800;
  const cx = w / 2, cy = h / 2;
  const nodeR = 85;
  const orbitR = 260;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <style>
      text { font-family: 'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="#0a0a0c" rx="24"/>

  <!-- Grid dots -->
  ${Array.from({length: 20}, (_, i) =>
    Array.from({length: 14}, (_, j) =>
      `<circle cx="${40 + i * 58}" cy="${40 + j * 56}" r="1" fill="rgba(255,255,255,0.04)"/>`
    ).join('')
  ).join('')}

  <!-- Phase label -->
  <text x="${cx}" y="52" text-anchor="middle" fill="${phase.color}" font-size="11" font-weight="600" letter-spacing="2" font-family="'SF Mono', 'Consolas', monospace">
    PHASE ${String(phase.number).padStart(2, '0')}
  </text>
  <text x="${cx}" y="72" text-anchor="middle" fill="#86868b" font-size="10" letter-spacing="1" font-family="'SF Mono', 'Consolas', monospace">
    ${phase.title.toUpperCase()}
  </text>

  <!-- Center node -->
  <circle cx="${cx}" cy="${cy}" r="95" fill="${phase.color}" opacity="0.12"/>
  <circle cx="${cx}" cy="${cy}" r="95" fill="none" stroke="${phase.color}" stroke-width="2" opacity="0.5"/>
  <text x="${cx}" y="${cy - 12}" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="600" letter-spacing="-0.5">
    ${phase.center.split('\n')[0]}
  </text>
  <text x="${cx}" y="${cy + 10}" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="600" letter-spacing="-0.5">
    ${phase.center.split('\n')[1] || ''}
  </text>
`;

  // Draw connections and nodes
  phase.nodes.forEach((node, i) => {
    const angle = (i * 2 * Math.PI / phase.nodes.length) - Math.PI / 2;
    const nx = cx + orbitR * Math.cos(angle);
    const ny = cy + orbitR * Math.sin(angle);

    // Connection line
    svg += `  <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${phase.color}" stroke-width="1.5" opacity="0.2" stroke-dasharray="6 4"/>\n`;

    // Node circle
    svg += `  <circle cx="${nx}" cy="${ny}" r="${nodeR}" fill="#1a1a1c" stroke="${phase.color}" stroke-width="1.5" opacity="0.9"/>\n`;

    // Node label
    svg += `  <text x="${nx}" y="${ny - 8}" text-anchor="middle" fill="#f5f5f7" font-size="14" font-weight="600" letter-spacing="-0.3">${node.label}</text>\n`;

    // Node description
    svg += `  <text x="${nx}" y="${ny + 12}" text-anchor="middle" fill="#86868b" font-size="10">${node.desc}</text>\n`;
  });

  // Footer
  svg += `  <text x="${cx}" y="${h - 30}" text-anchor="middle" fill="#6e6e73" font-size="10">The Scriptwriter's Atlas · Mind Map</text>\n`;

  svg += '</svg>';
  return svg;
}

// Generate all mindmaps
phases.forEach(phase => {
  const svg = svgMindmap(phase);
  const filename = `mindmap-phase-${String(phase.number).padStart(2, '0')}.svg`;
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), svg);
  console.log(`✓ ${filename}`);
});

console.log('\nAll mindmaps generated.');