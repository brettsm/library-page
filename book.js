let index = 0;


function Book(title, author) {
    //constructor
    this.index = index++;
    this.title = title;
    this.author = author;
    this.read_status = false;

}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary(lib) {
    document.getElementById('card-container').innerHTML = '';

    for (let item of lib) {
        createCard(item);
        console.log(item.author);
    }
}

function createCard(item) {
    const card = document.createElement('div');

    card.className = 'card';
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = item.title;
    card.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = item.author;
    card.appendChild(bookAuthor);

    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.classList.add('card-remove-button');
    button.id = 'removeButton' + item.index;//need to fix this
    button.addEventListener('click', () => {
        removeCard(item.index)
    });
    card.appendChild(button);

    const readButton = document.createElement('button');
    readButton.textContent = 'Read';
    readButton.classList.add('card-read-button');
    readButton.id = 'readButton' + item.index;
    readButton.addEventListener('click', () => {
        toggleRead(item.index);
    });
    card.appendChild(readButton);

    const readStatus = document.createElement('p');
    readStatus.textContent = getReadStatus(item.index);
    card.appendChild(readStatus);
    document.getElementById('card-container').appendChild(card);

}

function openModal() {
    document.getElementById('addBookModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addBookModal').style.display = 'none';
}

function removeCard(index) {
    myLibrary.splice(index, 1);

    displayLibrary(myLibrary);
}

function getReadStatus(index) {
    if(myLibrary[index].read_status == false) {
        return 'not read';
    } else {
        return 'read';
    }
}

function toggleRead(index) {
    const book = myLibrary.find(book => book.index === index);
    if (book) {
        book.read_status = !book.read_status;
        console.log(`${book.title} toggled to ${book.read_status}`);
        displayLibrary(myLibrary); // Update the display after toggling read status
    } else {
        console.log('Book not found');
    }
}

document.getElementById('new-book-button').addEventListener('click', openModal);

document.getElementById('closeModal').addEventListener('click', closeModal);

document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const newBook = new Book(title, author);
    addBookToLibrary(newBook);
    closeModal();
    displayLibrary(myLibrary);
});

const myLibrary = [];

const gg = new Book('Great', 'Obama');
const ff = new Book('Awful', 'Trump');

addBookToLibrary(gg);
addBookToLibrary(ff);

displayLibrary(myLibrary);


