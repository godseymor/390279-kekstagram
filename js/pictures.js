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

  var pictureTemplate = document.querySelector('#picture').content;
  var singlePhoto = pictureTemplate.querySelector('.picture__link');
  var photosListElement = document.querySelector('.pictures');
  var uploadFile = document.querySelector('#upload-file');
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

  function onLoad(data) {
    data.forEach(function (item, i, arr) {
      window.pictures.gallery.push(arr[i]);
    });
    window.pictures.createPhotoElements(window.pictures.gallery);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  }
  function onError(message) {
    window.util.serverError(message);
  }

  window.backend.receiveData(onLoad, onError);

  uploadFile.addEventListener('change', function () {
    window.pictures.uploadFileOverlay.classList.remove('hidden');
    window.effects.imgUploadScale.style.display = 'none';
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
    commentsIndex: 0,
    maxCommentsIndex: 5,
    index: 0,
    getArrayIndex: function (currentPhotoUrl, images) {
      for (var i = 0; i < images.length; i++) {
        if (currentPhotoUrl === images[i].url) {
          var arrayIndex = i;
        }
      }
      return arrayIndex;
    },
    fillComments: function (images, index) {
      for (window.pictures.commentsIndex; window.pictures.commentsIndex < images[index].comments.length && window.pictures.commentsIndex < window.pictures.maxCommentsIndex; window.pictures.commentsIndex++) {
        var currentComment = singleComment.cloneNode(true);
        currentComment.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + window.util.getRandomNumber(AVATARS_COUNT) + '.svg');
        currentComment.querySelector('.social__text').textContent = images[index].comments[window.pictures.commentsIndex];
        commentsContainer.appendChild(currentComment);
        commentsCount.textContent = window.pictures.commentsIndex + 1;
        if (window.pictures.commentsIndex >= images[index].comments.length - 1) {
          document.querySelector('.social__loadmore').classList.add('visually-hidden');
        }
      }
    },
    clearComments: function () {
      window.pictures.commentsIndex = 0;
      window.pictures.maxCommentsIndex = 5;
      document.querySelector('.social__loadmore').classList.remove('visually-hidden');
    },
    createPhotoElements: function (images) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < images.length; i++) {
        var currentImage = images[i];
        var photoElement = singlePhoto.cloneNode(true);

        photoElement.querySelector('.picture__img').setAttribute('src', currentImage.url);
        photoElement.querySelector('.picture__stat--likes').textContent = currentImage.likes;
        photoElement.querySelector('.picture__stat--comments').textContent = currentImage.comments.length;

        photoElement.addEventListener('click', function (evt) {

          window.pictures.bigPicture.classList.remove('hidden');
          document.body.classList.add('modal-open');

          var currentPhotoUrl = evt.currentTarget.querySelector('.picture__img').getAttribute('src');
          var currentPhotoLikes = evt.currentTarget.querySelector('.picture__stat--likes').textContent;
          var currentPhotoCommentsCount = evt.currentTarget.querySelector('.picture__stat--comments').textContent;

          bigPictureImage.setAttribute('src', currentPhotoUrl);
          bigPictureLikes.textContent = currentPhotoLikes;
          bigPictureComments.textContent = currentPhotoCommentsCount;

          bigPictureDescription.textContent = window.util.getRandomElement(DESCRIPTIONS);

          commentsContainer.innerHTML = ''; // FIXME:
          window.pictures.index = window.pictures.getArrayIndex(currentPhotoUrl, images);
          window.pictures.fillComments(images, window.pictures.index);
        });

        fragment.appendChild(photoElement);
      }

      loadMore.addEventListener('click', function () { // Найти способ снять обработчик
        window.pictures.maxCommentsIndex += 5;
        window.pictures.fillComments(images, window.pictures.index);
      });

      photosListElement.appendChild(fragment);
    }
  };
})();
