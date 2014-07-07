var navibar = angular.module('navibar', []);

navibar.controller('navibarCtrl',
 ['$scope', '$location',
  function ($scope, $location) {
   $scope.testingmyvar = 'navibar controller';
    };        
}]);
