// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.


document.addEventListener('DOMContentLoaded', function() {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
  
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';


todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
  });

  function addTask() {
    const text = todoInput.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    todoInput.value = '';
    updateCounterAndFilters();
  }

  function handleListClick(e) {
    const target = e.target;

    if (target.className === 'delete-btn') {
      deleteTask(target.parentNode);        // delete button -> its <li>
    } else if (target.className === 'item-text') {
      toggleTask(target.parentNode);        // text span -> its <li>
    } else if (target.parentNode === todoList) {
      toggleTask(target);                   // click on the <li> itself
    }
  }

  todoList.addEventListener('click', handleListClick);

  function deleteTask(li) {
    todoList.removeChild(li);
    updateCounterAndFilters();
  }

  function toggleTask(li) {
    li.classList.toggle('completed');
    updateCounterAndFilters();
  }

  filterAll.addEventListener('click', function() {
    setFilter('all', filterAll);
  });

  filterActive.addEventListener('click', function() {
    setFilter('active', filterActive);
  });

  filterDone.addEventListener('click', function() {
    setFilter('done', filterDone);
  });

  function setFilter(filterType, activeBtn) {
    currentFilter = filterType;
    
    filterAll.classList.remove('active');
    filterActive.classList.remove('active');
    filterDone.classList.remove('active');
    activeBtn.classList.add('active');

    applyFilter();
  }

  function applyFilter() {
    const items = todoList.querySelectorAll('li');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isCompleted = item.className === 'completed';

      if (currentFilter === 'all') {
        item.style.display = '';
      } else if (currentFilter === 'active') {
        if (isCompleted) {
          item.style.display = 'none';
        } else {
          item.style.display = '';
        }
      } else if (currentFilter === 'done') {
        if (isCompleted) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      }
    }
  }

  function updateCounterAndFilters() {
    const items = todoList.querySelectorAll('li');
    let activeCount = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].className !== 'completed') {
        activeCount++;
      }
    }

    counter.textContent = activeCount + ' item(s) left';
    applyFilter();
  }

  updateCounterAndFilters();
  
  });