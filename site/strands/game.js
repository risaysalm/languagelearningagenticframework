const levels = [
  {
    name: "Morning Market",
    challenge: "Choose simple greetings.",
    stamp: "🌅",
    character: "👩‍🌾",
    questions: [
      {
        situation: "You arrive at the market early in the day.",
        prompt: "How do you say “Good morning” in Spanish?",
        choices: ["Buenos días", "Buenas noches", "Adiós", "Hasta luego"],
        answer: "Buenos días",
        tip: "Buenos días is used in the morning."
      },
      {
        situation: "A vendor waves and says, “¡Hola!”",
        prompt: "What is the best reply?",
        choices: ["Hola", "Me llamo", "Soy de", "Gracias"],
        answer: "Hola",
        tip: "Hola means hello and works in most friendly situations."
      },
      {
        situation: "It is after lunch and you enter a small shop.",
        prompt: "Pick the afternoon greeting.",
        choices: ["Buenas tardes", "Buenos días", "Buenas noches", "Encantado"],
        answer: "Buenas tardes",
        tip: "Buenas tardes means good afternoon."
      },
      {
        situation: "You leave the plaza but will return soon.",
        prompt: "Which farewell means “See you later”?",
        choices: ["Hasta luego", "Mucho gusto", "¿Cómo te llamas?", "Buenas tardes"],
        answer: "Hasta luego",
        tip: "Hasta luego is a friendly way to say see you later."
      }
    ]
  },
  {
    name: "Name Tag Booth",
    challenge: "Introduce yourself and ask names.",
    stamp: "🏷️",
    character: "🧑‍🎨",
    questions: [
      {
        situation: "A mural painter asks your name.",
        prompt: "Choose “My name is Ana.”",
        choices: ["Me llamo Ana", "Te llamas Ana", "Soy de Ana", "Hasta Ana"],
        answer: "Me llamo Ana",
        tip: "Me llamo... means my name is..."
      },
      {
        situation: "You want to ask a new friend their name.",
        prompt: "What should you ask?",
        choices: ["¿Cómo te llamas?", "¿De dónde eres?", "¿Qué tal?", "Buenas noches"],
        answer: "¿Cómo te llamas?",
        tip: "¿Cómo te llamas? asks What is your name?"
      },
      {
        situation: "Someone says, “Me llamo Diego.”",
        prompt: "What did Diego tell you?",
        choices: ["His name", "Where he is from", "Goodbye", "The time of day"],
        answer: "His name",
        tip: "Me llamo Diego means My name is Diego."
      },
      {
        situation: "You introduce your friend Lola to the group.",
        prompt: "Choose “This is Lola.”",
        choices: ["Esta es Lola", "Me llamo Lola", "Hasta Lola", "¿Lola?"],
        answer: "Esta es Lola",
        tip: "Esta es... means This is... for a feminine name or person."
      }
    ]
  },
  {
    name: "Friendly Fountain",
    challenge: "Respond politely after introductions.",
    stamp: "⛲",
    character: "🧓",
    questions: [
      {
        situation: "You meet Carlos for the first time.",
        prompt: "Which phrase means “Nice to meet you”?",
        choices: ["Mucho gusto", "Buenas noches", "Hasta mañana", "Soy de México"],
        answer: "Mucho gusto",
        tip: "Mucho gusto is the classic nice to meet you phrase."
      },
      {
        situation: "María says, “Mucho gusto.” You want to say “Likewise.”",
        prompt: "Choose the best reply.",
        choices: ["Igualmente", "Adiós", "Me llamo", "¿Cómo te llamas?"],
        answer: "Igualmente",
        tip: "Igualmente means likewise or same to you."
      },
      {
        situation: "A friend asks, “¿Qué tal?”",
        prompt: "Pick a natural answer.",
        choices: ["Bien, gracias", "Me llamo gracias", "Hasta bien", "Soy tal"],
        answer: "Bien, gracias",
        tip: "Bien, gracias means well, thanks."
      },
      {
        situation: "You want to ask “How are you?” in a casual way.",
        prompt: "Which question fits?",
        choices: ["¿Qué tal?", "¿Cómo te llamas?", "¿De dónde eres?", "Hasta luego"],
        answer: "¿Qué tal?",
        tip: "¿Qué tal? is a friendly How are you? / How is it going?"
      }
    ]
  },
  {
    name: "World Postcard Stand",
    challenge: "Say where people are from.",
    stamp: "🗺️",
    character: "👨‍✈️",
    questions: [
      {
        situation: "A traveler asks where you are from.",
        prompt: "Choose “I am from Spain.”",
        choices: ["Soy de España", "Me llamo España", "Buenas España", "Mucho España"],
        answer: "Soy de España",
        tip: "Soy de... means I am from..."
      },
      {
        situation: "You want to ask a classmate where they are from.",
        prompt: "What do you say?",
        choices: ["¿De dónde eres?", "¿Cómo te llamas?", "¿Qué tal?", "¿Buenos días?"],
        answer: "¿De dónde eres?",
        tip: "¿De dónde eres? asks Where are you from?"
      },
      {
        situation: "Lucía says, “Soy de Perú.”",
        prompt: "What did you learn?",
        choices: ["Lucía is from Peru", "Lucía says good night", "Lucía asks your name", "Lucía is leaving"],
        answer: "Lucía is from Peru",
        tip: "Soy de Perú means I am from Peru."
      },
      {
        situation: "Complete a polite mini-introduction.",
        prompt: "Hola. Me llamo Nico. ____ Argentina.",
        choices: ["Soy de", "Hasta", "Te llamas", "Mucho gusto de"],
        answer: "Soy de",
        tip: "Name plus origin: Me llamo Nico. Soy de Argentina."
      }
    ]
  },
  {
    name: "Plaza Party",
    challenge: "Build full conversations from mixed clues.",
    stamp: "🎉",
    character: "🪅",
    questions: [
      {
        situation: "Pick the most natural conversation order.",
        prompt: "A: Hola, me llamo Sara. B: ____",
        choices: ["Mucho gusto, Sara. Me llamo Luis.", "Hasta luego, me llamo Luis.", "Buenas noches, ¿de Luis?", "Soy de mucho gusto."],
        answer: "Mucho gusto, Sara. Me llamo Luis.",
        tip: "After an introduction, answer with nice to meet you and your name."
      },
      {
        situation: "You meet someone at night and ask their name.",
        prompt: "Choose the best two-part line.",
        choices: ["Buenas noches. ¿Cómo te llamas?", "Buenos días. Hasta luego.", "Mucho gusto. Soy de nombre.", "Adiós. ¿Qué tal?"],
        answer: "Buenas noches. ¿Cómo te llamas?",
        tip: "Buenas noches works at night; ¿Cómo te llamas? asks their name."
      },
      {
        situation: "A new friend says: “Soy de Chile.”",
        prompt: "Keep the conversation going with the best reply.",
        choices: ["¡Qué bien! Yo soy de Canadá.", "Me llamo Chile.", "Hasta Chile.", "¿Cómo te Chile?"],
        answer: "¡Qué bien! Yo soy de Canadá.",
        tip: "Yo soy de... means I am from... and keeps the introduction going."
      },
      {
        situation: "Final challenge: choose the complete friendly intro.",
        prompt: "Which line says: Hello, my name is Eva. Nice to meet you. I am from Mexico.",
        choices: ["Hola, me llamo Eva. Mucho gusto. Soy de México.", "Hola, soy de Eva. Hasta México. Me llamo gusto.", "Buenas tardes Eva, ¿cómo México?", "Me llamo México. Soy de mucho gusto."],
        answer: "Hola, me llamo Eva. Mucho gusto. Soy de México.",
        tip: "A strong introduction can include greeting + name + polite phrase + origin."
      }
    ]
  }
];

