
document.addEventListener("DOMContentLoaded", function () {
    const icon = document.querySelector(".nav-right a:nth-child(3)");

    if(window.location.href.includes("cart.html")){
        icon.style.color = "black";
    }

    

    const bookApi = new BookAPI();
    const totalPrice = document.querySelector(".total-price");
    const totalValue = document.querySelector(".total");
    const mainContainer = document.querySelector(".products");
    const clearCartButton = document.querySelectorAll(".clear-cart");

    document.body.addEventListener("click", function (e) {
        let bookElement = e.target.closest(".book") || e.target.closest(".book-container") || e.target.closest(".slider-item-book") || e.target.closest(".author-book");

        if (!bookElement) return; 
        let productId = bookElement.getAttribute("data-id");

        if (!productId) return;
        

        if (e.target.closest(".add-to-cart") || e.target.closest(".purchase")) {
            let products = JSON.parse(localStorage.getItem("products")) || [];
            if (!products.includes(productId)) {
                products.push(productId);
                localStorage.setItem("products", JSON.stringify(products));
            }
            checkBookInCart();
        }
    });

    async function calculateTotalPrice() {  
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let total = 0;

         products.forEach(productId => {
            let productCount = 1;
            if (productId == 1) {
                productCount = parseInt(document.querySelector("#count").textContent);
                total += 250.00 * productCount;
                setTimeout(() => {
                    totalValue.textContent = total.toFixed(2) + " TRY";
                }
                , 500);
            }
            if (productId == 1) return;
            bookApi.fetchBookByID(productId).then(book => {
                if (book.saleInfo.saleability == "NOT_FOR_SALE") return;
                
                document.querySelectorAll(".product").forEach(product => {
                    if (product.getAttribute("data-id") === productId) {
                        productCount = parseInt(product.querySelector("#count").textContent);
                    }
                });
                if (book.saleInfo.saleability == "FREE") {
                    total += 0;
                } else {
                    const amount = book.saleInfo.listPrice.amount;
                    total += amount * productCount;
                    totalValue.textContent = total.toFixed(2) + " TRY";
                }
            });
        });
        
    }

    document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("increase-button") || e.target.classList.contains("decrease-button")) {
        let productElement = e.target.closest(".product");
        let countSpan = productElement.querySelector("#count");
        let currentCount = parseInt(countSpan.textContent);

        if (e.target.classList.contains("increase-button") && currentCount < 10) {
            currentCount++;
        } else if (e.target.classList.contains("decrease-button") && currentCount > 1) {
            currentCount--;
        }

        countSpan.textContent = currentCount;
        calculateTotalPrice();

    }
    });

   
    function displayCartItems() {
       if (localStorage.getItem("products") === null || localStorage.getItem("products") === "[]") {
            totalPrice.style.display = "none";
            mainContainer.textContent = "Sepetinizde hiç ürün yok.";
            mainContainer.style.fontSize = "2rem";
            return;
        }

        let products = JSON.parse(localStorage.getItem("products")) || [];
        let container = document.querySelector(".products");

        container.innerHTML = ""; 
        products.forEach(productId => {
            if(productId == 1){
                const product = document.createElement("div");
                product.classList.add("product");
                product.setAttribute("data-id", productId);
                const bookInfo = document.createElement("div");
                bookInfo.classList.add("book-info");

                const a = document.createElement("a");
                a.href = `book.html?id=${productId}`;

                const img = document.createElement("img");
                img.src = "../src/images/books/Gozler.png";

                const bookDetails = document.createElement("div");
                bookDetails.classList.add("book-details");

                const bookTitle = document.createElement("h1");
                bookTitle.textContent = "Gözler";
                const bookAuthor = document.createElement("h4");
                bookAuthor.classList.add("book-author");
                bookAuthor.textContent = "Berat Kaçar";

                const publisher = document.createElement("h6");
                publisher.classList.add("publisher");
                publisher.textContent = "Oger Yayınevi";

                bookInfo.appendChild(a);
                a.appendChild(img);
                bookInfo.appendChild(bookDetails);
                bookDetails.appendChild(bookTitle);
                bookDetails.appendChild(bookAuthor);
                bookDetails.appendChild(publisher);
                product.appendChild(bookInfo);
                const numberOfBooks = document.createElement("div");
                numberOfBooks.classList.add("number-of-books");
                const titleOfNumber = document.createElement("h4");
                titleOfNumber.textContent = "Adet";
                const counter = document.createElement("div");
                counter.classList.add("counter");
                const decreaseButton = document.createElement("button");
                decreaseButton.classList.add("decrease-button");
                decreaseButton.textContent = "-";
                const countSpan = document.createElement("span");
                countSpan.id = "count";
                countSpan.textContent = "1";
                const increaseButton = document.createElement("button");
                increaseButton.classList.add("increase-button");
                increaseButton.textContent = "+";
                counter.appendChild(decreaseButton);
                counter.appendChild(countSpan);
                counter.appendChild(increaseButton);
                numberOfBooks.appendChild(titleOfNumber);
                numberOfBooks.appendChild(counter);
                product.appendChild(numberOfBooks);
                const bookPrice = document.createElement("div");
                bookPrice.classList.add("book-price");
                const titleOfPrice = document.createElement("h4");
                titleOfPrice.textContent = "Fiyat";
                const price = document.createElement("h2");
                price.classList.add("price");
                price.textContent = "250.00 TRY";
                bookPrice.appendChild(titleOfPrice);
                bookPrice.appendChild(price);
                product.appendChild(bookPrice);
                const removeButton = document.createElement("i");
                removeButton.classList.add("fa-solid");
                removeButton.classList.add("fa-xmark");
                product.appendChild(removeButton);
                container.appendChild(product);
                return;
            }
            bookApi.fetchBookByID(productId).then(book => {
                if(book.saleInfo.saleability == "NOT_FOR_SALE") return;
                const product = document.createElement("div");
                product.classList.add("product");
                product.setAttribute("data-id", book.id);

                const bookInfo = document.createElement("div");
                bookInfo.classList.add("book-info");

                const a = document.createElement("a");
                a.href = `book.html?id=${book.id}`;

                const img = document.createElement("img");
                if (book.volumeInfo.imageLinks) {
                    let url = book.volumeInfo.imageLinks.extraLarge || book.volumeInfo.imageLinks.large || book.volumeInfo.imageLinks.medium || book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail;
    
                    img.src = url.replace(/^http:\/\//i, "https://"); 
                }
                else {
                    img.src = "../src/images/logos/logo.jpg";
                }

                const bookDetails = document.createElement("div");
                bookDetails.classList.add("book-details");

                const bookTitle = document.createElement("h1");
                bookTitle.classList.add("book-title");
                if (book.volumeInfo.title.length > 8) {
                    bookTitle.textContent = book.volumeInfo.title.substring(0, 6) + "...";

                }
                else {
                    bookTitle.textContent = book.volumeInfo.title;
                }
                

                const bookAuthor = document.createElement("h4");
                bookAuthor.classList.add("book-author");
                bookAuthor.textContent = book.volumeInfo.authors[0];

                const publisher = document.createElement("h6");
                publisher.classList.add("publisher");
                publisher.textContent = book.volumeInfo.publisher;

                bookInfo.appendChild(a);
                a.appendChild(img);
                bookInfo.appendChild(bookDetails);
                bookDetails.appendChild(bookTitle);
                bookDetails.appendChild(bookAuthor);
                bookDetails.appendChild(publisher);
                product.appendChild(bookInfo);

                const numberOfBooks = document.createElement("div");
                numberOfBooks.classList.add("number-of-books");
                const titleOfNumber = document.createElement("h4");
                titleOfNumber.textContent = "Adet";

                const counter = document.createElement("div");
                counter.classList.add("counter");

                const decreaseButton = document.createElement("button");
                decreaseButton.classList.add("decrease-button");
                decreaseButton.textContent = "-";

                const countSpan = document.createElement("span");
                countSpan.id = "count";
                countSpan.textContent = "1";

                const increaseButton = document.createElement("button");
                increaseButton.classList.add("increase-button");
                increaseButton.textContent = "+";

                counter.appendChild(decreaseButton);
                counter.appendChild(countSpan);
                counter.appendChild(increaseButton);
                numberOfBooks.appendChild(titleOfNumber);
                numberOfBooks.appendChild(counter);
                product.appendChild(numberOfBooks);

                const bookPrice = document.createElement("div");
                bookPrice.classList.add("book-price");

                const titleOfPrice = document.createElement("h4");
                titleOfPrice.textContent = "Fiyat";
                const price = document.createElement("h2");
                price.classList.add("price");
                if (book.saleInfo.saleability == "FREE") {
                    price.textContent = "Ücretsiz";
                }
                else{
                    const amount =  book.saleInfo.listPrice.amount;
                    price.textContent = amount.toFixed(2) + " TRY";
                }

                bookPrice.appendChild(titleOfPrice);
                bookPrice.appendChild(price);
                product.appendChild(bookPrice);

                const removeButton = document.createElement("i");
                removeButton.classList.add("fa-solid");
                removeButton.classList.add("fa-xmark");
                product.appendChild(removeButton);

                container.appendChild(product);  
            });
        });
        calculateTotalPrice();
    }

    
    clearCartButton.forEach(button => {
        button.addEventListener("click", function () {
            localStorage.removeItem("products");
            let products = JSON.parse(localStorage.getItem("products")) || [];
            products = [];
            localStorage.setItem("products", JSON.stringify(products));
            displayCartItems();
            totalPrice.style.display = "none";
            mainContainer.textContent = "Sepetinizde hiç ürün yok.";
            mainContainer.style.fontSize = "2rem";
        });
    });

    document.body.addEventListener("click", function (e) {
        if (e.target.classList.contains("fa-xmark")) {
            let productElement = e.target.closest(".product");
            let productId = productElement.getAttribute("data-id");
            let products = JSON.parse(localStorage.getItem("products")) || [];
            products = products.filter(id => id !== productId);
            localStorage.setItem("products", JSON.stringify(products));
            productElement.remove(); 
           if (products.length === 0) {
                totalPrice.style.display = "none";
                mainContainer.textContent = "Sepetinizde hiç ürün yok.";
                mainContainer.style.fontSize = "2rem";
            }
            calculateTotalPrice();
        }
    });


    

   if(window.location.href.includes("cart.html")){
        displayCartItems();
    }

  function checkBookInCart() {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let purchaseButton = null;
       setTimeout(() => {
        purchaseButton = document.querySelectorAll(".add-to-cart, .purchase");
       }, 600);

       
       setTimeout(() => {
        purchaseButton.forEach(button => {
            if (products.includes(button.parentElement.getAttribute("data-id")))  {
                button.style.backgroundColor = "#11573b";
                button.style.color = "white";
                button.children[1].style.color = "white";
                let temp = button.children[0].textContent;
                button.children[0].innerHTML= `<i class="fa-solid fa-check"></i> Sepette`;
                button.children[1].textContent = temp;
            }
            else if (products.includes(button.parentElement.parentElement.parentElement.getAttribute("data-id"))){
                button.innerHTML= `<i class="fa-solid fa-check"></i> Sepette`;
                button.style.backgroundColor = "#11573b";
                button.style.color = "white";
            }     
        });
       }, 650);
    }
   window.addEventListener("load", function () {
        setTimeout(() => {
            checkBookInCart();
        }, 650);
    });
});

