(function() {

	'use strict';

	angular.module('services.global', [
			'ngRoute'
		]).factory('GlobalService', [
			'$location',
			function($location) {

				var _branch = undefined;

				var _setBranch = function(branch, redirectIfWrong) {
					var branches = ['funes', 'rosario'];
					if(branches.indexOf(branch) >= 0){
						_branch = branch;
					} else if(redirectIfWrong) {
						$location.path('/error/404');
					} else {
						_branch = undefined;
					}
					return _branch;
				};

				var _getCurrentPage = function () {
					return $location.path().substr($location.path().lastIndexOf('/')+1);
				};

				return {
					Branch: function(branch, redirectIfWrong) {
						if(angular.isString(branch) && branch.length > 0) {
							return _setBranch(branch, redirectIfWrong);
						} else if(redirectIfWrong) {
							$location.path('/error/404');
						} else {
							return _branch;
						}
					},
					Page: function() {
						return _getCurrentPage();
					}
				};
			}
		]);
})();
