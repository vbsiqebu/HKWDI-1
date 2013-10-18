'use strict'
angular.module('tickeyApp')
	.controller('AICtrl', function ($scope, $rootScope, $timeout, localStorageService, angularFire) {
    var ref = new Firebase('https://tttdatabase.firebaseio.com/');
    var p = angularFire(ref, $scope, "leaderData");

    // $scope.leaderData = {name:
    //   {
    //     Josiah : 1
    //   }
    // };

    // p.then(function(){
    //   console.log("Data Loaded!")
    // });

    $scope.getName = function (){
      $scope.userName = prompt("What's your name?");
      console.log($scope.userName);
    }

    $scope.addWinToLeaderBoard = function() {
      if ($scope.userName) {
        if ($scope.leaderData.name.hasOwnProperty($scope.userName)) {
          $scope.leaderData.name[$scope.userName]++;
        } else {
          $scope.leaderData.name[$scope.userName] = 1;
        }
      }
    };


    






      		localStorageService.add("names", ["Josiah", "Hatch"]);

      		$rootScope.play_now = true;
      		$rootScope.home_button = false;
      		$rootScope.is_how_to = false;
          $scope.cells = ["", "", "", "", "", "", "", "", ""];

      		$scope.numberOfWins = localStorageService.get("numberOfWins");
      		if ($scope.numberOfWins == undefined) {
      			$scope.numberOfWins = 0;
      		}

      		$scope.addNumberOfWins = function() {
      			$scope.numberOfWins = parseInt($scope.numberOfWins) + 1;
      			localStorageService.add("numberOfWins", $scope.numberOfWins);
      		}
      		
      // Timer start

      	   // $scope.minutes = "00";
          // $scope.seconds = "00";
          // $scope.currentNumberOfSeconds = 0;
          // $scope.intervalCallback;

          // $scope.increment = function() {
          //   $scope.currentNumberOfSeconds++;

          //   $scope.minutes = $scope.formatZeroPadding(Math.floor($scope.currentNumberOfSeconds / 60));
          //   $scope.seconds = $scope.formatZeroPadding($scope.currentNumberOfSeconds % 60);

          //   $scope.intervalCallback = $timeout($scope.increment, 1000);
          // }

          // $scope.startTimer = function() {
          //   $scope.intervalCallback = $timeout($scope.increment, 1000);
          // }

          // $scope.stopTimer = function() {
          // 	$timeout.cancel($scope.intervalCallback);
          // }

          // $scope.restartTimer = function() {
          // 	$scope.minutes = "00";
          // 	$scope.seconds = "00";
          // 	$scope.currentNumberOfSeconds = 0;
          // 	$timeout.cancel($scope.intervalCallback);
          // }

          // $scope.formatZeroPadding = function(integer) {
          //   if (integer < 10) {
          //   	return "0" + integer;
          //   } else {
          //   	return integer;
          //   }
          // }

      // Timer End

      $scope.currentSymbol = "x";
      $scope.turnNum = 0;

      $scope.turn = function() {
        $scope.turnNum += 1;
        console.log($scope.turnNum)
      }

      $scope.handleClick = function(location) {
        if ($scope.notOccupied(location)) {
          $scope.makeNextMove(location, $scope.currentSymbol);
          
          $scope.turn();
          console.log($scope.turnNum)
          if ($scope.isWinning($scope.currentSymbol)) {
            alert($scope.currentSymbol + " wins!");
            $scope.clearBoard();
            $scope.addNumberOfWins();
          } else {
            if ($scope.turnNum < 9) {
              $scope.simulateOpponentMove();
            }
          }
        } else {
          // do nothing
        };
      };

      $scope.simulateOpponentMove = function() {
        console.log("before swap to o")
        $scope.swapSymbol();
        console.log("after swap to o")
        $scope.opponentSelectRandomSquare();
        if ($scope.isWinning($scope.currentSymbol)) {
            alert($scope.currentSymbol + " wins!");
          }
          console.log("before swap back to x")
        $scope.swapSymbol();
        console.log("after swap back to x")
        $scope.turn(); 

      }

      $scope.makeNextMove = function(location, symbol) {
        $scope.cells[location - 1] = symbol;
        $scope.turn; 
      }

      $scope.swapSymbol = function() {
        if ($scope.currentSymbol == "x") {
          $scope.currentSymbol = "o";
        } else {
          $scope.currentSymbol = "x";
        };
      };

      //
      // <div class="cell">X</div>
      $scope.notOccupied = function(location) {
        var contentAtLocation = $scope.cells[location - 1];
        var result = (contentAtLocation == "");
        return result;
      }

      $scope.isWinning = function(currentPlayer) {
        // check first row horizontal winning condition
        // isSameSymbolsIn(1, 2, 3, currentPlayer);

        // wrong !!
        for (var i=0; i <= 8; i += 3) {
          if ($scope.isSameSymbolsIn(i, i + 1, i +2, currentPlayer)) {
            return true;
          }
        }

        // check vertical
        for (var i=1; i <= 2; i++) {
          if ($scope.isSameSymbolsIn(i, i + 3, i +6, currentPlayer)) {
            return true;
          }
        }

        // check diagonal
        return $scope.isDiagonalSameSymbols($scope.currentPlayer);
      }

      $scope.isSameSymbolsIn = function(cells, currentPlayer) {
        $scope.first_comparison = $scope.cells[location - 1] == currentPlayer;
        $scope.second_comparison = $scope.cells[location - 1] == currentPlayer;
        $scope.third_comparison = $scope.cells[location - 1] == currentPlayer;

        var result = $scope.first_comparison && $scope.second_comparison && $scope.third_comparison;
        return result;
      }

      $scope.isDiagonalSameSymbols = function(currentPlayer) {
        var firstDiagonalCheck = ($scope.cells[0] == currentPlayer &&
          $scope.cells[4] == currentPlayer &&
          $scope.cells[8] == currentPlayer);
        var secondDiagonalCheck = ($scope.cells[2] == currentPlayer &&
          $scope.cells[4] == currentPlayer &&
          $scope.cells[6] == currentPlayer);
        return firstDiagonalCheck || secondDiagonalCheck;
      }

      $scope.clearBoard = function() {
        for ( var i=0 ; i <= 8 ; i++ ) {
          var currentCell = $scope.cells[i];
          	currentCell.innerHTML = "";
          	currentCell.classList.remove("x");
          	currentCell.classList.remove("o");
        };
      };

      $scope.restartGame = function() {
        $scope.currentSymbol = "x";
        $scope.turnNum = 0;
        $scope.clearBoard();
      };

      $scope.opponentSelectRandomSquare = function() {
        var randomNumber;
        if ($scope.currentSymbol == "o") {
          do {
            randomNumber = Math.floor((Math.random()*9)+1);
          } while (!$scope.notOccupied(randomNumber));
          $scope.makeNextMove(randomNumber, $scope.currentSymbol);
        };
      };

	});