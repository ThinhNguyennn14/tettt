const backgroundContainer = document.getElementById('container'); 
const imageSelect = document.getElementById('imageSelect');
const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');
const imageBasePath = './assets/img/';

function changeBackgroundImage() {
    const selectedImageFile = imageSelect.value;
    const newImageUrl = imageBasePath + selectedImageFile; 
    backgroundContainer.style.backgroundImage = `url('${newImageUrl}')`;
}

changeBackgroundBtn.addEventListener('click', changeBackgroundImage);

