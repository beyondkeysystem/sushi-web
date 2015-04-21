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
		'$timeout',
		'$routeParams',
		'GlobalService',
		'GeneralService',
		function($scope, $timeout, $routeParams, GlobalService, GeneralService) {
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
			$scope.config = GeneralService.GetConfig(true);
			$scope.popupShown = false;

			$scope.closePopup = function () {
				$scope.popupShown = false;
			};

			$timeout(function () {
				if ($scope.branch === 'rosario' && !$scope.config.rosarioOpen) {
					$scope.popupShown = true;
				} else if ($scope.branch === 'funes' && !$scope.config.funesOpen) {
					$scope.popupShown = true;
				}
			}, 300);
		}
	]);
})();
