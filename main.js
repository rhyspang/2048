/*
* @Author: rhys
* @Date:   2016-10-20 15:37:41
* @Last Modified by:   rhys
* @Last Modified time: 2016-10-23 14:53:12
*/


/**
 * the dimensionality of the game grids
 * @type {Number}
 */
var DIMENSION = 4;

/**
 * Game grid board
 * @type {Two dimension array}
 */
var board = new Array();

/**
 * the score you got
 * @type {Number}
 */	
var score = 0;


var OPT = new Array();

$(document).ready(function () {
	newGame();
})

function newGame() {
	//initial grids
	init();

	//generate two numbers when game begin
	generateOneNumber();
	generateOneNumber();

}

/**
 * initial the board, and clear the board
 * inital the OPT
 * @return no return value
 */
function init() {
	for (var i = 0; i < DIMENSION; i++) {
		for (var j = 0; j < DIMENSION; j++) {

			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}


	for (var i = 0; i < DIMENSION; i++) {
		board[i] = new Array();

		for (var j = 0; j < DIMENSION; j++) {
			board[i][j] = 0;
		}
	}

	OPT[0] = new Array();
	for (var i = 1; i < DIMENSION; i++) {
		OPT[0].push(i);
	}

	OPT[1] = new Array();
	for (var i = DIMENSION - 2; i >= 0; i--) {
		OPT[1].push(i);
	}
	updateBoardView();

}

/**
 * this function will be called when operate the board
 * @return {notye} no return value
 */
function updateBoardView() {
	$(".number-cell").remove();
	for (var i = 0; i < DIMENSION; i++) {
		for (var j = 0; j < DIMENSION; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-' + i + '-' + j);

			theNumberCell.css('top', getPosTop(i, j));
			theNumberCell.css('left', getPosLeft(i, j));
			if (board[i][j] == 0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
			}else {
				theNumberCell.css('width', '100px');
				theNumberCell.css('height', '100px');
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}

		}
	}
}

/**
 * As the function named--generate one number(2 or 4) in free grids		
 * @return {Boolean} if genration one number successfully, return true, otherwise return false
 */
function generateOneNumber() {
	if (noSpace(board)) {
		return false;
	}

	var freeList = getFreeSpaceList(board);
	var tar = getRandomNumber(0, freeList.length);

	var tarX = parseInt(freeList[tar] / DIMENSION);
	var tarY = freeList[tar] % DIMENSION;

	var number = Math.random() < 0.5 ? 2 : 4;

	board[tarX][tarY] = number;
	showNumberWithAnimation(tarX, tarY, number);


	return true;
}

$(document).keydown( function (event) {
	switch(event.keyCode) {
		case 37: 	//left 
			if (move(0, 0)) {
				setTimeout("generateOneNumber()", 200);
				isGameOver();
			}
			break;
		case 38: 	//up
			if (move(1, 0)) {
				setTimeout("generateOneNumber()", 200);
				isGameOver();
			}
			break;
		case 39: 	//right
			if (move(0, 1)) {
				setTimeout("generateOneNumber()", 200);
				isGameOver();
			}
			break;
		case 40: 	//down
			if (move(1, 1)) {
				setTimeout("generateOneNumber()", 200);
				isGameOver();
			}
			break;
		default:
			break;
	}
} )


/**
 * Game main logic structure
 * @param  {int} hov       notify horizintal or vertical. 0 for horizintal, 1 for vertical
 * @param  {int} direction notify direction. 0 for negative(left or up), 1 for positive(right or down)
 * @return {boolean}       can the grids  move or not
 */
function move(hov, direction) {

	/**
	 * reture value, default false. When any of the grid move, ret will be valued true
	 * @type {Boolean}
	 */
	var ret = false;

	/**
	 * to mark the grid be changed or not in once move operation
	 * @type {tow dimension array}
	 */
	var temp = getBooleanArray();

	/**
	 * direction increment
	 * @type {int}
	 */	
	var dir = direction == 1 ? 1 : -1;

	for (var i = 0; i < DIMENSION; i++) {
		for ( j in OPT[direction]) {
			j = OPT[direction][j];
			if (0 == hov) {		//0 notify horinzal 
				if (board[i][j] == 0) 	continue;	
				var k = j;
				//find out the first blank-grid right of the first numbered-grid left of board[i][j] when direction equal 0
				//other condition you can imagine by yourself
				while ((dir == 1 ? k != DIMENSION-1 : k) && !board[i][k+dir]) k += dir;

				//judge wether the first grid left of the board[i][k] equal to board[i][j] when direction equal 0
				//if so, move one step, double it and value to board[i][k]
				//otherwise, do nothing but assigning value to board[i][k]
				if ((dir == 1 ? k != DIMENSION-1 : k) && board[i][k+dir] == board[i][j] && !temp[i][k+dir]) {
					k += dir;
					//board[i][k] be modified, so value temp[i][k] to 'true'
					temp[i][k] = true;
					//double the value of board[i][k]
					board[i][k] = board[i][j] << 1;
				}else {
					board[i][k] = board[i][j];
				}
				if (k != j) {
					//earse the orgin position's value
					board[i][j] = 0;
					//show animation
					moveNumberWithAnimation(i, k, i, j);
					ret = true;
				}
			}else {				//1 notity vertical
				if (board[j][i] == 0) 	continue;
				var k = j;
				while ((dir == 1 ? k != DIMENSION-1 : k) && !board[k+dir][i]) k += dir;

				if ((dir == 1 ? k != DIMENSION-1 : k) && board[k+dir][i] == board[j][i] && !temp[k+dir][i]) {
					k += dir;
					temp[k][i] = true;
					board[k][i] = board[j][i] << 1;
				}else {
					board[k][i] = board[j][i];
				}
				if (k != j) {
					board[j][i] = 0;
					moveNumberWithAnimation(k, i, j, i);
					ret = true;
				}
			}

		}
	}
	if (ret)
		//to let the move number animation show completely, set timeout
		setTimeout("updateBoardView()", 200);
	return ret;

}