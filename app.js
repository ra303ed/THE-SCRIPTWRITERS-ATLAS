const PHASES = [
  {
    number: 1,
    title: "Foundations",
    file: "course/phases/01-foundations.md",
    lessons: [
      { id: "lesson-01", number: 1, title: "From a Broad Topic to a Video Idea a Viewer Can Understand" },
      { id: "lesson-02", number: 2, title: "From Thought to Clear Sentence" },
    ],
  },
  {
    number: 2,
    title: "The Scripting Mindset",
    file: "course/phases/02-scripting-mindset.md",
    lessons: [{ id: "lesson-03", number: 3, title: "Make the Writer’s Decisions Before You Polish the Lines" }],
  },
  {
    number: 3,
    title: "Story and Structure",
    file: "course/phases/03-story-and-structure.md",
    lessons: [
      { id: "lesson-04", number: 4, title: "Build Movement from Cause, Choice, and Consequence" },
      { id: "lesson-05", number: 5, title: "Choose a Structure That Fits the Material" },
    ],
  },
  {
    number: 4,
    title: "Ideas, Audience, and Research",
    file: "course/phases/04-ideas-research.md",
    lessons: [{ id: "lesson-06", number: 6, title: "Find the Question, Check the Claim, Build the Evidence Path" }],
  },
  {
    number: 5,
    title: "Hooks and Earned Retention",
    file: "course/phases/05-hooks-retention.md",
    lessons: [{ id: "lesson-07", number: 7, title: "Earn Attention, Then Pay It Back" }],
  },
  {
    number: 6,
    title: "The Human Ear",
    file: "course/phases/06-human-voice.md",
    lessons: [
      { id: "lesson-08", number: 8, title: "Build a Human Voice Without Performing One" },
      { id: "lesson-09", number: 9, title: "Write for Breath, Rhythm, and Comprehension" },
    ],
  },
  {
    number: 7,
    title: "Visual and Audio Thinking",
    file: "course/phases/07-visual-audio.md",
    lessons: [{ id: "lesson-10", number: 10, title: "Write for Image, Sound, and Edit—not Just for the Page" }],
  },
  {
    number: 8,
    title: "Long-Form and Short-Form",
    file: "course/phases/08-long-short.md",
    lessons: [{ id: "lesson-11", number: 11, title: "Change the Architecture, Not Just the Runtime" }],
  },
  {
    number: 9,
    title: "The Professional Workflow",
    file: "course/phases/09-workflow-workshop.md",
    lessons: [{ id: "lesson-12", number: 12, title: "The Brief-to-Script Workshop" }],
  },
  {
    number: 10,
    title: "Autopsy and Revision",
    file: "course/phases/10-autopsy-revision.md",
    lessons: [
      { id: "lesson-13", number: 13, title: "Diagnose a Weak Script Before You Rewrite It" },
      { id: "lesson-14", number: 14, title: "Revise in the Right Order and Learn from Feedback" },
    ],
  },
  {
    number: 11,
    title: "Advanced Craft",
    file: "course/phases/11-advanced-craft.md",
    lessons: [{ id: "lesson-15", number: 15, title: "Control the Lens, Emphasis, and Omission" }],
  },
  {
    number: 12,
    title: "Professional Capstone",
    file: "course/phases/12-capstone.md",
    lessons: [{ id: "lesson-16", number: 16, title: "Build a Production-Ready Script Package" }],
  },
];

const RESOURCES = [
  { id: "roadmap", label: "Learning Roadmap", file: "course/ROADMAP.md", icon: "↗" },
  { id: "audio", label: "Narration Audio", file: "course/audio/README.md", icon: "♫" },
  { id: "workbook", label: "Practical Workbook", file: "course/WORKBOOK.md", icon: "▤" },
  { id: "cases", label: "Case-Study Library", file: "course/CASE-STUDY-LIBRARY.md", icon: "◉" },
  { id: "worked", label: "Worked Scripts", file: "course/WORKED-SCRIPTS.md", icon: "▧" },
  { id: "reference", label: "Reference Desk", file: "course/REFERENCE.md", icon: "⌕" },
  { id: "source-map", label: "Source Map", file: "course/SOURCE-MAP.md", icon: "⌗" },
  { id: "final-arabic", label: "Final Arabic Voiceover", file: "course/FINAL-ARABIC-VOICEOVER.md", icon: "◌" },
];

const ALL_LESSONS = PHASES.flatMap((phase) =>
  phase.lessons.map((lesson) => ({ ...lesson, phaseNumber: phase.number, phaseTitle: phase.title, file: phase.file }))
);
const lessonById = new Map(ALL_LESSONS.map((lesson) => [lesson.id, lesson]));
const resourceById = new Map(RESOURCES.map((resource) => [resource.id, resource]));
const resourceIdByFile = new Map(RESOURCES.map((resource) => [resource.file, resource.id]));
const phaseByFile = new Map(PHASES.map((phase) => [phase.file, phase]));
const markdownCache = new Map();
const AUDIO_PART_COUNTS = { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5 };
const AUDIO_HIGHLIGHTS = {
  1: ["topic", "question", "audience", "angle", "thesis", "promise", "evidence"],
  2: ["sentence", "action", "evidence", "meaning", "bridge", "active voice", "passive voice"],
  3: ["viewer", "decision", "beat", "change", "evidence", "structure"],
  4: ["cause", "choice", "consequence", "desire", "obstacle", "change"],
  5: ["structure", "chronology", "question", "evidence", "comparison", "payoff"],
  6: ["claim", "observation", "inference", "evidence", "source", "uncertainty"],
  7: ["hook", "promise", "curiosity", "proof", "payoff", "retention"],
  8: ["human voice", "natural", "specific", "honest", "personality", "trust"],
};
const AUDIO_TERM_TRANSLATIONS = {
  "active voice": "المبني للمعلوم",
  action: "الفعل",
  angle: "زاوية المعالجة",
  audience: "الفئة المستهدفة",
  beat: "خطوة في تسلسل المشهد",
  bridge: "جملة الربط",
  cause: "السبب",
  change: "التغيير",
  choice: "الاختيار",
  claim: "الادعاء",
  comparison: "المقارنة",
  consequence: "النتيجة المترتبة",
  chronology: "التسلسل الزمني",
  curiosity: "الفضول",
  decision: "القرار",
  desire: "الرغبة",
  evidence: "الدليل",
  "human voice": "الصوت الإنساني",
  honest: "صادق",
  hook: "افتتاحية جاذبة",
  inference: "الاستنتاج",
  meaning: "المعنى",
  natural: "طبيعي",
  obstacle: "العقبة",
  observation: "الملاحظة",
  payoff: "النتيجة أو المكافأة",
  personality: "الطابع الشخصي",
  "passive voice": "المبني للمجهول",
  proof: "الإثبات",
  promise: "الوعد للمشاهد",
  question: "السؤال",
  retention: "الحفاظ على انتباه المشاهد",
  sentence: "الجملة",
  source: "المصدر",
  specific: "محدد",
  structure: "البناء أو الهيكل",
  thesis: "الفكرة الرئيسية أو الموقف",
  topic: "الموضوع",
  uncertainty: "ما لم يُحسم بعد",
  viewer: "المشاهد",
  trust: "الثقة",
};
const AUDIO_SECTION_TRANSLATIONS = {
  "Core Idea": "الفكرة الأساسية",
  "Why This Matters": "لماذا يهم هذا",
  "Deep Explanation": "شرح تفصيلي",
  "Professional Example": "مثال عملي",
  "Case Study": "دراسة حالة",
  "Before / After": "قبل وبعد",
  "Common Mistakes": "أخطاء شائعة",
  "How to Apply It": "طريقة التطبيق",
  "Practice Exercise": "تمرين عملي",
  "Mini Checkpoint": "مراجعة سريعة",
  Assignment: "المهمة",
  Takeaway: "الخلاصة",
};
const PROGRESS_KEY = "scriptwriters-atlas-completed-v1";
let searchIndex = [];
let searchReady = false;
let searchTask = null;

