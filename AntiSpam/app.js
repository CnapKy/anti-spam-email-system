const senderInput = document.querySelector("#senderInput");
const subjectInput = document.querySelector("#subjectInput");
const emailInput = document.querySelector("#emailInput");
const analyzeBtn = document.querySelector("#analyzeBtn");
const spamSampleBtn = document.querySelector("#spamSampleBtn");
const cleanSampleBtn = document.querySelector("#cleanSampleBtn");
const randomSampleBtn = document.querySelector("#randomSampleBtn");
const benchmarkBtn = document.querySelector("#benchmarkBtn");
const copyReportBtn = document.querySelector("#copyReportBtn");
const liveToggle = document.querySelector("#liveToggle");
const clearBtn = document.querySelector("#clearBtn");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const inputStatus = document.querySelector("#inputStatus");
const verdictBadge = document.querySelector("#verdictBadge");
const scoreRing = document.querySelector("#scoreRing");
const scoreValue = document.querySelector("#scoreValue");
const meterFill = document.querySelector("#meterFill");
const riskTitle = document.querySelector("#riskTitle");
const riskSummary = document.querySelector("#riskSummary");
const reasonList = document.querySelector("#reasonList");
const binaryVector = document.querySelector("#binaryVector");
const featureTable = document.querySelector("#featureTable");
const patternGrid = document.querySelector("#patternGrid");
const hashList = document.querySelector("#hashList");
const historyList = document.querySelector("#historyList");
const sampleStrip = document.querySelector("#sampleStrip");
const heatmapView = document.querySelector("#heatmapView");
const profileBars = document.querySelector("#profileBars");
const encodingView = document.querySelector("#encodingView");
const benchmarkList = document.querySelector("#benchmarkList");
const reportBox = document.querySelector("#reportBox");
const trainingStats = document.querySelector("#trainingStats");
const trainingWeights = document.querySelector("#trainingWeights");
const trainSpamBtn = document.querySelector("#trainSpamBtn");
const trainCleanBtn = document.querySelector("#trainCleanBtn");
const resetTrainingBtn = document.querySelector("#resetTrainingBtn");
const gameSender = document.querySelector("#gameSender");
const gameSubject = document.querySelector("#gameSubject");
const gameBody = document.querySelector("#gameBody");
const gameResult = document.querySelector("#gameResult");
const gameScore = document.querySelector("#gameScore");
const gameCard = document.querySelector("#gameCard");
const guessSpamBtn = document.querySelector("#guessSpamBtn");
const guessCleanBtn = document.querySelector("#guessCleanBtn");
const nextGameBtn = document.querySelector("#nextGameBtn");

const suspiciousTerms = [
  "free",
  "winner",
  "win",
  "urgent",
  "act now",
  "click",
  "claim",
  "prize",
  "limited offer",
  "password",
  "verify",
  "account suspended",
  "crypto",
  "airdrop",
  "безплатно",
  "печелиш",
  "награда",
  "спешно",
  "кликни",
  "потвърди",
  "парола",
  "профилът е спрян",
  "само днес"
];

const urgencyTerms = ["urgent", "immediately", "act now", "last chance", "спешно", "веднага", "само днес"];
const credentialTerms = ["password", "verify", "login", "account", "2fa", "парола", "потвърди", "профил"];
const moneyTerms = ["$", "€", "лв", "bitcoin", "crypto", "loan", "bonus", "prize", "пари", "кредит", "бонус"];
const shortenerDomains = new Set(["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly"]);

const blacklistedHashes = new Set([
  "23b303aa1df742dc7821ecbb95de66c0ba58d80b2a16d665624cd0c6c25a5262",
  "0cc9cd00057083bfb63d4468a94cf2673d8668949095f8038686d363965919fd",
  "79b0fe816877540b880ff471fd9a8d2831dfddd737341462990c0902d4e453b2",
  "2e2334c4ca7ca531b63f9b7dd9e38edf0a2d07f15bc4ba7483714a244cdebdac",
  "a17e78ff520171f72a5654aab214f6eaa653b4628de957129420fa670648a849",
  "916945e248767d7c17910ee4418c0b4a7d12a53ab233bf138be3f3b42cc5e6c4"
]);

