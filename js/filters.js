'use strict';

(function () {
  var NEW_FILTER_PHOTOS = 10;

  var filters = document.querySelector('.img-filters');

  var filterPopular = filters.querySelector('#filter-popular');
  var filterNew = filters.querySelector('#filter-new');
  var filterDiscussed = filters.querySelector('#filter-discussed');

  filterPopular.addEventListener('click', onFilterPopularClick);
  filterNew.addEventListener('click', onFilterNewClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);

  function onFilterPopularClick() {
    getButtonClass(filterPopular);
    window.util.debounce(function () {
      clearPhotos(filterPopular);
      window.pictures.createPhotoElements(window.pictures.gallery);
    });
    removeEventListener('click', filterNew);
    removeEventListener('click', filterDiscussed);
  }

  function onFilterNewClick() {
    getButtonClass(filterNew);
    window.util.debounce(function () {
      clearPhotos();
      var newFilterGallery = [];
      window.util.getUniquePhotos(window.pictures.gallery, newFilterGallery, NEW_FILTER_PHOTOS);
      window.pictures.createPhotoElements(newFilterGallery);
      newFilterGallery = [];
    });
    removeEventListener('click', filterPopular);
    removeEventListener('click', filterDiscussed);
  }

  function onFilterDiscussedClick() {
    getButtonClass(filterDiscussed);
    window.util.debounce(function () {
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

  function clearPhotos() {
    [].forEach.call(document.querySelectorAll('.picture__link'), function (i) {
      i.parentNode.removeChild(i);
    });
  }

  function getButtonClass(element) {
    var filterForm = document.querySelectorAll('.img-filters__button');
    filterForm.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    element.classList.add('img-filters__button--active');
  }
})();
