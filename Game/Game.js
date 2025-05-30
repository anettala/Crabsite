import Player from "./Player.js";
import Ground from "./Ground.js";
import CoralController from "./CoralController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = 1;
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5; //58
const PLAYER_HEIGHT = 94 / 1.5; //62
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CORAL_SPEED = 0.5;

const CORAL_CONFIG = [
    {width:48 /1.5, height: 100/1.7, image: "./images/coral_1.png"},
    {width:98 /1.5, height: 100/1.7, image: "./images/coral_2.png"},
    {width:68 /1.5, height: 70/1.7, image: "./images/coral_3.png"},
];

//GAME OBJECTS
let player = null;
let ground = null;
let coralController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function createSprites() {
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT * scaleRatio;


    player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
    ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_CORAL_SPEED, scaleRatio);

    const coralImages = CORAL_CONFIG.map((coral) => {
        const image = new Image();
        image.src = coral.image;
        return {
            image: image,
            width: coral.width * scaleRatio,
            height: coral.height * scaleRatio,
        };
    });

    coralController = new CoralController(ctx, coralImages, scaleRatio, GROUND_AND_CORAL_SPEED);

    score = new Score(ctx, scaleRatio);
}

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
}

setScreen();

window.addEventListener("resize", ()=> setTimeout(setScreen, 500));

if (screen.orientation) {
    screen.orientation.addEventListener("change", setScreen);
}

//window is wider than the game width
function getScaleRatio() {
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);

    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

    if(screenWidth/screenHeight < GAME_WIDTH/GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
}

function showGameOver() {
  const fontSize = 70 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "grey";
  const x = canvas.width / 4.5;
  const y = canvas.height / 2;
  ctx.fillText("GAME OVER", x, y);
}

function setupGameReset() {
  if (!hasAddedEventListenersForRestart) {
    hasAddedEventListenersForRestart = true;

    setTimeout(() => {
      window.addEventListener("keyup", reset, { once: true });
      window.addEventListener("touchstart", reset, { once: true });
    }, 1000);
  }
}

function reset() {
  hasAddedEventListenersForRestart = false;
  gameOver = false;
  waitingToStart = false;
  ground.reset();
  coralController.reset();
  score.reset();
  gameSpeed = GAME_SPEED_START;
}

function showStartGameText() {
  const fontSize = 40 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "grey";
  const x = canvas.width / 14;
  const y = canvas.height / 2;
  ctx.fillText("Tap Screen or Press Space To Start", x, y);
}

function updateGameSpeed(frameTimeDelta) {
    gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}


function clearScreen() {
    ctx.fillStyle = "rgb(147, 204, 254)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime) {
    if (previousTime === null) {
      previousTime = currentTime;
      requestAnimationFrame(gameLoop);
      return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
  
    clearScreen();
  
    if (!gameOver && !waitingToStart) {
      //Update game objects
      ground.update(gameSpeed, frameTimeDelta);
      coralController.update(gameSpeed, frameTimeDelta);
      player.update(gameSpeed, frameTimeDelta);
      score.update(frameTimeDelta);
      updateGameSpeed(frameTimeDelta);
    }
  
    if (!gameOver && coralController.collideWith(player)) {
      gameOver = true;
      setupGameReset();
      score.setHighScore();
    }
  
    //Draw game objects
    ground.draw();
    coralController.draw();
    player.draw();
    score.draw();
  
    if (gameOver) {
      showGameOver();
    }
  
    if (waitingToStart) {
      showStartGameText();
    }
  
    requestAnimationFrame(gameLoop);
  }
  
  requestAnimationFrame(gameLoop);
  
  window.addEventListener("keyup", reset, { once: true });
  window.addEventListener("touchstart", reset, { once: true });