(function(){
	//var angular = require('node_modules/angular/angular.js');
	var app = angular.module('myApp', []);

	app.controller('myCtrl', function($scope) {
    	$scope.firstName= "John";
    	$scope.lastName= "Doe";

    	test();
	});

	function test(){
		console.log('test');
	}

}());



/*
var angular = require('angular');


function test(){
	console.log('testssss11sswwwssddd');
}

test();*/