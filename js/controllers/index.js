(function() {

	'use strict';
	angular.module('controllers.index', [
		'ngRoute',
		'ui.bootstrap'
	]).controller('IndexController', [
		'$scope',
		'$location',
		'$routeParams',
		function($scope, $location, $routeParams) {
			var _branches = [undefined, '', 'funes', 'rosario'];

			if(_branches.indexOf($routeParams.branch) >= 0){
				$scope.branch = $routeParams.branch;
			} else {
				$location.path('/error/404');
			}

			$scope.page = $location.path().substr($location.path().lastIndexOf('/')+1);
		}
	]);
})();
