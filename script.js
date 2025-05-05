
let currentInput = "";
const display = document.getElementById("display");
function addInput(value) {
  const lastChar = currentInput.slice(-1);
  if ("+-*/.".includes(lastChar) && "+-*/.".includes(value)) return;
  if (value === '%' && currentInput) {
    currentInput += '/100';
  } else {
    currentInput += value;
  }
  display.value = currentInput;
}
function clearDisplay() {
  currentInput = "";
  display.value = "";
}
function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    display.value = currentInput;
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}
document.addEventListener('keydown', (e) => {
  if (document.activeElement.id === 'taskInput' && e.key === 'Enter') {
    addTask();
  }
  if (document.activeElement.id === 'expenseAmount' && e.key === 'Enter') {
    addExpense();
  }
  const key = e.key;
  if (!isNaN(key) || "+-*/.".includes(key)) {
    addInput(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === '%') {
    addInput('%');
  }
});

const tasks = [];
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("tasks");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText);
    taskInput.value = "";
    renderTasks();
  }
}
function renderTasks() {
  taskList.innerHTML = tasks.map((task, index) => `<li>${task} <button onclick="removeTask(${index})">Eliminar</button></li>`).join("");
}
function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

let balance = 0;
const balanceDisplay = document.getElementById("balance");
const expensesList = document.getElementById("expenses");

function setBalance() {
  const initial = parseFloat(document.getElementById("initialBalance").value);
  if (!isNaN(initial)) {
    balance = initial;
    updateBalanceDisplay();
  }
}
function updateBalanceDisplay() {
  balanceDisplay.textContent = `Saldo actual: $${balance.toFixed(2)}`;
}
function addExpense() {
  const name = document.getElementById("expenseName").value.trim();
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  if (name && !isNaN(amount)) {
    balance -= amount;
    updateBalanceDisplay();
    const li = document.createElement('li');
    li.textContent = `${name}: -$${amount.toFixed(2)}`;
    expensesList.appendChild(li);
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
  }
}
function resetExpenses() {
  expensesList.innerHTML = "";
  balance = 0;
  updateBalanceDisplay();
  document.getElementById("initialBalance").value = "";
}

const backgrounds = [
  'imagenes/imagen1.webp',
  'imagenes/imagen2.webp',
  'imagenes/imagen3.webp',
  'imagenes/imagen4.webp',
  'imagenes/imagen5.webp',
  'imagenes/imagen6.webp',
  'imagenes/imagen7.webp',
  'imagenes/imagen8.webp',
  'imagenes/imagen9.webp',

];
let currentBgIndex = 0;
function changeBackground() {
  document.body.style.backgroundImage = `url('${backgrounds[currentBgIndex]}')`;
  currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
}
setInterval(changeBackground, 7000);
changeBackground();

const songs = [
  { name: "Tema 1", file: "musica/tema1.mpeg" },
  { name: "Tema 2", file: "musica/tema2.mpeg" },
  { name: "Tema 3", file: "musica/tema3.mpeg" },
  { name: "Tema 4", file: "musica/tema4.mpeg" },
 
];
const selector = document.getElementById("musicSelector");
const player = document.getElementById("audioPlayer");

songs.forEach((song, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = song.name;
  selector.appendChild(option);
});
function changeMusic() {
  const index = selector.value;
  player.src = songs[index].file;
  player.play();
}
changeMusic();

document.getElementById('initialBalance').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    setBalance();
  }
});

document.getElementById('expenseName').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addExpense();
  }
});

document.getElementById('expenseAmount').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation(); // Evita que el evento afecte a otros elementos
    addExpense();
  }
});