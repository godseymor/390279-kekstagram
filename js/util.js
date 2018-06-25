'use strict';

(function () {
  var MIN_LIKES_COUNT = 15;
  window.util = {
    getRandomItem: function (n) {
      if (n === window.const.LIKES_COUNT) {
        n = Math.floor(Math.random() * n);
        if (n < MIN_LIKES_COUNT) {
          return window.util.getRandomItem(window.const.LIKES_COUNT);
        }
      } else if (typeof (n) === 'object') {
        n = (Math.floor(Math.random() * n.length));
      } else if (n === window.const.MAX_COMENTS_COUNT) {
        n = (Math.ceil(Math.random() * n));
      }
      return n;
    },
    closePopup: function () {
      window.bigPicture.uploadFileOverlay.classList.add('hidden');
      window.bigPicture.bigPicture.classList.add('hidden');
    },
    onPopupEscPress: function (evt) {
      if (evt.keyCode === window.const.ESC_KEYCODE && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
        window.util.closePopup();
      }
    }
  };
})();
