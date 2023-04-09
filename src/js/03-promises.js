import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');

function runCreator(event) {
  event.preventDefault();

  const data = {
    delay: Number.parseInt(form.delay.value),
    step: Number.parseInt(form.step.value),
    amount: Number.parseInt(form.amount.value),
  };

  if (data.delay < 0 || data.step < 0 || data.amount < 0) {
    Notify.failure('Please enter non-negative numbers');
    return;
  }

  for (
    let i = 1, { delay, step, amount } = data;
    i <= amount;
    i++, delay += step
  ) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', runCreator);
