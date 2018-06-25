'use strict';

(function () {
  var COMMENTS_COUNT = 2;
  function createPictureElements() {
    window.bigPicture = {
      uploadFile: document.querySelector('#upload-file'),
      uploadFileOverlay: document.querySelector('.img-upload__overlay'),
      uploadFileOverlayClose: document.querySelector('#upload-cancel'),
      main: document.querySelector('main'),
      bigPicture: document.querySelector('.big-picture.overlay'),
      bigPictureClose: document.querySelector('#picture-cancel')
    };

    window.bigPicture.bigPicture.querySelector('.big-picture__img').setAttribute('src', window.data.gallery[0].url);
    window.bigPicture.bigPicture.querySelector('.likes-count').textContent = window.data.gallery[0].likes;
    window.bigPicture.bigPicture.querySelector('.comments-count').textContent = window.util.getRandomItem(window.const.MAX_COMENTS_COUNT);

    var bigPictureComments = document.querySelector('.social__comments');

    function fillCommentsContent() {
      for (var j = 1; j <= COMMENTS_COUNT; j++) {
        bigPictureComments.querySelector('.social__comment:nth-child(' + j + ') .social__picture').setAttribute('src', 'img/avatar-' + window.util.getRandomItem(window.const.MAX_COMENTS_COUNT) + '.svg');
        bigPictureComments.querySelector('.social__comment:nth-child(' + j + ') .social__text').textContent = window.data.gallery[j].comments;
      }
    }

    fillCommentsContent();

    window.bigPicture.bigPicture.querySelector('.social__caption').textContent = window.data.gallery[0].description;
    window.bigPicture.bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    window.bigPicture.bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
  }

  createPictureElements(window.const.URLS_COUNT);

  window.bigPicture.uploadFile.addEventListener('change', function () {
    window.bigPicture.uploadFileOverlay.classList.remove('hidden');
    window.effects.imgUploadScale.style.display = 'none';
  });

  window.bigPicture.uploadFileOverlayClose.addEventListener('click', function () {
    window.util.closePopup();
  });

  window.bigPicture.main.addEventListener('keydown', window.util.onPopupEscPress);
  window.bigPicture.bigPictureClose.addEventListener('click', function () {
    window.util.closePopup();
  });

})();