const samples = {
  spam: {
    title: "Фишинг вход",
    tag: "Spam",
    className: "spam",
    sender: "security@secure-login-check.net",
    subject: "URGENT: Verify your account now",
    body:
      "Hello winner,\n\nYour account has been selected for a FREE crypto prize. Click immediately: https://secure-login-check.net/claim\n\nVerify your password today or your account will be suspended!!! Bonus code: QmFzZTY0U3BhbUJsb2NrVG9rZW4xMjM0NTY3ODkw"
  },
  bank: {
    title: "Фалшива банка",
    tag: "Spam",
    className: "spam",
    sender: "alerts@verify-payments-alert.com",
    subject: "Payment blocked - action required",
    body:
      "Your payment was blocked. Verify your account immediately at https://verify-payments-alert.com/session or your card will be limited. Call +1 202 555 0191 for urgent recovery."
  },
  delivery: {
    title: "Куриер измама",
    tag: "Spam",
    className: "spam",
    sender: "delivery@parcel-update.example",
    subject: "Package held at customs",
    body:
      "Your package is held. Pay 2.99 EUR today to release it: https://bit.ly/release-box-now. Last chance before return to sender!"
  },
  crypto: {
    title: "Crypto airdrop",
    tag: "Spam",
    className: "spam",
    sender: "bonus@bonus-airdrop.info",
    subject: "Claim your airdrop bonus",
    body:
      "Congratulations winner! Claim FREE crypto bonus at https://bonus-airdrop.info/wallet. Act now and verify wallet password. Private access code: Q3J5cHRvQm9udXNTcGFtVG9rZW4xMjM0NTY3ODkw"
  },
  invoice: {
    title: "Фактура риск",
    tag: "Съмнителен",
    className: "warning",
    sender: "finance@new-vendor-payments.com",
    subject: "Updated invoice bank account",
    body:
      "Please process the attached invoice today. The bank details changed and payment is urgent. Use the new account and confirm when the transfer is complete."
  },
  newsletter: {
    title: "Маркетинг",
    tag: "Съмнителен",
    className: "warning",
    sender: "news@shop.example",
    subject: "Limited offer for students",
    body:
      "Само днес има 35% отстъпка за учебни материали. Виж офертата тук: https://shop.example/students. Това е промоционален бюлетин."
  },
  clean: {
    title: "Университет",
    tag: "Clean",
    className: "clean",
    sender: "teacher@university.bg",
    subject: "Материали за упражнението",
    body:
      "Здравейте,\n\nИзпращам материалите за следващото упражнение. В приложението има примерни задачи и кратки указания за предаването.\n\nПоздрави,\nПреподавател"
  },
  support: {
    title: "Support ticket",
    tag: "Clean",
    className: "clean",
    sender: "support@company.example",
    subject: "Ticket #1842 resolved",
    body:
      "Hello,\n\nThe reported login problem is resolved. No password change is required. Please reply to this ticket if the issue appears again.\n\nRegards,\nSupport Team"
  },
  meeting: {
    title: "Работна среща",
    tag: "Clean",
    className: "clean",
    sender: "maria@team.example",
    subject: "Среща в петък",
    body:
      "Здравейте,\n\nПредлагам да преместим срещата за петък в 14:00. Ще обсъдим задачите, сроковете и следващите стъпки по проекта.\n\nМария"
  }
};

let history = [];
let lastAnalysis = null;
let liveTimer = null;
let analysisRequestId = 0;

const TRAINING_STORE_KEY = "antiSpamTrainingState";
const FEATURE_IDS = [
  "suspicious_terms",
  "links",
  "shorteners",
  "caps",
  "exclamations",
  "money",
  "urgency",
  "credentials",
  "blacklist",
  "encoded"
];
const FEATURE_LABELS = {
  suspicious_terms: "Подозрителни думи",
  links: "Линкове",
  shorteners: "Съкратени домейни",
  caps: "Главни букви",
  exclamations: "Удивителни знаци",
  money: "Пари и награди",
  urgency: "Спешност",
  credentials: "Данни за вход",
  blacklist: "Blacklist хеш",
  encoded: "Encoded блокове"
};
let trainingState = restoreTrainingState();
let gameState = {
  currentKey: null,
  rounds: 0,
  correct: 0
};

function normalize(text) {
  return text.toLowerCase();
}

function countMatches(text, terms) {
  return terms.reduce((count, term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "gi");
    return count + (text.match(regex) || []).length;
  }, 0);
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function restoreTrainingState() {
  try {
    const saved = localStorage.getItem(TRAINING_STORE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        rounds: Number(parsed.rounds) || 0,
        spam: Number(parsed.spam) || 0,
        clean: Number(parsed.clean) || 0,
        corrections: Number(parsed.corrections) || 0,
        weights: parsed.weights && typeof parsed.weights === "object" ? parsed.weights : {}
      };
    }
  } catch {
    return { rounds: 0, spam: 0, clean: 0, corrections: 0, weights: {} };
  }

  return { rounds: 0, spam: 0, clean: 0, corrections: 0, weights: {} };
}

