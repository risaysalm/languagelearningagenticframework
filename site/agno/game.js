const verbs = [
  { es: "correr", en: "to run", yo: "corro", clue: "Move fast with your feet.", anim: "run" },
  { es: "saltar", en: "to jump", yo: "salto", clue: "Go up into the air.", anim: "jump" },
  { es: "bailar", en: "to dance", yo: "bailo", clue: "Move to music.", anim: "dance" },
  { es: "escribir", en: "to write", yo: "escribo", clue: "Put words on paper.", anim: "write" },
  { es: "comer", en: "to eat", yo: "como", clue: "Enjoy food.", anim: "eat" },
  { es: "leer", en: "to read", yo: "leo", clue: "Look at words in a book.", anim: "read" },
  { es: "dormir", en: "to sleep", yo: "duermo", clue: "Rest at night.", anim: "sleep" },
  { es: "hablar", en: "to speak", yo: "hablo", clue: "Use your voice.", anim: "speak" },
  { es: "escuchar", en: "to listen", yo: "escucho", clue: "Use your ears carefully.", anim: "speak" },
  { es: "mirar", en: "to look", yo: "miro", clue: "Use your eyes.", anim: "read" },
  { es: "abrir", en: "to open", yo: "abro", clue: "Make a door or box not closed.", anim: "jump" },
  { es: "vivir", en: "to live", yo: "vivo", clue: "Have your home or life somewhere.", anim: "dance" }
];

const levelSettings = [
  {
    name: "Level 1: Match Spanish verbs to English actions.",
    label: "Choose the English meaning:",
    makePrompt: (verb) => verb.es,
    makeCorrect: (verb) => verb.en,
    makeChoice: (verb) => ({ main: verb.en, sub: verb.clue }),
    hint: "Infinitives often end in -ar, -er, or -ir: bailar, comer, vivir."
  },
  {
    name: "Level 2: Decode short action commands.",
    label: "What should the robot do?",
    makePrompt: (verb) => `¡A ${verb.es}!`,
    makeCorrect: (verb) => verb.en,
    makeChoice: (verb) => ({ main: verb.en, sub: verb.es }),
    hint: "¡A correr! means something like: Time to run!"
  },
  {
    name: "Level 3: Match yo forms to infinitives.",
    label: "Which infinitive matches this yo form?",
    makePrompt: (verb) => `Yo ${verb.yo}`,
    makeCorrect: (verb) => verb.es,
    makeChoice: (verb) => ({ main: verb.es, sub: verb.en }),
    hint: "Yo hablo = I speak. The dictionary form is hablar."
  }
];

const roundsPerLevel = 6;
let levelIndex = 0;
let roundInLevel = 1;
let score = 0;
let streak = 0;
let activeVerb = null;
let answered = false;
let gameFinished = false;
let usedThisLevel = [];

const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const levelEl = document.getElementById("level");
const roundEl = document.getElementById("round");
const levelBannerEl = document.getElementById("levelBanner");
const promptLabelEl = document.getElementById("promptLabel");
const promptEl = document.getElementById("prompt");
const hintEl = document.getElementById("hint");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const botEl = document.getElementById("bot");
const actionWordEl = document.getElementById("actionWord");
const verbBankList = document.getElementById("verbBankList");

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function currentSettings() {
  return levelSettings[levelIndex];
}

function updateHud() {
  scoreEl.textContent = score;
  streakEl.textContent = streak;
  levelEl.textContent = levelIndex + 1;
  roundEl.textContent = `${roundInLevel}/${roundsPerLevel}`;
}

function buildVerbBank() {
  verbBankList.innerHTML = verbs.map((verb) => (
    `<div class="verb-chip">${verb.es}<span>${verb.en} • yo ${verb.yo}</span></div>`
  )).join("");
}

function pickVerb() {
  if (usedThisLevel.length >= verbs.length) {
    usedThisLevel = [];
  }
  const available = verbs.filter((verb) => !usedThisLevel.includes(verb.es));
  const chosen = available[Math.floor(Math.random() * available.length)];
  usedThisLevel.push(chosen.es);
  return chosen;
}

