document.addEventListener('DOMContentLoaded', () => {
    const bookSlider = document.querySelector('.book-slider-wrapper');
    const books = Array.from(document.querySelectorAll('.slider-item-book'));
    const prevArrow = document.querySelector('.fa-arrow-left');
    const nextArrow = document.querySelector('.fa-arrow-right');
    const width = 370;
    const bookCount = books.length;

    books.forEach((book) => {
        const toLast = book.cloneNode(true);
        bookSlider.appendChild(toLast);
    });

   for (let i = bookCount; i > 0; i--) {
        const toFirst = books[i - 1].cloneNode(true);
        bookSlider.prepend(toFirst);
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
            console.log(currentIndex);
        }
        setTimeout(() => {
            scrollCoolDown = false;
            AutoScroll();
        }, 300);
    });


});
