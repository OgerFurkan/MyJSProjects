const sliderItems = document.querySelectorAll('.slider-item');
const prevButton = document.querySelector('.fa-circle-left');
const nextButton = document.querySelector('.fa-circle-right');
const dots = document.querySelectorAll('.dots i');

let currentIndex = 0;



runEvents();

function runEvents() {
    updateSlider();
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', dotClick)
    });
}

function updateSlider() {
    sliderItems.forEach((item, index) => {
        item.classList.remove('visible');
        if (index == currentIndex) {
            item.classList.add('visible');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.remove('fa-circle-dot');
        dot.classList.add('fa-circle');
        if (index == currentIndex) {
            dot.classList.remove('fa-circle');
            dot.classList.add('fa-circle-dot');
        }
    });
}

function prevSlide() {
    if(currentIndex > 0) {
        currentIndex--;
        updateSlider();
    } else {
        
    }
}
function nextSlide() {
    if(currentIndex < sliderItems.length - 1) {
        currentIndex++;
        updateSlider();
    } else {
       
    }
}

function dotClick(e) {
    currentIndex = [...dots].indexOf(e.target);
    updateSlider();
}








