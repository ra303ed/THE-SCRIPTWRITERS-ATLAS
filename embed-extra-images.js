#!/usr/bin/env node
// Embed additional images into phase markdown files

const fs = require('fs');
const path = require('path');

const PHASES_DIR = path.join(__dirname, 'course', 'phases');

// Additional images to embed after specific sections
const additionalImages = [
  // Lesson 1: Before/After
  { file: '01-foundations.md', lesson: 1, section: 'Before / After', image: 'lesson-01-before-after.jpg', alt: 'Before and After — Weak vs Strong video idea' },
  // Lesson 2: Sentence anatomy (after Professional Example)
  { file: '01-foundations.md', lesson: 2, section: 'Professional Example', image: 'lesson-02-sentence-anatomy.jpg', alt: 'Sentence Anatomy — Active vs Passive voice structure' },
  // Lesson 3: Beat Test (after How to Apply It)
  { file: '02-scripting-mindset.md', lesson: 3, section: 'How to Apply It', image: 'lesson-03-beat-test.jpg', alt: 'The Beat Test — Before, During, After each beat' },
  // Lesson 4: Setup/Payoff (after Deep Explanation)
  { file: '03-story-and-structure.md', lesson: 4, section: 'Deep Explanation', image: 'lesson-04-setup-payoff.jpg', alt: 'Setup and Payoff — Plant, Expect, Open, Answer, Close' },
  // Lesson 5: Format Selector (after Deep Explanation)
  { file: '03-story-and-structure.md', lesson: 5, section: 'Deep Explanation', image: 'lesson-05-format-selector.jpg', alt: 'Format Selector — 9 video formats with core movements' },
  // Lesson 6: Source Matrix (after Deep Explanation)
  { file: '04-ideas-research.md', lesson: 6, section: 'Deep Explanation', image: 'lesson-06-source-matrix.jpg', alt: 'Source Matrix — What each source can and cannot establish' },
  // Lesson 7: Open Loop Timeline (after Deep Explanation)
  { file: '05-hooks-retention.md', lesson: 7, section: 'Deep Explanation', image: 'lesson-07-open-loop.jpg', alt: 'Open Loops and Micro-Payoffs — Question to practical payoff timeline' },
  // Lesson 8: Voice Bank (after How to Apply It)
  { file: '06-human-voice.md', lesson: 8, section: 'How to Apply It', image: 'lesson-08-voice-bank.jpg', alt: 'Voice Bank Builder — What makes a voice recognizable and human' },
  // Lesson 9: Pacing Diagram (after How to Apply It)
  { file: '06-human-voice.md', lesson: 9, section: 'How to Apply It', image: 'lesson-09-pacing-diagram.jpg', alt: 'Pacing and Breath — Recording copy vs Editor copy comparison' },
  // Lesson 10: Visual Proof Types (after Deep Explanation)
  { file: '07-visual-audio.md', lesson: 10, section: 'Deep Explanation', image: 'lesson-10-visual-proof.jpg', alt: 'Visual Proof Types — Prove, Compare, Reveal, Orient, Demonstrate, Create Room' },
];

for (const img of additionalImages) {
  const filepath = path.join(PHASES_DIR, img.file);
  let content = fs.readFileSync(filepath, 'utf8');

  const lessonHeader = `# Lesson ${img.lesson}`;
  const lessonIdx = content.indexOf(lessonHeader);
  if (lessonIdx === -1) {
    console.log(`  ⚠ Lesson ${img.lesson} not found in ${img.file}`);
    continue;
  }

  // Find the target section after this lesson
  const sectionMarker = `## ${img.section}`;
  const sectionIdx = content.indexOf(sectionMarker, lessonIdx);
  if (sectionIdx === -1) {
    console.log(`  ⚠ Section "${img.section}" not found for Lesson ${img.lesson} in ${img.file}`);
    continue;
  }

  // Find the end of that section (next ## or end of content)
  const nextSection = content.indexOf('\n## ', sectionIdx + sectionMarker.length);
  if (nextSection === -1) {
    console.log(`  ⚠ No next section after "${img.section}" for Lesson ${img.lesson}`);
    continue;
  }

  // Check if already embedded
  const imageRef = `../images/${img.image}`;
  if (content.includes(imageRef)) {
    console.log(`  ⏭ Already embedded: ${img.image}`);
    continue;
  }

  // Insert image at the end of the target section (before next section)
  const imageMarkdown = `\n\n![${img.alt}](../images/${img.image})\n`;
  content = content.slice(0, nextSection) + imageMarkdown + content.slice(nextSection);

  fs.writeFileSync(filepath, content);
  console.log(`  ✓ ${img.image} → ${img.file} (after "${img.section}")`);
}

console.log('\nDone embedding additional images.');