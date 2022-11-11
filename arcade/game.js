

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


    let squareCount = 20
    let squareSize = canvas.width / squareCount;

    let headX = 10;
    let headY = 9;

    let directionX = 0;
    let directionY = 0;

    let foodX = 4;
    let foodY = 4;
    

    let speed = 5;

// this function runs the game
function runGame() {
    
    drawBoard();
    moveSnake();
    drawFood();
    checkIfAte();
    drawSnake();


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
}

function moveSnake() {
    headX = headX + directionX;
    headY = headY + directionY;
}

    document.addEventListener("keydown", direction);

    let d;

    function direction(event) {
        if (event.keyCode == 37) {
            directionX = -1;
            directionY = 0;
            event.preventDefault();
            console.log("Left");
        }
        else if (event.keyCode == 38) {
            directionX = 0;
            directionY = -1;
            event.preventDefault();
            console.log("Up");
        }
        else if (event.keyCode == 39) {
            directionX = 1;
            directionY = 0;
            event.preventDefault();
            console.log("Right");
        }
        else if (event.keyCode == 40) {
            directionX = 0;
            directionY = 1;
            event.preventDefault();
            console.log("Down");
        }
    }

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * squareCount, foodY * squareCount, squareSize, squareSize);
}

function checkIfAte() {
    if(foodX === headX && foodY === headY) {
        console.log("ive been hit!");
        foodX = Math.floor(Math.random() * squareCount);
        foodY = Math.floor(Math.random() * squareCount);
    }
}


runGame();











