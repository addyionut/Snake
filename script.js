const grid = document.getElementById('gameBoard');
const levelBtn = document.getElementById('levelButtons');
const begLevel = document.getElementById('levelBeginner');
const intLevel = document.getElementById('levelIntermediate');
const expLevel = document.getElementById('levelExpert');
const textInfo = document.getElementById('infoText');
const reset = document.getElementById("resetGame");
const apples = document.getElementById("apples");
const start = document.getElementById("startButton");
let rows, cols, gridMatrix = [], appleSign = "🍎", snakeSign = "⏹", appleX = 5, appleY = 5, snakeStartPos, snakeX, snakeY, intervalSet, eatenApples = 0, snakeSpeed;

function generateGameBoard(id) {
	levelBtn.hidden = true;
	start.hidden = false;
	apples.hidden = false;
	if (id === 'levelBeginner') {
		rows = 25;
		cols = 25;
		snakeSpeed = 400;
	} else if (id === 'levelIntermediate') {
		rows = 20;
		cols = 20;
		snakeSpeed = 300;
	} else if (id === 'levelExpert') {
		rows = 15;
		cols = 15;
		snakeSpeed = 200;
	}
	for (let r = 0; r < rows; ++r){
		let tr = grid.appendChild(document.createElement('tr'));
		for (let c = 0; c < cols; ++c){
			let cell = tr.appendChild(document.createElement('td'));
			cell.id = r + '-' + c;
		}
	}
	generateMatrix(rows, cols);
	snakeStartPos = Math.floor(rows / 2);
	snakeX = snakeStartPos;
	snakeY = snakeStartPos;
	gridMatrix[snakeStartPos][snakeStartPos] = snakeSign;
	gridMatrix[appleX][appleY] = appleSign;
	updateGameBoard();
}

function generateMatrix(rows, cols) {
	for (let i = 0; i < rows; i++) {
  		gridMatrix[i] = [];
  		for (let j = 0; j < cols; j++) {
    		gridMatrix[i][j] = "";
  		}
	}
}

function newApplePos() {
	return Math.floor(Math.random() * rows);
}

function updateGameBoard() {
	apples.innerHTML = `Eaten apples: ${eatenApples}`;
	for (let i = 0; i < rows; i++) {
  		for (let j = 0; j < cols; j++) {
    		document.getElementById(`${i}-${j}`).innerHTML = gridMatrix[i][j];
  		}
	}
}

