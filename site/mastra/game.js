const colors = [
  { key: "red", en: "red", forms: { m: "rojo", f: "roja" } },
  { key: "blue", en: "blue", forms: { m: "azul", f: "azul" } },
  { key: "green", en: "green", forms: { m: "verde", f: "verde" } },
  { key: "yellow", en: "yellow", forms: { m: "amarillo", f: "amarilla" } },
  { key: "purple", en: "purple", forms: { m: "morado", f: "morada" } },
  { key: "orange", en: "orange", forms: { m: "naranja", f: "naranja" } },
  { key: "pink", en: "pink", forms: { m: "rosado", f: "rosada" } },
  { key: "black", en: "black", forms: { m: "negro", f: "negra" } },
  { key: "white", en: "white", forms: { m: "blanco", f: "blanca" } },
  { key: "gray", en: "gray", forms: { m: "gris", f: "gris" } }
];

const adjectives = [
  { key: "big", en: "big", forms: { m: "grande", f: "grande" } },
  { key: "small", en: "small", forms: { m: "pequeño", f: "pequeña" }, className: "small" },
  { key: "fast", en: "fast", forms: { m: "rápido", f: "rápida" }, className: "fast" },
  { key: "slow", en: "slow", forms: { m: "lento", f: "lenta" }, className: "slow" },
  { key: "shiny", en: "shiny", forms: { m: "brillante", f: "brillante" }, className: "shiny" },
  { key: "dark", en: "dark", forms: { m: "oscuro", f: "oscura" }, className: "dark" }
];

const nouns = [
  { en: "comet", es: "cometa", gender: "m", article: "un" },
  { en: "star", es: "estrella", gender: "f", article: "una" },
  { en: "planet", es: "planeta", gender: "m", article: "un" },
  { en: "moon", es: "luna", gender: "f", article: "una" }
];

const levels = [
  {
    name: "Color Sparks",
    choices: 3,
    maxColors: 4,
    maxAdjectives: 1,
    nouns: [0],
    lesson: ["rojo/roja = red", "azul = blue", "verde = green", "amarillo/amarilla = yellow"]
  },
  {
    name: "Size Orbit",
    choices: 4,
    maxColors: 6,
    maxAdjectives: 3,
    nouns: [0, 1],
    lesson: ["grande = big", "pequeño/pequeña = small", "una estrella roja = a red star", "un cometa rojo = a red comet"]
  },
  {
    name: "Agreement Galaxy",
    choices: 4,
    maxColors: 10,
    maxAdjectives: 6,
    nouns: [0, 1, 2, 3],
    lesson: ["Adjectives often change: rojo → roja", "Some stay the same: azul, verde, gris", "Color usually comes after the noun", "un planeta lento = a slow planet"]
  }
];

const state = {
  score: 0,
  streak: 0,
  attempts: 0,
  correct: 0,
  round: 1,
  levelIndex: 0,
  current: null,
  answered: false
};

