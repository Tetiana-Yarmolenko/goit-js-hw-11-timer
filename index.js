const refs = {
    timer: document.querySelector('#timer-1'),
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
  
  intervalId = null;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    let time = this.getTimeComponents(deltaTime);

     if (deltaTime < 0) {
        this.finishTime()
       time = { days: '00', hours: '00', mins: '00', secs:'00'} 
      }
    this.updateTime(time);
    
  }, 1000);

  finishTime() {
    clearInterval(this.intervalId);
  }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
        return { days, hours, mins, secs };
    }

  

    pad(value) {
        return String(value).padStart(2, '0');
    }

    updateTime({ days, hours, mins, secs }) {
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.mins.textContent = mins;
        refs.secs.textContent = secs;
      }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 15, 2020, 23:59:59'),
});