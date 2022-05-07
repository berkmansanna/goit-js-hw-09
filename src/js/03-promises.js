import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDelayEl: document.querySelector('[name="delay"]'),
  inputStepEl: document.querySelector('[name="step"]'),
  inputAmountEl: document.querySelector('[name="amount"]'),
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('click', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const values = {
    delay: +refs.inputDelayEl.value,
    step: +refs.inputStepEl.value,
    amount: +refs.inputAmountEl.value,
  };
  promiseGetValue(values);
}

const promiseGetValue = ({ delay, step, amount }) => {
  let totalDelay = delay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += step;
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
