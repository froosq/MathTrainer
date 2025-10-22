// Элементы DOM
const exampleEl = document.getElementById('example');
const answerInput = document.getElementById('answer');
const historyEl = document.getElementById('history');
const singleTimeEl = document.getElementById('singleTime');

// Настройки
let difficulty = 1;
let operation = 'addition'; // текущая операция
let history = [];
let currentExample = { question: '', answer: 0 };
let startTime = Date.now();

// Функции меню
function start(type) {
  operation = type;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('train').style.display = 'block';
  generateExample();
}

function setLevel(level) {
  if(level === 'easy') difficulty = 1;
  else if(level === 'medium') difficulty = 2;
  else if(level === 'hard') difficulty = 3;
  else if(level === 'extreme') difficulty = 4;
  generateExample();
}

// Генерация примера
function generateExample() {
  let a, b;
  if (difficulty === 1) { a = Math.floor(Math.random()*10)+1; b = Math.floor(Math.random()*10)+1; }
  else if (difficulty === 2) { a = Math.floor(Math.random()*50)+1; b = Math.floor(Math.random()*50)+1; }
  else if (difficulty === 3) { a = Math.floor(Math.random()*100)+1; b = Math.floor(Math.random()*100)+1; }
  else { a = Math.floor(Math.random()*200)+1; b = Math.floor(Math.random()*200)+1; }

  let op = '';
  if(operation === 'addition') op = '+';
  else if(operation === 'subtraction') op = '-';
  else if(operation === 'multiplication') op = '*';
  else if(operation === 'division') { op = '/'; b = Math.max(1,b); a = a * b; } // деление без остатка

  let ans;
  if(op === '+') ans = a + b;
  else if(op === '-') ans = a - b;
  else if(op === '*') ans = a * b;
  else ans = a / b;

  currentExample = { question: `${a} ${op} ${b}`, answer: ans };
  exampleEl.textContent = currentExample.question;
  startTime = Date.now();
}

// Обновляем историю
function updateHistory() {
  historyEl.innerHTML = history.map(h=>`<div>${h}</div>`).join('');
}

// Проверка в реальном времени
function checkAnswerRealtime() {
  const userAnswer = answerInput.value.trim();
  if(userAnswer === currentExample.answer.toString()) {
    const timeSpent = ((Date.now()-startTime)/1000).toFixed(2);
    history.push(`${currentExample.question} = ${currentExample.answer} ✅ (${timeSpent}s)`);
    updateHistory();
    singleTimeEl.textContent = timeSpent;
    generateExample();
    answerInput.value = '';
  }
}

answerInput.addEventListener('input', checkAnswerRealtime);

// Кнопка назад
function goBack() {
  document.getElementById('menu').style.display = 'block';
  document.getElementById('train').style.display = 'none';
  answerInput.value = '';
  exampleEl.textContent = '';
}

generateExample();
