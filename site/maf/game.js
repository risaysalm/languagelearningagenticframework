const menuWords = [
  { spanish: "el agua", english: "water", emoji: "💧", type: "drink", level: 1, clue: "A drink you need every day." },
  { spanish: "el pan", english: "bread", emoji: "🥖", type: "food", level: 1, clue: "A bakery favorite." },
  { spanish: "la leche", english: "milk", emoji: "🥛", type: "drink", level: 1, clue: "A white drink." },
  { spanish: "la manzana", english: "apple", emoji: "🍎", type: "food", level: 1, clue: "A crunchy fruit." },
  { spanish: "el queso", english: "cheese", emoji: "🧀", type: "food", level: 1, clue: "Great on a sandwich." },
  { spanish: "el café", english: "coffee", emoji: "☕", type: "drink", level: 2, clue: "A warm morning drink." },
  { spanish: "el jugo", english: "juice", emoji: "🧃", type: "drink", level: 2, clue: "A fruity drink." },
  { spanish: "el arroz", english: "rice", emoji: "🍚", type: "food", level: 2, clue: "Small white grains." },
  { spanish: "el pollo", english: "chicken", emoji: "🍗", type: "food", level: 2, clue: "A common meat." },
  { spanish: "la sopa", english: "soup", emoji: "🍲", type: "food", level: 2, clue: "Served in a bowl." },
  { spanish: "la ensalada", english: "salad", emoji: "🥗", type: "food", level: 3, clue: "Often green and fresh." },
  { spanish: "las uvas", english: "grapes", emoji: "🍇", type: "food", level: 3, clue: "Tiny fruit in a bunch." },
  { spanish: "el pescado", english: "fish", emoji: "🐟", type: "food", level: 3, clue: "Comes from the sea." },
  { spanish: "el té", english: "tea", emoji: "🍵", type: "drink", level: 3, clue: "A calming hot drink." },
  { spanish: "la limonada", english: "lemonade", emoji: "🍋", type: "drink", level: 3, clue: "A tart yellow drink." },
  { spanish: "el desayuno", english: "breakfast", emoji: "🍳", type: "meal", level: 4, clue: "The morning meal." },
  { spanish: "el almuerzo", english: "lunch", emoji: "🥪", type: "meal", level: 4, clue: "The midday meal." },
  { spanish: "la cena", english: "dinner", emoji: "🍽️", type: "meal", level: 4, clue: "The evening meal." },
  { spanish: "tengo hambre", english: "I am hungry", emoji: "😋", type: "phrase", level: 4, clue: "Say this when you want food." },
  { spanish: "tengo sed", english: "I am thirsty", emoji: "🥤", type: "phrase", level: 4, clue: "Say this when you want a drink." }
];

const customers = ["🧑‍🍳", "👩🏽‍🌾", "🧒", "👨🏻‍🎨", "👵", "🧑🏾‍🚀", "👩🏼‍🏫"];
const orderGoalByLevel = [0, 6, 8, 10, 12];

const state = {
  score: 0,
  level: 1,
  streak: 0,
  ordersDone: 0,
  current: null,
  answered: false,
  mode: "spanish-to-english"
};