function saveTrainingState() {
  try {
    localStorage.setItem(TRAINING_STORE_KEY, JSON.stringify(trainingState));
  } catch {
    inputStatus.textContent = "Обучението е временно";
  }
}

function renderTrainingPanel() {
  trainingStats.innerHTML = `
    <div class="stat-tile"><strong>${trainingState.rounds}</strong><span>Обучения</span></div>
    <div class="stat-tile"><strong>${trainingState.spam}</strong><span>Spam feedback</span></div>
    <div class="stat-tile"><strong>${trainingState.clean}</strong><span>Clean feedback</span></div>
    <div class="stat-tile"><strong>${trainingState.corrections}</strong><span>Корекции</span></div>
  `;

  const learned = Object.entries(trainingState.weights)
    .filter(([, value]) => Math.abs(value) >= 0.1)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 8);

  trainingWeights.innerHTML = learned.length
    ? learned
        .map(([id, value]) => {
          const percent = Math.round(clamp(Math.abs(value) / 14, 0, 1) * 100);
          const sign = value >= 0 ? "+" : "";
          return `
            <div class="weight-item">
              <header><strong>${escapeHtml(FEATURE_LABELS[id] || id)}</strong><span>${sign}${value.toFixed(1)}</span></header>
              <div class="bar-track"><i style="width: ${percent}%"></i></div>
            </div>
          `;
        })
        .join("")
    : '<div class="empty-state">Моделът още няма научени корекции.</div>';
}

async function applyTrainingFeedback(expectedSpam) {
  if (!lastAnalysis) {
    inputStatus.textContent = "Няма анализ";
    return;
  }

  const modelSpam = lastAnalysis.verdict.className !== "safe";
  const isCorrection = modelSpam !== expectedSpam;
  const strength = isCorrection ? 2.2 : 0.9;
  const direction = expectedSpam ? 1 : -1;

  lastAnalysis.features.forEach((feature) => {
    if (!feature.normalized) return;
    const current = Number(trainingState.weights[feature.id]) || 0;
    const delta = direction * feature.normalized * strength;
    trainingState.weights[feature.id] = clamp(current + delta, -8, 14);
  });

  trainingState.rounds += 1;
  trainingState.spam += expectedSpam ? 1 : 0;
  trainingState.clean += expectedSpam ? 0 : 1;
  trainingState.corrections += isCorrection ? 1 : 0;
  saveTrainingState();
  renderTrainingPanel();
  await analyzeEmail({ recordHistory: false, statusText: "Обучено" });
}

function resetTraining() {
  trainingState = { rounds: 0, spam: 0, clean: 0, corrections: 0, weights: {} };
  saveTrainingState();
  renderTrainingPanel();
  inputStatus.textContent = "Обучението е reset";
  if (lastAnalysis) analyzeEmail({ recordHistory: false, statusText: "Reset модел" });
}

function scanPatterns(text) {
  const patterns = {
    urls: [],
    emails: [],
    base64Blocks: [],
    phones: []
  };

  const tokenRegex = /\b(?:https?:\/\/|www\.)[^\s<>"']+|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b(?:[A-Za-z0-9+/]{32,}={0,2})\b|\+?\d[\d\s().-]{7,}\d/gi;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    const token = match[0];
    if (/^(https?:\/\/|www\.)/i.test(token)) {
      patterns.urls.push(token);
    } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(token)) {
      patterns.emails.push(token);
    } else if (/^(?:[A-Za-z0-9+/]{32,}={0,2})$/.test(token)) {
      patterns.base64Blocks.push(token);
    } else {
      patterns.phones.push(token);
    }
  }

  return patterns;
}

