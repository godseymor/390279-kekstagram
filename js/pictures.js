'use strict';

var URLS = 25;
var LIKES = 200;
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
var gallery = [];

// функция получения случайного значения
var getRandomItem = function (n) {
  if (n === LIKES) {
    n = Math.floor(Math.random() * n);
    if (n < 15) {
      return getRandomItem(LIKES);
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
      likes: getRandomItem(LIKES),
      comments: COMMENTS[getRandomItem(COMMENTS)],
      description: DESCRIPTIONS[getRandomItem(DESCRIPTIONS)]
    });
  }
  return images;
};

// функция отрисовки всех изображений
var createPhotoElements = function (images) {
  generatePhotos(URLS);
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
    for (var j = 1; j <= 2; j++) {
      bigPictureComments.querySelector('.social__comment:nth-child(' + j + ') .social__picture').setAttribute('src', 'img/avatar-' + getRandomItem(MAX_COMENTS_COUNT) + '.svg');
      bigPictureComments.querySelector('.social__comment:nth-child(' + j + ') .social__text').textContent = gallery[j].comments;
    }
  };
  fillCommentsContent();

  bigPicture.querySelector('.social__caption').textContent = gallery[0].description;

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
};

createPhotoElements(URLS);
createPictureElements(URLS);