const els = {
  score: document.getElementById("score"),
  level: document.getElementById("level"),
  streak: document.getElementById("streak"),
  ordersDone: document.getElementById("ordersDone"),
  ordersGoal: document.getElementById("ordersGoal"),
  promptLabel: document.getElementById("promptLabel"),
  prompt: document.getElementById("prompt"),
  hint: document.getElementById("hint"),
  options: document.getElementById("options"),
  feedback: document.getElementById("feedback"),
  customer: document.getElementById("customer"),
  startBtn: document.getElementById("startBtn"),
  nextBtn: document.getElementById("nextBtn"),
  wordList: document.getElementById("wordList")
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function availableWords() {
  return menuWords.filter((word) => word.level <= state.level);
}

function updateStats() {
  els.score.textContent = state.score;
  els.level.textContent = state.level;
  els.streak.textContent = state.streak;
  els.ordersDone.textContent = state.ordersDone;
  els.ordersGoal.textContent = orderGoalByLevel[state.level];
}

function renderWordList() {
  els.wordList.innerHTML = "";
  availableWords().forEach((word) => {
    const chip = document.createElement("div");
    chip.className = "word-chip";
    chip.innerHTML = `<span>${word.spanish}</span><span>${word.emoji} ${word.english}</span>`;
    els.wordList.appendChild(chip);
  });
}

function chooseQuestionMode() {
  if (state.level === 1) return "spanish-to-english";
  if (state.level === 2) return Math.random() < 0.75 ? "spanish-to-english" : "english-to-spanish";
  if (state.level === 3) return Math.random() < 0.55 ? "spanish-to-english" : "english-to-spanish";
  const modes = ["spanish-to-english", "english-to-spanish", "phrase-fill"];
  return modes[Math.floor(Math.random() * modes.length)];
}

function buildChoices(correct) {
  const pool = availableWords().filter((word) => word !== correct);
  const choiceCount = state.level >= 3 ? 4 : 3;
  const distractors = shuffle(pool).slice(0, choiceCount - 1);
  return shuffle([correct, ...distractors]);
}

function makeButtonLabel(word) {
  if (state.mode === "english-to-spanish") {
    return `${word.emoji} ${word.spanish}`;
  }
  if (state.mode === "phrase-fill") {
    return word.spanish;
  }
  return `${word.emoji} ${word.english}`;
}

function setPromptFor(word) {
  if (state.mode === "english-to-spanish") {
    els.promptLabel.textContent = "Say this in Spanish:";
    els.prompt.textContent = word.english;
    els.hint.textContent = `Hint: ${word.clue}`;
  } else if (state.mode === "phrase-fill") {
    els.promptLabel.textContent = "Complete the customer's need:";
    if (word.type === "drink") {
      els.prompt.textContent = "I am thirsty = ____";
      els.hint.textContent = "Choose the Spanish phrase for wanting a drink.";
      state.current = menuWords.find((item) => item.spanish === "tengo sed");
    } else {
      els.prompt.textContent = "I am hungry = ____";
      els.hint.textContent = "Choose the Spanish phrase for wanting food.";
      state.current = menuWords.find((item) => item.spanish === "tengo hambre");
    }
  } else {
    els.promptLabel.textContent = "Translate the order:";
    els.prompt.textContent = word.spanish;
    els.hint.textContent = state.level >= 2 ? `Hint: ${word.clue}` : "Choose the English meaning.";
  }
}

function newOrder() {
  const pool = availableWords();
  state.current = pool[Math.floor(Math.random() * pool.length)];
  state.mode = chooseQuestionMode();
  state.answered = false;

  const startingWord = state.current;
  setPromptFor(startingWord);

  els.customer.textContent = customers[Math.floor(Math.random() * customers.length)];
  els.customer.className = "customer";
  els.feedback.className = "feedback";
  els.feedback.textContent = state.level === 1
    ? "Serve the customer by choosing the matching item."
    : "The market is busier now: read carefully!";

  els.options.innerHTML = "";
  buildChoices(state.current).forEach((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = makeButtonLabel(word);
    button.addEventListener("click", () => checkAnswer(button, word));
    els.options.appendChild(button);
  });

  els.nextBtn.disabled = true;
  updateStats();
}

function checkAnswer(button, selected) {
  if (state.answered) return;
  state.answered = true;

  const buttons = [...els.options.querySelectorAll("button")];
  buttons.forEach((btn) => { btn.disabled = true; });

  const correct = selected === state.current;
  const correctButton = buttons.find((btn) => btn.textContent === makeButtonLabel(state.current));

  if (correct) {
    const bonus = Math.max(0, state.streak) * 2;
    const earned = 10 + state.level * 5 + bonus;
    state.score += earned;
    state.streak += 1;
    state.ordersDone += 1;
    button.classList.add("correct");
    els.customer.classList.add("happy");
    els.feedback.className = "feedback good";
    els.feedback.textContent = `¡Correcto! ${state.current.spanish} means ${state.current.english}. +${earned} points.`;
    maybeLevelUp();
  } else {
    state.score = Math.max(0, state.score - 5);
    state.streak = 0;
    button.classList.add("wrong");
    if (correctButton) correctButton.classList.add("correct");
    els.customer.classList.add("sad");
    els.feedback.className = "feedback bad";
    els.feedback.textContent = `Not quite. The correct match is ${state.current.spanish} = ${state.current.emoji} ${state.current.english}. -5 points.`;
  }

  els.nextBtn.disabled = false;
  updateStats();
}

function maybeLevelUp() {
  const goal = orderGoalByLevel[state.level];
  if (state.ordersDone >= goal && state.level < 4) {
    state.level += 1;
    state.ordersDone = 0;
    els.feedback.textContent += ` Level up! New menu words unlocked for level ${state.level}.`;
    document.querySelector(".scoreboard").classList.remove("level-up");
    window.setTimeout(() => document.querySelector(".scoreboard").classList.add("level-up"), 20);
    renderWordList();
  } else if (state.ordersDone >= goal && state.level === 4) {
    els.feedback.textContent += " You mastered the whole market menu! Keep playing for a higher score.";
    state.ordersDone = 0;
  }
}

function resetGame() {
  state.score = 0;
  state.level = 1;
  state.streak = 0;
  state.ordersDone = 0;
  renderWordList();
  newOrder();
}

els.startBtn.addEventListener("click", resetGame);
els.nextBtn.addEventListener("click", newOrder);

renderWordList();
newOrder();
