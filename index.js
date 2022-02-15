let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = +pages;
  this.isRead = false;
}

Book.prototype.read = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showBooks() {
  resetLibrayDom();

  myLibrary.forEach((book, i) => {
    const bookEl = createBookElement(book, i);
    addButton.insertAdjacentElement('beforebegin', bookEl);
  });
}

function showModal() {
  modal.style.visibility = 'visible';
}

function closeModal() {
  modal.style.visibility = 'hidden';
}

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { title, author, pages } = Object.fromEntries(formData);

  const newBook = new Book(title, author, pages);
  addBookToLibrary(newBook);

  this.reset();
  closeModal();

  showBooks();
}

function resetLibrayDom() {
  const bookElements = document.querySelectorAll('.book');
  bookElements.forEach((book) => book.remove());
}

function createBookElement(book, i) {
  const bookEl = document.createElement('div');
  bookEl.classList.add('book');

  const removeBookBtn = createRemoveBtn(i);
  const readBtn = createReadBtn(book.isRead, i);
  const bookInfoDiv = document.createElement('div');
  bookInfoDiv.classList.add('book-info');
  bookInfoDiv.innerHTML = `
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="book-pages">${book.pages} pages</p>
  `;

  bookEl.appendChild(removeBookBtn);
  bookEl.appendChild(bookInfoDiv);
  bookEl.appendChild(readBtn);

  return bookEl;
}

function createRemoveBtn(key) {
  const removeBookBtn = document.createElement('button');
  removeBookBtn.setAttribute('data-key', key);
  removeBookBtn.classList.add('remove-book');

  const removeIcon = document.createElement('span');
  removeIcon.classList.add('material-icons-outlined');
  removeIcon.textContent = 'close';

  removeBookBtn.appendChild(removeIcon);

  removeBookBtn.addEventListener('click', removeBook);

  return removeBookBtn;
}

function removeBook() {
  const { key } = this.dataset;

  myLibrary = myLibrary.filter((_, i) => +key !== i);
  showBooks();
}

function createReadBtn(isRead, key) {
  const readBookBtn = document.createElement('button');
  readBookBtn.classList.add('book-read');
  readBookBtn.setAttribute('data-key', key);
  updateReadBtn(readBookBtn, isRead);

  readBookBtn.addEventListener('click', toggleRead);

  return readBookBtn;
}

function toggleRead() {
  const key = +this.dataset.key;
  const selectedBook = myLibrary[key];

  selectedBook.read();
  updateReadBtn(this, selectedBook.isRead);
}

function updateReadBtn(btn, isRead) {
  if (isRead) {
    btn.textContent = 'Unread';
    btn.classList.add('unread');
  } else {
    btn.textContent = 'Read';
    btn.classList.remove('unread');
  }
}

const booksContainer = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const modal = document.querySelector('.modal');
const addBookForm = document.querySelector('.add-form');
const addButton = document.querySelector('.add-book');
const addButtonForm = document.querySelector('.form-add-book');
const cancelButtonForm = document.querySelector('.close-modal');

addButton.addEventListener('click', showModal);
addBookForm.addEventListener('submit', handleSubmit);
cancelButtonForm.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target !== modal) return;
  closeModal();
});

// Books for testing
const book1 = new Book(
  'The Hobbit, or There and Back Again',
  'J.R.R. Tolkien',
  366
);
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 281);
book2.read();

addBookToLibrary(book1);
addBookToLibrary(book2);
showBooks();