const phrasebook = [
  ["Hola", "Hello"],
  ["Buenos días", "Good morning"],
  ["Buenas tardes", "Good afternoon"],
  ["Buenas noches", "Good evening / good night"],
  ["Me llamo...", "My name is..."],
  ["¿Cómo te llamas?", "What is your name?"],
  ["Mucho gusto", "Nice to meet you"],
  ["Igualmente", "Likewise"],
  ["¿Qué tal?", "How is it going?"],
  ["Soy de...", "I am from..."],
  ["¿De dónde eres?", "Where are you from?"],
  ["Hasta luego", "See you later"]
];

const els = {
  score: document.getElementById("score"),
  streak: document.getElementById("streak"),
  levelText: document.getElementById("levelText"),
  stamps: document.getElementById("stamps"),
  startScreen: document.getElementById("startScreen"),
  gameScreen: document.getElementById("gameScreen"),
  levelScreen: document.getElementById("levelScreen"),
  endScreen: document.getElementById("endScreen"),
  startBtn: document.getElementById("startBtn"),
  nextBtn: document.getElementById("nextBtn"),
  restartBtn: document.getElementById("restartBtn"),
  continueBtn: document.getElementById("continueBtn"),
  playAgainBtn: document.getElementById("playAgainBtn"),
  levelName: document.getElementById("levelName"),
  challengeTitle: document.getElementById("challengeTitle"),
  questionCount: document.getElementById("questionCount"),
  situation: document.getElementById("situation"),
  prompt: document.getElementById("prompt"),
  character: document.getElementById("character"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  levelResultTitle: document.getElementById("levelResultTitle"),
  levelResultText: document.getElementById("levelResultText"),
  finalSummary: document.getElementById("finalSummary"),
  phrasebook: document.getElementById("phrasebook")
};

let state;

function freshState() {
  return {
    levelIndex: 0,
    questionIndex: 0,
    score: 0,
    streak: 0,
    levelCorrect: 0,
    totalCorrect: 0,
    answered: false,
    earnedStamps: []
  };
}

function showOnly(screen) {
  [els.startScreen, els.gameScreen, els.levelScreen, els.endScreen].forEach(el => el.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function updateStats() {
  els.score.textContent = state.score;
  els.streak.textContent = state.streak;
  els.levelText.textContent = `${state.levelIndex + 1} / ${levels.length}`;
  els.stamps.innerHTML = levels.map((level, index) => {
    const earned = state.earnedStamps.includes(index);
    return `<span class="stamp ${earned ? "earned" : ""}" title="${level.name}">${earned ? level.stamp : index + 1}</span>`;
  }).join("");
}

function startGame() {
  state = freshState();
  updateStats();
  showOnly(els.gameScreen);
  renderQuestion();
}

function renderQuestion() {
  const level = levels[state.levelIndex];
  const question = level.questions[state.questionIndex];
  state.answered = false;

  els.levelName.textContent = `Level ${state.levelIndex + 1}: ${level.name}`;
  els.challengeTitle.textContent = level.challenge;
  els.questionCount.textContent = `${state.questionIndex + 1} / ${level.questions.length}`;
  els.situation.textContent = question.situation;
  els.prompt.textContent = question.prompt;
  els.character.textContent = level.character;
  els.feedback.className = "feedback hidden";
  els.feedback.innerHTML = "";
  els.nextBtn.classList.add("hidden");

  els.choices.innerHTML = "";
  question.choices.forEach(choice => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => chooseAnswer(choice, button));
    els.choices.appendChild(button);
  });
}

function chooseAnswer(choice, button) {
  if (state.answered) return;
  state.answered = true;

  const level = levels[state.levelIndex];
  const question = level.questions[state.questionIndex];
  const correct = choice === question.answer;
  const buttons = [...els.choices.querySelectorAll("button")];

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === question.answer) btn.classList.add("correct");
  });

  if (correct) {
    state.streak += 1;
    state.levelCorrect += 1;
    state.totalCorrect += 1;
    const bonus = 10 + (state.levelIndex * 3) + Math.min(state.streak, 5) * 2;
    state.score += bonus;
    els.feedback.className = "feedback good";
    els.feedback.innerHTML = `<strong>¡Correcto!</strong> +${bonus} points. ${question.tip}`;
  } else {
    state.streak = 0;
    button.classList.add("wrong");
    els.feedback.className = "feedback bad";
    els.feedback.innerHTML = `<strong>Casi.</strong> The best answer is <strong>${question.answer}</strong>. ${question.tip}`;
  }

  updateStats();
  els.nextBtn.classList.remove("hidden");
}

