'use strict';

(function () {
  function createPhotoElements(images) {
    window.data.generatePhotos(images);
    var pictureTemplate = document.querySelector('#picture').content;
    var photosListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < images; i++) {
      var photoElement = pictureTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').setAttribute('src', window.data.gallery[i].url);
      photoElement.querySelector('.picture__stat--likes').textContent = window.data.gallery[i].likes;
      photoElement.querySelector('.picture__stat--comments').textContent = window.util.getRandomItem(window.const.MAX_COMENTS_COUNT);

      fragment.appendChild(photoElement);
    }

    photosListElement.appendChild(fragment);
  }
  createPhotoElements(window.const.URLS_COUNT);

  var pictureLink = document.querySelectorAll('.picture__link');

  pictureLink.forEach(function (item, j, arr) {
    arr[j].addEventListener('click', function () {
      window.bigPicture.bigPicture.classList.remove('hidden');
    });
  });
})();
