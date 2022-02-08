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
  myLibrary.forEach((book) => {
    const bookEl = document.createElement('div');
    bookEl.classList.add('book');
    bookEl.innerHTML = createBookMarkup(book);

    addButton.insertAdjacentElement('beforebegin', bookEl);
  });
}

function createBookElement(book) {}

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
  books.forEach((book) => book.remove());
}

const createBookMarkup = (book) => `
  <button class="remove-book">&times;</button>
  <div class="book-info">
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="book-pages">${book.pages} pages</p>
  </div>
  <button class="book-read">${book.isRead ? 'Read' : 'Unread'}</button>
`;

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
