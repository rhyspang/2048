/*
* @Author: rhys
* @Date:   2016-10-20 15:38:34
* @Last Modified by:   rhys
* @Last Modified time: 2016-10-23 09:52:55
*/


function getPosTop(i, j) {
	return 20 + i * 120;
}

function getPosLeft(i, j) {
	return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
	switch(number) {
		case 2: 
			return '#eee4de';
		case 4:
			return '#ede0c8';
		case 8:
			return '#f2b179';
		case 16:
			return '#f59563';
		case 32:
			return '#f67c5f';
		case 64:
			return '#f65e3b';
		case 128:
			return '#edcf72';
		case 256:
			return '#edcc61';
		case 512:
			return '#9c0';
		case 1024:
			return '#33b5e5';
		case 2048:
			return '#09c';
		case 4096:
			return '#a6c';
		case 8192:
			return '#93c';
		default:
			return 'black';
	}
}


function getNumberColor(number) {
	if (number <= 4) {
		return '#776e65';
	}
	return 'white';
}

function noSpace(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				return false;
			}
		}
	}
	return true;
}

function getFreeSpaceList(board) {
	var freeList = new Array();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				freeList.push(i*4 + j);
			}
		}
	}
	return freeList;
}

function getRandomNumber(left, right) {
	return parseInt(Math.random()*(right-left)) + left;
}

function getBooleanArray() {
	var temp = new Array();
	for (var i = 0; i < 4; i++) {
		temp[i] = new Array();
		temp[i][0] = temp[i][1] = temp[i][2] = temp[i][3] = false;
	}
	return temp;
}

function inBond(x) {
	return x >= 0 && x < 4;
}