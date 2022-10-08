const grid = document.getElementById('gameBoard');
const levelBtn = document.getElementById('levelButtons');
const begLevel = document.getElementById('levelBeginner');
const intLevel = document.getElementById('levelIntermediate');
const expLevel = document.getElementById('levelExpert');
const textInfo = document.getElementById('infoText');
const reset = document.getElementById("resetGame");
const applesInfo = document.getElementById("apples");
const start = document.getElementById("startButton");
let rows, cols, gridMatrix = [], appleSign = "🍎", snakeSign = "⏹", appleX = 5, appleY = 5, 
snakeStartPos, snakeX, snakeY, intervalSet, eatenApples = 0, snakeSpeed, snake = [], isApple = false, nextPos;

function generateGameBoard(id) {
	levelBtn.hidden = true;
	start.hidden = false;
	applesInfo.hidden = false;
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
	snake.unshift(`${snakeX}-${snakeY}`);
	gridMatrix[snakeX][snakeY] = snakeSign;
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

function updateMatrix() {
	let row, col;
	for (let i = 0; i <= eatenApples; ++i) {
		row = snake[i].split('-')[0];
		col = snake[i].split('-')[1];
		gridMatrix[row][col] = snakeSign;
	}
}

function updateGameBoard() {
	generateMatrix(rows, cols);
	updateMatrix();
	gridMatrix[appleX][appleY] = appleSign;	
	applesInfo.innerHTML = `Eaten apples: ${eatenApples}`;
	for (let i = 0; i < rows; i++) {
  		for (let j = 0; j < cols; j++) {
    		document.getElementById(`${i}-${j}`).innerHTML = gridMatrix[i][j];
  		}
	}
}

function keyPressed(event) {
	if (event.code === "ArrowUp") {
		if (snakeX === 0) {
			gameOver();
		} else {
			for (let pos of snake) {
				nextPos = `${snakeX - 1}-${snakeY}`;
				if (pos === nextPos) {
					gameOver();
				}
			}
			if (snakeX - 1 === appleX && snakeY === appleY) {
			 	//document.getElementById(`${snakeX - 1}-${snakeY}`).innerHTML = snakeSign;
				++eatenApples;
				snake.unshift(`${snakeX - 1}-${snakeY}`);
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				for (let pos of snake) {
					if (pos.split('-')[0] === appleX && pos.split('-')[1] === appleY) {
						appleX = newApplePos();
						appleY = newApplePos();
					}
				}
				gridMatrix[appleX][appleY] = appleSign;	
			} else {
				snake.pop();
				snake.unshift(`${snakeX - 1}-${snakeY}`);
			}
			updateGameBoard();
			--snakeX;
			clearInterval(intervalSet);
			intervalSet = setInterval(() => {
				for (let pos of snake) {
					nextPos = `${snakeX - 1}-${snakeY}`;
					if (pos === nextPos) {
						gameOver();
					}
				}
				if (snakeX > 0) {
					if (snakeX - 1 === appleX && snakeY === appleY) {
						//document.getElementById(`${snakeX - 1}-${snakeY}`).innerHTML = snakeSign;
						++eatenApples;
						snake.unshift(`${snakeX - 1}-${snakeY}`);
						snakeSpeed -= 5;
						appleX = newApplePos();
						appleY = newApplePos();
						for (let pos of snake) {
							if (pos.split('-')[0] === appleX && pos.split('-')[1] === appleY) {
								appleX = newApplePos();
								appleY = newApplePos();
							}
						}
						gridMatrix[appleX][appleY] = appleSign;
					} else {
						snake.pop();
						snake.unshift(`${snakeX - 1}-${snakeY}`);
					}
					updateGameBoard();
					--snakeX;
				} else {
					gameOver();
				}
			}, snakeSpeed);
		}
	} else if (event.code === "ArrowDown") {	
		if (snakeX === rows - 1) {
			gameOver();
		} else {
			for (let pos of snake) {
				nextPos = `${snakeX + 1}-${snakeY}`;
				if (pos === nextPos) {
					gameOver();
				}
			}
			if (snakeX + 1 === appleX && snakeY === appleY) {
				//document.getElementById(`${snakeX + 1}-${snakeY}`).innerHTML = snakeSign;
				++eatenApples;
				snake.unshift(`${snakeX + 1}-${snakeY}`);
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				gridMatrix[appleX][appleY] = appleSign;
			} else {
				snake.pop();
				snake.unshift(`${snakeX + 1}-${snakeY}`);
			}
			updateGameBoard();
			++snakeX;
			clearInterval(intervalSet);
			intervalSet = setInterval(() => {
				for (let pos of snake) {
					nextPos = `${snakeX + 1}-${snakeY}`;
					if (pos === nextPos) {
						gameOver();
					}
				}
				if (snakeX < rows - 1) {
					if (snakeX + 1 === appleX && snakeY === appleY) {
						document.getElementById(`${snakeX + 1}-${snakeY}`).innerHTML = snakeSign;
						++eatenApples;
						snake.unshift(`${snakeX + 1}-${snakeY}`);
						snakeSpeed -= 5;
						appleX = newApplePos();
						appleY = newApplePos();
						for (let pos of snake) {
						if (pos.split('-')[0] === appleX && pos.split('-')[1] === appleY) {
							appleX = newApplePos();
							appleY = newApplePos();
						}
					}
						gridMatrix[appleX][appleY] = appleSign;
					} else {
						snake.pop();
						snake.unshift(`${snakeX + 1}-${snakeY}`);
					}
					updateGameBoard();
					++snakeX;
				} else {
					gameOver();
				}	
			}, snakeSpeed);
		}
	} else if (event.code === "ArrowLeft") {
		if (snakeY === 0) {
			gameOver();
		} else {
			for (let pos of snake) {
				nextPos = `${snakeX}-${snakeY - 1}`;
				if (pos === nextPos) {
					gameOver();
				}
			}
			if (snakeX === appleX && snakeY - 1 === appleY) {
				document.getElementById(`${snakeX}-${snakeY - 1}`).innerHTML = snakeSign;
				++eatenApples;
				snake.unshift(`${snakeX}-${snakeY - 1}`);
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				gridMatrix[appleX][appleY] = appleSign;
			} else {
				snake.pop();
				snake.unshift(`${snakeX}-${snakeY - 1}`);
			}
			updateGameBoard();
			--snakeY;
			clearInterval(intervalSet);
			intervalSet = setInterval(() => {
				for (let pos of snake) {
					nextPos = `${snakeX}-${snakeY - 1}`;
					if (pos === nextPos) {
						gameOver();
					}
				}
				if (snakeY > 0) {
					if (snakeX === appleX && snakeY - 1 === appleY) {
						document.getElementById(`${snakeX}-${snakeY - 1}`).innerHTML = snakeSign;
						++eatenApples;
						snake.unshift(`${snakeX}-${snakeY - 1}`);
						snakeSpeed -= 5;
						appleX = newApplePos();
						appleY = newApplePos();
						for (let pos of snake) {
							if (pos.split('-')[0] === appleX && pos.split('-')[1] === appleY) {
								appleX = newApplePos();
								appleY = newApplePos();
							}
						}
						gridMatrix[appleX][appleY] = appleSign;
					} else {
						snake.pop();
						snake.unshift(`${snakeX}-${snakeY - 1}`);
					}
					updateGameBoard();
					--snakeY;
				} else {	
					gameOver();
				}	
			}, snakeSpeed);
		}
	} else if (event.code === "ArrowRight") {		
		if (snakeY === cols - 1) {
			gameOver();
		} else {
			for (let pos of snake) {
				nextPos = `${snakeX}-${snakeY + 1}`;
				if (pos === nextPos) {
					gameOver();
				}
			}
			if (snakeX === appleX && snakeY + 1 === appleY) {
				document.getElementById(`${snakeX}-${snakeY + 1}`).innerHTML = snakeSign;
				++eatenApples;
				snake.unshift(`${snakeX}-${snakeY + 1}`);
				snakeSpeed -= 5;
				appleX = newApplePos();
				appleY = newApplePos();
				for (let pos of snake) {
					if (pos.split('-')[0] === appleX && pos.split('-')[1] === appleY) {
						appleX = newApplePos();
						appleY = newApplePos();
					}
				}
				gridMatrix[appleX][appleY] = appleSign;
			} else {
				snake.pop();
				snake.unshift(`${snakeX}-${snakeY + 1}`);
			}
			updateGameBoard();
			++snakeY;
			clearInterval(intervalSet);
			intervalSet = setInterval(() => {
				for (let pos of snake) {
					nextPos = `${snakeX}-${snakeY + 1}`;
					if (pos === nextPos) {
						gameOver();
					}
				}
				if (snakeY < cols - 1) {
					if (snakeX === appleX && snakeY + 1 === appleY) {
						document.getElementById(`${snakeX}-${snakeY + 1}`).innerHTML = snakeSign;
						++eatenApples;
						snake.unshift(`${snakeX}-${snakeY + 1}`);
						snakeSpeed -= 5;
						appleX = newApplePos();
						appleY = newApplePos();
						for (let pos of snake) {
							if (pos.split('-')[0] === appleX && pos.split('-')[1] === appleY) {
								appleX = newApplePos();
								appleY = newApplePos();
							}
						}
						gridMatrix[appleX][appleY] = appleSign;
					} else {
						snake.pop();
						snake.unshift(`${snakeX}-${snakeY + 1}`);
					}
					updateGameBoard();
					++snakeY;
				} else {
					gameOver();
				}	
			}, snakeSpeed);
		}
	}	
}

function startGame() {
	start.hidden = true;
	addEventListener('keydown', keyPressed, true);
	intervalSet = setInterval(() => {
		if (snakeY < cols - 1) {
			snake.pop();
			snake.unshift(`${snakeX}-${snakeY + 1}`);
			updateGameBoard();
			++snakeY;
		} else {
			gameOver();
		}		
	}, snakeSpeed);
}

function gameOver() {
	clearInterval(intervalSet);
	console.log(intervalSet);
	textInfo.hidden = false;
	textInfo.innerHTML = "Game Over";
	reset.hidden = false;
	start.hidden = true;
	removeEventListener('keydown', keyPressed, true);
}

function restartGame() {
	for (let r = 0; r < rows; ++r) {
		grid.deleteRow("<tr>");
	}
	gridMatrix = [];
	snake = [];
	eatenApples = 0;
	appleX = 5;
	appleY = 5;
	applesInfo.hidden = true;
	levelBtn.hidden = false;
	textInfo.hidden = true;
	reset.hidden = true;
	start.hidden = true;
	addEventListener('keydown', keyPressed, true);
}
