document.addEventListener("DOMContentLoaded", function () {
    let bestSellerBooks = ["Xdm0EAAAQBAJ","8N50EAAAQBAJ","8Q-SDwAAQBAJ","n-ftAwAAQBAJ"];
    let newBooks = ["BhFPEQAAQBAJ","viNOEQAAQBAJ","z4IOEQAAQBAJ","plP9EAAAQBAJ"];

    const fetchBook = new BookAPI();
    const bestSellersDiv = document.querySelector('.best-sellers');
    const newBooksDiv = document.querySelector('.new-books');

    fetchBooks(bestSellerBooks);
    fetchBooks(newBooks);


    async function fetchBooks(array) {
        let fetchedBooks = [];
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
                img.src = "./src/images/logos/logo.jpg";
            }
            
            const bookTitle = document.createElement("h3");

            if(book.volumeInfo.title.length > 15){
                bookTitle.textContent = book.volumeInfo.title.substring(0, 12) + "...";
            }
            else{
                bookTitle.textContent = book.volumeInfo.title;
            }
        
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

            if(array === bestSellerBooks){
                bestSellersDiv.appendChild(sliderItemBook);
            }else if(array === newBooks){
                newBooksDiv.appendChild(sliderItemBook);
            }
            sliderItemBook.appendChild(a);
            a.appendChild(img);
            sliderItemBook.appendChild(bookTitle);
            sliderItemBook.appendChild(bookAuthor);
            sliderItemBook.appendChild(publisher);
            sliderItemBook.appendChild(button);
            button.appendChild(price);
            button.appendChild(addToCart); 
    }); 
    
   
    

   
}

    

    

   

    



    





});