let score = 0;
let time = 60;
let timer;
let gameActive = false;

// Audio setup
const gameAudio = new Audio('pillar_man_theme.mp3'); // Make sure the path is correct
gameAudio.loop = true; // Enable loop

const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const target = document.getElementById('target');
const startBtn = document.getElementById('start-btn');

function startGame() {
    score = 0;
    time = 60;
    gameActive = true;
    scoreElement.textContent = score;
    timeElement.textContent = time;
    startBtn.classList.add('hidden');
    target.style.display = 'block';
    moveTarget();

    // Start the background audio
    gameAudio.play();

    timer = setInterval(() => {
        time--;
        timeElement.textContent = time;
        if (time === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(timer);
    target.style.display = 'none';
    startBtn.textContent = 'Restart Game';
    startBtn.classList.remove('hidden');

    // Stop the audio when the game ends
    gameAudio.pause();
    gameAudio.currentTime = 0; // Reset audio to the start

    alert(`Game Over! Your score: ${score}`);
}

function moveTarget() {
    if (!gameActive) return;
    const gameWidth = window.innerWidth - 50; // subtracting target size
    const gameHeight = window.innerHeight - 50;

    const x = Math.random() * gameWidth;
    const y = Math.random() * gameHeight;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

target.addEventListener('click', () => {
    if (gameActive) {
        score++;
        scoreElement.textContent = score;
        moveTarget();
    }
});

startBtn.addEventListener('click', startGame);