const els = {
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  level: document.getElementById("level"),
  levelName: document.getElementById("levelName"),
  round: document.getElementById("round"),
  roundTotal: document.getElementById("roundTotal"),
  accuracy: document.getElementById("accuracy"),
  progressText: document.getElementById("progressText"),
  comet: document.getElementById("comet"),
  prompt: document.getElementById("prompt"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  lessonList: document.getElementById("lessonList"),
  nextButton: document.getElementById("nextButton")
};

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function levelConfig() {
  return levels[state.levelIndex];
}

function spanishPhrase(noun, color, adjective) {
  const gender = noun.gender;
  return `${noun.article} ${noun.es} ${adjective.forms[gender]} ${color.forms[gender]}`;
}

function englishPhrase(noun, color, adjective) {
  return `a ${adjective.en} ${color.en} ${noun.en}`;
}

function makeChallenge() {
  const config = levelConfig();
  const availableColors = colors.slice(0, config.maxColors);
  const availableAdjectives = adjectives.slice(0, config.maxAdjectives);
  const noun = nouns[sample(config.nouns)];
  const color = sample(availableColors);
  const adjective = sample(availableAdjectives);
  const answer = spanishPhrase(noun, color, adjective);

  const distractors = new Set();
  while (distractors.size < config.choices - 1) {
    const mode = Math.floor(Math.random() * 4);
    let wrongColor = color;
    let wrongAdjective = adjective;
    let wrongNoun = noun;

    if (mode === 0) wrongColor = sample(availableColors.filter(item => item.key !== color.key));
    if (mode === 1 && availableAdjectives.length > 1) wrongAdjective = sample(availableAdjectives.filter(item => item.key !== adjective.key));
    if (mode === 2 && config.nouns.length > 1) wrongNoun = nouns[sample(config.nouns)];
    if (mode === 3) {
      const oppositeGender = noun.gender === "m" ? "f" : "m";
      const article = noun.gender === "m" ? "un" : "una";
      const agreementTrap = `${article} ${noun.es} ${adjective.forms[oppositeGender]} ${color.forms[oppositeGender]}`;
      if (agreementTrap !== answer) distractors.add(agreementTrap);
      continue;
    }

    const phrase = spanishPhrase(wrongNoun, wrongColor, wrongAdjective);
    if (phrase !== answer) distractors.add(phrase);
  }

  return {
    noun,
    color,
    adjective,
    prompt: englishPhrase(noun, color, adjective),
    answer,
    choices: shuffle([answer, ...distractors])
  };
}

function renderStats() {
  const config = levelConfig();
  els.score.textContent = state.score;
  els.streak.textContent = state.streak;
  els.level.textContent = state.levelIndex + 1;
  els.levelName.textContent = config.name;
  els.round.textContent = state.round;
  els.roundTotal.textContent = 8;
  els.accuracy.textContent = state.attempts === 0 ? "100%" : `${Math.round((state.correct / state.attempts) * 100)}%`;

  if (state.levelIndex === levels.length - 1) {
    els.progressText.textContent = "Final level: master the whole carnival";
  } else {
    const needed = Math.max(0, 5 - state.correct);
    els.progressText.textContent = needed === 0 ? "Level up coming!" : `${needed} more correct to level up`;
  }
}

function renderLesson() {
  els.lessonList.innerHTML = "";
  levelConfig().lesson.forEach(text => {
    const li = document.createElement("li");
    const [term, meaning] = text.split(" = ");
    if (meaning) {
      li.innerHTML = `<strong>${term}</strong> = ${meaning}`;
    } else {
      li.textContent = text;
    }
    els.lessonList.appendChild(li);
  });
}

function renderComet(challenge) {
  const sizeClass = challenge.adjective.className || (challenge.adjective.key === "big" ? "big" : "");
  els.comet.className = ["comet", challenge.color.key, sizeClass].filter(Boolean).join(" ");
  const symbolMap = { comet: "★", star: "✦", planet: "●", moon: "☾" };
  els.comet.querySelector(".face").textContent = symbolMap[challenge.noun.en] || "★";
}

function newRound() {
  state.answered = false;
  state.current = makeChallenge();
  els.prompt.textContent = state.current.prompt;
  els.feedback.className = "feedback";
  els.feedback.textContent = "Choose the Spanish phrase that matches the carnival comet.";
  els.nextButton.disabled = true;
  renderComet(state.current);
  renderChoices();
  renderStats();
  renderLesson();
}

function renderChoices() {
  els.choices.innerHTML = "";
  state.current.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice;
    button.addEventListener("click", () => answer(choice, button));
    els.choices.appendChild(button);
  });
}

function answer(choice, button) {
  if (state.answered) return;
  state.answered = true;
  state.attempts += 1;
  const isRight = choice === state.current.answer;

  [...els.choices.children].forEach(child => {
    child.disabled = true;
    if (child.textContent === state.current.answer) child.classList.add("correct");
  });

  if (isRight) {
    state.correct += 1;
    state.streak += 1;
    const bonus = Math.min(5, state.streak);
    state.score += 10 + bonus + state.levelIndex * 3;
    els.feedback.className = "feedback good";
    els.feedback.textContent = `¡Correcto! ${state.current.answer} means “${state.current.prompt}.” Streak bonus +${bonus}!`;
  } else {
    state.streak = 0;
    button.classList.add("incorrect");
    els.feedback.className = "feedback bad";
    els.feedback.textContent = `Not quite. The best match is “${state.current.answer}.” Notice the adjective endings.`;
  }

  els.nextButton.disabled = false;
  renderStats();
}

function advanceProgress() {
  if (state.correct >= 5 && state.levelIndex < levels.length - 1) {
    state.levelIndex += 1;
    state.correct = 0;
    state.attempts = 0;
    state.round = 1;
    els.feedback.className = "feedback good";
  } else {
    state.round = state.round >= 8 ? 1 : state.round + 1;
  }
  newRound();
}

els.nextButton.addEventListener("click", advanceProgress);

newRound();
