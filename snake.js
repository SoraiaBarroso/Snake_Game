//get html object by class
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let setIntervalId;
let GameOver = false;
//position
let FoodX = 5,FoodY = 5;
let SnakeX = 5, SnakeY = 10;
let SnakeBody = [];
let velocityX = 0, velocityY = 0;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    //ramdom 0 - 30 value for food position since grid is 30
    FoodX = Math.floor(Math.random() * 30) + 1;
    FoodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const Replay = () => {
    clearInterval(setIntervalId);
    location.reload();
}

const changeDirection = (e) => {
    //console.log(e);
    //changing velocity based on key pressed
    if(e.keyCode === 38 && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.keyCode === 40 && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.keyCode === 37 && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.keyCode === 39 && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

//arrow function
const initGame = () => {

    if(GameOver) return handleGameOver();
	//create a food div and insert it in the playboard 
	let htmlMarkup = `<div class="food" style="grid-area: ${FoodY} / ${FoodX}"></div>`;
    
    //If snake eats the food
    if(SnakeX === FoodX && SnakeY == FoodY){
        changeFoodPosition();
        SnakeBody.push([FoodX, FoodY]); // push food position to body array 
       
        score += 5; // increment score by 1

        highScore = score >= highScore ? score : highScore;
        
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    
    //update snake based on velocity
    SnakeX += velocityX;
    SnakeY += velocityY

    for(let i = SnakeBody.length - 1; i > 0; i--){
        SnakeBody[i] = SnakeBody[i - 1];
    }

    SnakeBody[0] = [SnakeX, SnakeY];

    if(SnakeX <= 0 || SnakeX > 30 || SnakeY <= 0 || SnakeY > 30){
        GameOver = true;
    }

    for(let i = 0; i < SnakeBody.length; i++){
        //ading a div for each part of the snakes body
        htmlMarkup += `<div class="head" style="grid-area: ${SnakeBody[i][1]} / ${SnakeBody[i][0]}"></div>`;
        //check if the snake head hit the body
        if(i !== 0 && SnakeBody[0][1] === SnakeBody[i][1] && SnakeBody[0][0] === SnakeBody[i][0]){
            GameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
