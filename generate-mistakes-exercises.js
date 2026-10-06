#!/usr/bin/env node
// Generate Common Mistakes + Practice Exercise + Takeaway visuals

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'course', 'images');

function svgCard(filename, w, h, content) {
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

// ── COMMON MISTAKES for every lesson ──

const commonMistakes = [
  {
    num: 1, title: 'Common Mistakes — Lesson 1',
    subtitle: 'From Topic to Video Idea',
    mistakes: [
      { x: '✗', text: 'Treating a topic as if it were a video idea', fix: 'Define a specific question inside the territory' },
      { x: '✗', text: 'Writing for "everyone interested"', fix: 'Define one viewer by knowledge and need' },
      { x: '✗', text: 'Choosing a surprising angle with no evidence', fix: 'Choose angle you can actually investigate' },
      { x: '✗', text: 'Making the promise bigger than footage can support', fix: 'Bound the promise to what you can deliver' },
    ]
  },
  {
    num: 2, title: 'Common Mistakes — Lesson 2',
    subtitle: 'From Thought to Clear Sentence',
    mistakes: [
      { x: '✗', text: 'Using abstract verbs and nouns', fix: 'Use concrete actions the viewer can picture' },
      { x: '✗', text: 'Adding emotional adjectives without evidence', fix: 'Show why it matters through specific detail' },
      { x: '✗', text: 'Passive voice hiding who did what', fix: 'Name the actor and the action clearly' },
      { x: '✗', text: 'Writing sentences too long to speak aloud', fix: 'Read every sentence — if you run out of breath, split it' },
    ]
  },
  {
    num: 3, title: 'Common Mistakes — Lesson 3',
    subtitle: 'Decisions Before Polish',
    mistakes: [
      { x: '✗', text: 'Keeping a line because it sounds good', fix: 'Ask: what does this beat change for the viewer?' },
      { x: '✗', text: 'Treating every research note as required', fix: 'Only include material that serves the promise' },
      { x: '✗', text: 'Using "but" or "therefore" decoratively', fix: 'Only use when real contrast or cause exists' },
      { x: '✗', text: 'Polishing grammar before structure is stable', fix: 'Discover the structure first, then polish' },
      { x: '✗', text: 'Narration describes exact picture', fix: 'Narration adds meaning, cause, or context' },
    ]
  },
  {
    num: 4, title: 'Common Mistakes — Lesson 4',
    subtitle: 'Cause, Choice, and Consequence',
    mistakes: [
      { x: '✗', text: 'Treating chronology as story', fix: 'Show cause, resistance, and change between events' },
      { x: '✗', text: 'Inventing conflict for drama', fix: 'Use real obstacles; don\'t manufacture them' },
      { x: '✗', text: 'Making every problem sound life-changing', fix: 'A small consequence can be enough for a focused lesson' },
      { x: '✗', text: 'Opening loops and forgetting to close them', fix: 'Close each loop; only open another if evidence creates it' },
      { x: '✗', text: 'Forcing "but" where nothing conflicts', fix: 'Sometimes the honest link is "and then"' },
    ]
  },
  {
    num: 5, title: 'Common Mistakes — Lesson 5',
    subtitle: 'Choose a Structure',
    mistakes: [
      { x: '✗', text: 'Copying a successful video\'s surface structure', fix: 'Choose structure that fits YOUR material' },
      { x: '✗', text: 'Using "three tips" for a story that needs cause-effect', fix: 'Match structure to the movement of your idea' },
      { x: '✗', text: 'Adding a fake hero\'s journey to a list', fix: 'A list can be honest if options are genuinely distinct' },
      { x: '✗', text: 'Forcing surprise at the midpoint', fix: 'A real turn happens when new info changes the plan' },
    ]
  },
  {
    num: 6, title: 'Common Mistakes — Lesson 6',
    subtitle: 'Question, Claim, Evidence',
    mistakes: [
      { x: '✗', text: 'Treating correlation as causation', fix: '"After X, Y happened" ≠ "X caused Y"' },
      { x: '✗', text: 'Using one personal result as universal rule', fix: 'Bound your claim to what the evidence shows' },
      { x: '✗', text: 'No stop condition for research', fix: 'Set a clear rule for when to stop collecting' },
      { x: '✗', text: 'Treating a popular post as verification', fix: 'Popularity ≠ accuracy; check the primary source' },
      { x: '✗', text: 'Quietly promoting opinion to fact', fix: 'Label: observation, test, fact, inference, or opinion' },
    ]
  },
  {
    num: 7, title: 'Common Mistakes — Lesson 7',
    subtitle: 'Earn Attention, Pay It Back',
    mistakes: [
      { x: '✗', text: 'Generic question with automatic "yes"', fix: 'Ask a question with a meaningful, specific answer' },
      { x: '✗', text: 'Manufactured paradox', fix: 'Use two true details that don\'t yet fit together' },
      { x: '✗', text: 'Inflating a small cost into a crisis', fix: 'Use honest stakes — a reshoot, wasted time, lost trust' },
      { x: '✗', text: 'Holding useful answers hostage', fix: 'Deliver micro-payoffs throughout; don\'t just tease' },
      { x: '✗', text: 'Random zoom as "new idea"', fix: 'Pattern changes must change evidence, perspective, or pace' },
    ]
  },
  {
    num: 8, title: 'Common Mistakes — Lesson 8',
    subtitle: 'Build a Human Voice',
    mistakes: [
      { x: '✗', text: '"In today\'s fast-paced digital world"', fix: 'Start with a specific observation or question' },
      { x: '✗', text: '"Leverage innovation to maximize engagement"', fix: 'Use concrete nouns and active verbs' },
      { x: '✗', text: '"We\'ve all been there" with no basis', fix: 'Only speak for yourself unless you have evidence' },
      { x: '✗', text: 'Fake suspense or unsupported confessions', fix: 'Build tension from real uncertainty and evidence' },
      { x: '✗', text: 'Confidence that outruns the proof', fix: 'Match your certainty to what the evidence supports' },
    ]
  },
  {
    num: 9, title: 'Common Mistakes — Lesson 9',
    subtitle: 'Breath, Rhythm, Comprehension',
    mistakes: [
      { x: '✗', text: 'Sentences too long to speak naturally', fix: 'Read aloud — split where you breathe' },
      { x: '✗', text: 'No time for demonstrations', fix: 'Leave room for pauses, demos, and viewer processing' },
      { x: '✗', text: 'Same rhythm every paragraph', fix: 'Vary sentence length: short punches after long explanations' },
      { x: '✗', text: 'Pronunciation assumed, never tested', fix: 'Say every name, term, and title aloud before recording' },
    ]
  },
  {
    num: 10, title: 'Common Mistakes — Lesson 10',
    subtitle: 'Image, Sound, and Edit',
    mistakes: [
      { x: '✗', text: 'B-roll as random wallpaper', fix: 'Every visual must prove, compare, reveal, or orient' },
      { x: '✗', text: 'Narration repeats the exact picture', fix: 'Narration adds meaning; visuals show evidence' },
      { x: '✗', text: 'Music suggesting success before proof', fix: 'Match emotional cues to the evidence, not the hope' },
      { x: '✗', text: 'Screen recording shows wrong interface', fix: 'Show real interface or clearly label as mock-up' },
      { x: '✗', text: 'On-screen text competing with narration', fix: 'Text should support, not fight, the voice' },
    ]
  },
  {
    num: 11, title: 'Common Mistakes — Lesson 11',
    subtitle: 'Long-Form vs Short-Form',
    mistakes: [
      { x: '✗', text: 'Cutting a long video to make a Short', fix: 'A Short needs its own independent question' },
      { x: '✗', text: 'Talking faster to compress', fix: 'Select — don\'t speed up the same draft' },
      { x: '✗', text: 'Stretching with extra explanations', fix: 'Long-form earns time with new proof and depth' },
      { x: '✗', text: 'Recap when material is simple', fix: 'Recaps only help when material is genuinely complex' },
      { x: '✗', text: 'Arbitrary runtime target', fix: 'Let evidence and viewer need determine length' },
    ]
  },
  {
    num: 12, title: 'Common Mistakes — Lesson 12',
    subtitle: 'The Brief-to-Script Workshop',
    mistakes: [
      { x: '✗', text: 'Writing straight through from a title', fix: 'Use stage-based workflow; each stage has a stop condition' },
      { x: '✗', text: 'Research with no stop condition', fix: 'Stop when important claims are supported or marked' },
      { x: '✗', text: 'Polishing before structure is stable', fix: 'Stable outline first; draft second; polish third' },
      { x: '✗', text: 'Hiding [VERIFY] markers as complete', fix: 'Leave honest placeholders for unverified facts' },
      { x: '✗', text: 'No loop-back when evidence changes', fix: 'Loop back to the decision that changed' },
    ]
  },
  {
    num: 13, title: 'Common Mistakes — Lesson 13',
    subtitle: 'Diagnose Before Rewrite',
    mistakes: [
      { x: '✗', text: '"Make it stronger" with no specifics', fix: 'Name the exact failure and its viewer effect' },
      { x: '✗', text: 'Substituting words without fixing structure', fix: 'Diagnose the level: contract, architecture, paragraph, line' },
      { x: '✗', text: 'Rewriting without respecting the facts', fix: 'A rewrite must be honest — don\'t invent new evidence' },
      { x: '✗', text: 'Polishing a paragraph that belongs elsewhere', fix: 'Move or cut before you polish' },
      { x: '✗', text: 'Feedback with no next action', fix: 'Every diagnosis ends with a concrete repair step' },
    ]
  },
  {
    num: 14, title: 'Common Mistakes — Lesson 14',
    subtitle: 'Revise in the Right Order',
    mistakes: [
      { x: '✗', text: 'Starting with word choice before structure', fix: 'Fix structure → truth → clarity → voice → polish' },
      { x: '✗', text: 'Polishing what you might cut', fix: 'Verify the paragraph belongs before refining it' },
      { x: '✗', text: 'No decision log for changes', fix: 'Document what changed, why, and what evidence supports it' },
      { x: '✗', text: 'Treating feedback as personal attack', fix: 'Separate the work from the writer; focus on viewer effect' },
      { x: '✗', text: 'One revision pass and done', fix: 'Run multiple passes; save v1 and v2' },
    ]
  },
  {
    num: 15, title: 'Common Mistakes — Lesson 15',
    subtitle: 'Lens, Emphasis, and Omission',
    mistakes: [
      { x: '✗', text: 'Cramming all four lenses into one video', fix: 'Choose the one with clearest audience need' },
      { x: '✗', text: 'Hiding a counterexample for suspense', fix: 'Don\'t delay info that changes the meaning' },
      { x: '✗', text: 'Analogy that doesn\'t map the relationship', fix: 'State where the analogy breaks down' },
      { x: '✗', text: 'Making a harmed person the joke', fix: 'Humor should clarify, not punch down' },
      { x: '✗', text: 'Invented feelings attributed to subjects', fix: 'Show emotion through behavior and choices' },
    ]
  },
  {
    num: 16, title: 'Common Mistakes — Lesson 16',
    subtitle: 'Production-Ready Package',
    mistakes: [
      { x: '✗', text: 'Choosing a topic only because it looks dramatic', fix: 'Choose where you can obtain evidence and deliver' },
      { x: '✗', text: 'Stretching to meet arbitrary runtime', fix: 'Let evidence and viewer need determine length' },
      { x: '✗', text: 'Leaving [VERIFY] markers as if complete', fix: 'Verify all names, dates, numbers, quotes' },
      { x: '✗', text: 'Claiming one wording change caused performance', fix: 'Graphs alone can\'t prove causation' },
      { x: '✗', text: 'No postmortem after publishing', fix: 'Record predictions, observations, and limits' },
    ]
  },
];

for (const cm of commonMistakes) {
  const h = 140 + cm.mistakes.length * 62;
  const content = `
  <text x="600" y="45" text-anchor="middle" fill="#f5f5f7" font-size="18" font-weight="600" letter-spacing="-0.4">${cm.title}</text>
  <text x="600" y="65" text-anchor="middle" fill="#6e6e73" font-size="11">${cm.subtitle}</text>

  ${cm.mistakes.map((m, i) => {
    const y = 95 + i * 62;
    return `
    <rect x="60" y="${y}" width="1080" height="50" rx="10" fill="rgba(255,60,60,0.04)" stroke="rgba(255,60,60,0.12)" stroke-width="1"/>
    <text x="90" y="${y + 22}" fill="rgba(255,80,80,0.5)" font-size="14" font-weight="700">${m.x}</text>
    <text x="120" y="${y + 20}" fill="#d2d2d7" font-size="12">${m.text}</text>
    <text x="120" y="${y + 40}" fill="#2997ff" font-size="10">→ ${m.fix}</text>
    `;
  }).join('')}

  <text x="600" y="${h - 15}" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Lesson ${cm.num}</text>`;

  svgCard(`common-mistakes-${String(cm.num).padStart(2, '0')}.svg`, 1200, h, content);
}

// ── PRACTICE EXERCISES for key lessons ──

const exercises = [
  {
    num: 1, title: 'Practice — Five Questions, One Idea',
    steps: [
      { n: '1', label: 'Pick a topic', desc: 'The general subject you care about' },
      { n: '2', label: 'Write a question', desc: 'What uncertainty does the viewer have?' },
      { n: '3', label: 'Name the audience', desc: 'Who needs this answered, and what do they already know?' },
      { n: '4', label: 'Choose an angle', desc: 'What lens will you investigate through?' },
      { n: '5', label: 'State a thesis', desc: 'Your defensible answer that evidence could change' },
      { n: '6', label: 'Write the promise', desc: 'One sentence: what viewer can do/understand by the end' },
    ]
  },
  {
    num: 4, title: 'Practice — Draw the Causal Map',
    steps: [
      { n: '1', label: 'Choose a project', desc: 'A real decision, learning problem, or experiment' },
      { n: '2', label: 'Write the want', desc: 'What result are you after? Plain language.' },
      { n: '3', label: 'Name the obstacle', desc: 'What makes the easy route uncertain?' },
      { n: '4', label: 'Describe the attempt', desc: 'What did you try? What did it teach?' },
      { n: '5', label: 'Identify the turn', desc: 'What new information changed your plan?' },
      { n: '6', label: 'Show the consequence', desc: 'What happened? What changed for the viewer?' },
    ]
  },
  {
    num: 7, title: 'Practice — Three Hooks, One Promise',
    steps: [
      { n: '1', label: 'Scene hook', desc: 'Describe a real, relevant moment the viewer can see' },
      { n: '2', label: 'Question hook', desc: 'Write a question with a meaningful answer' },
      { n: '3', label: 'Contradiction hook', desc: 'Two true details that don\'t yet fit together' },
      { n: '4', label: 'Match to evidence', desc: 'Which hook can your actual footage support?' },
      { n: '5', label: 'Align title/thumbnail', desc: 'Does the opening match the final promise?' },
      { n: '6', label: 'Test the contract', desc: 'After 20 seconds, can a stranger name the video\'s question?' },
    ]
  },
  {
    num: 12, title: 'Practice — Workshop Sprint',
    steps: [
      { n: '1', label: 'Idea card', desc: 'Question + audience + evidence path in one sentence' },
      { n: '2', label: 'One-page brief', desc: 'Scope, outcome, promise, omission rule' },
      { n: '3', label: 'Claim ledger', desc: 'Sources, dates, counterpoint, [VERIFY] markers' },
      { n: '4', label: 'Causal outline', desc: '5-10 beats with viewer-before/after for each' },
      { n: '5', label: 'Three hooks', desc: 'Genuinely different; choose based on real evidence' },
      { n: '6', label: 'Full draft', desc: 'Complete, imperfect; mark [VERIFY] and [SHOOT]' },
      { n: '7', label: 'Recording copy', desc: 'Speakable, timed, natural rhythm' },
      { n: '8', label: 'Editor copy', desc: 'Visuals, sound, timing, assets, sources' },
    ]
  },
  {
    num: 16, title: 'Practice — The Skeptical Handoff',
    steps: [
      { n: '1', label: 'Choose your subject', desc: 'One you can genuinely research and demonstrate' },
      { n: '2', label: 'Build claim ledger', desc: 'Primary sources, counterpoint, dates, rights' },
      { n: '3', label: 'Outline 6-10 beats', desc: 'Each changes understanding; proof assigned' },
      { n: '4', label: 'Write 3 hooks', desc: 'Different mechanisms; test on a phone' },
      { n: '5', label: 'Draft complete script', desc: 'Finish the route before polishing lines' },
      { n: '6', label: 'Structural revision', desc: 'v1 → v2; log every significant change' },
      { n: '7', label: 'Reader test', desc: 'Unfamiliar reader: what\'s promised? confused?' },
      { n: '8', label: 'Prepare copies', desc: 'Recording copy + editor copy + source log' },
      { n: '9', label: 'Final verification', desc: 'Names, dates, numbers, quotes, rights, disclosures' },
      { n: '10', label: 'Postmortem', desc: 'What you predicted vs observed vs can\'t infer' },
    ]
  },
];

for (const ex of exercises) {
  const h = 120 + ex.steps.length * 56;
  const content = `
  <text x="600" y="45" text-anchor="middle" fill="#f5f5f7" font-size="18" font-weight="600" letter-spacing="-0.4">${ex.title}</text>
  <text x="600" y="65" text-anchor="middle" fill="#6e6e73" font-size="11">Step-by-step exercise · The Scriptwriter's Atlas</text>

  ${ex.steps.map((s, i) => {
    const y = 90 + i * 56;
    return `
    <rect x="80" y="${y}" width="1040" height="44" rx="10" fill="rgba(0,102,204,0.04)" stroke="rgba(0,102,204,0.12)" stroke-width="1"/>
    <circle cx="115" cy="${y + 22}" r="14" fill="rgba(0,102,204,0.15)" stroke="#0066cc" stroke-width="1.5"/>
    <text x="115" y="${y + 27}" text-anchor="middle" fill="#0066cc" font-size="13" font-weight="700">${s.n}</text>
    <text x="145" y="${y + 18}" fill="#f5f5f7" font-size="13" font-weight="600">${s.label}</text>
    <text x="145" y="${y + 36}" fill="#86868b" font-size="11">${s.desc}</text>
    ${i < ex.steps.length - 1 ? `<line x1="115" y1="${y + 44}" x2="115" y2="${y + 56}" stroke="rgba(0,102,204,0.2)" stroke-width="1" stroke-dasharray="3 3"/>` : ''}
    `;
  }).join('')}

  <text x="600" y="${h - 15}" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas · Lesson ${ex.num}</text>`;

  svgCard(`exercise-${String(ex.num).padStart(2, '0')}.svg`, 1200, h, content);
}

// ── TAKEAWAY cards for every lesson ──

const takeaways = [
  { num: 1, text: 'A topic names a territory. A video idea makes a specific promise about one useful question — and has a credible way to answer it.' },
  { num: 2, text: 'A sentence is a handoff. If the reader cannot recover your thought without you standing beside them, the sentence failed.' },
  { num: 3, text: 'Every beat should earn its position. Before this beat the viewer knows ___. After it, they know ___. If nothing changed, cut it.' },
  { num: 4, text: 'A story makes change legible. Chronology is not enough — show desire, resistance, choice, and consequence.' },
  { num: 5, text: 'Structure is a route through the material. Choose the route that fits this viewer and this promise — not one that imitates success.' },
  { num: 6, text: 'Research is not collecting everything. It is finding and checking the information that answers a specific viewer\'s question.' },
  { num: 7, text: 'A hook is a contract, not a trick. Earn attention by delivering value early, and close every loop you open.' },
  { num: 8, text: 'A human voice is a pattern of noticing, judgment, evidence, and rhythm. It is not a set of casual phrases.' },
  { num: 9, text: 'Read every script aloud. If you run out of breath, the sentence is too long. If you stumble, the rhythm is wrong.' },
  { num: 10, text: 'Every visual must do a job — prove, compare, reveal, orient, demonstrate, or create room. Not just decorate.' },
  { num: 11, text: 'A Short and a long-form video need different architecture. Select, don\'t speed up. Develop, don\'t repeat.' },
  { num: 12, text: 'A professional workflow is a decision map. Each stage reduces uncertainty and produces something the next stage can use.' },
  { num: 13, text: 'Diagnose before you rewrite. Name the failure, explain its viewer effect, suggest a repair, and define the test.' },
  { num: 14, text: 'Fix the biggest problem first. Don\'t polish what you might cut. Save v1 and v2. Log what changed and why.' },
  { num: 15, text: 'Advanced craft is purposeful control. Every inclusion, omission, reveal, pause, and emphasis changes what the audience believes next.' },
  { num: 16, text: 'A professional script is a defensible promise, supported by evidence, shaped for a viewer, and clear enough to produce.' },
];

for (const t of takeaways) {
  svgCard(`takeaway-${String(t.num).padStart(2, '0')}.svg`, 1000, 180, `
  <text x="500" y="40" text-anchor="middle" fill="#0066cc" font-size="9" font-weight="600" letter-spacing="2">LESSON ${String(t.num).padStart(2, '0')} · TAKEAWAY</text>
  <rect x="80" y="60" width="840" height="80" rx="14" fill="rgba(0,102,204,0.05)" stroke="rgba(0,102,204,0.15)" stroke-width="1"/>
  <text x="500" y="95" text-anchor="middle" fill="#f5f5f7" font-size="14" font-weight="500">
    <tspan x="500" dy="0">${t.text.length > 70 ? t.text.slice(0, 70) : t.text}</tspan>
    ${t.text.length > 70 ? `<tspan x="500" dy="22">${t.text.slice(70, 140)}</tspan>` : ''}
    ${t.text.length > 140 ? `<tspan x="500" dy="22">${t.text.slice(140)}</tspan>` : ''}
  </text>
  <text x="500" y="160" text-anchor="middle" fill="#4e4e53" font-size="9">The Scriptwriter's Atlas</text>
  `);
}

console.log('\nAll Common Mistakes, Exercises, and Takeaways generated.');