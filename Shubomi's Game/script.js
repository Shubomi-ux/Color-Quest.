const colorBox = document.querySelector('[data-testid="colorBox"]');
const guessButtons = document.querySelectorAll('.guess-btn');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameBtn = document.querySelector('[data-testid="newGameButton"]');

let targetColor = ''; 
let score = 0; 

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setupNewRound() {
  targetColor = getRandomColor();
  colorBox.querySelector('.back').style.backgroundColor = targetColor;
  
  const colors = Array.from({ length: 6 }, () => getRandomColor());
  const randomIndex = Math.floor(Math.random() * 6);
  colors[randomIndex] = targetColor;

  guessButtons.forEach((button, index) => {
    button.style.backgroundColor = colors[index];
    button.dataset.color = colors[index];
  });

  gameStatus.textContent = 'Try Your Luck!';
  gameStatus.classList.remove('fade-out', 'celebrate'); 
  colorBox.classList.remove('flipped'); 
}

guessButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const guessedColor = button.dataset.color;

    colorBox.classList.add('flipped');

    if (guessedColor === targetColor) {
      gameStatus.textContent = 'Correct! 🎉';
      gameStatus.classList.add('celebrate');
      score++;
    } else {
      gameStatus.textContent = 'Wrong! Try again. ❌';
      gameStatus.classList.add('fade-out');
    }

   
    scoreDisplay.textContent = `score: ${score}`;

    setTimeout(() => {

      colorBox.classList.remove('flipped');
      colorBox.querySelector('.back').style.backgroundColor = 'lightblue';
    }, 500);

    setTimeout(setupNewRound, 1500);
  });
});

newGameBtn.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = `score: ${score}`;

  gameStatus.textContent = '';

  setupNewRound();

  colorBox.classList.remove('flipped');

  console.log('Game has been reset!');
});

setupNewRound();


