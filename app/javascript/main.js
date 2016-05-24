(function(){
	//var angular = require('node_modules/angular/angular.js');
	var app = angular.module('myApp', ['ngCsvImport']);
	var dataCSV;

	app.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
    	$scope.firstName= "John";
    	$scope.lastName= "Doe";



$scope.readCSV = function() {
		// http get request to read CSV file content
		$http.get('data/data.csv').success($scope.processData);
	};

	$scope.processData = function(allText) {
		// split content based on new line
		var allTextLines = allText.split(/\r\n|\n/);
		var headers = allTextLines[0].split(',');
		var lines = [];

		for ( var i = 0; i < allTextLines.length; i++) {
			// split content based on comma
			var data = allTextLines[i].split(',');
			if (data.length == headers.length) {
				var tarr = [];
				for ( var j = 0; j < headers.length; j++) {
					tarr.push(data[j]);
				}
				lines.push(tarr);
			}
		}
		$scope.data = lines;
	};

    	$http({
			method: 'GET',
			url: 'data/data.csv',
		}).then(function successCallback(response) {
			
			dataCSV = String(response.data);


		// this callback will be called asynchronously
		// when the response is available
		}, function errorCallback(response) {
			console.log(response);
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		});

	}]);



}());



/*
var angular = require('angular');


function test(){
	console.log('testssss11sswwwssddd');
}

test();*/