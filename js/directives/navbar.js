(function() {

	'use strict';

	angular.module('directives.navbar', [
		'services.global',
	])
	.directive('navbar', [
		function() {
			return {
				restrict: 'A',
				scope: { },
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/navbar.html',
				controller: [
					'$scope',
					'GlobalService',
					function($scope, GlobalService) {
						$scope.branch = GlobalService.Branch();
					}
				]
			};
		}
	]);
})();
