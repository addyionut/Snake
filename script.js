const grid = document.getElementById('gameBoard');
const levelBtn = document.getElementById('levelButtons');
const textInfo = document.getElementById('infoText');
const reset = document.getElementById("resetGame");
const applesInfo = document.getElementById("apples");
const start = document.getElementById("startButton");
let rows, cols, gridMatrix = [], snakeElements = [], appleSign = "🍎", snakeSign = "⏹", appleX = 5, appleY = 5, 
snakeX, snakeY, intervalSet, eatenApples = 0, snakeSpeed;

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
	generateMatrix();
	snakeX = Math.floor(rows / 2);
	snakeY = snakeX;
	snakeElements.unshift(`${snakeX}-${snakeY}`);
	gridMatrix[snakeX][snakeY] = snakeSign;
	gridMatrix[appleX][appleY] = appleSign;
	updateGameBoard();
}

function generateMatrix() {
	for (let i = 0; i < rows; i++) {
  		gridMatrix[i] = [];
  		for (let j = 0; j < cols; j++) {
    		gridMatrix[i][j] = "";
  		}
	}
}

function startGame() {
	start.hidden = true;
	addEventListener('keydown', keyPressed, true);
	intervalSet = setInterval(() => {
		if (snakeY < cols - 1) {
			snakeElements.pop();
			snakeElements.unshift(`${snakeX}-${snakeY + 1}`);
			updateGameBoard();
			++snakeY;
		} else {
			gameOver();
		}		
	}, snakeSpeed);
}

function keyPressed(event) {
	let direction;
	if (event.code === "ArrowUp") {
		direction = "up";
		if (snakeX === 0) {
			gameOver();
		} else {
			changeDirection(direction);
		}
	} else if (event.code === "ArrowDown") {
		direction = "down";	
		if (snakeX === rows - 1) {
			gameOver();
		} else {
			changeDirection(direction);
		}
	} else if (event.code === "ArrowLeft") {
		direction = "left";
		if (snakeY === 0) {
			gameOver();
		} else {
			changeDirection(direction);
		}
	} else if (event.code === "ArrowRight") {
		direction = "right";	
		if (snakeY === cols - 1) {
			gameOver();
		} else {
			changeDirection(direction);
		}
	}	
}

function newApplePos() {
	return Math.floor(Math.random() * rows);
}

function eatApples(x, y) {
	if (snakeX + x === appleX && snakeY + y === appleY) {
		++eatenApples;
		snakeElements.unshift(`${snakeX + x}-${snakeY + y}`);
		snakeSpeed -= 5;
		appleX = newApplePos();
		appleY = newApplePos();
		let lg = snakeElements.length;
		for (let i = 0; i < lg; ++i) {
			if (snakeElements[i].split('-')[0] === appleX && snakeElements[i].split('-')[1] === appleY) {
				appleX = newApplePos();
				appleY = newApplePos();
				i = 0;
			}
		}
		gridMatrix[appleX][appleY] = appleSign;
	} else {
		snakeElements.pop();
		snakeElements.unshift(`${snakeX + x}-${snakeY + y}`);
	}
}

function updateMatrix() {
	let row, col;
	for (let i = 0; i <= eatenApples; ++i) {
		row = snakeElements[i].split('-')[0];
		col = snakeElements[i].split('-')[1];
		gridMatrix[row][col] = snakeSign;
	}
}

function updateGameBoard() {
	generateMatrix();
	updateMatrix();
	gridMatrix[appleX][appleY] = appleSign;	
	applesInfo.innerHTML = `Eaten apples: ${eatenApples}`;
	for (let i = 0; i < rows; i++) {
  		for (let j = 0; j < cols; j++) {
    		document.getElementById(`${i}-${j}`).innerHTML = gridMatrix[i][j];
  		}
	}
}

function changeDirection(direction) {
	let x, y;
	if (direction === "up") {
		x = -1;
		y = 0;
	} else if (direction === "down") {
		x = 1;
		y = 0;
	} else if (direction === "left") {
		x = 0;
		y = -1;
	} else if (direction === "right") {
		x = 0;
		y = 1;
	}
	let nextPos;
	for (let pos of snakeElements) {
		nextPos = `${snakeX + x}-${snakeY + y}`;
		if (pos === nextPos) {
			gameOver();
		}
	}
	eatApples(x, y);
	updateGameBoard();
	snakeX += x;
	snakeY += y;
	clearInterval(intervalSet);
	if (direction === "up") {
		x = -1;
		y = 0;
		intervalSet = setInterval(() => {
			let nextPos;
			for (let pos of snakeElements) {
				nextPos = `${snakeX + x}-${snakeY + y}`;
				if (pos === nextPos) {
					gameOver();
				}
			}
			if (snakeX === 0) {
				gameOver();
			} else {
				eatApples(x, y);
				updateGameBoard();
				snakeX += x;
				snakeY += y;
			}
		}, snakeSpeed);
	} else if (direction === "down") {
		x = 1;
		y = 0;
		intervalSet = setInterval(() => {
			if (snakeX === rows - 1) {
				gameOver();
			} else {
				eatApples(x, y);
				updateGameBoard();
				snakeX += x;
				snakeY += y;
			}
		}, snakeSpeed);
	} else if (direction === "left") {
		x = 0;
		y = -1;
		intervalSet = setInterval(() => {
			if (snakeY === 0) {
				gameOver();
			} else {
				eatApples(x, y);
				updateGameBoard();
				snakeX += x;
				snakeY += y;
			}
		}, snakeSpeed);
	} else if (direction === "right") {
		x = 0;
		y = 1;
		intervalSet = setInterval(() => {
			if (snakeY === cols - 1) {
				gameOver();
			} else {
				eatApples(x, y);
				updateGameBoard();
				snakeX += x;
				snakeY += y;
			}
		}, snakeSpeed);
	}
}

function gameOver() {
	clearInterval(intervalSet);
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
	snakeElements = [];
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
