document.addEventListener("DOMContentLoaded", function (){
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    const fetchDetails= new BookAPI();
    
    const bookContainer = document.querySelector(".book-container");
    const bookImg = this.querySelector(".book-image");
    const infoValues = document.querySelectorAll(".book-info-value");
    const bookTitle = document.querySelector(".book-title");
    const bookAuthor = document.querySelector(".book-author");
    const bookCategory = document.querySelector(".book-category");
    const bookPublisher = document.querySelector(".book-publisher");
    const bookRating = document.querySelector(".book-rating");
    const bookPrice = document.querySelector(".book-price");
    const bookDescription = document.querySelector(".book-description");
    const gPlay = document.querySelector(".g-play-link");
    const addToCart = document.querySelector(".add-to-cart");

    async function getDetails() {
        const bookDetails =  await fetchDetails.fetchBookByID(bookId);
        bookContainer.setAttribute("data-id", bookId);
        document.title = bookDetails.volumeInfo.title + " - Kitap Kurdu";

        if (bookDetails.volumeInfo.imageLinks) {
            let url =  bookDetails.volumeInfo.imageLinks.extraLarge || bookDetails.volumeInfo.imageLinks.large || bookDetails.volumeInfo.imageLinks.medium || bookDetails.volumeInfo.imageLinks.thumbnail || bookDetails.volumeInfo.imageLinks.smallThumbnail;

             bookImg.src = url.replace(/^http:\/\//i, "https://"); 
        } else {
            bookImg.src = "../src/images/logos/logo.jpg";
        }
        bookTitle.textContent = bookDetails.volumeInfo.title;
        if (bookDetails.volumeInfo.title.length > 12 && bookDetails.volumeInfo.title.length < 20) {
           bookTitle.style.fontSize = "3em";
        }
        else if (bookDetails.volumeInfo.title.length > 20) {
            bookTitle.style.fontSize = "2.5em";
        }
        if (bookDetails.volumeInfo.authors) {
            bookAuthor.textContent = bookDetails.volumeInfo.authors[0];
        }
        else {
            bookAuthor.textContent = bookDetails.volumeInfo.title;
        }
        if (bookDetails.volumeInfo.categories) {
            let category =  bookDetails.volumeInfo.categories[0].split("/");
            if (category.length > 1) {
                bookCategory.textContent = category[0].trim() + " , " + category[1].trim();
            }
            else {
                bookCategory.textContent = category[0].trim();
            }
        }
        else {
            bookCategory.textContent = "Kitap";
        }
        if (bookDetails.volumeInfo.publisher) {
            bookPublisher.textContent = bookDetails.volumeInfo.publisher;
        }
        else {
            bookPublisher.textContent = bookAuthor.textContent;
        }
        const i =  document.createElement("i");
        i.classList.add("fa-solid", "fa-star");
        bookRating.appendChild(i);
        if (bookDetails.volumeInfo.averageRating) {
            bookRating.textContent = bookDetails.volumeInfo.averageRating;
        }
        else {
            let pageCount = bookDetails.volumeInfo.pageCount;
            let rate=pageCount%10;
            let randomNum = pageCount.toString()[0];
            if(rate<3){
                rate=3;
            }
            else if(rate>5){
                rate=5;
                randomNum="0";
            }
            const rating = document.createTextNode(rate+"." + randomNum);
            bookRating.appendChild(rating);
        } 
        console.log(bookDetails);
        if (bookDetails.saleInfo) {
            if(bookDetails.saleInfo.listPrice) {
                bookPrice.textContent = bookDetails.saleInfo.listPrice.amount + " " + bookDetails.saleInfo.listPrice.currencyCode;
            }
            else if (bookDetails.saleInfo.saleability == "FREE") {
                bookPrice.textContent = "Ücretsiz";
                bookPrice.style.color = "green";
            }  
            else {
                bookPrice.textContent = "Stokta Yok";
                bookPrice.style.color = "red";
                addToCart.classList.add("disabled");
                addToCart.style.cursor = "not-allowed";
                addToCart.style.backgroundColor = "red";
                addToCart.textContent = "Stokta Yok";
                addToCart.style.opacity = "0.5";

            }
        } 
        if (bookDetails.volumeInfo.description) {
            bookDescription.innerHTML = bookDetails.volumeInfo.description;
        } else {
            bookDescription.textContent = "Açıklama Bulunamadı";
        }

        gPlay.href = bookDetails.volumeInfo.infoLink;
        gPlay.target = "_blank";
        
        infoValues[0].textContent = bookAuthor.textContent;
        infoValues[1].textContent = bookPublisher.textContent;
        if (bookDetails.volumeInfo.publishedDate) {
            infoValues[2].textContent = bookDetails.volumeInfo.publishedDate.slice(0, 4);
        }
        else {
            infoValues[2].textContent = "Bilinmiyor";
        }
        infoValues[3].textContent = bookDetails.volumeInfo.pageCount;
        infoValues[4].textContent = bookDetails.volumeInfo.language.toUpperCase();
        if (bookDetails.volumeInfo.industryIdentifiers){
            infoValues[5].textContent = bookDetails.volumeInfo.industryIdentifiers[0].identifier;
        }
        else {
            infoValues[5].textContent = bookDetails.id;
            infoValues[5].parentElement.children[1].textContent= " ID: ";
        }
        infoValues[6].textContent = bookCategory.textContent;
        infoValues[7].textContent = bookRating.textContent;

    }

    if(bookId==1) {
        bookContainer.setAttribute("data-id", 1);
        bookTitle.textContent = "Gözler";
        bookAuthor.textContent = "Berat Kaçar";
        bookDescription.textContent = " ~Gözler~, içsel çatışmalar ve travmalar etrafında şekillenen, karanlık bir atmosferde geçen bir hikâye sunar. Fantastik ve mitolojik ögelerle harmanlanan metin, zaman zaman sert ve rahatsız edici sahnelerle ilerlerken, karakterlerin psikolojisine odaklanır. Anlatım dili yer yer yoğun ve detaylıdır, bu da okuyucudan dikkatli bir takip gerektirir. Genel olarak, karanlık temaları seven okuyucular için ilgi çekici bir deneyim olabilir."
        bookImg.src = "/src/images/books/gozler.png";
        bookCategory.textContent = "Fantastik, Kurgu";
        bookPublisher.textContent = "Oger Yayınevi";
        const i =  document.createElement("i");
        i.classList.add("fa-solid", "fa-star");
        bookRating.appendChild(i);
        gozlerRating = document.createTextNode("5.0");
        bookRating.appendChild(gozlerRating);
        bookPrice.textContent = "250 TRY";
        infoValues[0].textContent = bookAuthor.textContent;
        infoValues[1].textContent = bookPublisher.textContent;
        infoValues[2].textContent = "2025";
        infoValues[3].textContent = "162";
        infoValues[4].textContent = "TR";   
        infoValues[5].textContent = "978-605-1234-5678";
        infoValues[6].textContent = bookCategory.textContent;
        infoValues[7].textContent = bookRating.textContent;
        gPlay.style.backgroundColor = "red"
        gPlay.style.cursor = "not-allowed";
        gPlay.textContent = "Henüz Satışta Değil";
        gPlay.href = "#";
        gPlay.style.opacity = "0.5";
        document.title = bookTitle.textContent + " - Kitap Kurdu";
    }
    else {
        getDetails();
    }
});