bt.controller('navController', function($scope, $location) {
 $scope.$on('$locationChangeStart', function() {
   $scope.selected = $location.$$url.replace('/', '');
 });
});

bt.controller('footerController', function($scope) {

});

bt.controller('homeController', function($scope, $timeout, $sce) {
  var skillset = [
        'Javascript',
        'AngularJS',
        'HTML',
        'CSS',
        'BackboneJS',
        'UnderscoreJS',
        'Phonegap',
        'Responsive Design',
        'Git',
        'Ajax',
        'jQuery'
      ],
      s = 0,
      sl = skillset.length;

  // e = element to scroll to, d = time to scroll in ms
  function scrollTo(e,d){if(d<0)return;var h=document.documentElement;if(h.scrollTop===0){var t=h.scrollTop;++h.scrollTop;h=t+1===h.scrollTop--?h:document.body;}if(typeof e==="object")e=e.offsetTop;scrollToX(h,h.scrollTop,e,0,1/d,20);}function scrollToX(e,a,b,t,v,s){if(t<0||t>1||v<=0)return;k=t-1;e.scrollTop=a-(a-b)*(k*k*k+1);t+=v*s;setTimeout(function(){scrollToX(e,a,b,t,v,s);},s);}

  function chooseSkillSet(init) {
    var tempSkill;

    if (s < sl) {
      tempSkill = skillset[s++];
    } else {
      s = 0;
      tempSkill = skillset[s];
    }

    if (init) {
      $scope.skill = tempSkill;
    } else {
      var skillItem = document.getElementsByClassName('skill')[0];

      skillItem.setAttribute('style', 'box-shadow: inset -' + skillItem.offsetWidth + 'px 0px 0px 0px rgba(255, 255, 255, 0.6);');

      $timeout(function() {
        $scope.skill = '';
        skillItem.setAttribute('style', '');

        $timeout(function() {
          var i = 0,
              l = tempSkill.length;

          function typeLetter() {
            if (i < l) {
              $scope.skill += tempSkill[i];
              i++;
              $timeout(typeLetter, 200);
            } else {
              $timeout(chooseSkillSet, 3500);
            }
          }

          $timeout(typeLetter, 200);
        }, 500);
      }, 1000);
    }
  }

  $scope.scroll = function(elId) {
    var el = document.getElementById(elId);
    scrollTo(el.offsetTop + 10, 500);
  }



  $scope.fun = function(e) {
    var x = e.offsetX, y = e.offsetY,
        el = document.createElement('div'),
        fun = document.getElementById('fun');

    el.className = 'fun-dot';
    el.setAttribute('style', 'top: ' + y + 'px; left: ' + x + 'px;');

    fun.appendChild(el);

    $timeout(function() {
      el.setAttribute('style', 'top: ' + y + 'px; left: ' + x + 'px; border-width: ' + fun.offsetWidth + 'px;');
      $timeout(function() {
        el.setAttribute('style', 'top: ' + y + 'px; left: ' + x + 'px; border-width: ' + fun.offsetWidth + 'px; opacity: 0;')
        $timeout(function() {
          fun.removeChild(el);
        }, 1000);
      }, 500);
    }, 10);
  }

  chooseSkillSet(true);

  $timeout(chooseSkillSet, 5000);

  function sendRequest(url,callback,postData) {
      var req = createXMLHTTPObject();
      if (!req) return;
      var method = (postData) ? "POST" : "GET";
      req.open(method,url,true);
      // req.setRequestHeader('User-Agent','XMLHTTP/1.0');
      if (postData)
          req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      req.onreadystatechange = function () {
          if (req.readyState != 4) return;
          if (req.status != 200 && req.status != 304) {
  //          alert('HTTP error ' + req.status);
              return;
          }
          callback(req);
      }
      if (req.readyState == 4) return;
      req.send(postData);
  }

  var XMLHttpFactories = [
      function () {return new XMLHttpRequest()},
      function () {return new ActiveXObject("Msxml2.XMLHTTP")},
      function () {return new ActiveXObject("Msxml3.XMLHTTP")},
      function () {return new ActiveXObject("Microsoft.XMLHTTP")}
  ];

  function createXMLHTTPObject() {
      var xmlhttp = false;
      for (var i=0;i<XMLHttpFactories.length;i++) {
          try {
              xmlhttp = XMLHttpFactories[i]();
          }
          catch (e) {
              continue;
          }
          break;
      }
      return xmlhttp;
  }

  $scope.codepen = ['1', '2', '3', '4', '5', '6'];

  // $timeout(function() {
  //   sendRequest('http://codepen.io/blaketarter/popular/feed/', displayCodepen);
  // }, 500);

  // sendRequest('http://codepen.io/blaketarter/activity/feed/', displayCodepenActivity);

  function displayCodepen(data) {
      var cpdoc = data.responseXML,
          items = [].slice.call(cpdoc.getElementsByTagName('item'), 0, 6),
          parsedXML = [].map.call(items, function(el, i) {
            return {
              title: el.getElementsByTagName('title')[0].innerHTML,
              link: el.getElementsByTagName('link')[0].innerHTML,
              embed: $sce.trustAsResourceUrl(el.getElementsByTagName('link')[0].innerHTML.replace('/pen/', '/embed/')),
              author: el.getElementsByTagName('author')[0].innerHTML,
              description: el.getElementsByTagName('description')[0],
              subject: el.getElementsByTagName('subject')[0].innerHTML,
              date: el.getElementsByTagName('date')[0].innerHTML
            }
          });

      $scope.codepen = parsedXML.slice(0, 6);
      // console.log(parsedXML);
  }

  function displayCodepenActivity(data) {
    var cpdoc = data.responseXML,
        items = cpdoc.getElementsByTagName('item'),
        parsedXML = [].map.call(items, function(el, i) {
          console.log(el);
          return {
            title: el.getElementsByTagName('title')[0].innerHTML,
            link: el.getElementsByTagName('link')[0].innerHTML,
            // embed: $sce.trustAsResourceUrl(el.getElementsByTagName('link')[0].innerHTML.replace('/pen/', '/embed/')),
            author: el.getElementsByTagName('author')[0].innerHTML,
            description: el.getElementsByTagName('description')[0].textContent,
            // subject: el.getElementsByTagName('subject')[0].innerHTML,
            // date: el.getElementsByTagName('date')[0].innerHTML
          }
        });

    $scope.codepenActivity = parsedXML.slice(0, 4);
    console.log($scope.codepenActivity);
  }

  $scope.open = function(href) {
    window.open(href, true);
  }

  var tempBlogs = window.localStorage.getItem('blogs');
  if (null !== tempBlogs) {
    $scope.blogs = JSON.parse(tempBlogs);
  } else {
    $scope.blogs = [];
  }

  sendRequest('js/blogs.json', displayBlogs);

  function displayBlogs(data) {
    if (data && data.status === 200 && data.response) {
      var blogs = JSON.parse(data.response);

      if ($scope.blogs.length) {
        $scope.blogs = [];
      }

      angular.forEach(blogs, function(el, i) {
        el.bodyTrunc = el.body;

        $scope.blogs.push(el);
      });

      window.localStorage.setItem('blogs', JSON.stringify($scope.blogs));
    }
  }
});

bt.controller('aboutController', function($scope) {

});

bt.controller('workController', function($scope) {

});

bt.controller('blogController', function($scope) {

});
