
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
            window.scrollTo(0, 0);
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
                 checkbookInCart();
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
                bookDiv.setAttribute("data-id", book.id);
                const a= document.createElement("a");
                a.href = `book.html?id=${book.id}`;
    
                const img  = document.createElement("img");
                if(book.volumeInfo.imageLinks){
                    let url = book.volumeInfo.imageLinks.extraLarge || book.volumeInfo.imageLinks.large || book.volumeInfo.imageLinks.medium || book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail;

                    img.src = url.replace(/^http:\/\//i, "https://"); 
            } else {
                img.src = "./src/images/logos/logo.jpg";
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
               
                const toCart = document.createElement("span");
                toCart.classList.add("to-cart");
                toCart.textContent = "Sepete Ekle";

                 if (book.saleInfo.listPrice) {
                        price.textContent = book.saleInfo.listPrice.amount + " " + book.saleInfo.listPrice.currencyCode;
                    } else if (book.saleInfo.saleability === "FREE") {
                        price.textContent = "Ücretsiz";    
                    } else {
                        price.textContent = "Stokta Yok";
                        button.style.backgroundColor = "red";
                        button.style.color = "white";
                        bookDiv.style.cursor = "not-allowed";
                        button.style.pointerEvents = "none";
                        button.style.opacity = "0.5";
                    }   
        
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
