document.addEventListener('DOMContentLoaded', () => {
    const bookSlider = document.querySelector('.book-slider-wrapper');
    const prevArrow = document.querySelector('.fa-arrow-left');
    const nextArrow = document.querySelector('.fa-arrow-right');
    const bestSellerRadio = document.getElementById("best-seller");
    const newBooksRadio = document.getElementById("new-books");
    const loadingSpinner = document.querySelector('.loader');

    const width = 370;
    const bookCount = 4;

    let bestSellerBooks = ["Xdm0EAAAQBAJ","8N50EAAAQBAJ","8Q-SDwAAQBAJ","n-ftAwAAQBAJ"];
    let newBooks = ["BhFPEQAAQBAJ","viNOEQAAQBAJ","z4IOEQAAQBAJ","plP9EAAAQBAJ"];
  
    const fetchBook = new BookAPI();
   
    async function fetchBooks(array) {
        let fetchedBooks = [];
        loadingSpinner.style.display = "block";

        for(let i=0 ; i<4 ; i++){
            const book = await fetchBook.fetchBookByID(array[i]);
            fetchedBooks.push(book);
        }

        fetchedBooks.forEach(book => {
            const sliderItemBook = document.createElement("div");
            sliderItemBook.classList.add("slider-item-book");
            sliderItemBook.setAttribute("data-id", book.id);
        
            const a = document.createElement("a");
            a.href = "book.html?id=" + book.id;
            
            const img = document.createElement("img");
            if (book.volumeInfo.imageLinks) {
                let url = book.volumeInfo.imageLinks.extraLarge || book.volumeInfo.imageLinks.large || book.volumeInfo.imageLinks.medium || book.volumeInfo.imageLinks.thumbnail || book.volumeInfo.imageLinks.smallThumbnail;

                img.src = url.replace(/^http:\/\//i, "https://"); 
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
                price.textContent = book.saleInfo.listPrice.amount + " " + book.saleInfo.listPrice.currencyCode;
            } else {
                price.textContent = "Stokta Yok";
                button.classList.add("disabled");
                button.style.cursor = "not-allowed";
                button.style.backgroundColor = "red";
            }
            
        
            const addToCart = document.createElement("span");
            addToCart.classList.add("to-cart"); 
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
    });       
        books = document.querySelectorAll('.slider-item-book');
        cloneBooks();
        bookSlider.scrollLeft = width * 4;
        currentIndex = 4;
        loadingSpinner.style.display = "none";
        scrollCoolDown = false;
        AutoScroll(); 
    }

    run();

    bestSellerRadio.addEventListener("change", run);
    newBooksRadio.addEventListener("change", run);  

  function run(){
        bookSlider.innerHTML = "";
        if (bestSellerRadio.checked) {
            fetchBooks(bestSellerBooks);
        } else {
            fetchBooks(newBooks);
        }
    }

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
        clearInterval(scrollInterval);
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