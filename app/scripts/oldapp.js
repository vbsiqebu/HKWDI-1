function changeSquareContent(location, className) {
	var selectedSquare = document.getElementById('cell_' + location);
	selectedSquare.classList.toggle(className);
	selectedSquare.innerHTML = className;
	squareContentArray[location - 1] = className;
};

var currentPlayer = "x";

function makeNextMoveAt(location) {
	if (currentPlayer == "x") {
		changeSquareContent(location, "x");
		isTopHorizontalOccupiedByMe();
		currentPlayer = "o";
	} else {
		changeSquareContent(location, "o");
		isTopHorizontalOccupiedByMe();
		currentPlayer = "x";
	};
};

var squareContentArray = ["", "", "", "", "", "", "", "", ""];


function handleClick(location) {
	if (squareContentArray[location - 1] != "") {
		// Don't Overwrite
	}
		else {
			makeNextMoveAt(location);
		};
};

function isTopHorizontalOccupiedByMe() {
	if (squareContentArray[0] == currentPlayer && squareContentArray[1] == currentPlayer && squareContentArray[2] == currentPlayer) {
		alert(currentPlayer.toUpperCase() + " Wins!");
	};
};

// function winCondition (1, 2, 3, currentPlayer) {
// 	var comparison_2 (document.getElementById('cell_' + location))
// }