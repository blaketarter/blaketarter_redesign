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
                .otherwise({
                    redirectTo: '/404'
                });

            // $locationProvider.html5Mode(true);
        }]);
