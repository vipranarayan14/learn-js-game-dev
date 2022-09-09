const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const BALL_RADIUS = 15;

const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const PADDLE_Y = canvas.height - PADDLE_HEIGHT;

let paddle_x = (canvas.width - PADDLE_WIDTH) / 2;

let ball_x = paddle_x;
let ball_y = paddle_x;

let ball_dx = 2;
let ball_dy = -2;

let isArrowLeftPressed = false;
let isArrowRightPressed = false;

document.addEventListener(
  'keydown',
  e => {
    if (e.key === 'ArrowLeft') {
      isArrowLeftPressed = true;
    }
    if (e.key === 'ArrowRight') {
      isArrowRightPressed = true;
    }
  },
  false
);

document.addEventListener(
  'keyup',
  e => {
    if (e.key === 'ArrowLeft') {
      isArrowLeftPressed = false;
    }
    if (e.key === 'ArrowRight') {
      isArrowRightPressed = false;
    }
  },
  false
);

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball_x, ball_y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle_x, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
};

const endGame = () => {
  alert('GAMEOVER!');
  // document.location.reload();
  clearInterval(interval);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();

  drawPaddle();

  if (
    ball_x + ball_dx < BALL_RADIUS ||
    ball_x + ball_dx > canvas.width - BALL_RADIUS
  ) {
    ball_dx = -ball_dx;
  }
  if (ball_y + ball_dy < BALL_RADIUS) {
    ball_dy = -ball_dy;
  } else if (ball_y + ball_dy + BALL_RADIUS / 2 > PADDLE_Y) {
    if (ball_x > paddle_x && ball_x < paddle_x + PADDLE_WIDTH) {
      ball_dy = -ball_dy;
    } else endGame();
  }

  if (isArrowLeftPressed) {
    paddle_x -= 7;
    if (paddle_x < 0) {
      paddle_x = 0;
    }
  }

  if (isArrowRightPressed) {
    paddle_x += 7;
    if (paddle_x + PADDLE_WIDTH > canvas.width) {
      paddle_x = canvas.width - PADDLE_WIDTH;
    }
  }

  ball_x += ball_dx;
  ball_y += ball_dy;
};

const interval = setInterval(draw, 10);
