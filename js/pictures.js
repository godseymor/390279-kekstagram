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

  window.pictures = {
    uploadFileOverlay: document.querySelector('.img-upload__overlay'),
    bigPicture: document.querySelector('.big-picture.overlay')
  };

  function onLoad(data) {
    createPhotoElements(data);
  }
  function onError(message) {
    window.util.serverError(message);
  }

  function fillComments(currentPhotoUrl, images) {
    images.forEach(function (item, i, arr) {
      if (currentPhotoUrl === arr[i].url) {
        arr[i].comments.forEach(function (comment, j) {
          var currentComment = singleComment.cloneNode(true);
          currentComment.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + window.util.getRandomNumber(window.constants.MAX_COMENTS_COUNT) + '.svg');
          currentComment.querySelector('.social__text').textContent = arr[i].comments[j];
          commentsContainer.appendChild(currentComment);
        });
      }
    });
  }

  function createPhotoElements(images) {
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

        fillComments(currentPhotoUrl, images);

        document.querySelector('.social__comment-count').classList.add('visually-hidden');
        document.querySelector('.social__loadmore').classList.add('visually-hidden');
      });

      fragment.appendChild(photoElement);
    }
    photosListElement.appendChild(fragment);
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
})();
