const API = 'http://localhost:5000/api';
let token = '';

const register = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  alert(data.message || data.error || 'Registered!');
};

const login = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById('auth').classList.add('hidden');
    document.getElementById('todo-app').classList.remove('hidden');
    document.querySelector('.logout-btn').classList.remove('hidden');
    loadTodos();
  } else {
    alert(data.error || 'Login failed');
  }
};

const loadTodos = async () => {
  const res = await fetch(`${API}/todos`, {
    headers: { Authorization: token },
  });
  const todos = await res.json();

  const list = document.getElementById('todo-list');
  const completedList = document.getElementById('completed-list');
  list.innerHTML = '';
  completedList.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.textContent = todo.title;
    li.className = todo.completed ? 'completed' : '';
    li.onclick = () => toggleTodo(todo.id, !todo.completed);

    if (!todo.completed) {
      const del = document.createElement('button');
      del.textContent = '✖';
      del.className = 'delete-btn';
      del.onclick = (e) => {
        e.stopPropagation();
        deleteTodo(todo.id);
      };
      li.appendChild(del);
      list.appendChild(li);
    } else {
      completedList.appendChild(li);
    }
  });
};

const addTodo = async () => {
  const title = document.getElementById('new-todo').value;
  if (!title) return;

  await fetch(`${API}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ title }),
  });

  document.getElementById('new-todo').value = '';
  loadTodos();
};

const toggleTodo = async (id, completed) => {
  await fetch(`${API}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ completed }),
  });
  loadTodos();
};

const deleteTodo = async (id) => {
  await fetch(`${API}/todos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });
  loadTodos();
};

const logout = () => {
  token = '';
  document.getElementById('auth').classList.remove('hidden');
  document.getElementById('todo-app').classList.add('hidden');
  document.querySelector('.logout-btn').classList.add('hidden');
  document.getElementById('todo-list').innerHTML = '';
  document.getElementById('completed-list').innerHTML = '';
};
