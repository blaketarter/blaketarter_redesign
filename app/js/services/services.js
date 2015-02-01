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

  factory.get = function(query) {
    var key = Object.keys(query)[0],
        value = query[key],
        result = null,
        i, ii;

    for (i = 0, ii = factory.list.length; i < ii; i++) {
      if (value == factory.list[i][key]) {
        result = factory.list[i];
      }
    }

    return result;
  };

  factory.getByMachineReadable = function(machine) {
    var key = 'title',
        value = machine,
        result = null,
        i, ii;

    for (i = 0, ii = factory.list.length; i < ii; i++) {
      if (value == factory.getMachineReadable(factory.list[i][key])) {
        result = factory.list[i];
      }
    }

    return result;
  };

  factory.getStatic = function(query) {
    var filePath = 'static/blog/',
        extension = '.md',
        i, ii, blog;

    if (typeof query === 'string') {
      filePath += query + extension;
    } else {
      blog = factory.get(query);

      if (blog) {
        filePath += factory.getMachineReadable(blog.title) + extension;
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

  factory.get = function(query) {
    var key = Object.keys(query)[0],
        value = query[key],
        result = null,
        i, ii;

    for (i = 0, ii = factory.list.length; i < ii; i++) {
      if (value == factory.list[i][key]) {
        result = factory.list[i];
      }
    }

    return result;
  };

  factory.getByMachineReadable = function(machine) {
    var key = 'title',
        value = machine,
        result = null,
        i, ii;

    for (i = 0, ii = factory.list.length; i < ii; i++) {
      if (value == factory.getMachineReadable(factory.list[i][key])) {
        result = factory.list[i];
      }
    }

    return result;
  };

  factory.getStatic = function(query) {
    var filePath = 'static/work/',
        extension = '.md',
        i, ii, work;

    if (typeof query === 'string') {
      filePath += query + extension;
    } else {
      work = factory.get(query);

      if (work) {
        filePath += factory.getMachineReadable(work.title) + extension;
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
