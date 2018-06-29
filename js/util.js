'use strict';

(function () {
  window.util = {
    getRandomNumber: function (n) {
      return (Math.ceil(Math.random() * n));
    },
    getRandomElement: function (array) {
      return array[(Math.floor(Math.random() * array.length))];
    },
    closePopup: function () {
      window.pictures.uploadFileOverlay.classList.add('hidden');
      window.pictures.bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    },
    onPopupEscPress: function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
        window.util.closePopup();
      }
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
    }
  };
})();
