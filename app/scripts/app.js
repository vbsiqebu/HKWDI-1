
angular.module('LocalStorageModule').value('prefix', 'TicTacToeLeaderboard');
angular.module('tickeyApp', ['LocalStorageModule'])
  .config(function ($routeProvider){
    $routeProvider
      .when('/game_board', {
        templateUrl: 'views/game_board.html',
        controller: 'GameBoardCtrl', 
      })
      .when('/how_to', {
        templateUrl: 'views/how_to.html',
        controller: 'HowToCtrl'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  });

  