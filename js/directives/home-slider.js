(function() {

	'use strict';

	angular.module('directives.home-slider', [
		'ui.bootstrap'
	])
	.directive('homeSlider', [
		function() {
			return {
				restrict: 'A',
				scope: { },
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/home-slider.html',
				controller: [
					'$scope',
					function($scope) {

						$scope.interval = 5000;

						$scope.news = [
							{
								title: 'Chania',
								description: 'The atmosphere in Chania has a touch of Florence and Venice.',
								image: {
									src: '/img/slides/0001.jpg',
									alt: 'Chania'
								},
								active: true
							},
							{
								title: 'Flower',
								description: 'Beatiful flowers in Kolymbari, Crete.',
								image: {
									src: '/img/slides/0002.jpg',
									alt: 'Flower'
								},
								active: false
							},
							{
								title: 'Chania',
								description: 'The atmosphere in Chania has a touch of Florence and Venice.',
								image: {
									src: '/img/slides/0001.jpg',
									alt: 'Chania'
								},
								active: false
							},
							{
								title: 'Flower',
								description: 'Beatiful flowers in Kolymbari, Crete.',
								image: {
									src: '/img/slides/0002.jpg',
									alt: 'Flower'
								},
								active: false
							}
						];

						$scope.next = function() {
							//$scope.carousel('next');
						};
					}
				]
			};
		}
	]);
})();
