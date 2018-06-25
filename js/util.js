'use strict';

(function () {
  var MIN_LIKES_COUNT = 15;
  // FIXME:
  window.util = {
    getRandomItem: function (n) {
      if (n === window.constants.LIKES_COUNT) {
        n = Math.floor(Math.random() * n);
        if (n < MIN_LIKES_COUNT) {
          return window.util.getRandomItem(window.constants.LIKES_COUNT);
        }
      } else if (typeof (n) === 'object') {
        n = (Math.floor(Math.random() * n.length));
      } else if (n === window.constants.MAX_COMENTS_COUNT) {
        n = (Math.ceil(Math.random() * n));
      }
      return n;
    },
    getRandomElement: function (array) {
      return array[(Math.floor(Math.random() * array.length))];
    },
    closePopup: function () {
      window.bigPicture.uploadFileOverlay.classList.add('hidden');
      window.bigPicture.bigPicture.classList.add('hidden');
    },
    onPopupEscPress: function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
        window.util.closePopup();
      }
    }
  };
})();
