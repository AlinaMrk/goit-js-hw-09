import flatpickr from 'flatpickr'; 
import 'flatpickr/dist/flatpickr.min.css'; 
import Notiflix from 'notiflix'; 

let selectedTime;
let timerId = null; 

const refs = {
  inputEl: document.querySelector('input#datetime-picker'), 
  btnStartEl: document.querySelector('button[data-start]'), 
  daysEl: document.querySelector('span[data-days]'), 
  hoursEl: document.querySelector('span[data-hours]'), 
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'), 
}

refs.btnStartEl.disabled = true; 
const options = {    
    enableTime: true,
    time_24hr: true, 
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      
      if (selectedDates[0].getTime() < new Date().getTime()) {
        return Notiflix.Report.warning('WARNING!', 'Select a date in the future.', 'next');        
      } else {
        Notiflix.Report.success('SUCCESS', 'The date is correct.', 'ok');
        refs.btnStartEl.disabled = false;
      }
      return selectedTime = selectedDates[0];
    }, 
};

disabledBtn();

function disabledBtn(){
  refs.btnStartEl.disabled = true;
}

const calendar = flatpickr(refs.inputEl, options);
refs.btnStartEl.addEventListener(`click`, onBtnClick);

function onBtnClick(){
  timerId = setInterval(start, 1000);
}

function start() {  
  const currentTime = Date.now();
  
    if(selectedTime > currentTime){
      const deltaTime = selectedTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTimer({ days, hours, minutes, seconds });
      refs.btnStartEl.disabled = true;
  }
  else{
    clearInterval(timerId);
  }
}

function updateTimer({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = `${ days }`;
    refs.hoursEl.textContent = `${ hours }`;
    refs.minutesEl.textContent = `${ minutes }`;
    refs.secondsEl.textContent = `${ seconds }`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

 //Remaining day
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}