const app = document.getElementById("app");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function slugify(value) {
  return value
    .replace(/`([^`]*)`/g, "$1")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N} _-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-");
}

function readProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function isComplete(id) {
  return Boolean(readProgress()[id]);
}

function setComplete(id, value) {
  const progress = readProgress();
  if (value) progress[id] = true;
  else delete progress[id];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function completionCount() {
  const progress = readProgress();
  return ALL_LESSONS.filter((lesson) => progress[lesson.id]).length;
}

function routeUrl(kind, id, hash = "") {
  const params = new URLSearchParams();
  params.set(kind === "lesson" ? "lesson" : "page", id);
  return `/?${params.toString()}${hash || ""}`;
}

function currentRoute() {
  const params = new URLSearchParams(window.location.search);
  const lessonId = params.get("lesson");
  if (lessonId && lessonById.has(lessonId)) return { kind: "lesson", id: lessonId };
  const pageId = params.get("page");
  if (pageId && (pageId === "start" || resourceById.has(pageId))) return { kind: "page", id: pageId };
  return { kind: "page", id: "start" };
}

async function loadMarkdown(file) {
  if (markdownCache.has(file)) return markdownCache.get(file);
  const promise = fetch(`/${file}`, { cache: "force-cache" }).then(async (response) => {
    if (!response.ok) throw new Error(`Could not load ${file} (${response.status})`);
    return response.text();
  });
  markdownCache.set(file, promise);
  try {
    return await promise;
  } catch (error) {
    markdownCache.delete(file);
    throw error;
  }
}

function resolveMarkdownLink(href, sourceFile) {
  if (/^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("//")) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return "#";
  const base = new URL(`/${sourceFile}`, window.location.origin);
  let resolved;
  try {
    resolved = new URL(href, base);
  } catch {
    return href;
  }
  if (resolved.origin !== window.location.origin) return href;
  const file = decodeURIComponent(resolved.pathname.replace(/^\//, ""));
  const hash = resolved.hash || "";

  const audioPlaylist = file.match(/^course\/audio\/phase-\d{2}-lesson-(\d{2})\.m3u$/);
  if (audioPlaylist) {
    const lessonId = `lesson-${audioPlaylist[1]}`;
    if (lessonById.has(lessonId)) return `/?lesson=${lessonId}&audio=1${hash}`;
  }

  if (file.endsWith(".md")) {
    const resourceId = resourceIdByFile.get(file);
    if (resourceId) return routeUrl("page", resourceId, hash);
    if (file === "course/README.md") return routeUrl("page", "start", hash);
    const phase = phaseByFile.get(file);
    if (phase) {
      let selected = phase.lessons[0];
      if (hash) {
        const targetSlug = decodeURIComponent(hash.slice(1));
        selected = phase.lessons.find((lesson) => slugify(lesson.title) === targetSlug) || selected;
      }
      return routeUrl("lesson", selected.id, hash);
    }
  }

  return `/${file}${resolved.search}${hash}`;
}

function inlineMarkdown(markdown, sourceFile) {
  const tokens = [];
  const stash = (html) => {
    const index = tokens.push(html) - 1;
    return `\uE000${index}\uE001`;
  };
  let text = markdown.replace(/\\([\\`*_{}\[\]()#+.!-])/g, "$1");

  text = text.replace(/`([^`]+)`/g, (_match, code) => stash(`<code>${escapeHtml(code)}</code>`));
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, rawHref) => {
    const href = escapeHtml(resolveMarkdownLink(rawHref.trim(), sourceFile));
    return stash(`<img src="${href}" alt="${escapeHtml(alt)}" loading="lazy">`);
  });
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, rawHref) => {
    const href = resolveMarkdownLink(rawHref.trim(), sourceFile);
    const externalWeb = /^(https?:|\/\/)/i.test(href);
    const appRoute = href.startsWith("/?") || href.startsWith("?");
    const safeHref = escapeHtml(href);
    const target = externalWeb
      ? ' target="_blank" rel="noreferrer noopener"'
      : appRoute
        ? ' data-app-link="true"'
        : "";
    return stash(`<a href="${safeHref}"${target}>${inlineMarkdown(label, sourceFile)}</a>`);
  });

  text = escapeHtml(text);
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");
  text = text.replace(/\uE000(\d+)\uE001/g, (_match, index) => tokens[Number(index)] || "");
  return text;
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isBlockStart(lines, index) {
  const line = lines[index] || "";
  return (
    /^#{1,6}\s/.test(line) ||
    /^\s*---+\s*$/.test(line) ||
    /^\s*```/.test(line) ||
    /^\s*>/.test(line) ||
    /^\s*<details\b/i.test(line) ||
    /^\s*\|/.test(line) ||
    /^\s*(?:[-*+]\s+|\d+[.)]\s+)/.test(line)
  );
}

function renderMarkdown(markdown, sourceFile) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const output = [];
  let index = 0;

  while (index < lines.length) {
    const raw = lines[index];
    const line = raw.trimEnd();
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const detailsStart = line.match(/^<details><summary>(.*?)<\/summary>\s*$/i);
    if (detailsStart) {
      const body = [];
      index += 1;
      while (index < lines.length && !/^\s*<\/details>\s*$/i.test(lines[index])) {
        body.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      output.push(`<details class="answer-reveal"><summary>${inlineMarkdown(detailsStart[1], sourceFile)}</summary>${renderMarkdown(body.join("\n"), sourceFile)}</details>`);
      continue;
    }

    if (/^\s*```/.test(line)) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !/^\s*```/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      output.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].trim();
      output.push(`<h${level} id="${escapeHtml(slugify(title))}">${inlineMarkdown(title, sourceFile)}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*(?:---+|\*\*\*|___+)\s*$/.test(line)) {
      output.push("<hr>");
      index += 1;
      continue;
    }

    if (/^\s*>/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      output.push(`<blockquote>${renderMarkdown(quote.join("\n"), sourceFile)}</blockquote>`);
      continue;
    }

    if (/^\s*\|/.test(line) && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[index + 1])) {
      const header = splitTableRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && /^\s*\|/.test(lines[index])) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      const thead = `<thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell, sourceFile)}</th>`).join("")}</tr></thead>`;
      const tbody = `<tbody>${rows.map((row) => `<tr>${header.map((_cell, cellIndex) => `<td>${inlineMarkdown(row[cellIndex] || "", sourceFile)}</td>`).join("")}</tr>`).join("")}</tbody>`;
      output.push(`<div class="table-scroll"><table>${thead}${tbody}</table></div>`);
      continue;
    }

    const listStart = line.match(/^\s*(?:([-*+])\s+|(\d+)[.)]\s+)/);
    if (listStart) {
      const ordered = Boolean(listStart[2]);
      const tag = ordered ? "ol" : "ul";
      const items = [];
      while (index < lines.length) {
        const itemMatch = lines[index].match(/^\s*(?:([-*+])\s+|(\d+)[.)]\s+)(.*)$/);
        if (!itemMatch || Boolean(itemMatch[2]) !== ordered) break;
        items.push(`<li>${inlineMarkdown(itemMatch[3], sourceFile)}</li>`);
        index += 1;
      }
      output.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    const paragraph = [];
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines, index)) {
      paragraph.push(lines[index]);
      index += 1;
    }
    if (!paragraph.length) {
      output.push(`<p>${inlineMarkdown(line, sourceFile)}</p>`);
      index += 1;
      continue;
    }
    const html = paragraph.map((part) => {
      const hardBreak = /\s{2,}$/.test(part);
      return `${inlineMarkdown(part.trimEnd(), sourceFile)}${hardBreak ? "<br>" : ""}`;
    }).join(" ");
    const comparisonLabel = paragraph[0].trim().match(/^\*\*(WEAK|BETTER|WHY)\*\*/i)?.[1]?.toLowerCase();
    const comparisonClass = comparisonLabel ? ` class="comparison-line comparison-${comparisonLabel}"` : "";
    output.push(`<p${comparisonClass}>${html}</p>`);
  }

  return output.join("\n");
}

