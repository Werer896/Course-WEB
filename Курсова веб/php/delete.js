 <script>
        
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Завантажити збережену тему
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    toggleBtn.textContent = '☀️ Світла тема';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    toggleBtn.textContent = isDark ? '☀️ Світла тема' : '🌙 Темна тема';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });


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

        
        window.onload = () => showSection('addBook');
  
  
  
  
        </script>
    <script>
     fetch('/api/books') // Запит до бекенду
    .then(response => response.json())
    .then(books => {
      const container = document.getElementById("bookList");

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
    });
</script>



<script>
  window.onload = async () => {
    const response = await fetch('/api/popular-books'); // шлях до бекенду
    const books = await response.json();

    const container = document.getElementById('popular-books');

    books.forEach(book => {
      const bookHTML = `
        <div class="book">
          <img src="${book.image}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>Автор: ${book.author}</p>
          <button>Читати</button>
        </div>
      `;
      container.innerHTML += bookHTML;
    });
  };
</script>




<script>
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
  </script>




   <script>
 function enableEdit() {
  // Увімкнути редагування полів
  document.getElementById("name").disabled = false;
  document.getElementById("surname").disabled = false;
  document.getElementById("nickname").disabled = false;
  document.getElementById("email").disabled = false;

  // Показати кнопку "Зберегти"
  document.getElementById("saveBtn").style.display = "inline-block";
}

function saveChanges() {
  // Заблокувати поля для редагування
  document.getElementById("name").disabled = true;
  document.getElementById("surname").disabled = true;
  document.getElementById("nickname").disabled = true;
  document.getElementById("email").disabled = true;

  // Приховати кнопку "Зберегти"
  document.getElementById("saveBtn").style.display = "none";

  // Можеш тут додати логіку збереження (у локальне сховище, або на сервер)
  alert("Зміни збережено!");
}
    const form = document.getElementById('reading-form');
    const list = document.getElementById('reading-list');

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
  </script>





  <script>
    document.querySelector('.search-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const query = this.query.value;
  const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  const books = await response.json();

  const resultsContainer = document.querySelector('.books-grid');
  resultsContainer.innerHTML = ''; // Очищаємо старі результати

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
});

</script>