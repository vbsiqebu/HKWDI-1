'use strict';

angular.module('tickeyApp')
  .controller('MatchPlayerCtrl', function ($scope, angularFire, $location) {
    $scope.waitingRoom = {};
    var waitingRoomRef = new Firebase("https://tttdatabase.firebaseio.com/waiting_room");
    $scope.promise = angularFire(waitingRoomRef, $scope, "waitingRoom");

    // $scope.promise.then (function () {
    // 	$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
    // })  

    function generateGameBoardNumber() {
    	return Math.floor(Math.random() * 98273487).toString(16);
    }

    $scope.promise.then (function() {
    	if ($scope.waitingRoom.xJoined == true) {
    		$scope.joinWaitingRoom();
    	} else {
    	$scope.createWaitingRoom();
    	}
    });

    $scope.createWaitingRoom = function() {
    	$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
    	$scope.noticeMessage = "You are x, waiting for opponent.";

    	waitingRoomRef.once('child_removed', function(snapshot) {
    		$location.path('multiplayer/' + $scope.waitingRoom.gameBoardNumber + "/x");
    	});
    }

    $scope.joinWaitingRoom = function() {
    	var gameBoardNumber = $scope.waitingRoom.gameBoardNumber;
    	$scope.waitingRoom = {};

    	$location.path('multiplayer/' + gameBoardNumber + '/o');
    }

  });
