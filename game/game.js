var character = document.getElementById('character');
var obstacle = document.getElementById('obstacle');
var bullet = document.getElementById('bullet');
var gameOverDisplay = document.getElementById('game-over');
var scoreDisplay = document.getElementById('score');

var score = 0;
var jumping = false;
var gameOver = false;
var shooting = false;
var bulletSpeed = 5;
var obstacleSpeed = 2;

function jump() {
  if (jumping) return;
  jumping = true;

  let jumpCount = 0;
  let jumpInterval = setInterval(function () {
    if (jumpCount > 80) {
      clearInterval(jumpInterval);
      let fallInterval = setInterval(function () {
        if (jumpCount <= 0) {
          clearInterval(fallInterval);
          jumping = false;
        } else {
          character.style.bottom = --jumpCount + 'px';
        }
      }, 0);
    } else {
      character.style.bottom = ++jumpCount + 'px';
    }
  }, 2);
  //score+=100;
  //scoreDisplay.innerText = score;
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    jump();
  } else if (event.code === 'KeyZ' && !shooting && score >= 200) {
    shooting = true;
    score -= 200;
    scoreDisplay.innerText = score;
    var bulletInterval = setInterval(function () {
      var bulletLeft = parseInt(
        window.getComputedStyle(bullet).getPropertyValue('left')
      );
      if (bulletLeft > window.innerWidth) {
        clearInterval(bulletInterval);
        bullet.style.left = '-10px';
        shooting = false;
      } else {
        bullet.style.left = bulletLeft + bulletSpeed + 'px';
        var obstacleLeft = parseInt(
          window.getComputedStyle(obstacle).getPropertyValue('left')
        );
        var obstacleBottom = parseInt(
          window.getComputedStyle(obstacle).getPropertyValue('bottom')
        );
        var bulletBottom = parseInt(
          window.getComputedStyle(bullet).getPropertyValue('bottom')
        );
        if (
          obstacleLeft < bulletLeft &&
          obstacleLeft > bulletLeft - 20 &&
          bulletBottom >= obstacleBottom &&
          bulletBottom <= obstacleBottom + 25
        ) {
          obstacle.style.left = window.innerWidth + 'px';
          //score += 200; //총알에 맞으면 장애물이 맞을 시 점수 올리기
          scoreDisplay.innerText = score;
          obstacleSpeed+=0.2;
          clearInterval(bulletInterval);
          bullet.style.left = '-30px';
          shooting = false;
        } else if (obstacleLeft < 50 && obstacleLeft > 0 && characterTop >= 150) {
          gameOver = true;
          gameOverDisplay.innerText = '게임 끝!! 점수: ' + score;
          restartButton.style.display = 'block';
        }
      }
    }, 10);
  } else {
    return; // 200점 미만인 경우에는 총알을 발사하지 않도록 처리
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
      score+=100;
      scoreDisplay.innerText = score;
    }
  }

  var game = document.getElementById('game');
var backgroundPosition = 0;
var backgroundSpeed = 2;

function moveBackground() {
  backgroundPosition -= backgroundSpeed;
  game.style.backgroundPosition = backgroundPosition + 'px 0';
}

setInterval(moveBackground, 10);

  

setInterval(function () {
    if (gameOver) return;
  
    var characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue('top')
    );
    var obstacleLeft = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue('left')
    );
  
    if (obstacleLeft < 50 && obstacleLeft > 0 && characterTop >= 150) {
      // Game Over
      gameOver = true;
      gameOverDisplay.innerText = 'Do`h!!';
      restartButton.style.display = 'block';
    }
  
    moveObstacle();
  
  }, 10);
  
  
  var restartButton = document.createElement('button');
  restartButton.id = 'restart-button';
  restartButton.innerText = '시작 화면으로';
  restartButton.addEventListener('click', function () {
    location.reload();
  });
  restartButton.style.display = 'none';
  document.getElementById('game').appendChild(restartButton);
  