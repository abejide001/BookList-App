//create the book constructor
function Book(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn= isbn;
}
//UI constructor
let selectors = {
    title : 'title',
    author: 'author',
    isbn: 'isbn'
}
function UI(){}

UI.prototype.addBook = function(book) {
    let list = document.createElement('tr');
    list.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `
    document.getElementById('book-list').appendChild(list);
}
UI.prototype.clear = function() {
    document.getElementById(selectors.title).value = ''
    document.getElementById(selectors.author).value = ''
    document.getElementById(selectors.isbn).value = ''
}
UI.prototype.showAlert = function(message, className) {
    //create a div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    //addtext
    div.appendChild(document.createTextNode(message));
    //insert into the dom
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)
    //set the timeout
    setTimeout(function(){
            div.remove();
    }, 1000)
}
UI.prototype.delete = function(target) {
    if (target.className == 'delete') {
            target.parentElement.parentElement.remove()
    }
}
//local storage class
class Store {
    static get() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        }
        else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static display() {
        const books = Store.get()

        books.forEach(book=> {
            const ui = new UI();

            //add to UI
            ui.addBook(book)
        });
    }
    static add(book) {
        const books = Store.get()

        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static remove(isbn) {
        const books = Store.get()
        books.forEach((book, index)=> {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
}
//load listen
loadEvents()
    function loadEvents() {
        document.addEventListener('DOMContentLoaded', Store.display);
        document.getElementById('book-form').addEventListener('submit', load);
        document.getElementById('book-list').addEventListener('click', deleteListener);
    }
//DOM Loa


function load(e) {
    const title = document.getElementById(selectors.title).value,
            author = document.getElementById(selectors.author).value,
            isbn = document.getElementById(selectors.isbn).value;

            //instantiate the Book constructor
            const book = new Book(title, author, isbn)
            const ui = new UI();
            //validate form 
            if (title == '' || author == '' || isbn == '') {
                //show laert
                ui.showAlert('please fill in all fields', 'error')
            }
            else {
                ui.addBook(book)
                //add to LS
                Store.add(book)
                //clear fields
                ui.clear()
                //show alert
                ui.showAlert('Book added', 'success')
            }
            
    e.preventDefault()
}
//delete listener
function deleteListener(){
    const ui = new UI();
    ui.delete(e.target);
    //remove from LS
    Store.remove(e.target.parentElement.previousElementSibling.textContent);
    //show alert
    ui.showAlert('Book deleted', 'success');
    e.preventDefault()
}

