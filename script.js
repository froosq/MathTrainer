const exampleEl = document.getElementById('example');
const answerInput = document.getElementById('answer');
const historyEl = document.getElementById('history');
const singleTimeEl = document.getElementById('singleTime');

let difficulty = 1;
let operation = 'addition';
let history = [];
let currentExample = {question:'', answer:0};
let startTime = Date.now();

// Меню
function start(type){
  operation = type;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('train').style.display = 'block';
  generateExample();
}

function setLevel(level){
  if(level==='easy') difficulty=1;
  else if(level==='medium') difficulty=2;
  else if(level==='hard') difficulty=3;
  else difficulty=4;
  generateExample();
}

// Генерация примера
function generateExample(){
  let a,b;
  if(difficulty===1){ a=Math.floor(Math.random()*10)+1; b=Math.floor(Math.random()*10)+1; }
  else if(difficulty===2){ a=Math.floor(Math.random()*50)+1; b=Math.floor(Math.random()*50)+1; }
  else if(difficulty===3){ a=Math.floor(Math.random()*100)+1; b=Math.floor(Math.random()*100)+1; }
  else{ a=Math.floor(Math.random()*200)+1; b=Math.floor(Math.random()*200)+1; }

  let op='';
  if(operation==='addition') op='+';
  else if(operation==='subtraction') op='-';
  else if(operation==='multiplication') op='*';
  else if(operation==='division'){ b=Math.max(1,b); a=a*b; op='/'; }

  let ans;
  if(op==='+') ans=a+b;
  else if(op==='-') ans=a-b;
  else if(op==='*') ans=a*b;
  else ans=a/b;

  currentExample={question:`${a} ${op} ${b}`, answer:ans};
  exampleEl.textContent=currentExample.question;
  startTime=Date.now();
  answerInput.value='';
}

// Проверка в реальном времени
answerInput.addEventListener('input', function(){
  const val=answerInput.value.trim();
  if(val===currentExample.answer.toString()){
    const timeSpent=((Date.now()-startTime)/1000).toFixed(2);
    history.push(`${currentExample.question} = ${currentExample.answer} ✅ (${timeSpent}s)`);
    historyEl.innerHTML = history.map(h=>`<div>${h}</div>`).join('');
    singleTimeEl.textContent = `Время на пример: ${timeSpent} секунд`;
    generateExample();
  }
});

// Кнопка назад
function goBack(){
  document.getElementById('menu').style.display='block';
  document.getElementById('train').style.display='none';
  answerInput.value='';
  exampleEl.textContent='';
  singleTimeEl.textContent='Время на пример: 0 секунд';
}

generateExample();
