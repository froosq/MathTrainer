// Элементы DOM
const exampleEl = document.getElementById('example');
const answerInput = document.getElementById('answer');
const historyEl = document.getElementById('history');
const timerEl = document.getElementById('timer');

// Настройки сложности
let difficulty = 1; // 1 = лёгкий, 2 = средний, 3 = сложный

// История примеров
let history = [];

// Текущий пример
let currentExample = { question: '', answer: 0 };
let startTime = Date.now();

// Генерация примера
function generateExample() {
  let a, b;
  if (difficulty === 1) {
    a = Math.floor(Math.random() * 10) + 1;
    b = Math.floor(Math.random() * 10) + 1;
  } else if (difficulty === 2) {
    a = Math.floor(Math.random() * 50) + 1;
    b = Math.floor(Math.random() * 50) + 1;
  } else {
    a = Math.floor(Math.random() * 100) + 1;
    b = Math.floor(Math.random() * 100) + 1;
  }

  const ops = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let ans;
  if (op === '+') ans = a + b;
  else if (op === '-') ans = a - b;
  else ans = a * b;

  currentExample = { question: `${a} ${op} ${b}`, answer: ans };
  exampleEl.textContent = currentExample.question;

  // Сбрасываем таймер
  startTime = Date.now();
}

// Функции отображения
function showCorrect() {
  const timeSpent = ((Date.now() - startTime) / 1000).toFixed(2);
  history.push(`${currentExample.question} = ${currentExample.answer} ✅ (${timeSpent}s)`);
  updateHistory();
}

function showWrong() {
  // Можно оставить пустым или добавить подсветку ошибки
}

// Обновляем историю
function updateHistory() {
  historyEl.innerHTML = history.map(h => `<div>${h}</div>`).join('');
}

// Переход к следующему примеру
function nextExample() {
  generateExample();
}

// Проверка в реальном времени
function checkAnswerRealtime() {
  const userAnswer = answerInput.value.trim();
  if (userAnswer === currentExample.answer.toString()) {
    showCorrect();
    nextExample();
    answerInput.value = '';
  }
}

// Ловим любой ввод в поле
answerInput.addEventListener('input', checkAnswerRealtime);

// Инициализация
generateExample();
