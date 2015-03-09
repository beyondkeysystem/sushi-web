(function() {

	'use strict';

	angular.module('services.general', [
			'resources.general'
		]).factory('GeneralService', [
			'General',
			function(General) {

				var _config = {
						loading: false,
						funesAmTimeFrom: '',
						funesAmTimeTo: '',
						funesPmTimeFrom: '',
						funesPmTimeTo: '',
						rosarioAmTimeFrom: '',
						rosarioAmTimeTo: '',
						rosarioPmTimeFrom: '',
						rosarioPmTimeTo: '',
						timeRanges: {
							funesAm: [],
							funesPm: [],
							rosarioAm: [],
							rosarioPm: []
						},
						minOrderPrice: 0,
						closed: false
					};

				var _getColumns = function () {
					return [
						{id: 'name', name: 'Nombre', isEditable: false, type: 'text'},
						{id: 'value', name: 'Valor', isEditable: true, type: 'text'}
					]
				};

				var _getTimeRange = function (timeFrom, timeTo) {
					var i, minute = '',
						isFirst = false,
						isLast = false,
						range = [],
						arrayFrom = timeFrom.split(':'),
						hourFrom = isNaN(arrayFrom[0]) || parseInt(arrayFrom[0]) < 0 || parseInt(arrayFrom[0]) > 23 ? 0 : parseInt(arrayFrom[0]),
						minuteFrom = isNaN(arrayFrom[1]) || parseInt(arrayFrom[1]) < 0 || parseInt(arrayFrom[1]) > 59 ? 0 : parseInt(arrayFrom[1]),
						arrayTo = timeTo.split(':'),
						hourTo = isNaN(arrayTo[0]) || parseInt(arrayTo[0]) < 0 || parseInt(arrayTo[0]) > 23 ? 0 : parseInt(arrayTo[0]),
						minuteTo = isNaN(arrayTo[1]) || parseInt(arrayTo[1]) < 0 || parseInt(arrayTo[1]) > 59 ? 0 : parseInt(arrayTo[1]);
					for(i = hourFrom; i <= hourTo; i++) {
						isFirst = i === hourFrom;
						isLast = i === hourTo;
						if(isFirst) {
							if(minuteFrom > 9) {
								range.push(''+hourFrom+':30');
							} else {
								range.push(''+hourFrom+':00');
								range.push(''+hourFrom+':30');
							}
						} else if(isLast) {
							if(minuteTo > 9) {
								range.push(''+hourTo+':00');
								range.push(''+hourTo+':30');
							} else {
								range.push(''+hourTo+':00');
							}
						} else {
							range.push(''+i+':00');
							range.push(''+i+':30');
						}
					}
					return range;
				};

				var _getCurrentTimeRange = function (branch) {
					var i, arrayAm, hourAm, current,
						timeRange = [],
						now = (new Date()).getHours();
					if(branch === 'funes') {
						arrayAm = _config.funesAmTimeTo.split(':');
						hourAm = isNaN(arrayAm[0]) || parseInt(arrayAm[0]) < 0 || parseInt(arrayAm[0]) > 23 ? 0 : parseInt(arrayAm[0]);
						if(now > hourAm){
							current = _config.timeRanges.funesPm;
						} else {
							current = _config.timeRanges.funesAm;
						}
					} else {
						arrayAm = _config.rosarioAmTimeTo.split(':');
						hourAm = isNaN(arrayAm[0]) || parseInt(arrayAm[0]) < 0 || parseInt(arrayAm[0]) > 23 ? 0 : parseInt(arrayAm[0]);
						if(now > hourAm){
							current = _config.timeRanges.rosarioPm;
						} else {
							current = _config.timeRanges.rosarioAm;
						}
					}
					for (i = 0; i < (current.length-1); i++) {
						timeRange.push(current[i] +' - '+current[i+1]);
					};
					return timeRange;
				};

				_config.loading = true;
				General.FetchAll().then(
					function (data) {
						var i, key, value;
						_config.loading = false;
						for (i = data.length - 1; i >= 0; i--) {
							key = data[i].name;
							value = data[i].value;
							if(key == 'minOrderPrice'){
								value = isNaN(value) || parseInt(value) < 0 ? 0 : parseInt(value);
							}
							if(key == 'closed'){
								value = !!value;
							}
							_config[key] = value;
						}
						for (key in _config.timeRanges) {
							switch(key) {
								case 'funesAm':
									_config.timeRanges.funesAm = _getTimeRange(_config.funesAmTimeFrom, _config.funesAmTimeTo);
									break;
								case 'funesPm':
									_config.timeRanges.funesPm = _getTimeRange(_config.funesPmTimeFrom, _config.funesPmTimeTo);
									break;
								case 'rosarioAm':
									_config.timeRanges.rosarioAm = _getTimeRange(_config.rosarioAmTimeFrom, _config.rosarioAmTimeTo);
									break;
								case 'rosarioPm':
									_config.timeRanges.rosarioPm = _getTimeRange(_config.rosarioPmTimeFrom, _config.rosarioPmTimeTo);
									break;
							}
						}
					}, 
					function (error) {
						_config.loading = false;
						console.error(error);
					}
				);

				return {
					GetAll: function() {
						return General.FetchAll();
					},
					GetColumns: function() {
						return _getColumns();
					},
					GetConfig: function() {
						return _config;
					},
					GetCurrentTimeRange: function (branch) {
						return _getCurrentTimeRange(branch);
					}
				};
			}
		]);
})();