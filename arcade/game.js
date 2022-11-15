// Welcome to the pits!
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


    let squareCount = 20
    let squareSize = canvas.width / squareCount;

    // the initial snake head position
    let headX = 10;
    let headY = 9;

    let snakeBody = [
        [0,0]
    ];
    // for some reason when this is set to an empty array the snake only grows after eating two food items

    let directionX = 0;
    let directionY = 0;

    let foodX = 7;
    let foodY = 7;
    

    let speed = 5;
    let score = 0;

    let gameOver = false;

function checkIfOver() {
    if (headX < 0 || headY < 0 || headX > squareCount - 1 || headY > squareCount - 1) {
        gameOver = true;
    } 
// THIS IS GIVING ME TROUBLE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// maybe I can change it to if there are 3 on this square the ngame over, because asking if the head is equal to the body will always be true at some point based on how our snake moves back to front
    
    // for (let i = 0; i < snakeBody.length; ++i) {
    //     if (headX + directionX == snakeBody[i][0] && headY + directionY == snakeBody[i][1]) {
    //             gameOver = true;
    //             console.log("yes")
    //         }
    // }
    if (gameOver === true) {
        ctx.fillStyle = "white";
        ctx.font = "50px Tahoma"

        // I have to draw a gradient over the gameBoard fill within the text
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "rgb(248, 23, 248)");
        gradient.addColorStop("0.6", "rgb(9, 124, 255)");
        gradient.addColorStop("1.0", "red");
       
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width/6, canvas.height/2)        
    }
}

// this function runs the game and calls all our other functions
function runGame() {

    if (gameOver) {
        return;
    }

    drawBoard();
    checkIfAte();
    moveSnake();
    drawSnake();
    drawFood();
    increaseSpeed(); 
    checkIfOver(); 

    setTimeout(runGame, 1000/speed);
    // 1000 milliseconds = 1 sec , 5 times per second here 
}



function drawBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "rgb(9, 124, 255)";
    ctx.fillRect(headX * squareCount, headY * squareCount, squareSize - 1, squareSize - 1);

    ctx.fillStyle = "rgb(16, 255, 8)";
    for (let i = 0; i < snakeBody.length; ++i) {
        ctx.fillRect(snakeBody[i][0] * squareCount, snakeBody[i][1] * squareCount, squareSize - 1, squareSize - 1)
    }
}

function moveSnake() {
    headX = headX + directionX;
    headY = headY + directionY;

    for (let i = snakeBody.length - 1; i > 0; --i) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [headX, headY];
    }

    // for (let i = 0; i < snakeBody.length; ++i) {
    //     if (headX == snakeBody[i][0] && headY == snakeBody[i][1]) {
    //         gameOver = true;
    //         alert("GAME OVER! - you ran into yourself")
    //     }
    // }
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
        // console.log(snakeBody, foodX, foodY);
    
        currentScore.innerText = "Current Score: " + score;
        randomizeFood();
    }
}

    function randomizeFood() {
        foodX = Math.floor(Math.random() * squareCount);
        foodY = Math.floor(Math.random() * squareCount);
    }

function increaseSpeed() {
    if (score > 2) {
        speed = 5;
    }
    if (score > 3) {
        speed = 6.5;
    }
    if (score > 6) {
        speed = 8;
    }
    if (score > 12) {
        speed = 11;
    }
    if (score > 18) {
        speed = 14;
    }
    if (score > 25) {
        speed = 17;
    }
}

const currentScore = document.getElementById("currentScore");
const resetButton = document.getElementById("resetButton");
const highScore = document.getElementById("highScore");


// all this right here aint workin
resetButton.addEventListener("click", function() {

        if (currentScore >= highScore) {
            highScore.innerHTML = "High Score: " + score;
            currentScore.innerHTML = "Current Score: " + 0;
        }
        randomizeFood();
        drawBoard();
        snakeBody = [10,9];
        console.log(snakeBody, "I was clicked");
        drawSnake();
        // drawSnake();
    }
);

runGame();
 






