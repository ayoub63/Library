const myLibrary = [];

class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function createCard(book) {
  const container = document.getElementById("book-container");
  const card = document.createElement("div");
  card.classList.add("book-card");

  const read_button = document.createElement("button");
  const remove_button = document.createElement("button");

  read_button.textContent = "READ";
  read_button.addEventListener("click", () => {
    book.toggleReadStatus();
    read_button.textContent = book.read ? "READ" : "UNREAD";
  });
  remove_button.textContent = "REMOVE";

  remove_button.addEventListener("click", () => {
    removeBook(book);
    displayBooks(myLibrary);
  });
  const title = document.createElement("h3");
  title.textContent = `Title: ${book.title}`;

  const authorElement = document.createElement("p");
  authorElement.textContent = `Author: ${book.author}`;

  const pagesElement = document.createElement("p");
  pagesElement.textContent = `Pages: ${book.pages}`;

  card.appendChild(title);
  card.appendChild(authorElement);
  card.appendChild(pagesElement);
  card.appendChild(read_button);
  card.appendChild(remove_button);

  container.appendChild(card);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBook() {
  const btn = document.getElementById("btn");
  const dialog = document.getElementById("myDialog");

  btn.addEventListener("click", () => {
    dialog.showModal();
  });
  const form = document.getElementById("myForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const name = formData.get("name");
    const author = formData.get("author");
    const pages = parseInt(formData.get("pages"));

    const book = new Book(name, author, pages);
    addBookToLibrary(book);

    displayBooks(myLibrary);
    dialog.close();
    form.reset();
  });
}

function displayBooks(myLibrary) {
  const container = document.getElementById("book-container");
  container.innerHTML = "";

  for (const book of myLibrary) {
    createCard(book);
    console.log(book);
  }
}

function removeBook(book) {
  const index = myLibrary.indexOf(book);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

createBook();
