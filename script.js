const myLibrary = [];
const addBookBtn = document.getElementById("add-book");


function Book(title, author, year, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = read;
}

function displayBooks(array) {
    const booksDiv = document.querySelector(".books");
    booksDiv.innerHTML = (array.length < 1) ? 
                        `<p>No books in your Library!</p>` 
                        : `${array.map((book => {
                            return `
                                <div class="book">
                                    <h3>${book.title}</h3>
                                    <p>Author: ${book.author}</p>
                                    <p>Year: ${book.year}</p>
                                    <p>Pages: ${book.pages}</p>
                                    <button class="toggle-btn" data-id="${book.id}">${book.read ? `Read` : `Not Read`}</button>

                                    <div class="actions">
                                        <button class="edit-btn" data-id="${book.id}"><i class="fa-solid fa-pencil"></i></button> 
                                        <button class="delete-btn" data-id="${book.id}"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                            `
                        }))}`
    const editBtn = document.querySelectorAll(".edit-btn");
    editBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id
            const index = myLibrary.findIndex(book => book.id === id)
            editBook(myLibrary[index]);

        })
    })

    Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

    const toggleBtn = document.querySelectorAll(".toggle-btn")
    toggleBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const index = myLibrary.findIndex(btn => btn.id === id);
            const clickedBook = myLibrary[index];
            clickedBook.toggleRead();
            displayBooks(myLibrary)
        })
    })

        function deleteBook(array, bookIndex) {
        array.splice(bookIndex)
    }

        const deleteBtn = document.querySelectorAll(".delete-btn")
        deleteBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id
                const index = myLibrary.findIndex(book => book.id === id);
                deleteBook(myLibrary, myLibrary[index]);
                displayBooks(myLibrary)
            })
        })

    function editBook(bookIndex) {
        const addBookForm = document.createElement("div")
    addBookForm.id = "bookFormContainer"
    addBookForm.innerHTML = `
        <form id="bookForm">
            <h3>Edit book info</h3>
            <label>
            Title:
            <input type="text" name="title" value="${bookIndex.title}" required>
            </label>
            <label>
            Author:
            <input type="text" name="author" value="${bookIndex.author}"required>
            </label>
            <label>
            Year:
            <input type="number" name="year" value="${bookIndex.year}" required>
            </label>
            <label>
            Pages:
            <input type="number" name="pages" value="${bookIndex.pages}" required>
            </label>
            <label>
            Read:
            <select name="read">
                <option value="not read">Not Read</option>
                <option value="read">Read</option>
            </select>
            </label>
            <div class="form-actions">
            <button type="submit" id="confirmEditBtn">Confirm</button>
            <button type="button" id="cancelForm">Cancel</button>
            </div>
        </form>
    `

    const main = document.querySelector(".main")

    main.appendChild(addBookForm);

    const cancelFormBtn = document.getElementById("cancelForm");
    cancelFormBtn.addEventListener("click", () => {
        main.removeChild(addBookForm)
    })

    const confirmEditBtn = document.getElementById("confirmEditBtn");
    confirmEditBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const form = document.getElementById("bookForm")
        bookIndex.title = form.title.value;
        bookIndex.author = form.author.value;
        bookIndex.year = form.year.value;
        bookIndex.pages = form.pages.value;
        main.removeChild(addBookForm)
        displayBooks(myLibrary)
    })
}

    }

function displayForm() {
    const addBookForm = document.createElement("div")
    addBookForm.id = "bookFormContainer"
    addBookForm.innerHTML = `
        <form id="bookForm">
            <h3>Add a New Book</h3>
            <label>
            Title:
            <input type="text" name="title" required>
            </label>
            <label>
            Author:
            <input type="text" name="author" required>
            </label>
            <label>
            Year:
            <input type="number" name="year" required>
            </label>
            <label>
            Pages:
            <input type="number" name="pages" required>
            </label>
            <label>
            Read:
            <select name="read">
                <option value="not read">Not Read</option>
                <option value="read">Read</option>
            </select>
            </label>
            <div class="form-actions">
            <button type="submit" id="submitFormBtn">Add Book</button>
            <button type="button" id="cancelForm">Cancel</button>
            </div>
        </form>
    `

    const main = document.querySelector(".main")

    main.appendChild(addBookForm);

    const cancelFormBtn = document.getElementById("cancelForm");
    cancelFormBtn.addEventListener("click", () => {
        main.removeChild(addBookForm)
    })

    const submitFormBtn = document.getElementById("submitFormBtn")
    submitFormBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const form = document.getElementById("bookForm")
        const titleValue = form.title.value;
        const authorValue = form.author.value;
        const yearValue = form.year.value;
        const pagesValue = form.pages.value;
        const readValue = form.read.value

        const isRead = readValue === "read";

        addBookToLibrary(titleValue, authorValue, yearValue, pagesValue, isRead)
        main.removeChild(addBookForm)
        displayBooks(myLibrary)
    })
}


addBookBtn.addEventListener("click", () => {
    displayForm()
})


function addBookToLibrary(title, author, year, pages, isRead) {

  const newBook = new Book(title, author, year, pages, isRead)

  myLibrary.push(newBook);

  displayBooks(myLibrary)

}
