'use strict';

(function () {
  var INITIAL_COORDS = {
    start: 0,
    max: 450
  };
  var MAX_PERCENT = 100;
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
  var SIZES = {
    initial: 100,
    current: 100,
    resize: 25
  };

  window.effects = {
    imgUploadScale: document.querySelector('.img-upload__scale')
  };

  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectsItem = document.querySelectorAll('.effects__item');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var currentFilter = '';

  var scaleLine = document.querySelector('.scale__line');
  var pinHandle = scaleLine.querySelector('.scale__pin');
  var scaleLevel = scaleLine.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');

  var resizeMinus = document.querySelector('.resize__control--minus');
  var resizePlus = document.querySelector('.resize__control--plus');
  var resizeInputValue = document.querySelector('.resize__control--value');

  var onePixelIndent = INITIAL_COORDS.max / MAX_PERCENT;
  function effectValue(filter) {
    for (var i = 0; i < EFFECTS.length; i++) {
      if (EFFECTS[i].name === filter) {
        var oneValuePercent = EFFECTS[i].maxValue / MAX_PERCENT;
        var oneScalePercent = INITIAL_COORDS.max / MAX_PERCENT;
        imgUploadPreview.style.filter = EFFECTS[i].filter + '(' + (parseInt(scaleLevel.style.width, 10) * oneValuePercent / onePixelIndent).toFixed(2) + EFFECTS[i].measure + ')';
        scaleValue.value = (parseInt(scaleLevel.style.width, 10) / oneScalePercent).toFixed();
      }
    }
  }
  // Функция снятия фильтров с изображения
  function removeFilter(index) {
    effectsItem[index].addEventListener('click', function () {
      imgUploadScale.style.display = 'none';
      imgUploadPreview.style.filter = 'none';
    });
  }
  // Функция применения фильтров на изображение
  function effectAccept(i) {
    removeFilter(0);
    effectsItem[i].addEventListener('click', function () {
      imgUploadScale.style.display = 'block';
      getStyleForScale(INITIAL_COORDS.max);
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('effects__preview--' + EFFECTS[i].name);
      imgUploadPreview.removeAttribute('style');
      SIZES.current = SIZES.initial;
      resizeInputValue.value = SIZES.initial + '%';
      scaleValue.value = SIZES.initial;
      currentFilter = EFFECTS[i].name;
    });
  }

  // Наложение эффекта на изображение
  function getStyleForScale(coords) {
    pinHandle.style.left = coords + 'px';
    scaleLevel.style.width = coords + 'px';
  }

  for (var i = 1; i < EFFECTS.length; i++) {
    effectAccept(i);
  }

  pinHandle.addEventListener('mousedown', function (evt) {
    var startCoords = evt.clientX;

    function onMouseMove(moveEvt) {
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
    }

    function onMouseUp() {
      effectValue(currentFilter);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Масштаб

  function scalePhoto() {
    resizeInputValue.value = SIZES.current + '%';
    imgUploadPreview.style.transform = 'scale(' + SIZES.current / SIZES.initial + ')';
  }

  resizeMinus.addEventListener('click', function () {
    if (SIZES.current > SIZES.resize) {
      SIZES.current -= SIZES.resize;
      scalePhoto();
    }
  });

  resizePlus.addEventListener('click', function () {
    if (SIZES.current < SIZES.initial) {
      SIZES.current += SIZES.resize;
      scalePhoto();
    }
  });
})();
