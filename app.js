//
//

// Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Constructor
function UI(params) {}

UI.prototype.addBookToList = function (book) {
  const list = document.querySelector('#book-list');
  // Create element
  const row = document.createElement('tr');
  // Insert Cols
  row.innerHTML = `
    <td>${book.title}</td> 
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete"> X</a></td>
  `;

  // Append to list
  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function (msg, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// Clear Fields
UI.prototype.clearFields = function () {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
};

// Event Listener for adding book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  // Instantiate Book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === 'a') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show alert
    ui.showAlert('Book successfully added', 'success');
    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();
  // Delete Book
  ui.deleteBook(e.target);
  // Show message
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});