function keyPressed(event) {
	if (event.code === "ArrowUp") {
		event.preventDefault();
		if (snakeX === 0) {
			clearInterval(intervalSet);
			gameOver();
		} else {
			gridMatrix[snakeX][snakeY] = "";
			gridMatrix[snakeX - 1][snakeY] = snakeSign;
			updateGameBoard();
			if (snakeX === appleX && snakeY === appleY) {
				++eatenApples;
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				gridMatrix[appleX][appleY] = appleSign;
				updateGameBoard();
			}
			--snakeX;
			clearInterval(intervalSet);
			intervalSet = setInterval(() => {
				if (snakeX > 0) {
					gridMatrix[snakeX][snakeY] = "";
					gridMatrix[snakeX - 1][snakeY] = snakeSign;
					if (snakeX === appleX && snakeY === appleY) {
						++eatenApples;
						snakeSpeed -= 5;
						appleX = newApplePos();
						appleY = newApplePos();
						gridMatrix[appleX][appleY] = appleSign;
						updateGameBoard()
					}
					updateGameBoard();
					--snakeX;
				} else {
					clearInterval(intervalSet);
					gameOver();
				}
				
			}, snakeSpeed);
		}
	} else if (event.code === "ArrowDown") {
		event.preventDefault();
		if (snakeX === rows - 1) {
			clearInterval(intervalSet);
			gameOver();
		} else {
			gridMatrix[snakeX][snakeY] = "";
			gridMatrix[snakeX + 1][snakeY] = snakeSign;
			updateGameBoard();
			if (snakeX === appleX && snakeY === appleY) {
				++eatenApples;
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				gridMatrix[appleX][appleY] = appleSign;
				updateGameBoard();
			}
			++snakeX;
			clearInterval(intervalSet);
			intervalSet = setInterval(() => {
				if (snakeX < rows - 1) {
					gridMatrix[snakeX][snakeY] = "";
					gridMatrix[snakeX + 1][snakeY] = snakeSign;
					if (snakeX === appleX && snakeY === appleY) {
						++eatenApples;
						snakeSpeed -= 5;
						appleX = newApplePos();
						appleY = newApplePos();
						gridMatrix[appleX][appleY] = appleSign;
						updateGameBoard();
					}
					updateGameBoard();
					++snakeX;
				} else {
					clearInterval(intervalSet);
					gameOver();
				}	
			}, snakeSpeed);
		}
	} else if (event.code === "ArrowLeft") {
		event.preventDefault();
		if (snakeY === 0) {
			clearInterval(intervalSet);
			gameOver();
		} else {
			gridMatrix[snakeX][snakeY] = "";
			gridMatrix[snakeX][snakeY - 1] = snakeSign;
			updateGameBoard();
			if (snakeX === appleX && snakeY === appleY) {
				++eatenApples;
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				gridMatrix[appleX][appleY] = appleSign;
				updateGameBoard();
			}
			--snakeY;
			clearInterval(intervalSet);
			intervalSet = setInterval(() => {
				if (snakeY > 0) {
					gridMatrix[snakeX][snakeY] = "";
					gridMatrix[snakeX][snakeY - 1] = snakeSign;
					if (snakeX === appleX && snakeY === appleY) {
						++eatenApples;
						snakeSpeed -= 5;
						appleX = newApplePos();
						appleY = newApplePos();
						gridMatrix[appleX][appleY] = appleSign;
						updateGameBoard();
					}
					updateGameBoard();
					--snakeY;
				} else {	
					clearInterval(intervalSet);
					gameOver();
				}	
			}, snakeSpeed);
		}
	} else if (event.code === "ArrowRight") {
		event.preventDefault();
		if (snakeY === cols - 1) {
			clearInterval(intervalSet);
			gameOver();
		} else {
			gridMatrix[snakeX][snakeY] = "";
			gridMatrix[snakeX][snakeY + 1] = snakeSign;
			updateGameBoard();
			if (snakeX === appleX && snakeY === appleY) {
				++eatenApples;
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				gridMatrix[appleX][appleY] = appleSign;
				updateGameBoard();
			}
			++snakeY;
			clearInterval(intervalSet);
			intervalSet = setInterval(() => {
				if (snakeY < cols - 1) {
					gridMatrix[snakeX][snakeY] = "";
					gridMatrix[snakeX][snakeY + 1] = snakeSign;
					if (snakeX === appleX && snakeY === appleY) {
						++eatenApples;
						snakeSpeed -= 5;
						appleX = newApplePos();
						appleY = newApplePos();
						gridMatrix[appleX][appleY] = appleSign;
						updateGameBoard();
					}
					updateGameBoard();
					++snakeY;
				} else {
					clearInterval(intervalSet);
					gameOver();
				}	
			}, snakeSpeed);
		}
	}
	
}

function startGame() {
	start.hidden = true;
	intervalSet = setInterval(() => {
		if (snakeY < cols - 1) {
			gridMatrix[snakeX][snakeY] = "";
			gridMatrix[snakeX][snakeY + 1] = snakeSign;
			if (snakeX === appleX && snakeY === appleY) {
				++eatenApples;
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				gridMatrix[appleX][appleY] = appleSign;
				updateGameBoard();
			}
			updateGameBoard();
			++snakeY;
		} else {
			clearInterval(intervalSet);
			gameOver();
		}	
		
	}, snakeSpeed);
}

function gameOver() {
	clearInterval(intervalSet);
	textInfo.hidden = false;
	textInfo.innerHTML = "Game Over";
	updateGameBoard();
	reset.hidden = false;
	removeEventListener('keydown', keyPressed, true);
}

function restartGame() {
	for (let r = 0; r < rows; ++r) {
		grid.deleteRow("<tr>");
	}
	gridMatrix = [];
	eatenApples = 0;
	appleX = 5;
	appleY = 5;
	apples.hidden = true;
	levelBtn.hidden = false;
	textInfo.hidden = true;
	reset.hidden = true;
	start.hidden = true;
	addEventListener('keydown', keyPressed, true);
}

addEventListener('keydown', keyPressed, true);