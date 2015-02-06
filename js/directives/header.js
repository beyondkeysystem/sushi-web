(function() {

	'use strict';

	angular.module('directives.header', [
		'services.global',
		'ui.bootstrap'
	])
	.directive('header', [
		function() {
			return {
				restrict: 'A',
				scope: { },
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/header.html',
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
