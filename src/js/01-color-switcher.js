const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector(['button[data-start]']);
const stopBtnEl = document.querySelector(['button[data-stop]']);
let timerI = null;

stopBtnEl.setAttribute('disabled', 'disabled');
startBtnEl.addEventListener(
  'click',
  (onChangeClr = () => {
    startBtnEl.setAttribute('disabled', 'disabled');
    stopBtnEl.removeAttribute('disabled', 'disabled');
    timerId = setInterval(() => {
      const randomClr = getRandomHexColor();
      bodyEl.style.backgroundColor = randomClr;
    }, 1000);
  }),
);

stopBtnEl.addEventListener(
  'click',
  (onStonChangeColor = () => {
    clearInterval(timerId);
    stopBtnEl.setAttribute('disabled', 'disabled');
    startBtnEl.removeAttribute('disabled', 'disabled');
  }),
);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
