var character = document.getElementById('character');
var obstacle = document.getElementById('obstacle');
var scoreDisplay = document.getElementById('score');
var gameOverDisplay = document.getElementById('game-over');
var score = 0;
var jumping = false;
var gameOver = false;
var restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', function() {
  resetGame();
});
function jump() {
  if (jumping) return;
  jumping = true;

  let jumpCount = 0;
  let jumpInterval = setInterval(function () {
    if (jumpCount > 50) {
      clearInterval(jumpInterval);
      let fallInterval = setInterval(function () {
        if (jumpCount <= 0) {
          clearInterval(fallInterval);
          jumping = false;
        } else {
          character.style.bottom = --jumpCount + 'px';
        }
      }, 5);
    } else {
      character.style.bottom = ++jumpCount + 'px';
    }
  }, 5);
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    jump();
  }
});

function moveObstacle() {
  var obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue('left')
  );

  if (obstacleLeft > -60) {
    obstacle.style.left = obstacleLeft - obstacleSpeed + 'px';
  } else {
    obstacle.style.left = window.innerWidth + 'px';
    score++;
    scoreDisplay.innerText = score;
    obstacleSpeed++;
  }
}

var obstacleSpeed = 3;  //장애물 속도



setInterval(function () {
  if (gameOver) return;

  var characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue('top')
  );
  var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

  if (obstacleLeft < 50 && obstacleLeft > 0 && characterTop >= 150) {
    // Game Over
    gameOver = true;
    gameOverDisplay.innerText = '게임 끝!! 점수: ' + score;
  } else {
    moveObstacle();
  }
  
}, 10);

function resetGame() {
    obstacle.style.left = '100%';
    character.style.bottom = '0';
    gameOverDisplay.innerText = '';
    score = 0;
    scoreDisplay.innerText = score;
    obstacleSpeed = 5;
    gameOver = false;
  }
  
