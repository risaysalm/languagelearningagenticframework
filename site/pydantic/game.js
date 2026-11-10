const numbers = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
  "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"
];

const state = {
  level: 1,
  round: 1,
  score: 0,
  streak: 0,
  answered: false,
  current: null
};

const els = {
  level: document.getElementById("levelDisplay"),
  score: document.getElementById("scoreDisplay"),
  streak: document.getElementById("streakDisplay"),
  range: document.getElementById("rangeDisplay"),
  round: document.getElementById("roundDisplay"),
  missionType: document.getElementById("missionType"),
  prompt: document.getElementById("prompt"),
  visual: document.getElementById("visual"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  next: document.getElementById("nextButton"),
  restart: document.getElementById("restartButton"),
  chart: document.getElementById("numberChart")
};

function maxForLevel() {
  if (state.level === 1) return 5;
  if (state.level === 2) return 10;
  if (state.level === 3) return 15;
  return 20;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function numberWord(n) {
  return numbers[n];
}

function buildChart() {
  els.chart.innerHTML = numbers.map((word, index) => (
    `<div class="chart-item"><b>${index}</b><span>${word}</span></div>`
  )).join("");
}

function updateStats() {
  const max = maxForLevel();
  els.level.textContent = state.level;
  els.score.textContent = state.score;
  els.streak.textContent = state.streak;
  els.range.textContent = `0–${max}`;
  els.round.textContent = `Round ${state.round}`;
}

function makeStars(count) {
  const stars = Array.from({ length: count }, (_, i) => `<span class="star" style="animation-delay:${(i % 7) * 0.12}s"></span>`).join("");
  return `<div class="star-field">${stars || "<span class='number-glyph'>0</span>"}</div>`;
}

function makeOptions(answer, mode) {
  const max = maxForLevel();
  const values = new Set([answer]);
  while (values.size < 4) {
    const drift = randomInt(-4, 4);
    const candidate = Math.max(0, Math.min(20, answer + drift || randomInt(0, max)));
    values.add(candidate);
  }

  return shuffle([...values]).map(value => ({
    value,
    label: mode === "spanish-choice" ? numberWord(value) : String(value)
  }));
}

function chooseMission() {
  const max = maxForLevel();
  const unlocked = ["count-stars", "translate-word"];
  if (state.level >= 2) unlocked.push("spanish-choice");
  if (state.level >= 3) unlocked.push("addition");
  if (state.level >= 4) unlocked.push("subtraction");
  const type = unlocked[randomInt(0, unlocked.length - 1)];

  if (type === "addition") {
    const a = randomInt(1, Math.min(10, max));
    const b = randomInt(1, Math.min(10, max - a));
    const answer = a + b;
    return {
      type,
      title: "Add in Spanish",
      prompt: `<span class="spanish-word">${numberWord(a)}</span> + <span class="spanish-word">${numberWord(b)}</span> = ?`,
      visual: `<div class="number-glyph">${a} + ${b}</div>`,
      answer,
      mode: "number-choice"
    };
  }

  if (type === "subtraction") {
    const a = randomInt(6, max);
    const b = randomInt(1, a);
    const answer = a - b;
    return {
      type,
      title: "Subtract in Spanish",
      prompt: `<span class="spanish-word">${numberWord(a)}</span> − <span class="spanish-word">${numberWord(b)}</span> = ?`,
      visual: `<div class="number-glyph">${a} − ${b}</div>`,
      answer,
      mode: "number-choice"
    };
  }

  const answer = randomInt(0, max);
  if (type === "translate-word") {
    return {
      type,
      title: "Translate the number",
      prompt: `What number is <span class="spanish-word">${numberWord(answer)}</span>?`,
      visual: `<div class="number-glyph">?</div>`,
      answer,
      mode: "number-choice"
    };
  }

  if (type === "spanish-choice") {
    return {
      type,
      title: "Choose the Spanish word",
      prompt: `Which word means <span class="spanish-word">${answer}</span>?`,
      visual: `<div class="number-glyph">${answer}</div>`,
      answer,
      mode: "spanish-choice"
    };
  }

  return {
    type,
    title: "Count the stars",
    prompt: "How many glowing stars are in the nebula?",
    visual: makeStars(answer),
    answer,
    mode: "number-choice"
  };
}

function renderMission() {
  state.answered = false;
  state.current = chooseMission();
  updateStats();

  els.missionType.textContent = state.current.title;
  els.prompt.innerHTML = state.current.prompt;
  els.visual.innerHTML = state.current.visual;
  els.feedback.className = "feedback";
  els.feedback.textContent = "Choose an answer to launch!";
  els.next.hidden = true;

  const options = makeOptions(state.current.answer, state.current.mode);
  els.choices.innerHTML = "";
  options.forEach(option => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = option.label;
    button.dataset.value = option.value;
    button.addEventListener("click", () => answerMission(button, option.value));
    els.choices.appendChild(button);
  });
}

function answerMission(button, value) {
  if (state.answered) return;
  state.answered = true;

  const correct = value === state.current.answer;
  const buttons = [...els.choices.querySelectorAll("button")];
  buttons.forEach(btn => {
    btn.disabled = true;
    if (Number(btn.dataset.value) === state.current.answer) btn.classList.add("correct");
  });

  if (correct) {
    const points = 10 + state.level * 3 + Math.min(state.streak, 5) * 2;
    state.score += points;
    state.streak += 1;
    els.feedback.className = "feedback good";
    els.feedback.textContent = `¡Correcto! ${state.current.answer} is ${numberWord(state.current.answer)}. +${points} points.`;
  } else {
    state.streak = 0;
    button.classList.add("wrong");
    els.feedback.className = "feedback bad";
    els.feedback.textContent = `Not quite. ${state.current.answer} is ${numberWord(state.current.answer)} in Spanish.`;
  }

  const newLevel = Math.min(4, Math.floor(state.score / 70) + 1);
  if (newLevel > state.level) {
    state.level = newLevel;
    els.feedback.textContent += " Level up! New number systems unlocked.";
  }

  updateStats();
  els.next.hidden = false;
  els.next.focus();
}

function nextMission() {
  state.round += 1;
  renderMission();
}

function restartGame() {
  state.level = 1;
  state.round = 1;
  state.score = 0;
  state.streak = 0;
  renderMission();
}

els.next.addEventListener("click", nextMission);
els.restart.addEventListener("click", restartGame);

buildChart();
renderMission();
