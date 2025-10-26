var game = document.getElementById('game');
var basket = document.querySelector('.basket');
var scoreDisplay = document.getElementById('score');
var message = document.getElementById('message');

var score = 0;
var basketX = window.innerWidth / 2 - 50;
var gameRunning = false;
var colors = ['blue', 'red', 'green', 'pink'];

//Set basket starting position
basket.style.left = basketX + 'px';

// Reposition basket when screen size changes
window.addEventListener('resize', function() {
  basketX = window.innerWidth / 2 - 50;
  basket.style.left = basketX + 'px';
});

// Start game
message.style.display = 'block';
game.addEventListener('click', startGame, { once: true });

function startGame() {
  message.style.display = 'none';
  gameRunning = true;
  setInterval(createBall, 1000);
}

// Move basket with arrow keys
document.addEventListener('keydown', function(e) {
  if (!gameRunning) return;

  if (e.key === 'ArrowLeft' && basketX > 0) {
    basketX -= 30;
  } else if (e.key === 'ArrowRight' && basketX < window.innerWidth - 100) {
    basketX += 30;
  }

  basket.style.left = basketX + 'px';
});

// Move basket on touch
document.addEventListener('touchmove', function(e) {
  if (!gameRunning) return;
  var touch = e.touches[0];
  basketX = touch.clientX - 50;
  basket.style.left = basketX + 'px';
});

//  Falling balls
function createBall(){
if (!gameRunning) return;

var ball = document.createElement('div');
  var color = colors[Math.floor(Math.random() * colors.length)];
  ball.classList.add('ball', color);
  ball.style.left = Math.random() * (window.innerWidth - 40) + 'px';

  // random fall speed
  var duration = 3 + Math.random() * 2;
  ball.style.animation = `fall ${duration}s linear forwards`;

  game.appendChild(ball);

  var fallCheck = setInterval(function() {
    var ballRect = ball.getBoundingClientRect();
    var basketRect = basket.getBoundingClientRect();

    // If caught
    if (
      ballRect.bottom >= basketRect.top &&
      ballRect.left >= basketRect.left &&
      ballRect.right <= basketRect.right
    ) {
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
      ball.remove();
      clearInterval(fallCheck);
    }

    // If missed (falls below screen)
    if (ballRect.top > window.innerHeight) {
      ball.remove();
      clearInterval(fallCheck);
    }
  }, 30);
}
