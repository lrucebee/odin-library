let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

Book.prototype.read = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showModal() {
  modal.style.visibility = 'visible';
}

function closeModal() {
  modal.style.visibility = 'hidden';
}

const addButton = document.querySelector('.add-book');
const modal = document.querySelector('.modal');
const addButtonForm = document.querySelector('.form-add-book');
const cancelButtonForm = document.querySelector('.close-modal');

addButton.addEventListener('click', showModal);
addButtonForm.addEventListener('click', (e) => {
  e.preventDefault();
});
cancelButtonForm.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target !== modal) return;
  closeModal();
});
