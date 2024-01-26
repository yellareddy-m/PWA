const button = document.querySelector('#saveImgBtn');
const input = document.querySelector('#imageUrl');
const imagesContainer = document.querySelector('#images');

input.innerText = "";
button.addEventListener('click', function () {
    const imgUrl = input.value.trim();
    storeImage(imgUrl, () => {
        createAndAppendImg(imgUrl);
        input.value = "";
    });
});

function createAndAppendImg(imgUrl) {
    const imgTag = document.createElement('img');
    imgTag.src = imgUrl;
    imagesContainer.append(imgTag);
}


function storeImage(imgUrl, callback) {
    caches.open('images').then(function (cache) {
        return cache.add(imgUrl);
    }).then(callback);
}

function showImages() {
    caches.open('images').then((cache) => {
        cache.keys().then((keys) => {
            keys.forEach((request) => {
                createAndAppendImg(request.url);
            })
        });
    });
}

showImages();