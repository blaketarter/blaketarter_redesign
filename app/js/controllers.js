bt.controller('navController', function($scope, $location) {
 $scope.$on('$locationChangeStart', function() {
   $scope.selected = $location.$$url.replace('/', '');
 });
});

bt.controller('footerController', function($scope) {

});

bt.controller('homeController', function($scope, $timeout) {
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

      skillItem.setAttribute('style', 'box-shadow: inset -' + skillItem.offsetWidth + 'px 0px 0px 0px rgba(0, 89, 74, 0.6);');

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

  chooseSkillSet(true);

  $timeout(chooseSkillSet, 5000);
});

bt.controller('aboutController', function($scope) {

});

bt.controller('workController', function($scope) {

});

bt.controller('blogController', function($scope) {

});
