(function() {

	'use strict';

	angular.module('config.routes', [])
	.provider('Routes', [
		function() {

			var accessLevels = {
				'public': [ ],
				'user': ['user'],
				'admin': ['user', 'admin']
			};

			var routes = [
			/* ***************** Public ***************** */
			{
				'url': '/error/:error',
				'template': '/partials/pages/error.html',
				'controller': 'Error',
				'roles': accessLevels['public']
			},
			{
				'url': '/login',
				'template': '/partials/pages/login.html',
				'controller': 'Login',
				'roles': accessLevels['public']
			},
			{
				'url': '/',
				'template': '/partials/pages/index.html',
				'controller': 'Index',
				'roles': accessLevels['public']
			},
			{
				'url': '/:branch',
				'template': '/partials/pages/home.html',
				'controller': 'Index',
				'roles': accessLevels['public']
			},
			{
				'url': '/:branch/mapa',
				'template': '/partials/pages/map.html',
				'controller': 'Index',
				'roles': accessLevels['public']
			},
			{
				'url': '/:branch/franquicias',
				'template': '/partials/pages/franchises.html',
				'controller': 'Index',
				'roles': accessLevels['public']
			},
			{
				'url': '/:branch/contacto',
				'template': '/partials/pages/contact.html',
				'controller': 'Index',
				'roles': accessLevels['public']
			},
			/* ***************** User ***************** */
			{
				'url': '/pedidos',
				'template': '/partials/pages/order.html',
				'controller': 'order',
				'roles': accessLevels['user']
			},
			{
				'url': '/logout',
				'template': '/partials/pages/logout.html',
				'controller': 'Logout',
				'roles': accessLevels['public']
			}
			];

			this.getRoutes = function() {
				return routes;
			};

			this.$get = function() {
				return {
					accessLevels: accessLevels,
					routes: routes
				};
			};
		}
	]);
})();
