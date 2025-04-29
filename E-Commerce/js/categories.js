document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category");
    const booksContainer = document.querySelector(".book-container");

    const fetchBooksByCategory = new BookAPI();

    const firstInitialization = async () => {
        booksContainer.innerHTML = "";
        for (const category of categories) {
          if (category.classList.contains("selected")) {
            const categoryId = category.id;
            const books = await fetchBooksByCategory.fetchBookBySubject(categoryId);  
            displayBooks(books, category);
          }
        }
    }

   const run = () => {
        categories.forEach((category) => {
            category.addEventListener("click", async (e) => {
                const categoryId = e.target.id
                const books = await fetchBooksByCategory.fetchBookBySubject(categoryId);  
                window.scrollTo(0, 0);
                displayBooks(books,category);
            });
        });
    };

    const displayBooks = (books,e) => {
        booksContainer.innerHTML = "";
        if(!e.classList.contains("selected")){
            categories.forEach((category) => {
                category.classList.remove("selected");
            });
            e.classList.add("selected");
        }
        books.forEach((book) => {
                const bookDiv = document.createElement("div");
                bookDiv.classList.add("book");
                
                const a= document.createElement("a");
                a.href = `book.html?id=${book.id}`;
    
                const img  = document.createElement("img");
                if(book.volumeInfo.imageLinks){
                    img.src = book.volumeInfo.imageLinks.extraLarge || book.volumeInfo.imageLinks.large || book.volumeInfo.imageLinks.medium || book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail;
            } else {
                img.src = "../src/images/logos/logo.jpg";
            }
    
                const title = document.createElement("h3");
                title.textContent = book.volumeInfo.title;
                if(book.volumeInfo.title.length > 20){
                    title.textContent = book.volumeInfo.title.substring(0, 20) + "...";
                }
    
                const author = document.createElement("h1");
                if(book.volumeInfo.authors){
                    author.textContent = book.volumeInfo.authors[0];
                }
                else{
                    author.textContent = title.textContent;
                }
                    
                const publisher = document.createElement("p");
                publisher.classList.add("publisher");
                publisher.textContent = book.volumeInfo.publisher || author.textContent;
    
                const button = document.createElement("button");
                button.classList.add("purchase");
    
                const price = document.createElement("span");
                price.classList.add("price");
                price.textContent = book.saleInfo.listPrice ? book.saleInfo.listPrice.amount + " " + book.saleInfo.listPrice.currencyCode : "Ücretsiz";
    
                const toCart = document.createElement("span");
                toCart.classList.add("to-cart");
                toCart.textContent = "Sepete Ekle";
    
                bookDiv.appendChild(a);
                a.appendChild(img);
                bookDiv.appendChild(title);
                bookDiv.appendChild(author);
                bookDiv.appendChild(publisher);
                button.appendChild(price);
                button.appendChild(toCart);
                bookDiv.appendChild(button);
                booksContainer.appendChild(bookDiv);
            

        });
    }

    firstInitialization();
    run(); 

        


});
