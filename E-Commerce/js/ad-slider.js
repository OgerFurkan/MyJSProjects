const sliderItems = document.querySelectorAll('.slider-item');
const prevButton = document.querySelector('.fa-circle-left');
const nextButton = document.querySelector('.fa-circle-right');
const dots = document.querySelectorAll('.dots i');

let currentIndex = 0;
let scrollInterval;
let scrollCooldown = false;



runEvents();
AutoScroll();

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
    if(scrollCooldown) return
    scrollCooldown = true;

    clearInterval(scrollInterval);
    
    if(currentIndex > 0) {
        currentIndex--;
        updateSlider();
    } else {
        currentIndex = sliderItems.length - 1;
        updateSlider();
    }
    setTimeout(() => {
        scrollCooldown = false;
        AutoScroll();
    }, 300);
}
function nextSlide() {
    if(scrollCooldown) return
    clearInterval(scrollInterval);

    scrollCooldown = true;
    if(currentIndex < sliderItems.length - 1) {
        currentIndex++;
        updateSlider();
    } else {
        currentIndex = 0;
        updateSlider();
    }
    setTimeout(() => {
        scrollCooldown = false;
        AutoScroll();
    }, 300);

}

function dotClick(e) {
    currentIndex = [...dots].indexOf(e.target);
    updateSlider();
}

function AutoScroll() {
    if(scrollCooldown) return
    scrollInterval = setInterval(() => {   
        if(currentIndex < sliderItems.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider(); 
    }, 2500); 
}







