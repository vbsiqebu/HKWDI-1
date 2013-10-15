'use strict'
angular.module('tickeyApp')
	.controller('HowToCtrl', function ($scope, $rootScope) {

		$scope.how = "Lorem Ipsum";

		$rootScope.is_how_to = true;
		$rootScope.play_now = false;
		$rootScope.home_button = false;

	});