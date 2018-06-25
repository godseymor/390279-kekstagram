'use strict';

(function () {
  var COMMENTS_COUNT = 2;
  var uploadFile = document.querySelector('#upload-file');
  var uploadFileOverlayClose = document.querySelector('#upload-cancel');
  var main = document.querySelector('main');
  var bigPictureClose = document.querySelector('#picture-cancel');
  function createPictureElements() {

    document.querySelector('.big-picture__img').setAttribute('src', window.data.gallery[0].url);
    document.querySelector('.likes-count').textContent = window.data.gallery[0].likes;
    document.querySelector('.comments-count').textContent = window.util.getRandomItem(window.constants.MAX_COMENTS_COUNT);

    var bigPictureComments = document.querySelector('.social__comments');

    function fillCommentsContent() {
      for (var j = 1; j <= COMMENTS_COUNT; j++) {
        bigPictureComments.querySelector('.social__comment:nth-child(' + j + ') .social__picture').setAttribute('src', 'img/avatar-' + window.util.getRandomItem(window.constants.MAX_COMENTS_COUNT) + '.svg');
        bigPictureComments.querySelector('.social__comment:nth-child(' + j + ') .social__text').textContent = window.data.gallery[j].comments;
      }
    }

    fillCommentsContent();

    document.querySelector('.social__caption').textContent = window.data.gallery[0].description;
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.social__loadmore').classList.add('visually-hidden');
  }

  createPictureElements(window.constants.URLS_COUNT);

  uploadFile.addEventListener('change', function () {
    window.bigPicture.uploadFileOverlay.classList.remove('hidden');
    window.effects.imgUploadScale.style.display = 'none';
  });

  uploadFileOverlayClose.addEventListener('click', function () {
    window.util.closePopup();
  });

  main.addEventListener('keydown', window.util.onPopupEscPress);
  bigPictureClose.addEventListener('click', function () {
    window.util.closePopup();
  });

  window.bigPicture = {
    uploadFileOverlay: document.querySelector('.img-upload__overlay'),
    bigPicture: document.querySelector('.big-picture.overlay')
  };
})();
