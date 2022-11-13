// Welcome to the pits!
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const currentScore = document.getElementById("currentScore");
const resetButton = document.getElementById("resetButton");


    let squareCount = 20
    let squareSize = canvas.width / squareCount;

    // the initial snake head position
    let headX = 10;
    let headY = 9;

   const snakeBody = [];
    

    let directionX = 0;
    let directionY = 0;

    let foodX = 7;
    let foodY = 7;
    

    let speed = 5;
    let score = 0;

// this function runs the game and calls all our other functions
function runGame() {
    
    drawBoard();
    moveSnake();
    checkIfAte();
    drawSnake();
    drawFood();


// eventually will need a clear game function that clears the board, but keeps your highest score saved. so we do not refresh the page
    setTimeout(runGame, 1000/speed);
    // 1000 milliseconds = 1 sec , 5 times per second here 
}

function drawBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "blue";
    ctx.fillRect(headX * squareCount, headY * squareCount, squareSize, squareSize);

    for (let i = 0; i < snakeBody.length; ++i) {
        ctx.fillRect(snakeBody[i][0] * squareCount, snakeBody[i][1] * squareCount, squareSize, squareSize)
    }
}

function moveSnake() {
    headX = headX + directionX;
    headY = headY + directionY;
}

// the keydown events
    document.addEventListener("keydown", direction);

    function direction(event) {
        if (event.keyCode == 37) {
            if (directionX == 1) {
                return;
            }
            // the second if statements here prevent the snake from going backwards/into itself ever
            directionX = -1;
            directionY = 0;
            event.preventDefault();
            // console.log("Left");
        }
        else if (event.keyCode == 38) {
            if (directionY == 1) {
                return;
            }
            directionX = 0;
            directionY = -1;
            event.preventDefault();
            // console.log("Up");
        }
        else if (event.keyCode == 39) {
            if (directionX == -1) {
                return;
            }
            directionX = 1;
            directionY = 0;
            event.preventDefault();
            // console.log("Right");
        }
        else if (event.keyCode == 40) {
            if (directionY == -1) {
                return;
            }
            directionX = 0;
            directionY = 1;
            event.preventDefault();
            // console.log("Down");
        }
    }

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * squareCount, foodY * squareCount, squareSize, squareSize);
}

function checkIfAte() {
    if(foodX === headX && foodY === headY) {
        score++;
        snakeBody.push([foodX, foodY]);
        console.log(snakeBody, foodX, foodY);
        
            for (let i = snakeBody.length - 1; i > 0; i--) {
                snakeBody[i] = snakeBody[i-1];
            }
            if (snakeBody.length) {
                snakeBody[0] = [headX, headY];
            }
        
        currentScore.innerText = "Current Score: " + score;
        randomizeFood();
    }
}

    function randomizeFood() {
        foodX = Math.floor(Math.random() * squareCount);
        foodY = Math.floor(Math.random() * squareCount);
    }


function resetBoard() {

}


runGame();
 






