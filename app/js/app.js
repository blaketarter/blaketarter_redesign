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

              function navCheck() {
                scroll = document.body.scrollTop;

                if (scroll > 80) {
                  nav.className = 'nav mini';
                } else {
                  nav.className = 'nav';
                }
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