function extractLesson(markdown, lessonNumber) {
  const matches = [...markdown.matchAll(/^# Lesson (\d+) — (.+)$/gm)];
  const targetIndex = matches.findIndex((match) => Number(match[1]) === lessonNumber);
  if (targetIndex < 0) throw new Error(`Lesson ${lessonNumber} was not found in its phase file.`);
  const firstLessonStart = matches[0].index;
  const start = matches[targetIndex].index;
  const end = targetIndex + 1 < matches.length ? matches[targetIndex + 1].index : markdown.length;
  return {
    intro: markdown.slice(0, firstLessonStart).trim(),
    content: markdown.slice(start, end).trim(),
    title: matches[targetIndex][2].trim(),
  };
}

function extractVoiceoverScript(markdown) {
  const marker = /^### VOICEOVER SCRIPT\s*$/m;
  const match = marker.exec(markdown);
  if (!match) return "";
  const start = match.index + match[0].length;
  const remainder = markdown.slice(start);
  const divider = /^---+\s*$/m.exec(remainder);
  return (divider ? remainder.slice(0, divider.index) : remainder).trim();
}

function removeVoiceoverScript(markdown) {
  const marker = /^### VOICEOVER SCRIPT\s*$/m;
  const match = marker.exec(markdown);
  if (!match) return markdown;
  const remainderStart = match.index + match[0].length;
  const remainder = markdown.slice(remainderStart);
  const divider = /^---+\s*$/m.exec(remainder);
  const afterScript = divider ? remainder.slice(divider.index) : "";
  return `${markdown.slice(0, match.index).trimEnd()}\n\n${afterScript}`.trim();
}

function splitTranscriptSentences(paragraph) {
  if (typeof Intl.Segmenter === "function") {
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    return [...segmenter.segment(paragraph)].map((part) => part.segment.trim()).filter(Boolean);
  }
  return paragraph.split(/(?<=[.!?])\s+/u).map((sentence) => sentence.trim()).filter(Boolean);
}

function transcriptWeight(text, paragraphEnd = false) {
  const words = text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || [];
  const pauses = (text.match(/[,;:—–]/g) || []).length * 1.1;
  const sentenceEnd = /[.!?][’'”\")\]]*$/.test(text) ? 2 : 0;
  return Math.max(1, words.length + pauses + sentenceEnd + (paragraphEnd ? 1.5 : 0));
}

function buildTranscript(voiceover, partCount) {
  const paragraphs = voiceover
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .map((text, paragraphIndex) => ({
      paragraphIndex,
      cues: splitTranscriptSentences(text).map((sentence) => ({
        text: sentence,
        paragraphIndex,
        weight: transcriptWeight(sentence),
        partIndex: 0,
        index: -1,
      })),
    }));
  const cues = paragraphs.flatMap((paragraph) => paragraph.cues);
  if (!cues.length) return { paragraphs, cues };

  paragraphs.forEach((paragraph) => {
    const lastCue = paragraph.cues.at(-1);
    if (lastCue) lastCue.weight += 1.5;
  });
  cues.forEach((cue, index) => { cue.index = index; });

  const totalCharacters = cues.reduce((total, cue) => total + cue.text.length + 1, 0);
  let startIndex = 0;
  let consumedCharacters = 0;
  for (let partIndex = 0; partIndex < partCount; partIndex += 1) {
    let endIndex = cues.length;
    if (partIndex < partCount - 1) {
      const target = totalCharacters * (partIndex + 1) / partCount;
      const latestEnd = cues.length - (partCount - partIndex - 1);
      let bestDistance = Infinity;
      let runningCharacters = consumedCharacters;
      for (let candidateEnd = startIndex + 1; candidateEnd <= latestEnd; candidateEnd += 1) {
        runningCharacters += cues[candidateEnd - 1].text.length + 1;
        const distance = Math.abs(runningCharacters - target);
        if (distance < bestDistance) {
          bestDistance = distance;
          endIndex = candidateEnd;
        }
        if (runningCharacters >= target && distance > bestDistance) break;
      }
    }
    for (let cueIndex = startIndex; cueIndex < endIndex; cueIndex += 1) {
      cues[cueIndex].partIndex = partIndex;
    }
    consumedCharacters = cues.slice(startIndex, endIndex).reduce((sum, cue) => sum + cue.text.length + 1, consumedCharacters);
    startIndex = endIndex;
  }
  return { paragraphs, cues };
}

function highlightedText(text, lessonNumber) {
  const terms = AUDIO_HIGHLIGHTS[lessonNumber] || [];
  if (!terms.length) return escapeHtml(text);
  const alternatives = terms
    .slice()
    .sort((first, second) => second.length - first.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const matcher = new RegExp(`(^|[^A-Za-z0-9])(${alternatives})(?=$|[^A-Za-z0-9])`, "giu");
  let result = "";
  let lastIndex = 0;
  for (const match of text.matchAll(matcher)) {
    const fullMatch = match[0];
    const prefix = match[1] || "";
    const term = match[2];
    const matchIndex = match.index;
    result += escapeHtml(text.slice(lastIndex, matchIndex)) + escapeHtml(prefix);
    const arabicMeaning = AUDIO_TERM_TRANSLATIONS[term.toLowerCase()];
    const title = escapeHtml(arabicMeaning ? `${term} — ${arabicMeaning}` : term);
    result += `<mark class="key-term" title="${title}">${escapeHtml(term)}</mark>`;
    lastIndex = matchIndex + fullMatch.length;
  }
  return result + escapeHtml(text.slice(lastIndex));
}

function transcriptMarkup(voiceover, lesson) {
  const transcript = buildTranscript(voiceover, AUDIO_PART_COUNTS[lesson.number]);
  const paragraphs = transcript.paragraphs.map((paragraph) => {
    const sentences = paragraph.cues.map((cue) =>
      `<span class="transcript-sentence" data-transcript-index="${cue.index}" data-audio-part="${cue.partIndex}" data-transcript-weight="${cue.weight.toFixed(2)}">${highlightedText(cue.text, lesson.number)}</span>`
    ).join(" ");
    return `<p class="transcript-paragraph">${sentences}</p>`;
  }).join("");
  return { markup: paragraphs, cues: transcript.cues };
}

function arabicSectionTitle(title) {
  const normalizedTitle = title.toLowerCase();
  const match = Object.entries(AUDIO_SECTION_TRANSLATIONS)
    .find(([english]) => normalizedTitle.startsWith(english.toLowerCase()));
  return match?.[1] || title;
}

function prepareVoiceSections() {
  const lessonBody = document.querySelector(".lesson-body");
  if (!lessonBody) return [];

  const children = [...lessonBody.children];
  const lessonHeadingIndex = children.findIndex((element) =>
    element.matches("h1") && /^Lesson\s+\d+\b/i.test(element.textContent.trim())
  );
  if (lessonHeadingIndex < 0) return [];

  const sections = [];
  let currentSection = null;
  for (const element of children.slice(lessonHeadingIndex + 1)) {
    if (element.matches("h1")) break;
    if (element.matches("h2")) {
      currentSection = null;
      const title = element.textContent.trim();
      // Learning objectives are a quick overview, not something the voiceover reads line by line.
      if (/^(what you will learn|mastered|next)\b/i.test(title)) continue;

      currentSection = document.createElement("section");
      currentSection.className = "lesson-section";
      currentSection.dataset.voiceSection = "true";
      currentSection.dataset.sectionTitle = title;
      currentSection.setAttribute("aria-label", `Lesson section: ${title}`);
      lessonBody.insertBefore(currentSection, element);
      currentSection.appendChild(element);
      sections.push(currentSection);
      continue;
    }
    if (currentSection) currentSection.appendChild(element);
  }

  return sections.map((section, index) => {
    const copy = section.cloneNode(true);
    copy.querySelectorAll(".answer-reveal, .lesson-section-now").forEach((element) => element.remove());
    const words = (copy.textContent.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
    return {
      index,
      title: section.dataset.sectionTitle,
      element: section,
      weight: Math.max(18, words),
    };
  });
}

function textOnly(markdown) {
  return markdown
    .replace(/<details[^>]*>|<\/details>|<summary>|<\/summary>/gi, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`{1,3}/g, " ")
    .replace(/[#>*_~|]/g, " ")
    .replace(/\[[A-Z /_-]+\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getPageSource(id) {
  if (id === "start") return { title: "Start Here", file: "course/README.md", type: "home" };
  const resource = resourceById.get(id);
  if (resource) return { title: resource.label, file: resource.file, type: "resource" };
  return null;
}

function sidebarMarkup(route) {
  const activeLesson = route.kind === "lesson" ? route.id : "";
  const activePage = route.kind === "page" ? route.id : "";
  const progress = completionCount();
  const percent = Math.round((progress / ALL_LESSONS.length) * 100);

  const phaseGroups = PHASES.map((phase) => {
    const open = phase.lessons.some((lesson) => lesson.id === activeLesson) ? " open" : "";
    const lessons = phase.lessons.map((lesson) => {
      const done = isComplete(lesson.id);
      return `<a class="lesson-link${activeLesson === lesson.id ? " active" : ""}${done ? " completed" : ""}" href="${routeUrl("lesson", lesson.id)}" data-app-link="true" data-route="lesson:${lesson.id}">
        <span class="lesson-number">${String(lesson.number).padStart(2, "0")}</span>
        <span class="lesson-label">${escapeHtml(lesson.title)}</span>
        <span class="lesson-state" aria-label="${done ? "Completed" : "Not completed"}">${done ? "✓" : ""}</span>
      </a>`;
    }).join("");
    return `<details class="phase-nav"${open}>
      <summary><span class="phase-nav-number">${String(phase.number).padStart(2, "0")}</span><span>${escapeHtml(phase.title)}</span><span class="chevron">⌄</span></summary>
      <div class="phase-lessons">${lessons}</div>
    </details>`;
  }).join("");

  const resourceLinks = RESOURCES.filter((resource) => resource.id !== "final-arabic").map((resource) =>
    `<a class="resource-link${activePage === resource.id ? " active" : ""}" href="${routeUrl("page", resource.id)}" data-app-link="true" data-route="page:${resource.id}"><span class="resource-icon">${resource.icon}</span>${escapeHtml(resource.label)}</a>`
  ).join("");
  const finalLink = RESOURCES.find((resource) => resource.id === "final-arabic");

  return `<aside class="sidebar" id="sidebar" aria-label="Course navigation">
    <a class="brand" href="${routeUrl("page", "start")}" data-app-link="true" data-route="page:start">
      <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
      <span class="brand-copy"><strong>THE SCRIPTWRITER’S</strong><em>ATLAS</em></span>
    </a>
    <div class="sidebar-intro">A practical course in writing video scripts</div>
    <div class="progress-card">
      <div class="progress-heading"><span>YOUR PROGRESS</span><strong>${progress}<small> / ${ALL_LESSONS.length}</small></strong></div>
      <div class="progress-track" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" aria-label="Course completion"><span style="width:${percent}%"></span></div>
      <div class="progress-caption">${percent}% of core lessons complete</div>
    </div>
    <nav class="course-nav">
      <div class="nav-section-label">GET ORIENTED</div>
      <a class="nav-link${activePage === "start" ? " active" : ""}" href="${routeUrl("page", "start")}" data-app-link="true" data-route="page:start"><span class="nav-icon">⌂</span>Start Here</a>
      <a class="nav-link${activePage === "roadmap" ? " active" : ""}" href="${routeUrl("page", "roadmap")}" data-app-link="true" data-route="page:roadmap"><span class="nav-icon">↗</span>Learning Roadmap</a>
      <div class="nav-section-label course-label">CORE COURSE <span>12 PHASES</span></div>
      ${phaseGroups}
      <div class="nav-section-label tools-label">TOOLS &amp; STUDY</div>
      ${resourceLinks}
      <a class="final-link${activePage === "final-arabic" ? " active" : ""}" href="${routeUrl("page", finalLink.id)}" data-app-link="true" data-route="page:${finalLink.id}"><span class="final-dot">◎</span><span>${escapeHtml(finalLink.label)}<small>Read last</small></span></a>
    </nav>
    <div class="sidebar-foot"><span class="status-dot"></span>Static · evidence-led</div>
  </aside>`;
}

function routeMeta(route) {
  if (route.kind === "lesson") {
    const lesson = lessonById.get(route.id);
    return {
      eyebrow: `PHASE ${String(lesson.phaseNumber).padStart(2, "0")} · LESSON ${String(lesson.number).padStart(2, "0")} OF ${ALL_LESSONS.length}`,
      title: lesson.title,
      subtitle: lesson.phaseTitle,
      lesson,
    };
  }
  const page = getPageSource(route.id);
  return { eyebrow: route.id === "final-arabic" ? "FINAL RECORDING LESSON" : "THE SCRIPTWRITER’S ATLAS", title: page?.title || "Start Here", subtitle: "Professional video scriptwriting course" };
}

function navControls(route) {
  if (route.kind !== "lesson") return "";
  const position = ALL_LESSONS.findIndex((lesson) => lesson.id === route.id);
  const previous = position > 0 ? ALL_LESSONS[position - 1] : null;
  const next = position < ALL_LESSONS.length - 1 ? ALL_LESSONS[position + 1] : null;
  const previousMarkup = previous
    ? `<a class="pager-card previous" href="${routeUrl("lesson", previous.id)}" data-app-link="true" data-route="lesson:${previous.id}"><span>← PREVIOUS</span><strong>${escapeHtml(previous.title)}</strong></a>`
    : `<a class="pager-card previous" href="${routeUrl("page", "roadmap")}" data-app-link="true" data-route="page:roadmap"><span>← COURSE MAP</span><strong>Review the learning roadmap</strong></a>`;
  const nextMarkup = next
    ? `<a class="pager-card next" href="${routeUrl("lesson", next.id)}" data-app-link="true" data-route="lesson:${next.id}"><span>NEXT LESSON →</span><strong>${escapeHtml(next.title)}</strong></a>`
    : `<a class="pager-card next" href="${routeUrl("page", "final-arabic")}" data-app-link="true" data-route="page:final-arabic"><span>FINAL LESSON →</span><strong>Arabic voiceover recording script</strong></a>`;
  return `<nav class="lesson-pager" aria-label="Lesson navigation">${previousMarkup}${nextMarkup}</nav>`;
}

function homeHero() {
  return `<section class="home-hero">
    <div class="hero-kicker"><span class="hero-kicker-line"></span>THE PRACTICAL CRAFT OF VIDEO SCRIPTWRITING</div>
    <h1>From first idea<br><span>to final cut.</span></h1>
    <p class="hero-lede">Learn to make the decisions behind a strong script: what to promise, what to prove, what to show, and what to remove.</p>
    <div class="hero-actions">
      <a class="primary-button" href="${routeUrl("lesson", "lesson-01")}" data-app-link="true" data-route="lesson:lesson-01">Begin with Lesson 1 <span>→</span></a>
      <a class="secondary-button" href="${routeUrl("page", "roadmap")}" data-app-link="true" data-route="page:roadmap">View the roadmap</a>
      <a class="quiet-button" href="/source-atlas.zip">Download source archive</a>
    </div>
    <div class="hero-stats">
      <div><strong>12</strong><span>phases</span></div>
      <div><strong>16</strong><span>core lessons</span></div>
      <div><strong>4</strong><span>workshops</span></div>
      <div><strong>1</strong><span>production capstone</span></div>
    </div>
    <div class="hero-side-note"><span class="note-mark">“</span><span>Not a formula to copy.<br>A judgment you can build.</span></div>
  </section>`;
}

function lessonToolbar(lesson) {
  const done = isComplete(lesson.id);
  const hasAudio = Boolean(AUDIO_PART_COUNTS[lesson.number]);
  return `<div class="lesson-toolbar">
    <div class="lesson-context"><span class="context-dot"></span>PHASE ${String(lesson.phaseNumber).padStart(2, "0")} <span class="context-divider">/</span> ${escapeHtml(lesson.phaseTitle.toUpperCase())}</div>
    <div class="lesson-toolbar-actions">
      ${hasAudio ? `<button class="audio-chip audio-open-button" id="audio-open" aria-expanded="true" aria-label="إظهار أو إخفاء نص التعليق الصوتي"><span class="audio-icon">▤</span><span id="audio-open-label">إخفاء النص</span></button>` : ""}
      <button class="complete-button${done ? " is-done" : ""}" id="complete-lesson" data-lesson-id="${lesson.id}" aria-pressed="${done}">${done ? "✓ Completed" : "Mark complete"}</button>
    </div>
  </div>`;
}

function audioPlayerMarkup(lesson, voiceover) {
  const partCount = AUDIO_PART_COUNTS[lesson.number];
  if (!partCount || !voiceover) return "";
  const lessonCode = String(lesson.number).padStart(2, "0");
  const phaseCode = String(lesson.phaseNumber).padStart(2, "0");
  const base = `/course/audio/phase-${phaseCode}-lesson-${lessonCode}`;
  const parts = Array.from({ length: partCount }, (_unused, index) => {
    const part = String(index + 1).padStart(2, "0");
    return `<button class="audio-part${index === 0 ? " active" : ""}" type="button" data-audio-part="${index}" data-audio-src="${base}-part-${part}.mp3"><span>${part}</span>المقطع ${index + 1}</button>`;
  }).join("");
  const transcript = transcriptMarkup(voiceover, lesson);
  const keyTerms = (AUDIO_HIGHLIGHTS[lesson.number] || []).map((term) =>
    `<span class="key-term-chip"><span lang="en" dir="ltr">${escapeHtml(term)}</span><small lang="ar" dir="rtl">${escapeHtml(AUDIO_TERM_TRANSLATIONS[term] || "")}</small></span>`
  ).join("");
  return `<section class="audio-panel" id="audio-panel" aria-label="Lesson voiceover and synchronized transcript">
    <div class="audio-panel-head">
      <div><span class="player-kicker" lang="ar" dir="rtl">الدرس ${lessonCode} · التعليق الصوتي</span><h2><span lang="ar" dir="rtl">اسمع واقرأ معًا</span><small>Listen &amp; read along</small></h2><p lang="ar" dir="rtl">شغّل الصوت واتبع الجملة المضيئة. الكلمات الذهبية هي الأفكار المهمة ومعناها بالعربي بجانبها.</p></div>
      <div class="audio-panel-actions"><a href="${base}.m3u" download aria-label="تحميل قائمة الصوت">تحميل القائمة ↗</a><button class="audio-close" id="audio-close" aria-label="إخفاء مشغل الصوت ونصه" title="إخفاء">×</button></div>
    </div>
    <audio id="lesson-audio" controls preload="metadata" data-current-part="0" aria-label="تشغيل التعليق الصوتي للدرس" src="${base}-part-01.mp3">Your browser does not support audio playback.</audio>
    <div class="audio-status-row"><span id="audio-status" role="status" aria-live="polite">جاهز · المقطع 1 من ${partCount}</span><span id="audio-time">0:00</span></div>
    <div class="audio-progress" id="audio-progress" role="progressbar" aria-label="تقدم الصوت" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"><span id="audio-progress-fill"></span></div>
    <div class="audio-control-row">
      <div class="audio-parts" aria-label="أجزاء الصوت">${parts}</div>
      <label class="speed-control" for="audio-speed"><span lang="ar" dir="rtl">سرعة الصوت</span><select id="audio-speed" aria-label="سرعة تشغيل الصوت"><option value="0.8">0.8× بطيء</option><option value="0.9">0.9×</option><option value="1" selected>1× عادي</option><option value="1.15">1.15×</option></select></label>
    </div>
    <div class="transcript-heading">
      <div><span class="transcript-kicker" lang="ar" dir="rtl">تابع النص</span><h3 lang="ar" dir="rtl">نص التعليق الصوتي</h3></div>
      <button class="transcript-toggle" id="transcript-toggle" type="button" aria-expanded="true">إخفاء النص</button>
    </div>
    <div class="transcript-copy" id="transcript-copy">
      <div class="transcript-scroll" id="transcript-scroll" lang="en" dir="ltr" role="region" aria-label="نص التعليق الصوتي المتزامن">
        <div class="transcript-content" id="transcript-content">${transcript.markup}</div>
      </div>
      <div class="transcript-legend" lang="ar" dir="rtl">
        <span class="legend-current-line"><i aria-hidden="true"></i>السطر الأزرق هو الجاري نطقه</span>
        <span class="legend-active-section"><i aria-hidden="true"></i>القسم ذو الإطار الأزرق هو الجاري شرحه</span>
        <span class="legend-key-terms"><i aria-hidden="true"></i>الكلمات الذهبية مهمة</span>
        <div class="key-term-list">${keyTerms}</div>
      </div>
      <p class="transcript-note" lang="ar" dir="rtl">القسم والجملة يتقدمان تلقائيًا مع الصوت. التوقيت تقديري لأن التسجيلات لا تحتوي على توقيت منفصل لكل كلمة.</p>
    </div>
  </section>`;
}

function voiceoverDockMarkup(lesson) {
  if (!AUDIO_PART_COUNTS[lesson.number]) return "";
  return `<aside class="voice-dock" id="voice-dock" aria-label="أدوات التعليق الصوتي الثابتة">
    <button class="voice-dock-toggle" id="voice-toggle" type="button" aria-label="تشغيل التعليق الصوتي" title="تشغيل الصوت">
      <svg class="voice-toggle-icon" viewBox="0 0 24 24" aria-hidden="true"><path class="icon-play" d="M8 5.5v13l10-6.5z"></path><path class="icon-pause" d="M7 5h4v14H7zm7 0h4v14h-4z"></path></svg>
    </button>
    <div class="voice-dock-main">
      <div class="voice-dock-meta"><span class="voice-live-dot"></span><span lang="ar" dir="rtl">الدرس ${String(lesson.number).padStart(2, "0")} · التعليق الصوتي</span><span class="voice-dock-state" id="voice-dock-state">جاهز</span></div>
      <div class="voice-dock-section" id="voice-dock-section" aria-live="polite" lang="ar" dir="rtl"><span class="voice-dock-section-label">القسم الحالي</span><strong class="voice-dock-section-name" id="voice-dock-section-name">شغّل الصوت ليظهر هنا</strong></div>
      <p class="voice-dock-caption" id="voice-dock-caption" lang="ar" dir="rtl" aria-live="polite">اضغط تشغيل لتسمع وتتابع النص.</p>
      <div class="voice-dock-progress" id="voice-dock-progress" role="progressbar" aria-label="تقدم الصوت" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"><span id="voice-dock-progress-fill"></span></div>
    </div>
    <button class="voice-dock-text" id="voice-show-transcript" type="button" aria-label="إظهار نص التعليق الصوتي" title="إظهار النص"><span aria-hidden="true">Aa</span><small>النص</small></button>
  </aside>`;
}

function buildPageContent(route, markdown) {
  if (route.kind === "lesson") {
    const lesson = lessonById.get(route.id);
    const phaseMarkdown = extractLesson(markdown, lesson.number);
    const phaseIntro = phaseMarkdown.intro.replace(/^# (.+)$/m, "## $1");
    const hasAudio = Boolean(AUDIO_PART_COUNTS[lesson.number]);
    const voiceover = hasAudio ? extractVoiceoverScript(phaseMarkdown.content) : "";
    const lessonContent = voiceover ? removeVoiceoverScript(phaseMarkdown.content) : phaseMarkdown.content;
    const fullContent = `${phaseIntro}\n\n${lessonContent}`;
    return `${lessonToolbar(lesson)}${audioPlayerMarkup(lesson, voiceover)}<article class="markdown-body lesson-body">${renderMarkdown(fullContent, lesson.file)}</article>${navControls(route)}`;
  }
  const source = getPageSource(route.id);
  const pageMarkdown = route.id === "start" ? markdown.replace(/^# [^\n]+\n+/, "") : markdown;
  const hero = route.id === "start" ? homeHero() : "";
  const badge = route.id === "final-arabic" ? `<div class="final-notice"><span>FINAL COURSE ITEM</span><p>This is the only Arabic teaching script. Complete the English course first.</p></div>` : "";
  return `${hero}${badge}<article class="markdown-body resource-body">${renderMarkdown(pageMarkdown, source.file)}</article>`;
}

function appShell(route, content) {
  const meta = routeMeta(route);
  const hasVoiceover = route.kind === "lesson" && Boolean(AUDIO_PART_COUNTS[meta.lesson.number]);
  const titleText = route.kind === "lesson" ? `Phase ${String(meta.lesson.phaseNumber).padStart(2, "0")} · Lesson ${meta.lesson.number}` : meta.subtitle;
  return `<div class="site-shell${hasVoiceover ? " has-voiceover" : ""}">
    ${sidebarMarkup(route)}
    <div class="sidebar-scrim" id="sidebar-scrim"></div>
    <div class="main-shell">
      <header class="topbar">
        <button class="menu-button" id="menu-toggle" aria-label="Open course navigation" aria-expanded="false"><span></span><span></span><span></span></button>
        <div class="breadcrumbs"><span class="crumb-muted">ATLAS</span><span class="crumb-slash">/</span><span>${escapeHtml(titleText)}</span></div>
        <div class="topbar-tools">
          <div class="search-wrap">
            <span class="search-symbol" aria-hidden="true">⌕</span>
            <input id="course-search" type="search" placeholder="Search lessons and tools" autocomplete="off" aria-label="Search course content" />
            <kbd>⌘ K</kbd>
            <div class="search-results" id="search-results" hidden></div>
          </div>
        </div>
      </header>
      <main id="main-content" class="main-content">${content}</main>
      <footer class="site-footer"><span>THE SCRIPTWRITER’S ATLAS</span><span>Write with purpose · prove what you claim · serve the viewer</span></footer>
    </div>
    ${hasVoiceover ? voiceoverDockMarkup(meta.lesson) : ""}
  </div>`;
}

async function renderApp() {
  const route = currentRoute();
  app.innerHTML = `<div class="boot-screen" role="status"><div class="boot-mark">A</div><p>Loading course content…</p></div>`;
  try {
    const source = route.kind === "lesson" ? lessonById.get(route.id) : getPageSource(route.id);
    const markdown = await loadMarkdown(source.file);
    const content = buildPageContent(route, markdown);
    app.innerHTML = appShell(route, content);
    bindInteractions(route);
    if (new URLSearchParams(window.location.search).get("audio") === "1") {
      const panel = document.getElementById("audio-panel");
      const toggle = document.getElementById("audio-open");
      if (panel && toggle) {
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        window.setTimeout(() => panel.scrollIntoView({ block: "nearest", behavior: "smooth" }), 90);
      }
    }
    if (window.location.hash) {
      window.setTimeout(() => {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        target?.scrollIntoView({ block: "start", behavior: "smooth" });
      }, 80);
    } else {
      document.getElementById("main-content")?.scrollTo(0, 0);
      window.scrollTo(0, 0);
    }
    document.title = route.kind === "lesson"
      ? `${source.title} — The Scriptwriter’s Atlas`
      : `${source.title} — The Scriptwriter’s Atlas`;
  } catch (error) {
    app.innerHTML = appShell(route, `<section class="error-card"><span class="error-kicker">CONTENT COULD NOT LOAD</span><h1>Let’s try that again.</h1><p>${escapeHtml(error.message)}</p><button class="primary-button" onclick="window.location.reload()">Reload course</button></section>`);
    bindInteractions(route);
  }
}

function navigateRoute(routeString) {
  const [kind, id] = routeString.split(":");
  if (kind !== "page" && kind !== "lesson") return;
  const valid = kind === "lesson" ? lessonById.has(id) : id === "start" || resourceById.has(id);
  if (!valid) return;
  history.pushState({}, "", routeUrl(kind, id));
  renderApp();
}

function bindInteractions(route) {
  const menu = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("sidebar-scrim");
  const closeMenu = () => {
    sidebar?.classList.remove("is-open");
    scrim?.classList.remove("is-visible");
    menu?.setAttribute("aria-expanded", "false");
  };
  menu?.addEventListener("click", () => {
    const open = !sidebar.classList.contains("is-open");
    sidebar.classList.toggle("is-open", open);
    scrim.classList.toggle("is-visible", open);
    menu.setAttribute("aria-expanded", String(open));
  });
  scrim?.addEventListener("click", closeMenu);

  document.querySelectorAll("[data-app-link][data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
      navigateRoute(link.dataset.route);
    });
  });

  const complete = document.getElementById("complete-lesson");
  complete?.addEventListener("click", () => {
    const id = complete.dataset.lessonId;
    const nextValue = !isComplete(id);
    setComplete(id, nextValue);
    renderApp();
  });

  const audio = document.getElementById("lesson-audio");
  const voiceSections = audio ? prepareVoiceSections() : [];
  const audioPanel = document.getElementById("audio-panel");
  const audioOpen = document.getElementById("audio-open");
  const audioOpenLabel = document.getElementById("audio-open-label");
  const audioClose = document.getElementById("audio-close");
  // Transcript sentences also carry data-audio-part; only the five actual track buttons are parts.
  const audioParts = [...document.querySelectorAll(".audio-part[data-audio-part]")];
  const audioSpeed = document.getElementById("audio-speed");
  const voiceToggle = document.getElementById("voice-toggle");
  const voiceDock = document.getElementById("voice-dock");
  const voiceDockState = document.getElementById("voice-dock-state");
  const voiceDockSection = document.getElementById("voice-dock-section");
  const voiceDockSectionName = document.getElementById("voice-dock-section-name");
  const voiceCaption = document.getElementById("voice-dock-caption");
  const voiceShowTranscript = document.getElementById("voice-show-transcript");
  const transcriptCopy = document.getElementById("transcript-copy");
  const transcriptToggle = document.getElementById("transcript-toggle");
  const transcriptScroll = document.getElementById("transcript-scroll");
  const transcriptCues = [...document.querySelectorAll("[data-transcript-index]")].map((element) => ({
    index: Number(element.dataset.transcriptIndex),
    partIndex: Number(element.dataset.audioPart),
    weight: Math.max(1, Number(element.dataset.transcriptWeight) || 1),
    element,
  }));
  const partCount = audioParts.length;
  const cuesByPart = Array.from({ length: partCount }, (_unused, index) => transcriptCues.filter((cue) => cue.partIndex === index));
  const audioStatus = document.getElementById("audio-status");
  const audioTime = document.getElementById("audio-time");
  const audioProgress = document.getElementById("audio-progress");
  const audioProgressFill = document.getElementById("audio-progress-fill");
  const dockProgress = document.getElementById("voice-dock-progress");
  const dockProgressFill = document.getElementById("voice-dock-progress-fill");
  let activeCueIndex = -1;
  let activeVoiceSectionIndex = -1;
  let playbackStarted = false;
  const totalSectionWeight = voiceSections.reduce((total, section) => total + section.weight, 0);

  const currentPartIndex = () => Math.max(0, Math.min(partCount - 1, Number(audio?.dataset.currentPart) || 0));
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };
  const setTranscriptOpen = (open) => {
    if (!transcriptCopy) return;
    transcriptCopy.hidden = !open;
    transcriptToggle?.setAttribute("aria-expanded", String(open));
    if (transcriptToggle) transcriptToggle.textContent = open ? "إخفاء النص" : "إظهار النص";
  };
  const setActiveVoiceSection = (progress, scroll = false) => {
    if (!voiceSections.length || !totalSectionWeight) return;
    let remainingWeight = Math.max(0, Math.min(1, progress)) * totalSectionWeight;
    let selectedSection = voiceSections[voiceSections.length - 1];
    for (const section of voiceSections) {
      if (remainingWeight < section.weight) {
        selectedSection = section;
        break;
      }
      remainingWeight -= section.weight;
    }
    if (selectedSection.index === activeVoiceSectionIndex) return;

    const previousSection = voiceSections.find((section) => section.index === activeVoiceSectionIndex);
    previousSection?.element.classList.remove("is-voice-active");
    previousSection?.element.removeAttribute("aria-current");
    previousSection?.element.querySelector(".lesson-section-now")?.remove();

    activeVoiceSectionIndex = selectedSection.index;
    selectedSection.element.classList.add("is-voice-active");
    selectedSection.element.setAttribute("aria-current", "location");
    const indicator = document.createElement("span");
    indicator.className = "lesson-section-now";
    indicator.lang = "ar";
    indicator.dir = "rtl";
    const arabicTitle = arabicSectionTitle(selectedSection.title);
    indicator.textContent = `يُشرح الآن · ${arabicTitle}`;
    selectedSection.element.prepend(indicator);

    if (voiceDockSectionName) {
      voiceDockSectionName.textContent = arabicTitle;
      voiceDockSectionName.lang = "ar";
      voiceDockSectionName.dir = "rtl";
      voiceDockSectionName.title = selectedSection.title;
      voiceDockSection?.setAttribute("aria-label", `القسم الجاري شرحه: ${arabicTitle} (${selectedSection.title})`);
    }
    if (scroll && audio && !audio.paused) {
      const bounds = selectedSection.element.getBoundingClientRect();
      const obscuredAbove = bounds.top < 74;
      const obscuredBelow = bounds.bottom > window.innerHeight - 132;
      if (obscuredAbove || obscuredBelow) {
        selectedSection.element.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  };
  const setPanelOpen = (open, scroll = false, revealTranscript = false) => {
    if (!audioPanel) return;
    audioPanel.hidden = !open;
    audioOpen?.setAttribute("aria-expanded", String(open));
    if (audioOpenLabel) audioOpenLabel.textContent = open ? "إخفاء النص" : "إظهار النص";
    if (open && revealTranscript) setTranscriptOpen(true);
    if (scroll && open) audioPanel.scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (open && revealTranscript) {
      window.setTimeout(() => {
        const activeCue = transcriptCues.find((cue) => cue.index === activeCueIndex);
        if (activeCue) scrollTranscriptCueIntoView(activeCue.element);
      }, scroll ? 220 : 0);
    }
  };
  const scrollTranscriptCueIntoView = (element) => {
    if (!transcriptScroll || audioPanel?.hidden || !element) return;
    const panelBounds = audioPanel.getBoundingClientRect();
    const scrollBounds = transcriptScroll.getBoundingClientRect();
    if (panelBounds.bottom <= 0 || panelBounds.top >= window.innerHeight) return;
    const cueBounds = element.getBoundingClientRect();
    if (cueBounds.top < scrollBounds.top + 12 || cueBounds.bottom > scrollBounds.bottom - 12) {
      transcriptScroll.scrollTo({
        top: transcriptScroll.scrollTop + cueBounds.top - scrollBounds.top - 22,
        behavior: "smooth",
      });
    }
  };
  const setActiveCue = (cue) => {
    if (!cue || cue.index === activeCueIndex) return;
    const previousCue = transcriptCues.find((item) => item.index === activeCueIndex);
    previousCue?.element.classList.remove("is-active");
    previousCue?.element.removeAttribute("aria-current");
    activeCueIndex = cue.index;
    cue.element.classList.add("is-active");
    cue.element.setAttribute("aria-current", "true");
    if (voiceCaption) {
      voiceCaption.innerHTML = highlightedText(cue.element.textContent.trim(), route.kind === "lesson" ? lessonById.get(route.id).number : 0);
      voiceCaption.lang = "en";
      voiceCaption.dir = "ltr";
    }
    scrollTranscriptCueIntoView(cue.element);
  };
  const updateActiveCue = () => {
    if (!audio || !transcriptCues.length) return;
    const partCues = cuesByPart[currentPartIndex()] || [];
    if (!partCues.length) return;
    const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
    const progress = duration ? Math.max(0, Math.min(1, audio.currentTime / duration)) : 0;
    const totalWeight = partCues.reduce((sum, cue) => sum + cue.weight, 0);
    let remainingWeight = progress * totalWeight;
    let selectedCue = partCues[partCues.length - 1];
    for (const cue of partCues) {
      if (remainingWeight < cue.weight) {
        selectedCue = cue;
        break;
      }
      remainingWeight -= cue.weight;
    }
    setActiveCue(selectedCue);
    const overallProgress = Math.max(0, Math.min(1, (currentPartIndex() + progress) / Math.max(1, partCount)));
    if (playbackStarted || !audio.paused) setActiveVoiceSection(overallProgress, !audio.paused);
  };
  const updateProgress = () => {
    if (!audio || !partCount) return;
    const partIndex = currentPartIndex();
    const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
    const segmentProgress = duration ? Math.max(0, Math.min(1, audio.currentTime / duration)) : 0;
    const totalProgress = Math.max(0, Math.min(1, (partIndex + segmentProgress) / partCount));
    const percent = Math.round(totalProgress * 100);
    const isPlaying = !audio.paused && !audio.ended;
    const isFinished = audio.ended && partIndex === partCount - 1;
    const statusText = isFinished
      ? "اكتمل الاستماع"
      : isPlaying
        ? `يعمل · المقطع ${partIndex + 1} من ${partCount}`
        : playbackStarted
          ? `متوقف مؤقتًا · المقطع ${partIndex + 1} من ${partCount}`
          : `جاهز · المقطع ${partIndex + 1} من ${partCount}`;
    if (audioStatus) audioStatus.textContent = statusText;
    if (voiceDockState) voiceDockState.textContent = isFinished ? "اكتمل" : isPlaying ? "يعمل" : playbackStarted ? "متوقف" : "جاهز";
    if (audioTime) audioTime.textContent = duration ? `${formatTime(audio.currentTime)} / ${formatTime(duration)}` : "0:00";
    if (audioProgressFill) audioProgressFill.style.width = `${percent}%`;
    if (dockProgressFill) dockProgressFill.style.width = `${percent}%`;
    audioProgress?.setAttribute("aria-valuenow", String(percent));
    dockProgress?.setAttribute("aria-valuenow", String(percent));
    voiceDock?.classList.toggle("is-playing", isPlaying);
    voiceToggle?.setAttribute("aria-label", isPlaying ? "إيقاف التعليق الصوتي مؤقتًا" : "تشغيل التعليق الصوتي");
    voiceToggle?.setAttribute("title", isPlaying ? "إيقاف مؤقت" : "تشغيل الصوت");
  };
  const selectAudioPart = (button, autoplay = true) => {
    if (!audio || !button) return;
    audio.src = button.dataset.audioSrc;
    audio.dataset.currentPart = button.dataset.audioPart;
    audioParts.forEach((part) => part.classList.toggle("active", part === button));
    audio.load();
    const firstCue = cuesByPart[Number(button.dataset.audioPart)]?.[0];
    if (firstCue) setActiveCue(firstCue);
    else updateActiveCue();
    updateProgress();
    if (autoplay) {
      audio.play().catch(() => {
        if (audioStatus) audioStatus.textContent = "تعذر التشغيل · اضغط زر الصوت مرة أخرى";
      });
    }
  };
  const playOrPause = () => {
    if (!audio) return;
    if (audio.paused) {
      if (audio.ended && currentPartIndex() === partCount - 1) {
        selectAudioPart(audioParts[0]);
        return;
      }
      if (audioPanel?.hidden) setPanelOpen(true, false, true);
      audio.play().catch(() => {
        if (audioStatus) audioStatus.textContent = "تعذر التشغيل · اضغط زر الصوت مرة أخرى";
      });
    } else {
      audio.pause();
    }
  };

  audioOpen?.addEventListener("click", () => {
    const open = Boolean(audioPanel?.hidden);
    setPanelOpen(open, open, open);
  });
  audioClose?.addEventListener("click", () => {
    audio?.pause();
    setPanelOpen(false);
  });
  voiceToggle?.addEventListener("click", playOrPause);
  voiceShowTranscript?.addEventListener("click", () => setPanelOpen(true, true, true));
  transcriptToggle?.addEventListener("click", () => setTranscriptOpen(Boolean(transcriptCopy?.hidden)));
  audioParts.forEach((button) => button.addEventListener("click", () => selectAudioPart(button)));
  audioSpeed?.addEventListener("change", () => {
    if (audio) audio.playbackRate = Number(audioSpeed.value) || 1;
  });
  audio?.addEventListener("loadedmetadata", () => {
    updateActiveCue();
    updateProgress();
  });
  audio?.addEventListener("timeupdate", () => {
    updateActiveCue();
    updateProgress();
  });
  audio?.addEventListener("seeked", () => {
    updateActiveCue();
    updateProgress();
  });
  audio?.addEventListener("play", () => {
    playbackStarted = true;
    updateActiveCue();
    updateProgress();
  });
  audio?.addEventListener("pause", updateProgress);
  audio?.addEventListener("ended", () => {
    const nextIndex = currentPartIndex() + 1;
    if (nextIndex < audioParts.length) {
      selectAudioPart(audioParts[nextIndex]);
      return;
    }
    if (transcriptCues.length) setActiveCue(transcriptCues[transcriptCues.length - 1]);
    setActiveVoiceSection(1, false);
    updateProgress();
  });
  updateActiveCue();
  updateProgress();

  bindSearch();
  document.querySelectorAll(".phase-nav").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open) details.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  });
}

function bindSearch() {
  const input = document.getElementById("course-search");
  const results = document.getElementById("search-results");
  if (!input || !results) return;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.hidden = true;
      results.innerHTML = "";
      return;
    }
    if (!searchReady) {
      results.hidden = false;
      results.innerHTML = `<div class="search-loading">Indexing the course…</div>`;
      buildSearchIndex().then(() => {
        if (input.value.trim().toLowerCase() === query) {
          if (searchReady) input.dispatchEvent(new Event("input", { bubbles: true }));
          else results.innerHTML = `<div class="search-empty">Search could not load. Please try again.</div>`;
        }
      });
      return;
    }
    const matches = searchIndex.filter((item) => item.searchText.includes(query)).slice(0, 8);
    results.hidden = false;
    results.innerHTML = matches.length
      ? matches.map((item) => {
          const at = item.searchText.indexOf(query);
          const excerpt = item.searchText.slice(Math.max(0, at - 48), at + query.length + 96);
          const route = item.lessonId ? `lesson:${item.lessonId}` : `page:${item.pageId}`;
          const url = item.lessonId ? routeUrl("lesson", item.lessonId) : routeUrl("page", item.pageId);
          return `<a class="search-result" href="${url}" data-app-link="true" data-route="${route}"><span class="result-type">${escapeHtml(item.type)}</span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(excerpt)}…</span></a>`;
        }).join("")
      : `<div class="search-empty">No results for <strong>${escapeHtml(query)}</strong>. Try “hook”, “proof”, or “revision”.</div>`;
    results.querySelectorAll("[data-app-link][data-route]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        navigateRoute(link.dataset.route);
      });
    });
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      input.value = "";
      results.hidden = true;
      input.blur();
    }
  });
}

async function buildSearchIndex() {
  if (searchReady) return;
  if (searchTask) return searchTask;
  searchTask = (async () => {
    const phaseItems = await Promise.all(PHASES.map(async (phase) => {
      const markdown = await loadMarkdown(phase.file);
      return phase.lessons.map((lesson) => {
        const parsed = extractLesson(markdown, lesson.number);
        return {
          lessonId: lesson.id,
          title: lesson.title,
          type: `PHASE ${String(phase.number).padStart(2, "0")} · LESSON ${lesson.number}`,
          searchText: `${lesson.title} ${phase.title} ${textOnly(parsed.content)}`.toLowerCase(),
        };
      });
    }));
    const resourceItems = await Promise.all(RESOURCES.filter((item) => item.id !== "final-arabic").map(async (resource) => ({
      pageId: resource.id,
      title: resource.label,
      type: "REFERENCE TOOL",
      searchText: `${resource.label} ${textOnly(await loadMarkdown(resource.file))}`.toLowerCase(),
    })));
    const finalPage = RESOURCES.find((item) => item.id === "final-arabic");
    const finalItem = {
      pageId: finalPage.id,
      title: finalPage.label,
      type: "FINAL LESSON",
      searchText: `${finalPage.label} voiceover recording`.toLowerCase(),
    };
    searchIndex = [...phaseItems.flat(), ...resourceItems, finalItem];
    searchReady = true;
  })();
  try {
    await searchTask;
  } catch (error) {
    searchTask = null;
    console.warn("Course search index did not finish loading.", error);
  }
}

window.addEventListener("popstate", renderApp);
document.addEventListener("click", (event) => {
  const results = document.getElementById("search-results");
  if (results && !event.target.closest(".search-wrap")) results.hidden = true;
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("course-search")?.focus();
  }
});

renderApp();
