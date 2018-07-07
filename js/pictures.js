'use strict';

(function () {
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var AVATARS_COUNT = 6;
  var INITIAL_EFFECT_VALUE = 100;
  var COMMENTS_INDICES = {
    index: 0,
    minCommentsIndex: 0,
    maxCommentsIndex: 5
  };
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var pictureTemplate = document.querySelector('#picture').content;
  var singlePhoto = pictureTemplate.querySelector('.picture__link');
  var photosList = document.querySelector('.pictures');
  var uploadFile = document.querySelector('#upload-file');
  var noEffectInput = document.querySelector('#effect-none');
  var heatEffectInput = document.querySelector('#effect-heat');
  var uploadFileOverlayClose = document.querySelector('#upload-cancel');
  var main = document.querySelector('main');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('#picture-cancel');

  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureComments = bigPicture.querySelector('.comments-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');

  var commentsContainer = bigPicture.querySelector('.social__comments');
  var singleComment = pictureTemplate.querySelector('.social__comment');
  var commentsCount = document.querySelector('.comments-current');
  var loadMore = document.querySelector('.social__loadmore');

  var picturePreview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  function onLoad(data) {
    data.forEach(function (item) {
      window.pictures.gallery.push(item);
    });
    window.pictures.createPhotoElements(window.pictures.gallery);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  }
  function onError(message) {
    window.util.serverError(message);
  }
  function fillComments(images, index) {
    var fragment = document.createDocumentFragment();
    for (window.pictures.commentsIndex; window.pictures.commentsIndex < images[index].comments.length && window.pictures.commentsIndex < window.pictures.maxCommentsIndex; window.pictures.commentsIndex++) {
      var currentComment = singleComment.cloneNode(true);
      currentComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(AVATARS_COUNT) + '.svg';
      currentComment.querySelector('.social__text').textContent = images[index].comments[window.pictures.commentsIndex];
      fragment.appendChild(currentComment);
      commentsCount.textContent = window.pictures.commentsIndex + 1;
      if (window.pictures.commentsIndex >= images[index].comments.length - 1) {
        document.querySelector('.social__loadmore').classList.add('visually-hidden');
      }
    }
    commentsContainer.appendChild(fragment);
  }

  window.backend.receiveData(onLoad, onError);

  uploadFile.addEventListener('change', function () {
    window.pictures.uploadFileOverlay.classList.remove('hidden');
    window.effects.imgUploadScale.style.display = 'none';

    heatEffectInput.checked = false;
    noEffectInput.checked = true;

    document.querySelector('.scale__value').value = INITIAL_EFFECT_VALUE;

    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picturePreview.src = reader.result;
        for (var i = 0; i < effectsPreview.length; i++) {
          effectsPreview[i].style.backgroundImage = 'url(' + picturePreview.src + ')';
        }
      });

      reader.readAsDataURL(file);
    }
  });

  uploadFileOverlayClose.addEventListener('click', function () {
    window.util.closePopup();
  });

  main.addEventListener('keydown', window.util.onPopupEscPress);
  bigPictureClose.addEventListener('click', function () {
    window.util.closePopup();
  });

  window.pictures = {
    uploadFileOverlay: document.querySelector('.img-upload__overlay'),
    bigPicture: document.querySelector('.big-picture.overlay'),
    errorMessage: pictureTemplate.querySelector('.img-upload__message--error'),
    gallery: [],
    commentsIndex: COMMENTS_INDICES.minCommentsIndex,
    maxCommentsIndex: COMMENTS_INDICES.maxCommentsIndex,
    index: COMMENTS_INDICES.index,
    clearComments: function () {
      window.pictures.commentsIndex = 0;
      window.pictures.maxCommentsIndex = COMMENTS_INDICES.maxCommentsIndex;
      document.querySelector('.social__loadmore').classList.remove('visually-hidden');
    },
    createPhotoElements: function (images) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < images.length; i++) {
        var currentImage = images[i];
        var photoElement = singlePhoto.cloneNode(true);

        photoElement.querySelector('.picture__img').src = currentImage.url;
        photoElement.querySelector('.picture__stat--likes').textContent = currentImage.likes;
        photoElement.querySelector('.picture__stat--comments').textContent = currentImage.comments.length;

        photoElement.addEventListener('click', function (evt) {

          window.pictures.bigPicture.classList.remove('hidden');
          document.body.classList.add('modal-open');

          var currentPhotoUrl = evt.currentTarget.querySelector('.picture__img').getAttribute('src'); // .src - получает абсолютный URL адрес, а нужен именно относительный
          var currentPhotoLikes = evt.currentTarget.querySelector('.picture__stat--likes').textContent;
          var currentPhotoCommentsCount = evt.currentTarget.querySelector('.picture__stat--comments').textContent;

          bigPictureImage.src = currentPhotoUrl;
          bigPictureLikes.textContent = currentPhotoLikes;
          bigPictureComments.textContent = currentPhotoCommentsCount;

          bigPictureDescription.textContent = window.util.getRandomElement(DESCRIPTIONS);

          commentsContainer.innerHTML = '';
          window.pictures.index = window.util.getArrayIndex(currentPhotoUrl, images);
          fillComments(images, window.pictures.index);
        });

        fragment.appendChild(photoElement);
      }

      loadMore.addEventListener('click', function () {
        window.pictures.maxCommentsIndex += COMMENTS_INDICES.maxCommentsIndex;
        fillComments(images, window.pictures.index);
      });

      photosList.appendChild(fragment);
    }
  };
})();
