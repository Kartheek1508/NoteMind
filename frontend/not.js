function createNotes(text) {
  const sentences = text.split(/[.?!]/).filter(line => line.trim() !== "");
  if (sentences.length === 0) return "Please enter some valid text.";
  const summary = sentences.slice(0, 5).map(s => `• ${s.trim()}`).join("<br>");
  return `<h3> Notes</h3><p>${summary}</p>`;
}

function createQuiz(text) {
  const words = text.split(/\s+/).filter(w => w.length > 5);
  if (words.length < 5) return "Not enough content to create a quiz.";
  let quiz = "<h3> Quiz</h3>";
  for (let i = 1; i <= 3; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    quiz += `<p>Q${i}. What is the meaning of "<b>${randomWord}</b>"?</p>`;
  }
  return quiz;
}

function answerDoubt(text, doubt) {
  if (!doubt.trim()) return "Please enter your doubt!";
  const topic = text.split(" ")[2] || "the mentioned topic";
  return `
    <h3> Doubt</h3>
    <p><b>Your Question:</b> ${doubt}</p>
    <p><b>Answer:</b> Based on your notes, it seems related to <i>${topic}</i>.</p>
  `;
}

const inputBox = document.getElementById("inputText");
const outputBox = document.getElementById("outputBox");
const quizBtn = document.getElementById("quizBtn");
const doubtBtn = document.getElementById("doubtBtn");

document.getElementById("notesBtn").addEventListener("click", () => {
  const text = inputBox.value.trim();
  if (!text) {
    outputBox.innerHTML = "<p>Please enter or upload some notes first.</p>";
    return;
  }
  outputBox.innerHTML = createNotes(text);
  quizBtn.classList.remove("hidden");
  doubtBtn.classList.remove("hidden");
});

quizBtn.addEventListener("click", () => {
  const text = inputBox.value.trim();
  outputBox.innerHTML = createQuiz(text);
});

doubtBtn.addEventListener("click", () => {
  const text = inputBox.value.trim();
  const doubt = prompt("Enter your doubt:");
  if (doubt) outputBox.innerHTML = answerDoubt(text, doubt);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  inputBox.value = "";
  outputBox.innerHTML = "<p>Results will appear here...</p>";
  quizBtn.classList.add("hidden");
  doubtBtn.classList.add("hidden");
});

document.getElementById("fileInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    inputBox.value = event.target.result;
  };
  reader.readAsText(file);
});

document.getElementById("bgColor").addEventListener("input", (e) => {
  document.body.style.background = e.target.value;
});

const themeSwitch = document.getElementById("themeSwitch");
const themeLabel = document.getElementById("themeLabel");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  themeLabel.textContent = themeSwitch.checked ? "🌙 Dark Mode" : "🌞 Bright Mode";
});
