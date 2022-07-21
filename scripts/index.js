// Capturar referência dos elementos no HTML
const saveBtn = document.querySelector('[data-save]');

const newTask = document.querySelector('[data-input]');
const addBtn = document.querySelector('[data-add-btn]');

const columns = document.querySelectorAll('[data-column]');

// adicionar evento no botão
saveBtn.addEventListener('click', saveState);

addBtn.addEventListener('click', () => {
  const inputText = newTask.value;
  createCard(inputText);
})


// criando uma afazer novo
function createCard(task, index = 0) {
  console.log('criando tarefa:', task);
  // criar div de card
  const card = document.createElement('div');
  card.className = 'card';

  // criar btn delete
  const delBtn = document.createElement('span');
  delBtn.className = 'delete-btn';
  delBtn.innerText = "X";
  delBtn.addEventListener('click', () => {
    deleteCard(card);
  })

  // criar texto
  const text = document.createElement('text');
  text.innerText = task;

  // criar botões de movimento
  const prevBtn = document.createElement('button');
  prevBtn.className = "previous-btn hidden";
  prevBtn.innerText = "<";
  prevBtn.addEventListener('click', () => {
    moveCardPrevious(card);
  })
  
  const nextBtn = document.createElement('button');
  nextBtn.className = "next-btn";
  nextBtn.innerText = ">";
  nextBtn.addEventListener('click', () => {
    moveCardNext(card);
  })

  // adicionar elementos dentro do card
  card.append(delBtn, text, prevBtn, nextBtn);

  // adiciona o card na coluna de "à fazer"
  columns[index].appendChild(card);

  // limpa o input
  newTask.value = '';
}

// função de mover card adiante
function moveCardNext(card) {
  const currentColumn = card.parentNode;
  const columnIndex = parseInt(currentColumn.getAttribute('data-column'));
  if (columnIndex < 2) {
    columns[columnIndex + 1].appendChild(card);
    const prevBtn = card.querySelector('.previous-btn');
    prevBtn.classList.remove('hidden');
    // prevBtn.className = 'previous-btn';
    if (columnIndex + 1 === 2) {
      const nextBtn = card.querySelector('.next-btn');
      nextBtn.classList.add('hidden');
    }
  }
}

function moveCardPrevious(card) {
  const currentColumn = card.parentNode;
  const columnIndex = parseInt(currentColumn.getAttribute('data-column'));
  if (columnIndex > 0) {
    columns[columnIndex - 1].appendChild(card);
    const nextBtn = card.querySelector('.next-btn');
    nextBtn.classList.remove('hidden');
    // prevBtn.className = 'previous-btn';
    if (columnIndex - 1 === 0) {
      const previousBtn = card.querySelector('.previous-btn');
      previousBtn.classList.add('hidden');
    }
  }
}

// função de deletar afazer
function deleteCard (card) {
  const parentElement = card.parentNode;
  parentElement.removeChild(card);
}

// função para salvar o estado das tarefas
// não funcionou como queríamos! Mas fica o exemplo de localStorage!
function saveState() {
  const columnTodo = [...columns[0].querySelectorAll('.card')];
  const columnDoing = [...columns[1].querySelectorAll('.card')];
  const columnDone = [...columns[2].querySelectorAll('.card')];
  localStorage.setItem('todo', JSON.stringify(columnTodo));
  localStorage.setItem('doing', JSON.stringify(columnDoing));
  localStorage.setItem('done', JSON.stringify(columnDone));
}

function loadState() {
  const columnTodo = localStorage.getItem('todo');
  const columnDoing = localStorage.getItem('doing');
  const columnDone = localStorage.getItem('done');
  console.log(columnTodo);
}

loadState();