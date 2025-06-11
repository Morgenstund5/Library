const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook)
} 

const submitBtn = document.getElementById("submit")

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    let author = document.getElementById("author").value.trim();
    let title = document.getElementById("title").value.trim();
    let pages = document.getElementById("pages").value.trim();
    const readValue = document.querySelector('input[name="read-status"]:checked').value;

    if (!author || !title || !pages || !readInput) {
        alert("Please fill in all fields before submitting.");
        return; // Stop execution if validation fails
    }

    const isRead = readValue === "yes";

    addBookToLibrary(title, author, pages, isRead);

    display()

})

const addBookBtn = document.getElementById("add-book")

addBookBtn.addEventListener("click", (event) => {
    const hidden = document.getElementById("hidden")
    hidden.style.display = "flex"
})

const hiddenDiv = document.getElementById("hidden")

hiddenDiv.addEventListener("click", () => {
    hiddenDiv.style.display = "none"
})

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const display = () => {
    let booksContainer = document.getElementById("books-container");
    booksContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        let div = document.createElement("div")
        div.classList.add("book-div")

        div.innerHTML = `<ul class="book-items">
                        <li>
                            <h3>${book.title}</h3>
                        </li>
                        <li>${book.author}</li>
                        <li>${book.pages} pages</li>
                    </ul>
                    <button class=${book.read ? "read-btn" : "not-read-btn"} data-id="${book.id}">${book.read ? "Read" : "Not Read"}</button>
                    <button class="remove-btn" data-id="${book.id}">Remove</button>`


        booksContainer.appendChild(div)

        document.getElementById("author").value = ""
        document.getElementById("title").value = ""
        document.getElementById("pages").value = ""
    })

    const readButtons = document.querySelectorAll(".read-btn");

    readButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const book = myLibrary.find((b) => b.id === id);
            if(book) {
                book.toggleRead();
            }
            display();  
        })
    })

    const noReadButtons = document.querySelectorAll(".not-read-btn");

    noReadButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const book = myLibrary.find((b) => b.id === id);
            if(book) {
                book.toggleRead();
            }
            display();  
        })
    })

    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const index = myLibrary.findIndex(book => book.id === id);
            if(index !== -1) {
                myLibrary.splice(index, 1)
            }
            display();
        })
    })
    
    const hidden = document.getElementById("hidden")
    hidden.style.display = "none"
}



/*
    <div class="books-container">
                <div class="book-div">
                    <ul class="book-items">
                        <li>
                            <h3>Title</h3>
                        </li>
                        <li>Author</li>
                        <li># pages</li>
                    </ul>
                    <button class="read-btn">Read</button>
                    <button class="remove-btn">Remove</button>
                </div>
            </div> */