function extractDomains(patterns, sender) {
  const domains = new Set();
  const senderDomain = sender.split("@")[1];

  if (senderDomain) {
    domains.add(cleanDomain(senderDomain));
  }

  patterns.urls.forEach((url) => {
    try {
      const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
      domains.add(cleanDomain(new URL(normalizedUrl).hostname));
    } catch {
      const fallback = url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split(/[/?#]/)[0];
      if (fallback) domains.add(cleanDomain(fallback));
    }
  });

  patterns.emails.forEach((email) => {
    const domain = email.split("@")[1];
    if (domain) domains.add(cleanDomain(domain));
  });

  return [...domains].filter(Boolean);
}

function cleanDomain(domain) {
  return domain.toLowerCase().replace(/^www\./, "").replace(/[),.;:!?]+$/, "");
}

async function sha256(text) {
  if (!globalThis.crypto?.subtle) {
    return sha256Fallback(text);
  }

  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function sha256Fallback(text) {
  const constants = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  const hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  const bytes = [...new TextEncoder().encode(text)];
  const bitLength = bytes.length * 8;

  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  writeUint32(bytes, Math.floor(bitLength / 0x100000000));
  writeUint32(bytes, bitLength >>> 0);

  for (let chunk = 0; chunk < bytes.length; chunk += 64) {
    const words = new Array(64);

    for (let i = 0; i < 16; i++) {
      const offset = chunk + i * 4;
      words[i] =
        ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0;
    }

    for (let i = 16; i < 64; i++) {
      const s0 = rotateRight(words[i - 15], 7) ^ rotateRight(words[i - 15], 18) ^ (words[i - 15] >>> 3);
      const s1 = rotateRight(words[i - 2], 17) ^ rotateRight(words[i - 2], 19) ^ (words[i - 2] >>> 10);
      words[i] = (words[i - 16] + s0 + words[i - 7] + s1) >>> 0;
    }

    let [a, b, c, d, e, f, g, h] = hash;

    for (let i = 0; i < 64; i++) {
      const s1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + s1 + ch + constants[i] + words[i]) >>> 0;
      const s0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) >>> 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    hash[0] = (hash[0] + a) >>> 0;
    hash[1] = (hash[1] + b) >>> 0;
    hash[2] = (hash[2] + c) >>> 0;
    hash[3] = (hash[3] + d) >>> 0;
    hash[4] = (hash[4] + e) >>> 0;
    hash[5] = (hash[5] + f) >>> 0;
    hash[6] = (hash[6] + g) >>> 0;
    hash[7] = (hash[7] + h) >>> 0;
  }

  return hash.map((value) => value.toString(16).padStart(8, "0")).join("");
}

function rotateRight(value, amount) {
  return (value >>> amount) | (value << (32 - amount));
}

function writeUint32(bytes, value) {
  bytes.push((value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff);
}

async function scoreEmail(sender, subject, body) {
  const fullText = `${sender}\n${subject}\n${body}`.trim();
  const lowerText = normalize(fullText);
  const patterns = scanPatterns(fullText);
  const domains = extractDomains(patterns, sender);
  const hashChecks = await Promise.all(
    domains.map(async (domain) => {
      const hash = await sha256(domain);
      return { domain, hash, blacklisted: blacklistedHashes.has(hash) };
    })
  );

  const uppercaseLetters = (fullText.match(/[A-ZА-Я]/g) || []).length;
  const allLetters = (fullText.match(/[A-ZА-Яa-zа-я]/g) || []).length || 1;
  const capsRatio = uppercaseLetters / allLetters;
  const exclamations = (fullText.match(/!/g) || []).length;
  const suspiciousCount = countMatches(lowerText, suspiciousTerms);
  const urgencyCount = countMatches(lowerText, urgencyTerms);
  const credentialCount = countMatches(lowerText, credentialTerms);
  const moneyCount = countMatches(lowerText, moneyTerms);
  const shortenerCount = domains.filter((domain) => shortenerDomains.has(domain)).length;
  const blacklistedCount = hashChecks.filter((item) => item.blacklisted).length;
  const linkCount = patterns.urls.length;
  const base64Count = patterns.base64Blocks.length;

  const features = [
    {
      key: "Подозрителни думи",
      value: suspiciousCount,
      normalized: clamp(suspiciousCount / 6, 0, 1),
      weight: 18,
      group: "Съдържание",
      reason: "Намерени са думи, типични за рекламни или фишинг съобщения."
    },
    {
      key: "Линкове",
      value: linkCount,
      normalized: clamp(linkCount / 3, 0, 1),
      weight: 12,
      group: "Навигация",
      reason: "Много линкове увеличават риска от пренасочване към измама."
    },
    {
      key: "Съкратени домейни",
      value: shortenerCount,
      normalized: clamp(shortenerCount, 0, 1),
      weight: 16,
      group: "Навигация",
      reason: "URL shortener може да скрива реалния адрес."
    },
    {
      key: "Главни букви",
      value: `${Math.round(capsRatio * 100)}%`,
      normalized: clamp((capsRatio - 0.25) / 0.45, 0, 1),
      weight: 10,
      group: "Натиск",
      reason: "Прекалено много главни букви често се използват за натиск."
    },
    {
      key: "Удивителни знаци",
      value: exclamations,
      normalized: clamp(exclamations / 5, 0, 1),
      weight: 8,
      group: "Натиск",
      reason: "Силната пунктуация е сигнал за агресивно съобщение."
    },
    {
      key: "Пари и награди",
      value: moneyCount,
      normalized: clamp(moneyCount / 3, 0, 1),
      weight: 8,
      group: "Съдържание",
      reason: "Обещанията за пари, бонуси или награди са чести в spam."
    },
    {
      key: "Спешност",
      value: urgencyCount,
      normalized: clamp(urgencyCount / 2, 0, 1),
      weight: 12,
      group: "Натиск",
      reason: "Изкуствената спешност е типична фишинг техника."
    },
    {
      key: "Данни за вход",
      value: credentialCount,
      normalized: clamp(credentialCount / 3, 0, 1),
      weight: 14,
      group: "Идентичност",
      reason: "Искане за парола или потвърждение на профил е рисково."
    },
    {
      key: "Blacklist хеш",
      value: blacklistedCount,
      normalized: clamp(blacklistedCount, 0, 1),
      weight: 25,
      group: "Идентичност",
      reason: "Открит е домейн със SHA-256 хеш от blacklist."
    },
    {
      key: "Encoded блокове",
      value: base64Count,
      normalized: clamp(base64Count, 0, 1),
      weight: 10,
      group: "Обфускация",
      reason: "Дълъг Base64 блок може да крие съдържание или payload."
    }
  ];

  features.forEach((feature, index) => {
    feature.id = FEATURE_IDS[index];
    feature.baseWeight = feature.weight;
    feature.trainingDelta = Number(trainingState.weights[feature.id]) || 0;
    feature.weight = clamp(feature.baseWeight + feature.trainingDelta, 2, 36);
  });

  const rawScore = features.reduce((sum, feature) => sum + feature.normalized * feature.weight, 0);
  const score = Math.round(clamp(rawScore, 0, 100));
  const verdict = getVerdict(score);
  const binary = features.map((feature) => (feature.normalized > 0 ? 1 : 0));

  return { score, verdict, features, binary, patterns, hashChecks, subject, sender, body, fullText };
}

async function analyzeEmail(options = {}) {
  const requestId = ++analysisRequestId;
  const { recordHistory = true, statusText = "Анализирано" } = options;
  const sender = senderInput.value.trim();
  const subject = subjectInput.value.trim();
  const body = emailInput.value.trim();

  if (!`${sender}${subject}${body}`.trim()) {
    resetView();
    return;
  }

  inputStatus.textContent = statusText;
  const result = await scoreEmail(sender, subject, body);
  if (requestId !== analysisRequestId) return;
  renderResult(result, { recordHistory });
}

function getVerdict(score) {
  if (score >= 65) {
    return {
      label: "Spam",
      className: "spam",
      title: "Висок риск",
      summary: "Съобщението има силни признаци за spam или phishing.",
      color: "var(--danger)"
    };
  }

  if (score >= 35) {
    return {
      label: "Съмнително",
      className: "warning",
      title: "Среден риск",
      summary: "Има няколко рискови признака и е нужна допълнителна проверка.",
      color: "var(--amber)"
    };
  }

  return {
    label: "Not spam",
    className: "safe",
    title: "Нисък риск",
    summary: "Съобщението не показва сериозни spam признаци според текущия модел.",
    color: "var(--safe)"
  };
}

function renderResult(result, options = {}) {
  const { recordHistory = true } = options;
  const { score, verdict, features, binary, patterns, hashChecks, subject, sender } = result;
  lastAnalysis = result;

  scoreValue.textContent = score;
  scoreRing.style.setProperty("--risk", score);
  scoreRing.style.setProperty("--risk-color", verdict.color);
  meterFill.style.width = `${score}%`;
  meterFill.style.background = verdict.color;
  verdictBadge.textContent = verdict.label;
  verdictBadge.className = `verdict-badge ${verdict.className}`;
  riskTitle.textContent = verdict.title;
  riskSummary.textContent = verdict.summary;
  binaryVector.textContent = `[${binary.join(", ")}]`;

  const activeReasons = topFeatures(features, 5);

  reasonList.innerHTML = activeReasons.length
    ? activeReasons
        .map((feature) => {
          const contribution = Math.round(feature.normalized * feature.weight);
          return `
            <div class="reason-item">
              <div>
                <strong>${escapeHtml(feature.key)}</strong>
                <span>${escapeHtml(feature.reason)}</span>
              </div>
              <div class="reason-score">+${contribution}</div>
            </div>
          `;
        })
        .join("")
    : '<div class="empty-state">Няма намерени рискови признаци.</div>';

  featureTable.innerHTML = features
    .map((feature) => {
      const contribution = Math.round(feature.normalized * feature.weight);
      const shownWeight = Number.isInteger(feature.weight) ? feature.weight : feature.weight.toFixed(1);
      const delta =
        Math.abs(feature.trainingDelta) >= 0.1
          ? ` (${feature.trainingDelta > 0 ? "+" : ""}${feature.trainingDelta.toFixed(1)})`
          : "";
      return `
        <tr>
          <td>${escapeHtml(feature.key)}</td>
          <td>${escapeHtml(feature.value)}</td>
          <td>${contribution}/${shownWeight}${delta}</td>
        </tr>
      `;
    })
    .join("");

  renderPatterns(patterns);
  renderHashes(hashChecks);
  renderHeatmap(result);
  renderProfileBars(features);
  renderEncoding(result);
  renderReport(result);
  pulseResult();
  if (recordHistory) pushHistory({ score, verdict, subject, sender });
}

function topFeatures(features, limit) {
  return features
    .filter((feature) => feature.normalized > 0)
    .sort((a, b) => b.normalized * b.weight - a.normalized * a.weight)
    .slice(0, limit);
}

function pulseResult() {
  scoreRing.classList?.remove("score-pop");
  void scoreRing.offsetWidth;
  scoreRing.classList?.add("score-pop");
}

function renderPatterns(patterns) {
  const data = [
    ["URL", patterns.urls.length],
    ["Email", patterns.emails.length],
    ["Base64", patterns.base64Blocks.length],
    ["Телефон", patterns.phones.length]
  ];

  patternGrid.innerHTML = data
    .map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`)
    .join("");
}

function renderHashes(hashChecks) {
  if (!hashChecks.length) {
    hashList.innerHTML = '<div class="empty-state">Няма домейни за проверка.</div>';
    return;
  }

  hashList.innerHTML = hashChecks
    .map(
      (item) => `
        <div class="hash-item">
          <strong>${item.blacklisted ? "Рисков домейн" : "Няма съвпадение"}</strong>
          <span>${escapeHtml(item.domain)}</span>
          <code>${escapeHtml(item.hash)}</code>
        </div>
      `
    )
    .join("");
}

function renderHeatmap(result) {
  const tokens = result.fullText.match(/\S+|\s+/g) || [];
  const limitedTokens = tokens.slice(0, 220);

  heatmapView.innerHTML = limitedTokens
    .map((token) => {
      if (/^\s+$/.test(token)) return token.replace(/\n/g, "<br>");
      const clean = token.toLowerCase();
      const className = classifyToken(clean, result.patterns, result.fullText.toLowerCase());
      return `<span class="token ${className}">${escapeHtml(token)}</span>`;
    })
    .join("");
}

function classifyToken(token, patterns, lowerText) {
  if (patterns.urls.some((url) => token.includes(url.toLowerCase()) || url.toLowerCase().includes(token))) {
    return "link";
  }

  if (patterns.base64Blocks.some((block) => token.includes(block.toLowerCase()))) {
    return "encoded";
  }

  const hasKeyword = suspiciousTerms.some((term) => {
    if (term.includes(" ")) {
      return lowerText.includes(term) && term.split(" ").some((part) => part.length > 3 && token.includes(part));
    }

    return term.length > 2 && token.includes(term);
  });

  return hasKeyword ? "keyword" : "";
}

function renderProfileBars(features) {
  const groups = new Map();

  features.forEach((feature) => {
    const current = groups.get(feature.group) || { score: 0, max: 0 };
    current.score += feature.normalized * feature.weight;
    current.max += feature.weight;
    groups.set(feature.group, current);
  });

  profileBars.innerHTML = [...groups.entries()]
    .map(([name, values]) => {
      const percent = Math.round(clamp((values.score / values.max) * 100, 0, 100));
      return `
        <div class="profile-bar">
          <header><strong>${escapeHtml(name)}</strong><span>${percent}%</span></header>
          <div class="bar-track"><i style="width: ${percent}%"></i></div>
        </div>
      `;
    })
    .join("");
}

function renderEncoding(result) {
  const source = (result.subject || result.body || result.sender).slice(0, 18);

  if (!source) {
    encodingView.innerHTML = '<div class="empty-state">Няма символи за кодиране.</div>';
    return;
  }

  const rows = Array.from(source)
    .slice(0, 14)
    .map((char) => {
      const code = char.codePointAt(0);
      return `
        <tr>
          <td>${escapeHtml(char === " " ? "space" : char)}</td>
          <td>${code}</td>
          <td><code>0x${code.toString(16).toUpperCase()}</code></td>
          <td><code>${code.toString(2).padStart(8, "0")}</code></td>
        </tr>
      `;
    })
    .join("");

  encodingView.innerHTML = `
    <table class="encoding-table">
      <thead>
        <tr>
          <th>Символ</th>
          <th>DEC</th>
          <th>HEX</th>
          <th>BIN</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderReport(result) {
  reportBox.textContent = generateReport(result);
}

function generateReport(result) {
  const top = topFeatures(result.features, 3);
  const domains = result.hashChecks.map((item) => `${item.domain}${item.blacklisted ? " (blacklist)" : ""}`);
  const reasons = top.length ? top.map((feature) => `- ${feature.key}: +${Math.round(feature.normalized * feature.weight)}`).join("\n") : "- Няма активни рискови признаци";

  return [
    "Anti-Spam Email System - кратък доклад",
    `Подател: ${result.sender || "няма"}`,
    `Тема: ${result.subject || "няма"}`,
    `Класификация: ${result.verdict.label}`,
    `Spam score: ${result.score}/100`,
    `Training feedback: ${trainingState.rounds} обучения, ${trainingState.corrections} корекции`,
    `Бинарен вектор: [${result.binary.join(", ")}]`,
    `Намерени шаблони: URL=${result.patterns.urls.length}, Email=${result.patterns.emails.length}, Base64=${result.patterns.base64Blocks.length}, Телефон=${result.patterns.phones.length}`,
    `Домейни: ${domains.length ? domains.join(", ") : "няма"}`,
    "Най-силни признаци:",
    reasons
  ].join("\n");
}

function pushHistory(item) {
  const title = item.subject || item.sender || "Без тема";
  history = [{ ...item, title, time: new Date() }, ...history].slice(0, 5);

  historyList.innerHTML = history
    .map(
      (entry) => `
        <div class="history-item">
          <strong>${escapeHtml(entry.verdict.label)} · ${entry.score}/100</strong>
          <span>${escapeHtml(entry.title)}</span>
        </div>
      `
    )
    .join("");
}

function renderSampleStrip() {
  sampleStrip.innerHTML = Object.entries(samples)
    .map(
      ([key, sample]) => `
        <button class="sample-button" type="button" data-sample="${escapeHtml(key)}">
          ${escapeHtml(sample.title)}
          <span class="sample-tag ${escapeHtml(sample.className)}">${escapeHtml(sample.tag)}</span>
        </button>
      `
    )
    .join("");

  sampleStrip.querySelectorAll("[data-sample]").forEach((button) => {
    button.addEventListener("click", () => loadSample(button.dataset.sample));
  });
}

function loadSample(type) {
  const sample = samples[type];
  if (!sample) return;

  senderInput.value = sample.sender;
  subjectInput.value = sample.subject;
  emailInput.value = sample.body;
  analyzeEmail();
}

function loadRandomSample() {
  const keys = Object.keys(samples);
  const key = keys[Math.floor(Math.random() * keys.length)];
  loadSample(key);
}

function scheduleLiveAnalysis() {
  if (!liveToggle.checked) return;
  clearTimeout(liveTimer);

  liveTimer = setTimeout(() => {
    const hasText = `${senderInput.value}${subjectInput.value}${emailInput.value}`.trim();
    if (!hasText) {
      resetView();
      return;
    }

    analyzeEmail({ recordHistory: false, statusText: "Live" });
  }, 360);
}

async function runBenchmark() {
  const results = [];

  for (const [key, sample] of Object.entries(samples)) {
    const result = await scoreEmail(sample.sender, sample.subject, sample.body);
    results.push({ key, sample, result });
  }

  results.sort((a, b) => b.result.score - a.result.score);
  benchmarkList.innerHTML = results
    .map(({ sample, result }) => {
      const badgeClass = result.verdict.className === "safe" ? "clean" : result.verdict.className;
      return `
        <div class="benchmark-item">
          <div>
            <strong>${escapeHtml(sample.title)}</strong>
            <span>${escapeHtml(result.verdict.label)} · ${result.score}/100</span>
          </div>
          <span class="sample-tag ${badgeClass}">${escapeHtml(sample.tag)}</span>
        </div>
      `;
    })
    .join("");
  inputStatus.textContent = "Сравнено";
}

function nextGameQuestion() {
  const keys = Object.keys(samples);
  let key = keys[Math.floor(Math.random() * keys.length)];

  if (keys.length > 1) {
    while (key === gameState.currentKey) {
      key = keys[Math.floor(Math.random() * keys.length)];
    }
  }

  const sample = samples[key];
  gameState.currentKey = key;
  gameSender.textContent = sample.sender;
  gameSubject.textContent = sample.subject;
  gameBody.textContent = sample.body.length > 190 ? `${sample.body.slice(0, 190)}...` : sample.body;
  gameResult.textContent = "Избери класификация.";
  gameResult.className = "game-result";
  gameCard.classList?.remove("revealed");
}

async function submitGameGuess(guessSpam) {
  const sample = samples[gameState.currentKey];
  if (!sample) return;

  const expectedSpam = sample.className !== "clean";
  const result = await scoreEmail(sample.sender, sample.subject, sample.body);
  const correct = guessSpam === expectedSpam;

  gameState.rounds += 1;
  gameState.correct += correct ? 1 : 0;
  gameScore.textContent = `${gameState.correct}/${gameState.rounds}`;
  gameCard.classList?.add("revealed");
  gameResult.className = `game-result ${correct ? "correct" : "wrong"}`;
  gameResult.textContent = `${correct ? "Правилно" : "Грешно"} · реален label: ${
    expectedSpam ? "Spam" : "Not spam"
  } · модел: ${result.verdict.label}, ${result.score}/100`;
}

async function copyReport() {
  if (!lastAnalysis) {
    inputStatus.textContent = "Няма доклад";
    return;
  }

  const text = generateReport(lastAnalysis);

  try {
    await navigator.clipboard.writeText(text);
    inputStatus.textContent = "Доклад копиран";
  } catch {
    reportBox.focus();
    inputStatus.textContent = "Докладът е готов";
  }
}

function clearInputs() {
  clearTimeout(liveTimer);
  senderInput.value = "";
  subjectInput.value = "";
  emailInput.value = "";
  resetView();
}

function resetView() {
  lastAnalysis = null;
  inputStatus.textContent = "Готово";
  scoreValue.textContent = "0";
  scoreRing.style.setProperty("--risk", 0);
  scoreRing.style.setProperty("--risk-color", "var(--safe)");
  meterFill.style.width = "0%";
  meterFill.style.background = "var(--safe)";
  verdictBadge.textContent = "Not spam";
  verdictBadge.className = "verdict-badge safe";
  riskTitle.textContent = "Нисък риск";
  riskSummary.textContent = "Въведи имейл или зареди пример, за да се изчисли spam score.";
  reasonList.innerHTML = '<div class="empty-state">Няма намерени рискови признаци.</div>';
  binaryVector.textContent = "[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]";
  featureTable.innerHTML = "";
  heatmapView.innerHTML = '<div class="empty-state">Няма текст за визуализация.</div>';
  profileBars.innerHTML = '<div class="empty-state">Няма изчислен профил.</div>';
  encodingView.innerHTML = '<div class="empty-state">Няма символи за кодиране.</div>';
  reportBox.textContent = "Няма генериран доклад.";
  renderPatterns({ urls: [], emails: [], base64Blocks: [], phones: [] });
  renderHashes([]);
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  themeIcon.textContent = isDark ? "☼" : "◐";
  localStorage.setItem("antiSpamTheme", isDark ? "dark" : "light");
}

function restoreTheme() {
  const savedTheme = localStorage.getItem("antiSpamTheme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.textContent = "☼";
  }
}

analyzeBtn.addEventListener("click", analyzeEmail);
spamSampleBtn.addEventListener("click", () => loadSample("spam"));
cleanSampleBtn.addEventListener("click", () => loadSample("clean"));
randomSampleBtn.addEventListener("click", loadRandomSample);
benchmarkBtn.addEventListener("click", runBenchmark);
copyReportBtn.addEventListener("click", copyReport);
trainSpamBtn.addEventListener("click", () => applyTrainingFeedback(true));
trainCleanBtn.addEventListener("click", () => applyTrainingFeedback(false));
resetTrainingBtn.addEventListener("click", resetTraining);
guessSpamBtn.addEventListener("click", () => submitGameGuess(true));
guessCleanBtn.addEventListener("click", () => submitGameGuess(false));
nextGameBtn.addEventListener("click", nextGameQuestion);
clearBtn.addEventListener("click", clearInputs);
themeToggle.addEventListener("click", toggleTheme);
senderInput.addEventListener("input", scheduleLiveAnalysis);
subjectInput.addEventListener("input", scheduleLiveAnalysis);
emailInput.addEventListener("input", scheduleLiveAnalysis);

restoreTheme();
renderSampleStrip();
renderTrainingPanel();
nextGameQuestion();
resetView();
