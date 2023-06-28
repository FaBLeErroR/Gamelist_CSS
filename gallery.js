$(document).ready(function(){
    createLightGallery();
});

function createLightGallery() {
    $("#gallery").lightGallery();
}

let images = [];

for (let i = 1; i <= 4; i++) {
    let src = '/images/zelda' + i + '.jpg';
    images.push({ src: src, thumb: src, subHtml: ' ' });
}

images.forEach(function(image) {
    let link = document.createElement('a');
    link.href = image.src;
    link.setAttribute('data-sub-html', image.subHtml);

    let img = document.createElement('img');
    img.src = image.thumb;
    link.appendChild(img);

    document.querySelector('#gallery').appendChild(link);
});
