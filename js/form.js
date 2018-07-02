'use strict';

(function () {
  var HASH_ERRORS = [
    {
      name: 'sharpError',
      message: 'Хэш-тег должен начинаться с символа # (решётка)',
      value: 0
    },
    {
      name: 'oneSharp',
      message: 'Хэш-тег не может состоять только из одной решётки',
      value: 1
    },
    {
      name: 'repeatHash',
      message: 'Один и тот же хэш-тег не может быть использован дважды'
    },
    {
      name: 'moreThanFive',
      message: 'Нельзя указать больше пяти хэш-тегов',
      value: 5
    },
    {
      name: 'maxLength',
      message: 'Максимальная длина хэш-тега не может превышать 20 символов, включая решётку',
      value: 20
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

    // FIXME:
    for (var index = 0; index < hashTags.length; index++) {
      if (hashTagsString.length === 0) {
        resetHashTags(target);
      } else if (hashTags[index].length === HASH_ERRORS[1].value) {
        setHashTagsError(target, HASH_ERRORS, 1);
      } else if (hashTags.length > HASH_ERRORS[3].value) {
        setHashTagsError(target, HASH_ERRORS, 3);
      } else if (hashTags[index].length > HASH_ERRORS[4].value) {
        setHashTagsError(target, HASH_ERRORS, 4);
      } else if (hashTags[index].charAt(HASH_ERRORS[0].value) !== '#') {
        setHashTagsError(target, HASH_ERRORS, 0);
      } else {
        resetHashTags(target);
      }
      for (var y = 0; y < hashTags.length - 1; y++) {
        var counter = y + 1;
        if (hashTags[y].toLowerCase() === hashTags[counter].toLowerCase()) {
          setHashTagsError(target, HASH_ERRORS, 2);
        }
      }
    }
    if (!hashTagsInput.validity.valid) {
      hashTagsInput.style.outline = '2px solid red';
    }
  });

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
