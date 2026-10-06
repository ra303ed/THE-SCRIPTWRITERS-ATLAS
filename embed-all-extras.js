#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const PHASES_DIR = path.join(__dirname, 'course', 'phases');

const lessonToPhase = {
  1: '01-foundations.md', 2: '01-foundations.md',
  3: '02-scripting-mindset.md',
  4: '03-story-and-structure.md', 5: '03-story-and-structure.md',
  6: '04-ideas-research.md',
  7: '05-hooks-retention.md',
  8: '06-human-voice.md', 9: '06-human-voice.md',
  10: '07-visual-audio.md',
  11: '08-long-short.md',
  12: '09-workflow-workshop.md',
  13: '10-autopsy-revision.md', 14: '10-autopsy-revision.md',
  15: '11-advanced-craft.md',
  16: '12-capstone.md',
};

const filesToPatch = {};

// Collect what to embed per file
for (let n = 1; n <= 16; n++) {
  const file = lessonToPhase[n];
  if (!filesToPatch[file]) filesToPatch[file] = [];
  const pad = String(n).padStart(2, '0');

  filesToPatch[file].push({
    lesson: n,
    section: 'Common Mistakes',
    image: `common-mistakes-${pad}.svg`,
    alt: `Common Mistakes — Lesson ${n}`,
  });
  filesToPatch[file].push({
    lesson: n,
    section: 'Takeaway',
    image: `takeaway-${pad}.svg`,
    alt: `Lesson ${n} Takeaway`,
  });
}

// Add exercise images for specific lessons
const exerciseLessons = [1, 4, 7, 12, 16];
for (const n of exerciseLessons) {
  const file = lessonToPhase[n];
  const exerciseNames = {
    1: 'Practice Exercise \u2014 Five Questions, One Defensible Idea',
    4: 'Practice Exercise \u2014 Draw the Causal Map',
    7: 'Practice Exercise \u2014 Three Hooks, One Honest Promise',
    12: 'Practice Exercise \u2014 Workshop Sprint',
    16: 'Practice Exercise \u2014 The Skeptical Handoff',
  };
  filesToPatch[file].push({
    lesson: n,
    section: exerciseNames[n],
    image: `exercise-${String(n).padStart(2, '0')}.svg`,
    alt: `Practice Exercise \u2014 Lesson ${n}`,
  });
}

for (const [filename, items] of Object.entries(filesToPatch)) {
  const filepath = path.join(PHASES_DIR, filename);
  let content = fs.readFileSync(filepath, 'utf8');

  for (const item of items) {
    const lessonHeader = `# Lesson ${item.lesson}`;
    const lessonIdx = content.indexOf(lessonHeader);
    if (lessonIdx === -1) continue;

    // Find the section — try exact match first, then partial
    let sectionIdx = -1;
    const searchFrom = lessonIdx;

    // Try exact
    sectionIdx = content.indexOf(`## ${item.section}`, searchFrom);

    // If not found, try partial match
    if (sectionIdx === -1) {
      const partial = item.section.split(' \u2014 ')[0] || item.section.split(' — ')[0];
      sectionIdx = content.indexOf(`## ${partial}`, searchFrom);
    }

    if (sectionIdx === -1) continue;

    // Find end of section
    const nextSection = content.indexOf('\n## ', sectionIdx + 4);
    if (nextSection === -1) continue;

    // Check if already there
    const imageRef = `../images/${item.image}`;
    if (content.includes(imageRef)) continue;

    // Insert before next section
    const imgMd = `\n\n![${item.alt}](../images/${item.image})\n`;
    content = content.slice(0, nextSection) + imgMd + content.slice(nextSection);
    console.log(`  ✓ L${item.lesson} ${item.section} → ${item.image}`);
  }

  fs.writeFileSync(filepath, content);
}

// Also embed the JPG versions of lesson 11-16 core images (replace SVG refs with JPG)
const jpgReplacements = [
  { file: '08-long-short.md', svg: 'lesson-11-long-short-form.svg', jpg: 'lesson-11-long-short-form.jpg' },
  { file: '09-workflow-workshop.md', svg: 'lesson-12-brief-to-script.svg', jpg: 'lesson-12-brief-to-script.jpg' },
  { file: '10-autopsy-revision.md', svg: 'lesson-13-diagnose-weak-script.svg', jpg: 'lesson-13-diagnose-weak-script.jpg' },
  { file: '10-autopsy-revision.md', svg: 'lesson-14-revise-right-order.svg', jpg: 'lesson-14-revise-right-order.jpg' },
  { file: '11-advanced-craft.md', svg: 'lesson-15-lens-emphasis-omission.svg', jpg: 'lesson-15-lens-emphasis-omission.jpg' },
  { file: '12-capstone.md', svg: 'lesson-16-production-ready-package.svg', jpg: 'lesson-16-production-ready-package.jpg' },
];

for (const rep of jpgReplacements) {
  const filepath = path.join(PHASES_DIR, rep.file);
  let content = fs.readFileSync(filepath, 'utf8');
  if (content.includes(rep.svg)) {
    content = content.replace(rep.svg, rep.jpg);
    fs.writeFileSync(filepath, content);
    console.log(`  ↻ ${rep.svg} → ${rep.jpg}`);
  }
}

console.log('\nDone embedding all extras.');