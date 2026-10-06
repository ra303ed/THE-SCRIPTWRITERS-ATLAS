#!/usr/bin/env node
// Embed lesson images into phase markdown files

const fs = require('fs');
const path = require('path');

const PHASES_DIR = path.join(__dirname, 'course', 'phases');

const lessonImages = {
  1: { lesson: 1, image: 'lesson-01-topic-to-idea.jpg', alt: 'From a Broad Topic to a Video Idea — The five-layer funnel' },
  2: { lesson: 2, image: 'lesson-02-thought-to-sentence.jpg', alt: 'From Thought to Clear Sentence — Transforming ideas into clear language' },
  3: { lesson: 3, image: 'lesson-03-decisions-before-polish.jpg', alt: 'Six Decision Questions — WHO, WHAT CHANGES, WHAT IS SUPPORTED, WHAT ORDER, WHAT TO SHOW, WHAT CONTRACT' },
  4: { lesson: 4, image: 'lesson-04-cause-choice-consequence.jpg', alt: 'Build Movement — Desire → Obstacle → Attempt → New Info → Choice → Consequence → Change' },
  5: { lesson: 5, image: 'lesson-05-structure-fits-material.jpg', alt: 'Choose a Structure — Educational vs Narrative structures compared' },
  6: { lesson: 6, image: 'lesson-06-question-claim-evidence.jpg', alt: 'Evidence Verification — Observation, Test Result, External Fact, Inference, Opinion' },
  7: { lesson: 7, image: 'lesson-07-earn-attention.jpg', alt: 'Hook Mechanisms — Scene, Question, Contradiction, Demonstration, Stakes, Claim, Visual' },
  8: { lesson: 8, image: 'lesson-08-human-voice.jpg', alt: 'Build a Human Voice — Observation, Judgment, Evidence, Uncertainty, Rhythm' },
  9: { lesson: 9, image: 'lesson-09-breath-rhythm.jpg', alt: 'Write for Breath, Rhythm, and Comprehension — Pacing diagram' },
  10: { lesson: 10, image: 'lesson-10-visual-audio-edit.jpg', alt: 'Write for Image, Sound, and Edit — Script → Visual → Audio → Edit → Viewer Experience' },
  11: { lesson: 11, image: 'lesson-11-long-short-form.svg', alt: 'Long-Form vs Short-Form — Change the Architecture, Not Just the Runtime' },
  12: { lesson: 12, image: 'lesson-12-brief-to-script.svg', alt: 'The Professional Workflow — Brief → Think → Write → Review → Rewrite → Finalize' },
  13: { lesson: 13, image: 'lesson-13-diagnose-weak-script.svg', alt: 'Diagnose Before You Rewrite — Four diagnostic levels' },
  14: { lesson: 14, image: 'lesson-14-revise-right-order.svg', alt: 'Revision Priority Ladder — Fix the biggest problem first' },
  15: { lesson: 15, image: 'lesson-15-lens-emphasis-omission.svg', alt: 'Control the Lens — One event, multiple honest lenses, choose one' },
  16: { lesson: 16, image: 'lesson-16-production-ready-package.svg', alt: 'Production-Ready Package — Long-form + Short-form deliverable' },
};

// Map lesson numbers to phase files
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

// Group images by phase file
const imagesByFile = {};
for (const [lessonNum, info] of Object.entries(lessonImages)) {
  const file = lessonToPhase[Number(lessonNum)];
  if (!imagesByFile[file]) imagesByFile[file] = [];
  imagesByFile[file].push({ lesson: Number(lessonNum), ...info });
}

for (const [filename, images] of Object.entries(imagesByFile)) {
  const filepath = path.join(PHASES_DIR, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  
  for (const img of images) {
    // Find the Core Idea section for this lesson
    const lessonHeader = `# Lesson ${img.lesson}`;
    const coreIdeaMarker = '## Core Idea';
    
    const lessonIdx = content.indexOf(lessonHeader);
    if (lessonIdx === -1) {
      console.log(`  ⚠ Lesson ${img.lesson} header not found in ${filename}`);
      continue;
    }
    
    // Find the Core Idea section after this lesson header
    const coreIdeaIdx = content.indexOf(coreIdeaMarker, lessonIdx);
    if (coreIdeaIdx === -1) {
      console.log(`  ⚠ Core Idea not found for Lesson ${img.lesson} in ${filename}`);
      continue;
    }
    
    // Find the end of the Core Idea paragraph (next ## or double newline + text)
    const afterCoreIdea = content.indexOf('\n\n', coreIdeaIdx + coreIdeaMarker.length);
    if (afterCoreIdea === -1) continue;
    
    // Find the next section header
    const nextSection = content.indexOf('\n## ', afterCoreIdea);
    if (nextSection === -1) continue;
    
    // Check if image is already embedded
    const imageRef = `../images/${img.image}`;
    if (content.includes(imageRef)) {
      console.log(`  ⏭ Lesson ${img.lesson} image already in ${filename}`);
      continue;
    }
    
    // Insert image before the next section
    const imageMarkdown = `\n\n![${img.alt}](../images/${img.image})\n`;
    content = content.slice(0, nextSection) + imageMarkdown + content.slice(nextSection);
    
    console.log(`  ✓ Lesson ${img.lesson} → ${filename}`);
  }
  
  fs.writeFileSync(filepath, content);
}

console.log('\nDone embedding lesson images.');