function nextStep() {
  const level = levels[state.levelIndex];
  if (state.questionIndex < level.questions.length - 1) {
    state.questionIndex += 1;
    renderQuestion();
    return;
  }
  completeLevel();
}

function completeLevel() {
  const level = levels[state.levelIndex];
  const needed = state.levelIndex < 2 ? 2 : 3;
  const passed = state.levelCorrect >= needed;

  if (passed) {
    if (!state.earnedStamps.includes(state.levelIndex)) {
      state.earnedStamps.push(state.levelIndex);
    }
    updateStats();
    els.levelResultTitle.textContent = `${level.stamp} ${level.name} stamp earned!`;
    els.levelResultText.textContent = `You got ${state.levelCorrect} of ${level.questions.length}. New Spanish phrases are getting mixed in, so the next stop is trickier.`;
    els.continueBtn.textContent = state.levelIndex === levels.length - 1 ? "See my passport" : "Next level";
    showOnly(els.levelScreen);
  } else {
    els.levelResultTitle.textContent = "Try this stop again";
    els.levelResultText.textContent = `You got ${state.levelCorrect} of ${level.questions.length}. Earn at least ${needed} to stamp your passport. Review the feedback and replay this level!`;
    els.continueBtn.textContent = "Replay level";
    showOnly(els.levelScreen);
  }
}

function continueGame() {
  const level = levels[state.levelIndex];
  const needed = state.levelIndex < 2 ? 2 : 3;
  const passed = state.levelCorrect >= needed;

  if (!passed) {
    state.questionIndex = 0;
    state.levelCorrect = 0;
    showOnly(els.gameScreen);
    renderQuestion();
    return;
  }

  if (state.levelIndex === levels.length - 1) {
    endGame();
    return;
  }

  state.levelIndex += 1;
  state.questionIndex = 0;
  state.levelCorrect = 0;
  showOnly(els.gameScreen);
  updateStats();
  renderQuestion();
}

function endGame() {
  const totalQuestions = levels.reduce((sum, level) => sum + level.questions.length, 0);
  const accuracy = Math.round((state.totalCorrect / totalQuestions) * 100);
  els.finalSummary.textContent = `Final score: ${state.score}. Accuracy: ${accuracy}%. You can now greet people, introduce yourself, ask names, and say where you are from in Spanish.`;
  els.phrasebook.innerHTML = phrasebook.map(([spanish, english]) => `
    <article>
      <strong>${spanish}</strong>
      <span>${english}</span>
    </article>
  `).join("");
  showOnly(els.endScreen);
}

els.startBtn.addEventListener("click", startGame);
els.nextBtn.addEventListener("click", nextStep);
els.restartBtn.addEventListener("click", startGame);
els.continueBtn.addEventListener("click", continueGame);
els.playAgainBtn.addEventListener("click", startGame);

state = freshState();
updateStats();
