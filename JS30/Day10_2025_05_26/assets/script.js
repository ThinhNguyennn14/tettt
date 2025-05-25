
const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button'); 

const images = [
    'bien.jpg',
    'nuinon.jpg',
    'rungcay.jpg',
    'thanhpho.jpg'
];

const imageBasePath = './assets/img/';

let currentIndex = 0;
function updateImage() {
    mainImage.src = imageBasePath + images[currentIndex];
    mainImage.alt = `Ảnh ${images[currentIndex].replace('.jpg', '')}`; 
}

function showPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1; 
    }
    updateImage();
}

function showNextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0; 
    }
    updateImage();
}

prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

