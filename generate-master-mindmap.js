#!/usr/bin/env node
// Generate master course mindmap SVG

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'course', 'images');

const w = 1600, h = 1000;
const cx = w / 2, cy = h / 2;

const phases = [
  { n: 1, label: "Foundations", short: "Topic → Idea" },
  { n: 2, label: "Scripting Mindset", short: "Decisions" },
  { n: 3, label: "Story & Structure", short: "Movement" },
  { n: 4, label: "Ideas & Research", short: "Evidence" },
  { n: 5, label: "Hooks & Retention", short: "Attention" },
  { n: 6, label: "The Human Ear", short: "Voice" },
  { n: 7, label: "Visual & Audio", short: "Production" },
  { n: 8, label: "Long & Short Form", short: "Format" },
  { n: 9, label: "Workflow", short: "Process" },
  { n: 10, label: "Autopsy & Revision", short: "Diagnose" },
  { n: 11, label: "Advanced Craft", short: "Lens" },
  { n: 12, label: "Capstone", short: "Package" },
];

const colors = ["#0066cc", "#0077ed", "#2997ff"];

let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <style>text { font-family: 'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif; }</style>
    <radialGradient id="bg-grad" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#141416"/>
      <stop offset="100%" stop-color="#0a0a0c"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#bg-grad)" rx="24"/>

  <!-- Subtle grid -->
  ${Array.from({length: 30}, (_, i) =>
    Array.from({length: 18}, (_, j) =>
      `<circle cx="${30 + i * 52}" cy="${30 + j * 55}" r="0.8" fill="rgba(255,255,255,0.03)"/>`
    ).join('')
  ).join('')}

  <!-- Outer ring -->
  <circle cx="${cx}" cy="${cy}" r="380" fill="none" stroke="rgba(0,102,204,0.06)" stroke-width="1" stroke-dasharray="4 8"/>
  <circle cx="${cx}" cy="${cy}" r="280" fill="none" stroke="rgba(0,102,204,0.04)" stroke-width="1" stroke-dasharray="3 6"/>

  <!-- Title -->
  <text x="${cx}" y="55" text-anchor="middle" fill="#f5f5f7" font-size="22" font-weight="600" letter-spacing="-0.5">THE SCRIPTWRITER'S ATLAS</text>
  <text x="${cx}" y="78" text-anchor="middle" fill="#86868b" font-size="12" letter-spacing="2">COMPLETE COURSE MIND MAP · 12 PHASES · 16 LESSONS</text>

  <!-- Center node -->
  <circle cx="${cx}" cy="${cy}" r="80" fill="#0066cc" opacity="0.15"/>
  <circle cx="${cx}" cy="${cy}" r="80" fill="none" stroke="#0066cc" stroke-width="2" opacity="0.6"/>
  <text x="${cx}" y="${cy - 18}" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="600">SCRIPT</text>
  <text x="${cx}" y="${cy + 2}" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="600">WRITING</text>
  <text x="${cx}" y="${cy + 22}" text-anchor="middle" fill="#2997ff" font-size="10" letter-spacing="1">CRAFT</text>
`;

// Position phases in a circle
const orbitR = 320;
const innerR = 240;

phases.forEach((phase, i) => {
  const angle = (i * 2 * Math.PI / phases.length) - Math.PI / 2;
  const nx = cx + orbitR * Math.cos(angle);
  const ny = cy + orbitR * Math.sin(angle);
  const color = colors[i % 3];
  const nodeW = 160, nodeH = 64;

  // Connection line
  svg += `  <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${color}" stroke-width="1.5" opacity="0.15" stroke-dasharray="6 4"/>\n`;

  // Node background
  svg += `  <rect x="${nx - nodeW/2}" y="${ny - nodeH/2}" width="${nodeW}" height="${nodeH}" rx="12" fill="#1a1a1c" stroke="${color}" stroke-width="1.5" opacity="0.9"/>\n`;

  // Phase number
  svg += `  <text x="${nx}" y="${ny - 12}" text-anchor="middle" fill="${color}" font-size="9" font-weight="600" font-family="'SF Mono', 'Consolas', monospace" letter-spacing="1.5">PHASE ${String(phase.n).padStart(2, '0')}</text>\n`;

  // Phase label
  svg += `  <text x="${nx}" y="${ny + 6}" text-anchor="middle" fill="#f5f5f7" font-size="12" font-weight="600" letter-spacing="-0.3">${phase.label}</text>\n`;

  // Short description
  svg += `  <text x="${nx}" y="${ny + 22}" text-anchor="middle" fill="#6e6e73" font-size="9">${phase.short}</text>\n`;

  // Connecting arc between adjacent phases
  if (i < phases.length - 1) {
    const nextAngle = ((i + 1) * 2 * Math.PI / phases.length) - Math.PI / 2;
    const arcR = orbitR;
    const startX = cx + (arcR - 20) * Math.cos(angle);
    const startY = cy + (arcR - 20) * Math.sin(angle);
    const endX = cx + (arcR - 20) * Math.cos(nextAngle);
    const endY = cy + (arcR - 20) * Math.sin(nextAngle);
    svg += `  <path d="M ${startX} ${startY} A ${arcR - 20} ${arcR - 20} 0 0 1 ${endX} ${endY}" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>\n`;
  }
});

// Footer
svg += `  <text x="${cx}" y="${h - 30}" text-anchor="middle" fill="#4e4e53" font-size="10">From First Idea to Final Cut · The Scriptwriter's Atlas</text>\n`;
svg += '</svg>';

fs.writeFileSync(path.join(OUTPUT_DIR, 'mindmap-course-overview.svg'), svg);
console.log('✓ mindmap-course-overview.svg');