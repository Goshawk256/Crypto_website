const canvas = document.getElementById('dartboard');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('reset');
const scoreElement = document.getElementById('score');

const primeNumbers = [2, 3, 5, 7, 11];
let score = 0;

function drawDartboard() {
  const colors = ['#ee91cf', '#fff'];
  const radius = [250, 200, 150, 100, 50];

  for (let i = 0; i < radius.length; i++) {
    ctx.beginPath();
    ctx.arc(250, 250, radius[i], 0, 2 * Math.PI);
    ctx.fillStyle = colors[i % 2];
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    ctx.font = '20px Arial';
    ctx.fillStyle = colors[(i + 1) % 2];
    ctx.fillText(primeNumbers[i], 250 - 5, 250 - radius[i] + 20);
  }
}
const targetElement = document.createElement('h2');
targetElement.style.marginTop = '10px';
scoreElement.parentNode.insertBefore(targetElement, scoreElement.nextSibling);

function generateTarget() {
  let target = 0;
  for (let i = 0; i < primeNumbers.length; i++) {
    target += primeNumbers[i] * Math.floor(Math.random() * 3);
  }
  targetElement.textContent = `Hedef: ${target}`;
  return target;
}

let target = generateTarget();

function resetGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDartboard();
  score = 0;
  scoreElement.textContent = `Skor: ${score}`;
  target = generateTarget();
}
function checkWinOrLose() {
  if (score === target) {
    targetElement.textContent = 'Kazandınız!';
    targetElement.style.color = 'green';
    targetElement.style.fontSize = '24px';
    setTimeout(resetGame, 3000);
  } else if (score > target) {
    targetElement.textContent = 'Kaybettiniz!';
    targetElement.style.color = 'red';
    targetElement.style.fontSize = '24px';
    setTimeout(resetGame, 3000);
  }
}
// Dartboard'a tıklama işlemi
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#ec4fb8';
  ctx.fill();

  const dx = x - 250;
  const dy = y - 250;
  const distance = Math.sqrt(dx * dx + dy * dy);

  for (let i = 0; i < primeNumbers.length; i++) {
    if (distance <= (i + 1) * 50 && distance > i * 50) {
      score += primeNumbers[primeNumbers.length - 1 - i]; 
      scoreElement.textContent = `Skor: ${score}`;
      checkWinOrLose();
      console.log(score);
      break;
    }
  }
});

// Tahtayı sıfırlama işlemi

/*resetButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDartboard();
  score = 0;
  scoreElement.textContent = `Skor: ${score}`;
});*/

resetButton.addEventListener('click', resetGame);

drawDartboard();
