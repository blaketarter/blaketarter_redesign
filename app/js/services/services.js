bt.factory('showdownFactory', function() {
  var factory = new Showdown.converter();

  return factory;
});

bt.factory('blogFactory', function($http, $q, localStorageService, showdownFactory) {
  var factory = {};

  factory.list = localStorageService.get('blogs') || [];

  factory.fetch = function() {
    return $q(function(resolve, reject) {
      $http.get('js/json/blogs.json')
      .success(function(data, status, headers, config) {
        localStorageService.set('blogs', data);
        factory.list = data;
        resolve(data);
      })
      .error(function(data, status, headers, config) {
        console.error(data, status);
        reject(data, status);
      });
    });
  };

  factory.getMachineReadable = function(title) {
    return title.replace(/\s/g, '-').toLowerCase();
  }

  factory.getStatic = function(id) {
    var filePath = 'static/blog/',
        extension = '.md',
        i, ii;

    for (i = 0, ii = factory.list.length; i < ii; i++) {
      if (id === factory.list[i].id) {
        filePath += factory.getMachineReadable(factory.list[i].title) + extension;
      }
    }

    return $q(function(resolve, reject) {
      $http.get(filePath)
      .success(function(data, status, headers, config) {
        resolve(showdownFactory.makeHtml(data));
      })
      .error(function(data, status, headers, config) {
        console.error(data, status);
        reject(data, status);
      });
    });
  }

  return factory;
});

bt.factory('workFactory', function($http, $q, localStorageService, showdownFactory) {
  var factory = {};

  factory.list = localStorageService.get('works') || [];

  factory.fetch = function() {
    return $q(function(resolve, reject) {
      $http.get('js/json/works.json')
      .success(function(data, status, headers, config) {
        localStorageService.set('works', data);
        factory.list = data;
        resolve(data);
      })
      .error(function(data, status, headers, config) {
        console.error(data, status);
        reject(data, status);
      });
    });
  };

  actory.getMachineReadable = function(title) {
    return title.replace(/\s/g, '-').toLowerCase();
  }

  factory.getStatic = function(id) {
    var filePath = 'static/work/',
        extension = '.md',
        i, ii;

    for (i = 0, ii = factory.list.length; i < ii; i++) {
      if (id === factory.list[i].id) {
        filePath += factory.getMachineReadable(factory.list[i].title) + extension;
      }
    }

    return $q(function(resolve, reject) {
      $http.get(filePath)
      .success(function(data, status, headers, config) {
        resolve(showdownFactory.makeHtml(data));
      })
      .error(function(data, status, headers, config) {
        console.error(data, status);
        reject(data, status);
      });
    });
  }

  return factory;
});
