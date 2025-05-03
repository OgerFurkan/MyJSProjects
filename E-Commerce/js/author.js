document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const authorId = urlParams.get('id');

    const authorGetBooks = new BookAPI();

    const img = document.querySelector(".author-image img");
    const name = document.querySelector(".author-name");
    const birthdate = document.querySelector(".author-birth-date");
    const description = document.querySelector(".author-description");
    const authorBooks = document.querySelector(".author-books");


    async function getAuthor(authorId) {
        let author = {};
        const response = await fetch("../src/authors-info/author.json");
        const data = await response.json();
        const authors = data.authors;
        authors.forEach((authorData) => {
            if (authorData.id == authorId) {
                author = authorData;
            }
        });
        return author
    }    

    async function displayAuthor() {
        const author = await getAuthor(authorId);
        img.src = author.image;
        name.textContent = author.name;
        birthdate.textContent = author.birthDate + "-" + author.deathDate;
        description.textContent = author.bio;
        document.title = author.name + " - Kitap Kurdu";
        author.books.forEach(async (bookId) => {
            const book =  await authorGetBooks.fetchBookByID(bookId);
            const authorBook = document.createElement("div");
            authorBook.classList.add("author-book");
            authorBook.setAttribute("data-id", book.id);

            const a = document.createElement("a");
            a.href = `book.html?id=${book.id}`;

            const img = document.createElement("img");
            let url = book.volumeInfo.imageLinks.extraLarge || book.volumeInfo.imageLinks.large || book.volumeInfo.imageLinks.medium || book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail;

            img.src = url.replace(/^http:\/\//i, "https://"); 

            const bookTitle = document.createElement("h3");
            bookTitle.textContent = book.volumeInfo.title;

            const bookAuthor = document.createElement("h1");
            bookAuthor.textContent = book.volumeInfo.authors[0];

            const bookPublisher = document.createElement("p");
            bookPublisher.textContent = book.volumeInfo.publisher;

            const button = document.createElement("button");
            button.classList.add("purchase");

            const price = document.createElement("span");
            price.classList.add("price");
            price.textContent = book.saleInfo.listPrice ? book.saleInfo.listPrice.amount + " " + book.saleInfo.listPrice.currencyCode : "Ücretsiz";

            const toCart = document.createElement("span");
            toCart.classList.add("to-cart");
            toCart.textContent = "Sepete Ekle";

            authorBook.appendChild(a);
            a.appendChild(img);
            authorBook.appendChild(bookTitle);
            authorBook.appendChild(bookAuthor);
            authorBook.appendChild(bookPublisher);
            authorBook.appendChild(button);
            button.appendChild(price);
            button.appendChild(toCart);
            authorBooks.appendChild(authorBook);
        });
    }
    displayAuthor();
});


