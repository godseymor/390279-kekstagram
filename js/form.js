'use strict';

(function () {
  var HASH_ERRORS = [
    {
      message: 'Хэш-тег должен начинаться с символа # (решётка)',
      value: 0,
      validity: function () {
        for (var i = 0; i < hashTags.length; i++) {
          if (hashTags[i].charAt(HASH_ERRORS[0].value) !== '#') {
            return true;
          }
        }
        return false;
      }
    },
    {
      message: 'Хэш-тег не может состоять только из одной решётки',
      value: 1,
      validity: function () {
        for (var i = 0; i < hashTags.length; i++) {
          if (hashTags[i].length === HASH_ERRORS[1].value) {
            return true;
          }
        }
        return false;
      }
    },
    {
      message: 'Один и тот же хэш-тег не может быть использован дважды',
      validity: function () {
        for (var i = 0; i < hashTags.length - 1; i++) {
          for (var j = i + 1; j < hashTags.length; j++) {
            if (hashTags[i].toLowerCase() === hashTags[j].toLowerCase()) {
              return true;
            }
          }
        }
        return false;
      }
    },
    {
      message: 'Нельзя указать больше пяти хэш-тегов',
      value: 5,
      validity: function () {
        return hashTags.length > HASH_ERRORS[3].value ? true : false;
      }
    },
    {
      message: 'Максимальная длина хэш-тега не может превышать 20 символов, включая решётку',
      value: 20,
      validity: function () {
        for (var i = 0; i < hashTags.length; i++) {
          if (hashTags[i].length > HASH_ERRORS[4].value) {
            return true;
          }
        }
        return false;
      }
    },
    {
      message: 'Хеш-теги разделяются пробелами',
      value: 1,
      validity: function () {
        for (var i = 0; i < hashTags.length; i++) {
          if (~hashTags[i].substring(HASH_ERRORS[5].value).indexOf('#')) {
            return true;
          }
        }
        return false;

      }
    }
  ];
  var hashTagsInput = document.querySelector('.text__hashtags');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var hashTags = [];

  hashTagsInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var hashTagsString = hashTagsInput.value;
    hashTags = hashTagsString.split(' ');

    hashTags.forEach(function () {
      return hashTagsString.length > 0 ? validateHashTags(target) : resetHashTags(target);
    });
  });

  function validateHashTags(target) {
    for (var index = 0; index < hashTags.length; index++) {
      for (var j = 0; j < HASH_ERRORS.length; j++) {
        if (HASH_ERRORS[j].validity()) {
          hashTagsInput.style.outline = '2px solid red';
          setHashTagsError(target, HASH_ERRORS, j);
          break;
        }
        resetHashTags(target);
      }
    }
  }

  function resetHashTags(target) {
    target.style.outline = 'inherit';
    target.setCustomValidity('');
  }

  function setHashTagsError(target, array, index) {
    target.setCustomValidity(array[index].message);
  }

  function onLoad() {
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.removeEventListener('submit', imgUploadForm);
    window.util.clearFields();
  }

  function onError() {
    imgUploadOverlay.classList.add('hidden');
    document.body.querySelector('main').classList.add('hidden');
    document.body.appendChild(window.pictures.errorMessage);
    window.pictures.errorMessage.classList.remove('hidden');
  }

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(imgUploadForm), onLoad, onError);
  });
})();
