document.addEventListener('DOMContentLoaded', () => {
    const bookSlider = document.querySelector('.book-slider-wrapper');
    const prevArrow = document.querySelector('.fa-arrow-left');
    const nextArrow = document.querySelector('.fa-arrow-right');
    const width = 370;
    const bookCount = 4;
    let books;

    let bestSellerBooks = ["Xdm0EAAAQBAJ","BKbkrQEACAAJ","8Q-SDwAAQBAJ","02uvzwEACAAJ"];
    const fetchBook = new BookAPI();
   
    async function fetchBestSellerBooks() {
        for (let i = 0; i < 4; i++) {
            const promise = fetchBook.fetchBookByID(bestSellerBooks[i]);
            let book= await promise;
            const sliderItemBook = document.createElement("div");
            sliderItemBook.classList.add("slider-item-book");
        
            const a = document.createElement("a");
            
            const img = document.createElement("img");
            if (book.volumeInfo.imageLinks) {
                img.src = book.volumeInfo.imageLinks.thumbnail;
            }
            else {
                img.src = "../src/images/logos/logo.jpg";
            }
            
            const bookTitle = document.createElement("h3");
            bookTitle.textContent = book.volumeInfo.title;
        
            const bookAuthor = document.createElement("h1");
            bookAuthor.textContent = book.volumeInfo.authors[0];
        
            const publisher = document.createElement("p");
            publisher.textContent = book.volumeInfo.publisher;
        
            const button = document.createElement("button");
            button.classList.add("purchase");
        
            const price = document.createElement("span");
            price.classList.add("price");
            if (book.saleInfo && book.saleInfo.listPrice) {
                price.textContent = Math.floor(Number(book.saleInfo.listPrice.amount)) + " " + book.saleInfo.listPrice.currencyCode;
            } else {
                price.textContent = i*10+10+ " " + "TRY";
            }
        
            const addToCart = document.createElement("span");
            addToCart.classList.add("add-to-cart"); 
            addToCart.textContent = "Sepete Ekle";
            
            bookSlider.appendChild(sliderItemBook);
            sliderItemBook.appendChild(a);
            a.appendChild(img);
            sliderItemBook.appendChild(bookTitle);
            sliderItemBook.appendChild(bookAuthor);
            sliderItemBook.appendChild(publisher);
            sliderItemBook.appendChild(button);
            button.appendChild(price);
            button.appendChild(addToCart); 
        }
        books = document.querySelectorAll('.slider-item-book');
        cloneBooks();
    }

    fetchBestSellerBooks();

    function cloneBooks() {
        books.forEach((book) => {
            const toLast = book.cloneNode(true);
            bookSlider.appendChild(toLast);
        });
    
       for (let i = bookCount; i > 0; i--) {
            const toFirst = books[i - 1].cloneNode(true);
            bookSlider.prepend(toFirst);
        }
    }

   

    let currentIndex =4;
    bookSlider.scrollLeft = width * currentIndex;


    let scrollCoolDown = false;
    let scrollInterval;
    AutoScroll();

    function AutoScroll() {
        scrollInterval = setInterval(() => {
            if (scrollCoolDown) return;

            if (currentIndex >= bookCount * 2) {
                bookSlider.style.scrollBehavior = 'auto';
                bookSlider.scrollLeft = width * bookCount;
                currentIndex = 4;
                bookSlider.style.scrollBehavior = 'smooth';
                bookSlider.scrollLeft += width;
                currentIndex++;
            } else {
                bookSlider.style.scrollBehavior = 'smooth';
                bookSlider.scrollLeft += width;
                currentIndex++;
            }
        }, 2000);  
    }
    
    nextArrow.addEventListener('click', () => {
        if (scrollCoolDown) return;

            scrollCoolDown = true;
            clearInterval(scrollInterval);

        if (currentIndex >= bookCount*2){
            bookSlider.style.scrollBehavior = 'auto';
            bookSlider.scrollLeft = width * bookCount;
            currentIndex = 4;
            bookSlider.style.scrollBehavior = 'smooth';
            bookSlider.scrollLeft += width;
            currentIndex++;
        }
        else{
            bookSlider.style.scrollBehavior = 'smooth';
            bookSlider.scrollLeft += width;
            currentIndex++;
        }
        setTimeout(() => {
            scrollCoolDown = false;
            AutoScroll();
        }, 300);
    });

    prevArrow.addEventListener('click', () => {
        if (scrollCoolDown) return;
        clearInterval(scrollInterval);

        scrollCoolDown = true;
        if (currentIndex <= 0) {
            bookSlider.style.scrollBehavior = 'auto';
            bookSlider.scrollLeft = width * bookCount;
            currentIndex = bookCount;
            bookSlider.style.scrollBehavior = 'smooth';
            bookSlider.scrollLeft -= width;
            currentIndex--;
        } else {
            bookSlider.style.scrollBehavior = 'smooth';
            bookSlider.scrollLeft -= width;
            currentIndex--;
        }
        setTimeout(() => {
            scrollCoolDown = false;
            AutoScroll();
        }, 300);
    });
});



   
