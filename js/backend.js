'use strict';

(function () {
  var DATA_URLS = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST: 'https://js.dump.academy/kekstagram'
  };

  var getRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    receiveData: function (onLoad, onError) {
      var xhr = getRequest(onLoad, onError);
      xhr.open('GET', DATA_URLS.GET);
      xhr.send();
    },
    sendData: function (data, onLoad, onError) {
      var xhr = getRequest(onLoad, onError);
      xhr.open('POST', DATA_URLS.POST);
      xhr.send(data);
    }
  };
})();
