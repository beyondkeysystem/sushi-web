(function() {

	'use strict';

	angular.module('directives.home-slider', [
		'ui.bootstrap',
		'resources.article'
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
					'Article',
					function($scope, Article) {

						$scope.interval = 2500;

						$scope.news = [
							{
								title: 'Bienvenido New York Roll!',
								description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet.',
								image: '/img/slides/0001.jpg',
								active: true
							},
							{
								title: 'Lorem ipsum sit amet!',
								description: 'Beatiful flowers in Kolymbari, Crete.Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
								image: '/img/slides/0002.jpg',
								active: false
							},
							{
								title: 'Bienvenido New York Roll!',
								description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet.',
								image: '/img/slides/0001.jpg',
								active: false
							},
							{
								title: 'Lorem ipsum sit amet!',
								description: 'Beatiful flowers in Kolymbari, Crete.Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
								image: '/img/slides/0002.jpg',
								active: false
							}
						];

						Article.FetchAll().then(function (news) {
							console.log(news);
						},function (news) {
							console.error(news);
						});
					}
				]
			};
		}
	]);
})();
