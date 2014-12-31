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

              function navCheck() {
                // scroll = scrollElement.scrollTop;
                //
                // if (scroll > height) {
                //   nav.className = 'nav mini';
                // } else {
                //   nav.className = 'nav';
                // }
              }

              navCheck();

              outdatedBrowser({
                bgColor: '#f25648',
                color: '#ffffff',
                lowerThan: 'transform',
                languagePath: ''
              })

              window.onscroll = navCheck;
            });
         });
        });
