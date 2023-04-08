import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtn = document.querySelector('[data-start]');
let timer;
let date;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  let string = value.toString();
  string = string.padStart(2, '0');
  return string;
}

const calendarOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    date = selectedDates[0];

    if (now.getTime() - date.getTime() >= 0) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', calendarOptions);

startBtn.addEventListener('click', () => {
  timer = setInterval(() => {
    const now = new Date();
    const remainingTime = convertMs(date.getTime() - now.getTime());

    document.querySelector('[data-days]').textContent = addLeadingZero(
      remainingTime.days
    );
    document.querySelector('[data-hours]').textContent = addLeadingZero(
      remainingTime.hours
    );
    document.querySelector('[data-minutes]').textContent = addLeadingZero(
      remainingTime.minutes
    );
    document.querySelector('[data-seconds]').textContent = addLeadingZero(
      remainingTime.seconds
    );

    if (date.getTime() - now.getTime() < 0) {
      clearInterval(timer);
    }
  }, 1000);
});
