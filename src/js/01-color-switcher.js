const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timer;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled');
  clearInterval(timer);
});
