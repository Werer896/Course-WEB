// Перемикання теми
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  if (toggleBtn) toggleBtn.textContent = '☀️ Світла тема';
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    toggleBtn.textContent = isDark ? '☀️ Світла тема' : '🌙 Темна тема';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Показати секцію
function showSection(id) {
  document.querySelectorAll('.section').forEach(div => {
    div.style.display = 'none';
  });
  const section = document.getElementById(id);
  if (section) {
    section.style.display = 'block';
  } else {
    console.warn("Секцію не знайдено: " + id);
  }
}

// Після завантаження сторінки
window.addEventListener('load', async () => {
  showSection('addBook');

  // Завантажити всі книги
  try {
    const response = await fetch('/api/books');
    const books = await response.json();
    const container = document.getElementById("bookList");

    if (container && books.length) {
      books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book";
        div.innerHTML = `
          <h3>${book.title}</h3>
          <p>Автор: ${book.author}</p>
          <p class="status ${book.available ? 'available' : 'unavailable'}">
            ${book.available ? '📗 Присутня' : '📕 Відсутня'}
          </p>
        `;
        container.appendChild(div);
      });
    }
  } catch (e) {
    console.error("Помилка завантаження книг:", e);
  }

  // Популярні книги
  try {
    const response = await fetch('/api/popular-books');
    const books = await response.json();
    const container = document.getElementById('popular-books');

    if (container && books.length) {
      books.forEach(book => {
        container.innerHTML += `
          <div class="book">
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Автор: ${book.author}</p>
            <button>Читати</button>
          </div>
        `;
      });
    }
  } catch (e) {
    console.error("Помилка завантаження популярних книг:", e);
  }
});

// Вхід/реєстрація
function showForm(formType) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  if (formType === "login") {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
  }
}

// Редагування профілю
function enableEdit() {
  document.getElementById("name").disabled = false;
  document.getElementById("surname").disabled = false;
  document.getElementById("nickname").disabled = false;
  document.getElementById("email").disabled = false;
  document.getElementById("saveBtn").style.display = "inline-block";
}

function saveChanges() {
  document.getElementById("name").disabled = true;
  document.getElementById("surname").disabled = true;
  document.getElementById("nickname").disabled = true;
  document.getElementById("email").disabled = true;
  document.getElementById("saveBtn").style.display = "none";
  alert("Зміни збережено!");
}

// Додавання книги до списку читання
const form = document.getElementById('reading-form');
const list = document.getElementById('reading-list');

if (form && list) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;

    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${title}</strong>${author ? ' — ' + author : ''}</span>
      <button class="remove-btn">✖</button>
    `;
    li.querySelector('.remove-btn').onclick = () => li.remove();
    list.appendChild(li);
    form.reset();
  });
}

// Пошук
const searchForm = document.querySelector('.search-form');
if (searchForm) {
  searchForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = this.query.value;
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const books = await response.json();

      const resultsContainer = document.querySelector('.books-grid');
      if (resultsContainer) {
        resultsContainer.innerHTML = '';
        books.forEach(book => {
          resultsContainer.innerHTML += `
            <div class="book">
              <img src="${book.image}" alt="${book.title}">
              <h3>${book.title}</h3>
              <p>Автор: ${book.author}</p>
              <button>Читати</button>
            </div>
          `;
        });
      }
    } catch (error) {
      console.error("Помилка пошуку:", error);
    }
  });
}
