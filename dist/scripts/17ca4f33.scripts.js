(function(){var a=angular.module("LocalStorageModule",[]);a.value("prefix","ls"),a.constant("cookie",{expiry:30,path:"/"}),a.constant("notify",{setItem:!0,removeItem:!1}),a.service("localStorageService",["$rootScope","prefix","cookie","notify",function(a,b,c,d){"."!==b.substr(-1)&&(b=b?b+".":"");var e=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},f=function(c,f){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),d.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:c,newvalue:f,storageType:"cookie"}),l(c,f);"undefined"==typeof f&&(f=null);try{(angular.isObject(f)||angular.isArray(f))&&(f=angular.toJson(f)),localStorage.setItem(b+c,f),d.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:c,newvalue:f,storageType:"localStorage"})}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.message),l(c,f)}return!0},g=function(c){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),m(c);var d=localStorage.getItem(b+c);return d&&"null"!==d?"{"===d.charAt(0)||"["===d.charAt(0)?angular.fromJson(d):d:null},h=function(c){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),d.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:c,storageType:"cookie"}),n(c);try{localStorage.removeItem(b+c),d.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:c,storageType:"localStorage"})}catch(f){return a.$broadcast("LocalStorageModule.notification.error",f.message),n(c)}return!0},i=function(){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var c=b.length,d=[];for(var f in localStorage)if(f.substr(0,c)===b)try{d.push(f.substr(c))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.Description),[]}return d},j=function(){if(!e())return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),o();var c=b.length;for(var d in localStorage)if(d.substr(0,c)===b)try{h(d.substr(c))}catch(f){return a.$broadcast("LocalStorageModule.notification.error",f.message),o()}return!0},k=function(){try{return navigator.cookieEnabled||"cookie"in document&&(document.cookie.length>0||(document.cookie="test").indexOf.call(document.cookie,"test")>-1)}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},l=function(d,e){if("undefined"==typeof e)return!1;if(!k())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var f="",g=new Date;null===e?(g.setTime(g.getTime()+-864e5),f="; expires="+g.toGMTString(),e=""):0!==c.expiry&&(g.setTime(g.getTime()+864e5*c.expiry),f="; expires="+g.toGMTString()),d&&(document.cookie=b+d+"="+encodeURIComponent(e)+f+"; path="+c.path)}catch(h){return a.$broadcast("LocalStorageModule.notification.error",h.message),!1}return!0},m=function(c){if(!k())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var d=document.cookie.split(";"),e=0;e<d.length;e++){for(var f=d[e];" "==f.charAt(0);)f=f.substring(1,f.length);if(0===f.indexOf(b+c+"="))return decodeURIComponent(f.substring(b.length+c.length+1,f.length))}return null},n=function(a){l(a,null)},o=function(){for(var a=null,c=b.length,d=document.cookie.split(";"),e=0;e<d.length;e++){for(a=d[e];" "==a.charAt(0);)a=a.substring(1,a.length);key=a.substring(c,a.indexOf("=")),n(key)}};return{isSupported:e,set:f,add:f,get:g,keys:i,remove:h,clearAll:j,cookie:{set:l,add:l,get:m,remove:n,clearAll:o}}}])}).call(this),angular.module("LocalStorageModule").value("prefix","TicTacToeLeaderboard"),angular.module("tickeyApp",["LocalStorageModule","firebase"]).config(["$routeProvider",function(a){a.when("/multiplayer/:id/:mySymbol",{templateUrl:"views/multiplayer.html",controller:"MultiPlayerCtrl"}).when("/how_to",{templateUrl:"views/how_to.html",controller:"HowToCtrl"}).when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/match_player",{templateUrl:"views/match_player.html",controller:"MatchPlayerCtrl"}).when("/AI",{templateUrl:"views/AI.html",controller:"AICtrl"}).otherwise({redirectTo:"/"})}]),angular.module("tickeyApp").controller("MainCtrl",["$scope","$rootScope",function(a,b){b.home_button=!0,b.play_now=!1,b.is_how_to=!1}]),angular.module("tickeyApp").controller("MultiPlayerCtrl",["$scope","$timeout","$routeParams","angularFire","$rootScope",function(a,b,c,d,e){function f(a,b){return!(b>a||a>b)}a.gameBoard={board:["","","","","","","","",""]};var g=new Firebase("https://tttdatabase.firebaseio.com/"+c.id);a.gameBoardPromise=d(g,a,"gameBoard",{});var h=new Firebase("https://3dd13-ttt-game.firebaseio.com/users/");a.gameBoardId=c.id,a.mySymbol=c.mySymbol,a.myTurn=!1,a.userNamePromise=d(h,a,"userName"),e.play_now=!0,e.home_button=!1,e.is_how_to=!1,a.gameBoardPromise.then(function(){a.gameBoard.board=["","","","","","","","",""],"x"==c.mySymbol?(console.log("I am First Move: Symbol: "+c.mySymbol),a.myTurn=!0):(console.log("I am Second Move: Symbol: "+c.mySymbol),a.myTurn=!1)}),g.on("value",function(b){console.log("wait received"),a.myTurn?console.log("it is my turn but I receive "):null!=b.val()?f(b.val().board,a.gameBoard.board)?console.log("same gameboard"):(console.log("diff gameboard"),a.isLosing()||a.isDraw()||(a.myTurn=!0)):console.log("snapshot is empty")}),a.makeMyMove=function(b){console.log(a.myTurn),a.myTurn&&(a.gameBoard.board[b-1]=a.mySymbol,a.isWinning()?(a.addWinToLeaderBoard,alert(a.mySymbol+"wins!"),a.playAgain=prompt("Do you want to play again?"),(playAgain=!0)&&$location.path("/match_player")):a.isDraw()?(alert("Tie game"),a.playAgain=prompt("Do you want to play again?"),(playAgain=!0)&&$location.path("/match_player")):(console.log("not win, not draw"),a.myTurn=!1))},a.listenForMyClick=function(b){a.notOccupied(b)&&a.makeMyMove(b)},a.isLosing=function(){return!1},a.isWinning=function(){return!1},a.isDraw=function(){return!1},a.getName=function(){a.userName=prompt("Please enter your name"),console.log(a.userName)},a.userName={users:{josiah:50}},a.addWinToLeaderBoard=function(){a.userName&&(a.leaderData.users.hasOwnProperty(a.userName)?a.leaderData.users[a.userName]++:a.leaderData.users[a.userName]=1)},a.addNumberOfWins=function(){a.numberOfWins=parseInt(a.numberOfWins)+1},a.swapSymbol=function(){a.currentSymbol="x"==a.currentSymbol?"o":"x"},a.notOccupied=function(b){var c=a.gameBoard.board[b-1],d=""==c;return d},a.isWinning=function(b){for(var c=0;8>=c;c+=3)if(a.isSameSymbolsIn(c,c+1,c+2,b))return!0;for(var c=1;2>=c;c++)if(a.isSameSymbolsIn(c,c+3,c+6,b))return!0;return a.isDiagonalSameSymbols(a.currentPlayer)},a.isSameSymbolsIn=function(b,c){a.first_comparison=a.gameBoard.board[location-1]==c,a.second_comparison=a.gameBoard.board[location-1]==c,a.third_comparison=a.gameBoard.board[location-1]==c;var d=a.first_comparison&&a.second_comparison&&a.third_comparison;return d},a.isDiagonalSameSymbols=function(b){var c=a.gameBoard.board[0]==b&&a.gameBoard[4]==b&&a.gameBoard[8]==b,d=a.gameBoard.board[2]==b&&a.gameBoard[4]==b&&a.gameBoard[6]==b;return c||d}}]),angular.module("tickeyApp").controller("AICtrl",["$scope","$rootScope","$timeout","localStorageService","angularFire",function(a,b,c,d,e){var f=new Firebase("https://tttdatabase.firebaseio.com/");e(f,a,"leaderData"),a.getName=function(){a.userName=prompt("What's your name?"),console.log(a.userName)},a.addWinToLeaderBoard=function(){a.userName&&(a.leaderData.name.hasOwnProperty(a.userName)?a.leaderData.name[a.userName]++:a.leaderData.name[a.userName]=1)},d.add("names",["Josiah","Hatch"]),b.play_now=!0,b.home_button=!1,b.is_how_to=!1,a.cells=["","","","","","","","",""],a.numberOfWins=d.get("numberOfWins"),void 0==a.numberOfWins&&(a.numberOfWins=0),a.addNumberOfWins=function(){a.numberOfWins=parseInt(a.numberOfWins)+1,d.add("numberOfWins",a.numberOfWins)},a.currentSymbol="x",a.turnNum=0,a.turn=function(){a.turnNum+=1,console.log(a.turnNum)},a.handleClick=function(b){a.notOccupied(b)&&(a.makeNextMove(b,a.currentSymbol),a.turn(),console.log(a.turnNum),a.isWinning(a.currentSymbol)?(alert(a.currentSymbol+" wins!"),a.clearBoard(),a.addNumberOfWins()):a.turnNum<9&&a.simulateOpponentMove())},a.simulateOpponentMove=function(){console.log("before swap to o"),a.swapSymbol(),console.log("after swap to o"),a.opponentSelectRandomSquare(),a.isWinning(a.currentSymbol)&&alert(a.currentSymbol+" wins!"),console.log("before swap back to x"),a.swapSymbol(),console.log("after swap back to x"),a.turn()},a.makeNextMove=function(b,c){a.cells[b-1]=c,a.turn},a.swapSymbol=function(){a.currentSymbol="x"==a.currentSymbol?"o":"x"},a.notOccupied=function(b){var c=a.cells[b-1],d=""==c;return d},a.isWinning=function(b){for(var c=0;8>=c;c+=3)if(a.isSameSymbolsIn(c,c+1,c+2,b))return!0;for(var c=1;2>=c;c++)if(a.isSameSymbolsIn(c,c+3,c+6,b))return!0;return a.isDiagonalSameSymbols(a.currentPlayer)},a.isSameSymbolsIn=function(b,c){a.first_comparison=a.cells[location-1]==c,a.second_comparison=a.cells[location-1]==c,a.third_comparison=a.cells[location-1]==c;var d=a.first_comparison&&a.second_comparison&&a.third_comparison;return d},a.isDiagonalSameSymbols=function(b){var c=a.cells[0]==b&&a.cells[4]==b&&a.cells[8]==b,d=a.cells[2]==b&&a.cells[4]==b&&a.cells[6]==b;return c||d},a.clearBoard=function(){for(var b=0;8>=b;b++){var c=a.cells[b];c.innerHTML="",c.classList.remove("x"),c.classList.remove("o")}},a.restartGame=function(){a.currentSymbol="x",a.turnNum=0,a.clearBoard()},a.opponentSelectRandomSquare=function(){var b;if("o"==a.currentSymbol){do b=Math.floor(9*Math.random()+1);while(!a.notOccupied(b));a.makeNextMove(b,a.currentSymbol)}}}]),angular.module("tickeyApp").controller("HowToCtrl",["$scope","$rootScope",function(a,b){a.how="Lorem Ipsum",b.is_how_to=!0,b.play_now=!1,b.home_button=!1}]),angular.module("tickeyApp").controller("MatchPlayerCtrl",["$scope","angularFire","$location",function(a,b,c){function d(){return Math.floor(98273487*Math.random()).toString(16)}a.waitingRoom={};var e=new Firebase("https://tttdatabase.firebaseio.com/waiting_room");a.promise=b(e,a,"waitingRoom"),a.promise.then(function(){1==a.waitingRoom.xJoined?a.joinWaitingRoom():a.createWaitingRoom()}),a.createWaitingRoom=function(){a.waitingRoom={xJoined:!0,gameBoardNumber:d()},a.noticeMessage="You are x, waiting for opponent.",e.once("child_removed",function(){c.path("multiplayer/"+a.waitingRoom.gameBoardNumber+"/x")})},a.joinWaitingRoom=function(){var b=a.waitingRoom.gameBoardNumber;a.waitingRoom={},c.path("multiplayer/"+b+"/o")}}]),angular.module("tickeyApp").directive("mouse",function(){return{restrict:"A",link:function(a,b){b.bind("mouseenter",function(){b.addClass("backgroundCellColor")}),b.bind("mouseleave",function(){b.removeClass("backgroundCellColor")})}}});