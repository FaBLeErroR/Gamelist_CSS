$(document).ready(function(){
    createLightGallery();
});

function createLightGallery() {
    $("#gallery").lightGallery();
}
// Создаем пустой массив, который будет заполняться ссылками на изображения
let images = [];

// Проходим циклом по всем изображениям от 1 до 22 и формируем ссылки
for (let i = 1; i <= 4; i++) {
    let src = '/images/zelda' + i + '.jpg';
    images.push({ src: src, thumb: src, subHtml: ' ' });
}

// Добавляем в него все изображения 
images.forEach(function(image) {
    let link = document.createElement('a');
    link.href = image.src;
    link.setAttribute('data-sub-html', image.subHtml);

    let img = document.createElement('img');
    img.src = image.thumb;
    link.appendChild(img);

    document.querySelector('#gallery').appendChild(link);
});
