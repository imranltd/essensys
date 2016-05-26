(function(){
	//var angular = require('node_modules/angular/angular.js');
	var app = angular.module('myApp', ['ngCsvImport']);

	app.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
		$scope.showMenu = false;

		$scope.csv = {
			content: null,
			header: true,
			headerVisible: true,
			separator: ',',
			separatorVisible: true,
			result: null,
			encoding: 'ISO-8859-1',
			encodingVisible: true,
    	};


		$scope.$watch('csv.content', fileLoaded);

		function fileLoaded(newValue){
			if(newValue !== null){
				//console.dir('newValue');
				processData(newValue);
			}
		}

		function processData(CSVdata) {
			// split content based on new line
			var allTextLines = CSVdata.split(/\r\n|\n/);
			var headers = allTextLines[0].split(',');
			var lines = [];

			for ( var i = 0; i < allTextLines.length; i++) {
				// split content based on comma
				var data = allTextLines[i].split(',');

				if (data.length == headers.length) {
					var tarr = [];
					for ( var j = 0; j < headers.length; j++) {
						item = data[j].split('_').join('');
						tarr.push(item);
					}
					lines.push(tarr);
				}
			}
			$scope.data = lines;
		}

		$scope.showMenu = function(){
			//alert('hi');
			$scope.showMenuToMe = true;
		};

    	$http({
			method: 'GET',
			url: 'data/data.csv',
		}).then(function successCallback(response) {
				processData(response.data);
		}, function errorCallback(response) {
				console.log(response);
		});
	}]);
}());