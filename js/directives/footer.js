(function() {

	'use strict';

	angular.module('directives.footer', [
		])
		.directive('footer', [
			function() {
				return {
					restrict: 'A',
					scope: { },
					replace: true,
					transclude: false,
					templateUrl: '/partials/directives/footer.html',
					controller: [
						'$scope',
						function($scope) {
						}
					]
				};
			}
		]);
})();
