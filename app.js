
const BOOKLIST = document.getElementById("bookList");

// book constructor
function Book(title, author, readStatus) {
    this.title = title;
    this.author = author;
    this.readStatus = readStatus;
}

const FORM = document.getElementById("newBookForm");
FORM.addEventListener("submit", event => handleSubmit(event));

//user clicked submit
function handleSubmit(event){
    event.preventDefault(); //stop the html request 
    let book = new Book(FORM["title"].value, FORM["author"].value, !!(FORM["readStatus"].value));
    addBookToLibraryStorage(book);
    addBookToList(book);
}


//library 
let myLibrary = [
    new Book("HP and the Sorcerer's Stone...", "J.K. Rowling", true),
    new Book("10 Minute Meetings", "Brendan Burchard", false)
  ];

//add book to user view
function addBookToList( newBook ) {
    let newBookLi = document.createElement("li");
    newBookLi.classList.add("list-item");
    let iconClass = newBook.readStatus ? 'far fa-check-circle read-status' : 'far fa-circle read-status';
    newBookLi.innerHTML = `<span class="book-text">
                            ${newBook.title} -<i>${newBook.author}</i> 
                           </span>
                           <span class="button-group" onclick="handleListElementButtonClick(event)" >
                             <i class="${iconClass}"></i>
                             <button class="remove-button" >Remove</button>
                            </span>`;
    newBookLi.setAttribute('data-index', `${myLibrary.indexOf(newBook)}`);
    BOOKLIST.appendChild(newBookLi);
}

//load list on page load
for (book of myLibrary){
    addBookToList(book);
}

//add book to library storage
function addBookToLibraryStorage(book) {
    myLibrary.push(book);
}



function handleListElementButtonClick(event){
    let bookToChange = event.target.parentElement.parentElement;
    if(event.target.classList.contains("read-status")){
        toggleReadIconAndStatus(bookToChange);
    } else if(event.target.classList.contains("remove-button")) {
        removeBook(bookToChange);
    }
}

function toggleReadIconAndStatus(bookToChange) {
    bookClasses = bookToChange.getElementsByClassName("read-status")[0].classList;
    bookClasses.toggle("fa-check-circle");
    bookClasses.toggle("fa-circle");
}

function removeBook(bookToChange) {
    myLibrary.splice(bookToChange.dataset.index, 1); //remove from myLibrary array
    bookToChange.remove(); //remove from DOM
}
