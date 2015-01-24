var bt = angular
        .module('bt', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'homeController'
                })
                .when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'homeController'
                })
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'aboutController'
                })
                .when('/work', {
                    templateUrl: 'views/work.html',
                    controller: 'workController'
                })
                .when('/blog', {
                    templateUrl: 'views/blog.html',
                    controller: 'blogController'
                })
                .otherwise({
                    redirectTo: '/404'
                });

            // $locationProvider.html5Mode(true);
        }])
        .run( function($rootScope, $location) {
          $rootScope.$on('$routeChangeSuccess', function() {
            angular.element(document).ready(function() {
              var nav = document.getElementById('nav'),
                  subNav = document.getElementById('sub-nav'),
                  height = window.innerHeight,
                  scroll;

              var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
              var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
              var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0; // At least Safari 3+: "[object HTMLElementConstructor]"
              var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
              var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

              var currentPage, scrollElement; // Globals

              (function findCurrentPage() {
                currentPage = window.location.pathname;

                if (currentPage.length) {
                  currentPage = currentPage.replace(/\W+/g, '');

                  if (!currentPage.length) {
                    currentPage = 'home';
                  }
                } else {
                  currentPage = window.location.href;
                }
              })();

              (function detectScrollElement() {
                if (isFirefox || isIE) {
                  scrollElement = document.documentElement;
                } else {
                  scrollElement = document.body;
                }

                return scrollElement;
              })();

              (function doScrollThings() {
                function isElementInViewport (el) {
                  var rect = el.getBoundingClientRect();

                  return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
                  );
                }

                var elemList, el1Animated = false, el2Animated = false, c, cc, time;

                function onVisibilityChange (el1, el2, callback) {
                  return function () {
                    if (window.page && window.page === 'home') {
                      if (isElementInViewport(el1) && !el1Animated) {
                        el1Animated = true;
                        elemList = document.getElementsByClassName('tile');

                        for (c = 0, cc = elemList.length; c < cc; c++) {
                          time = 250*(c+1);

                          (function() {
                            var index = c;
                            setTimeout(function() {
                              elemList[index].className = 'tile animated bounceIn';
                            }, time);
                          })();
                        }
                      } else if (isElementInViewport(el2) && !el2Animated) {
                        el2Animated = true;
                        elemList = document.getElementsByClassName('pen');

                        for (c = 0, cc = elemList.length; c < cc; c++) {
                          time = 250*(c+1);

                          (function() {
                            var index = c;
                            setTimeout(function() {
                              elemList[index].className = 'pen animated bounceIn';
                            }, time);
                          })();
                        }
                      }
                    }
                  }
                }

                var animateElem1 = document.getElementsByClassName('tile')[0],
                    animateElem2 = document.getElementsByClassName('pen')[0];

                var handler = onVisibilityChange(animateElem1, animateElem2);

                if (window.addEventListener) {
                  addEventListener('DOMContentLoaded', handler, false);
                  addEventListener('load', handler, false);
                  addEventListener('scroll', handler, false);
                  addEventListener('resize', handler, false);
                } else if (window.attachEvent)  {
                  attachEvent('onDOMContentLoaded', handler); // IE9+ :(
                  attachEvent('onload', handler);
                  attachEvent('onscroll', handler);
                  attachEvent('onresize', handler);
                  }
              })();

              outdatedBrowser({
                bgColor: '#f25648',
                color: '#ffffff',
                lowerThan: 'transform',
                languagePath: ''
              });
            });
         });
        });
