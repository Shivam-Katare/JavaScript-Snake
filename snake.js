let inputdir = { x: 0, y: 0 }  //initial direction zero
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let hiscoreval = 0;
let score = 0;
let speed = 12;
let lastPaintTime = 0;
let snakearr = [
    {x: 12, y:15}  //starting position
]
let food = { x: 5, y: 10 };

//Game Functions

function main(ctime) {   //ctime = current Time

    window.requestAnimationFrame(main);   //game loop
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snake) {
    //if snake bump itself
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }  
     // if we bump into the wall
        if (snake[0].x >= 38 || snake[0].x <= 0 || snake[0].y >= 38 || snake[0].y <= 0) {
            return true;
        }
    
}

function gameEngine() {
    //part 1 : Updating the snake array
    if (isCollide(snakearr)) {
        gameOverSound.play();
        musicSound.pause();
        inputdir = { x: 0, y: 0 };
        alert("Game Over, Press any key to start the game again");
        snakearr = [{ x: 12, y: 15 }];
        musicSound.play();
        score = 0;
    }

    //if snake has eaten the food, increment the the score and regenerate the food
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        foodSound.play();
        score += 1;
        if (score > 30) {
            speed = 20;
        }
        else if(speed > 50 ){
            speed = 30;
        }
        else if (speed > 75) {
            speed = 40;
        }
        else {
            score;
        }
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "High Score " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;

        let a = 2;
        let b = 36;
        food = { x: Math.round(a + (b - a) * Math.random()),  y: Math.round(a + (b - a) * Math.random()) };
    }

    //moving the snake
    for (let i = snakearr.length-2; i >=0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    //part2 : Display the snake and food

    //display snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;  // y = row
        snakeElement.style.gridColumnStart = e.x; //x = coloumn
        
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    });

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;  // y = row
    foodElement.style.gridColumnStart = food.x; //x = coloumn
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main Logic

let highScore = localStorage.getItem('highscore');
if (highScore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JASON.parse(highScore);
    highScoreBox.innerHTML = "High Score " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }; //press any key to start the game
    // moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("Arrowup");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrowdowm");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("left");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrowright");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
    
        default:
            break;
    }
})