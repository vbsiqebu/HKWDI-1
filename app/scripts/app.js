
angular.module('LocalStorageModule').value('prefix', 'TicTacToeLeaderboard');
angular.module('tickeyApp', ['LocalStorageModule', 'firebase'])
  .config(function ($routeProvider){
    $routeProvider
      // .when('/game_board', {
      //   templateUrl: 'views/game_board.html',
      //   controller: 'GameBoardCtrl', 
      // })
      .when('/multiplayer/:id/:mySymbol', {
        templateUrl: 'views/multiplayer.html',
        controller: 'MultiPlayerCtrl', 
      })  
      .when('/how_to', {
        templateUrl: 'views/how_to.html',
        controller: 'HowToCtrl'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/match_player', {
        templateUrl: 'views/match_player.html',
        controller: 'MatchPlayerCtrl'
      })
      .when('/AI', {
        templateUrl: 'views/AI.html',
        controller: 'AICtrl', 
      })
      .otherwise({
        redirectTo: '/'
      })
  });

  