function makeChoices(correctVerb) {
  const settings = currentSettings();
  const distractors = shuffle(verbs.filter((verb) => verb.es !== correctVerb.es)).slice(0, 3);
  return shuffle([correctVerb, ...distractors]).map((verb) => {
    const display = settings.makeChoice(verb);
    return {
      verb,
      value: settings.makeCorrect(verb),
      main: display.main,
      sub: display.sub
    };
  });
}

function setFeedback(message, type) {
  feedbackEl.textContent = message;
  feedbackEl.className = `feedback ${type}`;
}

function animateBot(verb) {
  botEl.className = "bot";
  actionWordEl.textContent = verb.es;
  window.setTimeout(() => {
    botEl.classList.add(verb.anim);
  }, 20);
}

function renderRound() {
  answered = false;
  gameFinished = false;
  activeVerb = pickVerb();
  const settings = currentSettings();
  updateHud();

  levelBannerEl.textContent = settings.name;
  promptLabelEl.textContent = settings.label;
  promptEl.textContent = settings.makePrompt(activeVerb);
  hintEl.textContent = settings.hint;
  setFeedback("Pick an action. Correct answers earn 10 points plus streak bonuses!", "neutral");
  nextBtn.disabled = true;
  nextBtn.textContent = "Next mission";
  actionWordEl.textContent = "¿Qué acción?";
  botEl.className = "bot idle";

  choicesEl.innerHTML = "";
  makeChoices(activeVerb).forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.dataset.value = choice.value;
    button.innerHTML = `${choice.main}<small>${choice.sub}</small>`;
    button.addEventListener("click", () => checkAnswer(button, choice));
    choicesEl.appendChild(button);
  });
}

function checkAnswer(button, choice) {
  if (answered) return;
  answered = true;

  const settings = currentSettings();
  const correctValue = settings.makeCorrect(activeVerb);
  const isCorrect = choice.value === correctValue;
  const allButtons = [...choicesEl.querySelectorAll("button")];

  allButtons.forEach((item) => {
    item.disabled = true;
    if (item.dataset.value === correctValue) {
      item.classList.add("correct");
    }
  });

  if (isCorrect) {
    streak += 1;
    const gained = 10 + Math.min(streak * 2, 12) + levelIndex * 5;
    score += gained;
    button.classList.add("correct");
    setFeedback(`¡Correcto! ${activeVerb.es} means ${activeVerb.en}. Yo form: yo ${activeVerb.yo}. +${gained} points.`, "good");
    animateBot(activeVerb);
  } else {
    streak = 0;
    button.classList.add("wrong");
    setFeedback(`Not quite. ${activeVerb.es} means ${activeVerb.en}, and "yo ${activeVerb.yo}" means "I ${activeVerb.en.replace("to ", "")}."`, "bad");
    actionWordEl.textContent = "Inténtalo otra vez";
  }

  updateHud();
  nextBtn.disabled = false;

  if (levelIndex === levelSettings.length - 1 && roundInLevel === roundsPerLevel) {
    nextBtn.textContent = "See final score";
  }
}

function advanceRound() {
  if (gameFinished) {
    restartGame();
    return;
  }

  if (levelIndex === levelSettings.length - 1 && roundInLevel === roundsPerLevel) {
    finishGame();
    return;
  }

  if (roundInLevel < roundsPerLevel) {
    roundInLevel += 1;
  } else {
    levelIndex += 1;
    roundInLevel = 1;
    usedThisLevel = [];
  }

  renderRound();
}

function finishGame() {
  gameFinished = true;
  choicesEl.innerHTML = "";
  promptLabelEl.textContent = "Quest complete";
  promptEl.textContent = "¡Excelente acción!";
  levelBannerEl.textContent = "All levels cleared";
  hintEl.textContent = "You practiced infinitives, commands, and yo forms for common Spanish verbs.";
  const rank = score >= 300 ? "Legendary Verb Hero" : score >= 220 ? "Action Expert" : "Verb Explorer";
  setFeedback(`Final score: ${score}. Rank: ${rank}. Press restart to play again and beat your score.`, "good");
  actionWordEl.textContent = "¡Ganaste!";
  botEl.className = "bot dance";
  nextBtn.textContent = "Restart quest";
  nextBtn.disabled = false;
}

function restartGame() {
  levelIndex = 0;
  roundInLevel = 1;
  score = 0;
  streak = 0;
  usedThisLevel = [];
  renderRound();
}

nextBtn.addEventListener("click", advanceRound);
buildVerbBank();
renderRound();
