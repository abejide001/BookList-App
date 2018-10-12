class Book {
    constructor(title,author,isbn) {
        return{
            title,
            author,
            isbn
        }
    }
}

class UI {
    addBook(book) {
        const row = document.createElement('tr')
        row  = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class="btn btn-danger" href="#">Clear</a></td>
        `
        document.getElementById('book-list').appendChild(row)
        
    }
    clear() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
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
    static add(book){
        const books = Store.get();

        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static fetch(book) {
        const books = Store.get()
        //loop through
        books.forEach(book => {
            const ui = new UI;
            ui.addBook(book)
        });
    }
}
document.addEventListener('DOMContentLoaded',Store.fetch)

//event listener 
document.getElementById('book-form').addEventListener('submit', load)

function load(e) {

    //get the inputs
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    
    //instantiate book
    const book = new Book(title, author, isbn)
    
    //instantiate ui 
    const ui = new UI
    
    
    //validate 
    if (title === '' || author === '' || isbn === '') {
        let head = document.createElement('h6')
        head.className = 'error'
        head.appendChild(document.createTextNode('Fields cannot be empty'))
        document.getElementById('errors').appendChild(head)
        setTimeout(function(){
            document.querySelector('h6').remove()
        },3000)
    }
    else{
    ui.addBook(book)
    Store.add(book)
    let head = document.createElement('h6')
    head.className = 'success'
    head.appendChild(document.createTextNode('sucessfully updated'))
    document.getElementById('errors').appendChild(head)
    setTimeout(function(){
        document.querySelector('h6').remove()
    },2000)
    //to claer the fields
    ui.clear()
    
    }
    
    e.preventDefault()
}
//event for clear
document.getElementById('book-list').addEventListener('click', function(e){
            if(e.target.className === 'btn btn-danger') {
            e.target.parentElement.parentElement.remove()
            //create h6 element
            let head = document.createElement('h6')
    head.className = 'success'
    head.appendChild(document.createTextNode('sucessfully removed'))
    document.getElementById('errors').appendChild(head)
    setTimeout(function(){
        document.querySelector('h6').remove()
    },3000)
        }
    e.preventDefault()
})