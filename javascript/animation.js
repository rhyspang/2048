/*
* @Author: rhys
* @Date:   2016-10-20 15:38:18
* @Last Modified by:   rhys
* @Last Modified time: 2016-10-20 21:53:52
*/

function showNumberWithAnimation(i, j, number) {
	var numberCell = $('#number-cell-' + i + '-' + j);

	numberCell.css('background-color', getNumberBackgroundColor(number));
	numberCell.css('color', getNumberColor(number));
	numberCell.text(number);

	numberCell.animate({
		width: '100px',
		height: '100px',
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	}, 100);
}

function moveNumberWithAnimation(toX, toY, fromX, fromY) {
	var fromNumberCell = $('#number-cell-' + fromX + '-' + fromY);
	fromNumberCell.animate({
		top: getPosTop(toX, toY),
		left: getPosLeft(toX, toY)
	}, 200);

}