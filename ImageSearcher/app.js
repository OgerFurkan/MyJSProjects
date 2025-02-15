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
    searchInput.addEventListener('click', function() {
        this.value = '';
    });
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
    console.log(images);
    let num=clearImages();
    images.forEach(image => {
        const imgA = document.createElement('a');
        imgA.href = image[1].urls.regular;
        imgA.target = '_blank';
        imgA.attributes.class = 'imgA';

        const imgDiv = document.createElement('div');
        imgDiv.attributes.class = 'imgDiv';
        

        const img = document.createElement('img');
        img.src = image[1].urls.regular;
        img.alt = image[1].alt_description;
        img.attributes.class = 'img';
        img.attributes.id = `img${num}`;

        imgA.appendChild(imgDiv);
        imgDiv.appendChild(img);
        imagesWrapper.appendChild(imgA);
        num++;
    });
}

function clearImages() {
    imagesWrapper.innerHTML = "";
    return 0;
}













