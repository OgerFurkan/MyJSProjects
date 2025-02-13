const formWrapper = document.querySelector('.formWrapper');
const serachForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const clearBtn = document.querySelector('#clearBtn');
const imagesWrapper = document.querySelector('#imagesWrapper');

runEventListeners();

function runEventListeners() {
    serachForm.addEventListener('submit', searchImages);
    clearBtn.addEventListener('click', clearImages);
}

function searchImages(e) {
    e.preventDefault();
    if (searchInput.value.trim() === '') {
        alert('Please enter a search term');
    } else {
        fetchImages(searchInput.value.trim());
    }
}

function clearImages() {
    imagesWrapper.innerHTML = '';
}

async function fetchImages(searchTerm) {
    const token = "CMiRUO4ZyaBt8aUw8oRwf1mgGGVe4Gtl5UVwNjwV9mw";
    const url = `https://api.unsplash.com/search/photos?query=${searchTerm}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Client-ID ${token}`
        }
    });
    const data = await response.json();
    const results = Object.entries(data.results);
    displayImages(results);
}

function displayImages(images) {
    let num=clearImages();
    images.forEach(image => {
        const imgDiv = document.createElement('div');
        imgDiv.attributes.class = 'imgDiv';

        const img = document.createElement('img');
        img.src = image[1].urls.regular;
        img.alt = image[1].alt_description;
        img.attributes.class = 'img';
        img.attributes.id = `img${num}`;

        imgDiv.appendChild(img);
        imagesWrapper.appendChild(imgDiv);
        num++;
    });
}

function clearImages() {
    imagesWrapper.innerHTML = '';
    Array.from(imagesWrapper.children).forEach(child => {
        child.remove();
    });
    return 0;
}













