'use strict';

angular.module('tickeyApp')
  .controller('MultiPlayerCtrl', function ($scope, $timeout, $routeParams, angularFire, $rootScope) {
    $scope.gameBoard = { board: ["","","","","","","","",""]};    
    var gameBoardRef = new Firebase("https://tttdatabase.firebaseio.com/" + $routeParams.id);
    $scope.gameBoardPromise = angularFire(gameBoardRef, $scope, "gameBoard", {});
    var userRef = new Firebase("https://3dd13-ttt-game.firebaseio.com/users/");
    $scope.gameBoardId = $routeParams.id;
    $scope.mySymbol = $routeParams.mySymbol; 
    $scope.myTurn = false;  

  
    // $scope.gameBoard = { board: ["","","","","","","","",""]};
    // console.log("init controller");
    $scope.userNamePromise = angularFire(userRef, $scope, "userName");
    $rootScope.play_now = true;
    $rootScope.home_button = false;
    $rootScope.is_how_to = false;
    // $scope.currentSymbol = "x";

    $scope.gameBoardPromise.then(function () {
      $scope.gameBoard.board = ["","","","","","","","",""];
      if ($routeParams.mySymbol == 'x') {
        console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
        // $scope.makeMyMove();
        $scope.myTurn = true;
      } else {
        console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
        // $scope.gameBoard.board = ["","","","","","","","",""];
        // $scope.waitForOpponentToMove();
        $scope.myTurn = false;
      }
    });

    gameBoardRef.on('value', function(snapshot) {
      console.log("wait received");
      if (!$scope.myTurn) {
        if (snapshot.val() != null) {
          if (!arrays_equal(snapshot.val(), $scope.gameBoard.board)) {
            console.log("diff gameboard");
            if ($scope.isLosing()) {
              // print losing
              // redirect to match player if play again
            } else if ($scope.isDraw()) {
              // print draw
              // redirect to match player if play again
            } else {
              $scope.myTurn = true;
            }
          } else {
            console.log("same gameboard"); 
          }
        } else {
          console.log("snapshot is empty");
        }
      } else {
        console.log("it is my turn but I receive ");
      }
    });
    
    $scope.waitForOpponentToMove = function() {
      gameBoardRef.once('child_changed', function(snapshot) {
        if ($scope.isLosing()) {
          alert($scope.mySymbol + "loses!");
          // print player loses
          $scope.playAgain = prompt("Do you want to play again?");
            if (playAgain = true) {
              $location.path("/match_player");
            }
          // redirect to match player if play again
        } else if ($scope.isDraw()) {
          alert("Tie game");
          // print draw
          $scope.playAgain = prompt("Do you want to play again?");
            if (playAgain = true) {
              $location.path("/match_player");
            }
          // redirect to match player if play again
        } else {
          // $scope.makeMyMove();
        }
      });
    };
    
    $scope.makeMyMove = function(location) {
      console.log($scope.myTurn)
      if ($scope.myTurn) {
        $scope.gameBoard.board[location - 1] = $scope.mySymbol;
          if ($scope.isWinning()) {
            $scope.addWinToLeaderBoard
            alert($scope.mySymbol + "wins!")
            // print winning
            $scope.playAgain = prompt("Do you want to play again?");
                if (playAgain = true) {
                  $location.path("/match_player");
                }
            // redirect to match player if play again
          } else if ($scope.isDraw()) {
            alert("Tie game");
            // print draw
            $scope.playAgain = prompt("Do you want to play again?");
                if (playAgain = true) {
                  $location.path("/match_player");
                }
            // redirect to match player if play again
          } else {
            // $scope.myTurn = false;
            $timeout($scope.waitForOpponentToMove, 4000);
          }   
        }
      }
      

    $scope.listenForMyClick = function(location) {
      // handle click event on cell 
      // if ($scope.myTurn = true) {
        if ($scope.notOccupied(location)) {
          $scope.makeMyMove(location);
          // var temp = $scope.myTurn;
          // $scope.myTurn = !temp;

        }
      // }
    }
    
    $scope.isLosing = function() {
      return false; 
    }
    
    $scope.isWinning = function() {
      return false; 
    }
    
    $scope.isDraw = function() {
      return false; 
    }  

    function arrays_equal(a,b) { return !(a<b || b<a); }
    

    $scope.getName = function (){
          $scope.userName = prompt("Please enter your name");
          console.log($scope.userName);
        }
        $scope.userName = {users: {
            josiah : 50
          }
        }

    $scope.addWinToLeaderBoard = function() {
      if ($scope.userName) {
        if ($scope.leaderData.users.hasOwnProperty($scope.userName)) {
          $scope.leaderData.users[$scope.userName]++;
        } else {
          $scope.leaderData.users[$scope.userName] = 1;
        }
      }
    };

    $scope.addNumberOfWins = function() {
      $scope.numberOfWins = parseInt($scope.numberOfWins) + 1;
      // localStorageService.add("numberOfWins", $scope.numberOfWins);
    };

    

      $scope.swapSymbol = function() {
        if ($scope.currentSymbol == "x") {
          $scope.currentSymbol = "o";
        } else {
          $scope.currentSymbol = "x";
        }
      };

      //
      // <div class="cell">X</div>
      $scope.notOccupied = function(location) {

        var contentAtLocation = $scope.gameBoard.board[location - 1];
        var result = (contentAtLocation == "");
        return result;
      };

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
      };

      $scope.isSameSymbolsIn = function(gameBoard, currentPlayer) {
        $scope.first_comparison = $scope.gameBoard.board[location - 1] == currentPlayer;
        $scope.second_comparison = $scope.gameBoard.board[location - 1] == currentPlayer;
        $scope.third_comparison = $scope.gameBoard.board[location - 1] == currentPlayer;

        var result = $scope.first_comparison && $scope.second_comparison && $scope.third_comparison;
        return result;
      };

      $scope.isDiagonalSameSymbols = function(currentPlayer) {
        var firstDiagonalCheck = ($scope.gameBoard.board[0] == currentPlayer &&
          $scope.gameBoard[4] == currentPlayer &&
          $scope.gameBoard[8] == currentPlayer);
        var secondDiagonalCheck = ($scope.gameBoard.board[2] == currentPlayer &&
          $scope.gameBoard[4] == currentPlayer &&
          $scope.gameBoard[6] == currentPlayer);
        return firstDiagonalCheck || secondDiagonalCheck;
      };

      

  });
