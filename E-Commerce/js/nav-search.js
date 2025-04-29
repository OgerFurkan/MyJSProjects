document.addEventListener("DOMContentLoaded", function () {
const getBooks = new BookAPI();
const searchInput = document.querySelector("#search-input");
const searchIcon = document.querySelector(".fa-magnifying-glass");
const searchResult = document.querySelector(".search-result");
const bookLink = document.querySelector(".bookLink");

function run() {
    searchInput.addEventListener("input", handleDisplay);

    searchIcon.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            DisplayBooks();
        }
    });

    searchIcon.addEventListener("click", DisplayBooks);

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchResult.contains(e.target)) {
            searchResult.style.display = "none";
        }
    });

    searchInput.addEventListener("focus", () => {
        if (searchInput.value.trim() !== "") {
            searchResult.style.display = "flex";
        }
    });
}

async function handleDisplay() {
    if (searchInput.value.trim() !== "") {
        await DisplayBooks();
        searchResult.style.display = "flex";
    } else {
        searchResult.innerHTML = "";
        searchResult.style.display = "none";
    }
}

let searchCounter = 0;
async function DisplayBooks() { 
    const query= searchInput.value.trim();

    if (!query){
        searchResult.innerHTML = "";
        searchResult.style.display = "none";
        return;
    }
    const currentSearch = ++searchCounter;
    searchResult.innerHTML = "";
    const books = await getBooks.fetchBooks(query);

    if (currentSearch !== searchCounter) return;

    books.forEach((book)=> {
            const searchItem = document.createElement("div");
            searchItem.classList.add("search-item");
        
            const a = document.createElement("a");
            a.href= "book.html?id=" + book.id;
        
            const img = document.createElement("img");
            if (book.volumeInfo.imageLinks) {
                img.src = book.volumeInfo.imageLinks.thumbnail;
            } else {
                img.src = "../src/images/logos/logo.jpg";
            }

            const infoContainer = document.createElement("div");
            infoContainer.classList.add("info-container");
        
            const bookTitle = document.createElement("p");
            bookTitle.classList.add("book-name");
            if(book.volumeInfo.title.length > 30) {
                bookTitle.textContent = book.volumeInfo.title.slice(0, 30) + "...";
            }
            else {
                bookTitle.textContent = book.volumeInfo.title.trim();
            }

            const bookAuthor = document.createElement("p");
            bookAuthor.classList.add("book-author");
            if (book.volumeInfo.authors) {
                bookAuthor.textContent = book.volumeInfo.authors[0].trim();
            }
            else {
                bookAuthor.style.color = "red";
                bookAuthor.textContent = "Yazar Bilgisi Yok";
            }

            const bookPublisher = document.createElement("p");
            bookPublisher.classList.add("book-publisher");
            if (book.volumeInfo.publisher) {
                bookPublisher.textContent = book.volumeInfo.publisher.trim();
            } else {
                bookPublisher.style.color = "red";
                bookPublisher.textContent = "Yayınevi Bilgisi Yok";
            }


        
            const hr = document.createElement("hr");
        
            searchResult.appendChild(searchItem);
            searchItem.appendChild(a);
            a.appendChild(img);
            a.appendChild(infoContainer);
            infoContainer.appendChild(bookTitle);
            infoContainer.appendChild(bookAuthor);
            infoContainer.appendChild(bookPublisher);
            searchItem.appendChild(hr);
        });  
        searchResult.style.display = "flex";
};

const links = document.querySelectorAll(".nav-bottom a");
const currentUrl = window.location.href;
links.forEach((link) => {
    if (link.href === currentUrl) {
        link.classList.add("active");
    }
    else if (window.location.pathname.endsWith("book.html")) {
        links[2].classList.add("active");
    }
    else {
        link.classList.remove("active");
    }
});

run();
});



