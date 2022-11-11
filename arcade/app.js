
// the function below creates tr and td for the HTML 'table' element; I will try using 
// a canvas model instead, it seems to have better functionality for a 2d game

// const gameBoard = document.getElementById("gameBoard");

// function makeBoard() {

//     for (let i = 0; i < 20; ++i) {

//         const row = document.createElement("tr");

//         for (let j = 0; j < 20; ++j) {
//             const square = document.createElement("td");
//             row.appendChild(square);

//             }
//         gameBoard.appendChild(row);
//     }
// }

// makeBoard();


const canvas = document.getElementById("canvas");
// gets a reference to the HTML <canvas> tag
const context = canvas.getContext("2d");
// gets the context from that HTML element and renders it for 2d drawing

const box = 32;
// sets the unit size for the drawing area

let score = 0;
// score begins at 0

const spiceImg = new Image();
spiceImg.src = "spice_pixel_art.png";
// uploading with url into canvas is pretty confusing so 
// keep image within the arcade folder

let worm = [];
// the snake will be an array
worm[0] = {
    x: 15 * box,
    y: 14 * box
} 
// the first value in the snake array, let it start at (15,14) boxes
let spice = {
    x: Math.floor(Math.random() * 20 * box),
    y: Math.floor(Math.random() * 19 * box)
}

// control the snake, add event listener for keys being clicked, it will give the direction
document.addEventListener("keydown", direction);

let d; 
// this is just d and not = o something because we define what it is equal
// to based on the keydown event, so we are simply saying that it is.

// function for determining how the snake responds to the keydown event
function direction(event) {
    if (event.keyCode == 37) {
        d = "LEFT";
        event.preventDefault();
        console.log("Left");
    }
    else if (event.keyCode == 38) {
        d = "UP";
        event.preventDefault();
        console.log("Up");
    }
    else if (event.keyCode == 39) {
        d = "RIGHT";
        event.preventDefault();
        console.log("Right");
    }
    else if (event.keyCode == 40) {
        d = "DOWN";
        event.preventDefault();
        console.log("Down");
    }
}


// now we want to draw the images, this will draw the snake and the spice,
// along with anything except the background which is in the CSS
function draw() {
    
    for (let i = 0; i < worm.length; ++i) {

        context.fillStyle = (i === 0)? "brown" : "black";
        context.fillRect(worm[i].x, worm[i].y, box, box);
    }
        context.drawImage(spiceImg, spice.x, spice.y, box, box);

        // get the old head of the worm, the first position
        let wormX = worm[0].x;
        let wormY = worm[0].y;

        // remove the old head !!!wont work!!!!!!!!
        worm.pop();

        // depending on what d or the direction is equal to, we move one box in either x or y
        if (d == "LEFT") wormX -= box;
        if (d == "UP") wormY -= box;
        if (d == "RIGHT") wormX += box;
        if (d == "DOWN") wormY += box;

        // give the new position of the head
        let newHead = {
            x: wormX,
            y: wormY
        }
        // add the new position using unshift, this adds the new element to the start of an array and returns the new length
        worm.unshift(newHead);
        
}

let game = setInterval(draw, 100);




//  maybe do... score = worm.length ?

canvas.addEventListener("click", function() {
    console.log("I was clicked");
});


