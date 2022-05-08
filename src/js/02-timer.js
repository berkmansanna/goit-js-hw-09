import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedTime;
let timerId = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please select date in future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
    selectedTime = selectedDates[0].getTime();
    clearInterval(timerId);
    markupEdit({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  },
};

flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  refs.startBtn.disabled = true;

  timerId = setInterval(() => {
    const restTime = convertMs(selectedTime - Date.now());
    markupEdit(restTime);
    stopTicking(restTime);
  }, 1000);
}
function stopTicking({ days, hours, minutes, seconds }) {
  if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
    markupEdit({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  }
}
function markupEdit({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
