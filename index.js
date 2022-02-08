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

  myLibrary.forEach((book) => {
    const bookEl = createBookElement(book);
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

function createBookElement(book) {
  const bookEl = document.createElement('div');
  bookEl.classList.add('book');

  const removeBookBtn = createRemoveBtn();
  const readBtn = createReadBtn(book.isRead);
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

function createRemoveBtn() {
  const removeBookBtn = document.createElement('button');
  removeBookBtn.textContent = '×';
  removeBookBtn.classList.add('remove-book');
  removeBookBtn.addEventListener('click', removeBook);

  return removeBookBtn;
}

function removeBook() {
  console.log('this');
}

function createReadBtn(isRead) {
  const readBookBtn = document.createElement('button');
  readBookBtn.classList.add('book-read');
  readBookBtn.textContent = isRead ? 'Unread' : 'Read';

  if (isRead) {
    readBookBtn.classList.add('unread');
  }

  return readBookBtn;
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
