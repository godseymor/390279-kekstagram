'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  window.util = {
    lastTimeout: '',
    debounce: function (func) {
      if (window.util.lastTimeout) {
        clearTimeout(window.util.lastTimeout);
      }
      window.util.lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);
    },
    getRandomNumber: function (n) {
      return (Math.ceil(Math.random() * n));
    },
    getRandomElement: function (array) {
      return array[(Math.floor(Math.random() * array.length))];
    },
    getArrayIndex: function (currentPhotoUrl, images) {
      for (var i = 0; i < images.length; i++) {
        if (currentPhotoUrl === images[i].url) {
          var arrayIndex = i;
        }
      }
      return arrayIndex;
    },
    closePopup: function () {
      window.pictures.uploadFileOverlay.classList.add('hidden');
      window.pictures.bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      window.util.clearFields();
      window.pictures.clearComments();
    },
    onPopupEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
        window.util.closePopup();
      }
    },
    clearFields: function () {
      document.querySelector('#upload-select-image').reset();
      document.querySelector('.img-upload__preview').style.filter = 'none';
      document.querySelector('.img-upload__preview').style.transform = 'none';
    },
    serverError: function (message) {
      document.body.classList.add('modal-open');
      var fragment = document.createDocumentFragment();
      var errorWindow = document.createElement('div');
      var errorWarning = document.createElement('h2');
      var errorMessage = document.createElement('p');
      var errorClose = document.createElement('button');

      errorWindow.classList.add('error-window');
      errorWarning.textContent = 'Произошла ошибка';
      errorMessage.textContent = message;
      errorClose.textContent = 'Закрыть';

      var onErrorCloseClick = function () {
        errorWindow.classList.add('hidden');
        document.body.classList.remove('modal-open');
        errorClose.removeEventListener('click', onErrorCloseClick);
      };

      errorClose.addEventListener('click', onErrorCloseClick);

      errorWindow.appendChild(errorWarning);
      errorWindow.appendChild(errorMessage);
      errorWindow.appendChild(errorClose);

      fragment.appendChild(errorWindow);
      document.body.appendChild(fragment);
    },
    getUniquePhotos: function (source, target, count) {
      for (var i = 0; i < count; i++) {
        var currentPhoto = window.util.getRandomElement(source);
        if (target.indexOf(currentPhoto) === -1) {
          target.push(currentPhoto);
        } else {
          i--;
        }
      }
    }
  };
})();
