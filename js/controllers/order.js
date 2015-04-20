(function() {

	'use strict';
	angular.module('controllers.order', [
		'ngRoute',
		'services.global',
		'services.general',
		'directives.categories',
		'directives.products',
		'directives.order'
	]).controller('OrderController', [
		'$scope',
		'$routeParams',
		'GlobalService',
		'GeneralService',
		function($scope, $routeParams, GlobalService, GeneralService) {
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
			$scope.config = GeneralService.GetConfig();
			$scope.popupShown = false;

			$scope.closePopup = function () {
				$scope.popupShown = false;
			};

			if ($scope.branch === 'rosario' && !$scope.config.rosarioOpen) {
				$scope.popupShown = true;
			} else if ($scope.branch === 'funes' && !$scope.config.funesOpen) {
				$scope.popupShown = true;
			};

			console.log($scope.branch, $scope.config.rosarioOpen, $scope.config.funesOpen, $scope.popupShown);
		}
	]);
})();
