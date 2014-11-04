bt.controller('navController', function($scope) {
  $scope.$watch('$viewContentLoaded', function(){
    var nav = document.getElementById('nav');

    window.onscroll = function (e) {
      if (document.body.scrollTop > 50) {
        nav.className = 'nav mini';
      } else {
        nav.className = 'nav';
      }
    }
 });
});

bt.controller('footerController', function($scope) {

});

bt.controller('homeController', function($scope) {

});
