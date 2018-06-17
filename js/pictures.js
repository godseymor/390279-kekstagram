'use strict';

var URLS_COUNT = 25;
var LIKES_COUNT = 200;
var MIN_LIKES_COUNT = 15;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var MAX_COMENTS_COUNT = 6;
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var COMMENTS_COUNT = 2;
var ESC_KEYCODE = 27;
var EFFECTS = [
  {
    name: 'none'
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    maxValue: 1,
    measure: ''
  },
  {
    name: 'sepia',
    filter: 'sepia',
    maxValue: 1,
    measure: ''
  },
  {
    name: 'marvin',
    filter: 'invert',
    maxValue: 100,
    measure: '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    maxValue: 3,
    measure: 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    maxValue: 3,
    measure: ''
  }
];

var INITIAL_COORDS = {
  start: 0,
  max: 450
};

var MAX_PERCENT = 100;
var gallery = [];

// функция получения случайного значения
var getRandomItem = function (n) {
  if (n === LIKES_COUNT) {
    n = Math.floor(Math.random() * n);
    if (n < MIN_LIKES_COUNT) {
      return getRandomItem(LIKES_COUNT);
    }
  } else if (typeof (n) === 'object') {
    n = (Math.floor(Math.random() * n.length));
  } else if (n === MAX_COMENTS_COUNT) {
    n = (Math.ceil(Math.random() * n));
  }
  return n;
};

// функция генерации массива с изображениями
var generatePhotos = function (images) {
  for (var i = 1; i <= images; i++) {
    gallery.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomItem(LIKES_COUNT),
      comments: COMMENTS[getRandomItem(COMMENTS)],
      description: DESCRIPTIONS[getRandomItem(DESCRIPTIONS)]
    });
  }
  return images;
};

// функция отрисовки всех изображений
var createPhotoElements = function (images) {
  generatePhotos(images);
  var pictureTemplate = document.querySelector('#picture').content;
  var photosListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < images; i++) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').setAttribute('src', gallery[i].url);
    photoElement.querySelector('.picture__stat--likes').textContent = gallery[i].likes;
    photoElement.querySelector('.picture__stat--comments').textContent = getRandomItem(MAX_COMENTS_COUNT);

    fragment.appendChild(photoElement);
  }

  photosListElement.appendChild(fragment);
};

// функция отрисовки большого изображения и его контента
var createPictureElements = function () {
  var bigPicture = document.querySelector('.big-picture');

  bigPicture.querySelector('.big-picture__img').setAttribute('src', gallery[0].url);
  bigPicture.querySelector('.likes-count').textContent = gallery[0].likes;
  bigPicture.querySelector('.comments-count').textContent = getRandomItem(MAX_COMENTS_COUNT);

  var bigPictureComments = document.querySelector('.social__comments');

  // небольшая функция для заполнения комментариев под фото случайными значениями
  var fillCommentsContent = function () {
    for (var j = 1; j <= COMMENTS_COUNT; j++) {
      bigPictureComments.querySelector('.social__comment:nth-child(' + j + ') .social__picture').setAttribute('src', 'img/avatar-' + getRandomItem(MAX_COMENTS_COUNT) + '.svg');
      bigPictureComments.querySelector('.social__comment:nth-child(' + j + ') .social__text').textContent = gallery[j].comments;
    }
  };
  fillCommentsContent();

  bigPicture.querySelector('.social__caption').textContent = gallery[0].description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
};

createPhotoElements(URLS_COUNT);
createPictureElements(URLS_COUNT);

// MODULE4-TASK 1 START

// Загрузка изображения и показ формы редактирования

var imgUploadStart = document.querySelector('.img-upload__start');
var uploadFile = document.querySelector('#upload-file');
var uploadFileOverlay = document.querySelector('.img-upload__overlay');
var uploadFileOverlayClose = document.querySelector('#upload-cancel');
var main = document.querySelector('main');

var bigPicture = document.querySelector('.big-picture.overlay');
var bigPictureClose = document.querySelector('#picture-cancel');

var pictureLink = document.querySelectorAll('.picture__link');

for (var j = 0; j < URLS_COUNT; j++) {
  pictureLink[j].addEventListener('click', function () {
    bigPicture.classList.remove('hidden');
  });
}

uploadFile.addEventListener('change', function () {
  uploadFileOverlay.classList.remove('hidden');
  imgUploadScale.style.display = 'none';
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  uploadFileOverlay.classList.add('hidden');
  bigPicture.classList.add('hidden');
};

imgUploadStart.addEventListener('keydown', onPopupEscPress);
uploadFileOverlay.addEventListener('keydown', onPopupEscPress);
uploadFileOverlayClose.addEventListener('click', function () {
  closePopup();
});

main.addEventListener('keydown', onPopupEscPress);
bigPictureClose.addEventListener('click', function () {
  closePopup();
});

// Применение эффекта для изображения и Редактирование размера изображения

var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectsItem = document.querySelectorAll('.effects__item');
var imgUploadScale = document.querySelector('.img-upload__scale');
var currentFilter = '';

var onePixelIndent = INITIAL_COORDS.max / MAX_PERCENT;
var effectValue = function (filter) {
  for (var i = 0; i < EFFECTS.length; i++) {
    if (EFFECTS[i].name === filter) {
      var oneValuePercent = EFFECTS[i].maxValue / MAX_PERCENT;
      imgUploadPreview.style.filter = EFFECTS[i].filter + '(' + parseInt(scaleLevel.style.width, 10) * oneValuePercent / onePixelIndent + EFFECTS[i].measure + ')';
    }
  }
};

var effectAccept = function (i) {
  effectsItem[0].addEventListener('click', function () {
    imgUploadScale.style.display = 'none';
    imgUploadPreview.style.filter = 'none';
  });
  effectsItem[i].addEventListener('click', function () {
    imgUploadScale.style.display = 'block';
    getStyleForScale(INITIAL_COORDS.max);
    imgUploadPreview.className = 'img-upload__preview';
    imgUploadPreview.classList.add('effects__preview--' + EFFECTS[i].name);
    imgUploadPreview.removeAttribute('style');
    currentFilter = EFFECTS[i].name;
  });
};

for (var i = 1; i < EFFECTS.length; i++) {
  effectAccept(i);
}

var scaleLine = document.querySelector('.scale__line');
var pinHandle = scaleLine.querySelector('.scale__pin');
var scaleLevel = scaleLine.querySelector('.scale__level');


var getStyleForScale = function (coords) {
  pinHandle.style.left = coords + 'px';
  scaleLevel.style.width = coords + 'px';
};

pinHandle.addEventListener('mousedown', function (evt) {
  var startCoords = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    var pinHandleCoords = pinHandle.offsetLeft - shift;

    if (pinHandleCoords < INITIAL_COORDS.start) {
      pinHandleCoords = INITIAL_COORDS.start;
    }
    if (pinHandleCoords > INITIAL_COORDS.max) {
      pinHandleCoords = INITIAL_COORDS.max;
    }

    getStyleForScale(pinHandleCoords);
    effectValue(currentFilter);
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
