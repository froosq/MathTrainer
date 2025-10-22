let type = '';
let exampleStartTime;
let currentAnswer;
let level = 'easy';
let correctStreak = 0;
const history = [];

// Звуки
const correctSound = new Audio('https://freesound.org/data/previews/342/342756_3248244-lq.mp3'); 
const wrongSound = new Audio('https://freesound.org/data/previews/156/156123_2659592-lq.mp3');

function start(t) {
  type = t;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('train').style.display = 'block';
  document.getElementById('backButton').style.display = 'inline-block';
  correctStreak = 0;
  nextExample();
}

function setLevel(lv) {
  level = lv;
  correctStreak = 0;
  history.length = 0;
  document.getElementById('history').innerHTML = '';
  nextExample();
}

function nextExample() {
  let range;
  switch(level) {
    case 'easy': range = 10; break;
    case 'medium': range = 50; break;
    case 'hard': range = 100; break;
    case 'extreme': range = 500; break;
  }

  let a = Math.floor(Math.random() * range + 1);
  let b = Math.floor(Math.random() * range + 1);
  if(type === 'division') a = a * b;

  switch(type) {
    case 'addition': currentAnswer = a+b; break;
    case 'subtraction': currentAnswer = a-b; break;
    case 'multiplication': currentAnswer = a*b; break;
    case 'division': currentAnswer = a/b; break;
  }

  const exampleEl = document.getElementById('example');
  exampleEl.innerText = `${a} ${getSymbol(type)} ${b}`;
  exampleEl.style.transform = 'scale(0.9)';
  exampleEl.style.backgroundColor = '#2b2b2b';
  setTimeout(()=>exampleEl.style.transform='scale(1)', 100);

  document.getElementById('answer').value = '';
  document.getElementById('result').innerText = '';
  document.getElementById('result').className = '';
  exampleStartTime = new Date();
}

function getSymbol(t) {
  switch(t) {
    case 'addition': return '+';
    case 'subtraction': return '-';
    case 'multiplication': return '×';
    case 'division': return '÷';
  }
}

function checkAnswer() {
  const ans = Number(document.getElementById('answer').value);
  const elapsed = ((new Date() - exampleStartTime)/1000).toFixed(2);
  const resultEl = document.getElementById('result');

  if(ans === currentAnswer) {
    resultEl.innerText = `✅ Правильно! (${elapsed}с)`;
    resultEl.className = 'correct';
    correctSound.play();
    correctStreak++;

    // Убираем авто-повышение уровня:
    // if(correctStreak >= 5) { ... } → удаляем

    history.push(`Пример: ${document.getElementById('example').innerText} → ${ans} (${elapsed}с)`);
    updateHistory();
    nextExample();
  } else {
    resultEl.innerText = '❌ Неправильно, попробуй ещё';
    resultEl.className = 'wrong';
    wrongSound.play();
    correctStreak = 0;
  }

  document.getElementById('singleTime').innerText = elapsed;
}


function updateHistory() {
  document.getElementById('history').innerHTML = history.slice(-10).map(h => `<p>${h}</p>`).join('');
}

function goBack() {
  document.getElementById('train').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
  document.getElementById('history').innerHTML = '';
  history.length = 0;
  correctStreak = 0;
  document.getElementById('singleTime').innerText = '0';
  document.getElementById('backButton').style.display = 'none';
}

// Enter
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('train').style.display === 'block') {
    checkAnswer();
  }
});
