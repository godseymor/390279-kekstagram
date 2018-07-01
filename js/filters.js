'use strict';

(function () {
  var NEW_FILTER_PHOTOS = 10;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  function debounce(func) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);

  }

  var filters = document.querySelector('.img-filters');

  var filterPopular = filters.querySelector('#filter-popular');
  var filterNew = filters.querySelector('#filter-new');
  var filterDiscussed = filters.querySelector('#filter-discussed');

  filterPopular.addEventListener('click', onFilterPopularClick);
  filterNew.addEventListener('click', onFilterNewClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);

  function onFilterPopularClick() {
    getButtonClass(filterPopular);
    debounce(function () {
      clearPhotos(filterPopular);
      window.pictures.createPhotoElements(window.pictures.gallery);
    });
    removeEventListener('click', filterNew);
    removeEventListener('click', filterDiscussed);
  }

  function onFilterNewClick() {
    getButtonClass(filterNew);
    debounce(function () {
      clearPhotos();
      var newFilterGallery = [];
      getUniquePhotos(window.pictures.gallery, newFilterGallery, NEW_FILTER_PHOTOS);
      window.pictures.createPhotoElements(newFilterGallery);
      newFilterGallery = [];
    });
    removeEventListener('click', filterPopular);
    removeEventListener('click', filterDiscussed);
  }

  function onFilterDiscussedClick() {
    getButtonClass(filterDiscussed);
    debounce(function () {
      clearPhotos(filterDiscussed);
      var discussedFilterGallery = window.pictures.gallery.slice();
      discussedFilterGallery.sort(function (first, second) {
        if (first.comments.length > second.comments.length) {
          return -1;
        } else if (first.comments.length < second.comments.length) {
          return 1;
        } else {
          return 0;
        }
      });
      window.pictures.createPhotoElements(discussedFilterGallery);
    });
    removeEventListener('click', filterPopular);
    removeEventListener('click', filterNew);
  }

  // Функция очистки области
  function clearPhotos() {
    [].forEach.call(document.querySelectorAll('.picture__link'), function (i) {
      i.parentNode.removeChild(i);
    });
  }

  // Функция добавления класса кнопке
  function getButtonClass(element) {
    var filterForm = document.querySelectorAll('.img-filters__button');
    filterForm.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    element.classList.add('img-filters__button--active');
  }

  // функция получения случайных уникальных фотографий
  function getUniquePhotos(source, target, count) {
    for (var i = 0; i < count; i++) {
      var currentPhoto = window.util.getRandomElement(source);
      if (target.indexOf(currentPhoto) === -1) {
        target.push(currentPhoto);
      } else {
        i--;
      }
    }
  }

})();
