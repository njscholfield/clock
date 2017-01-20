(function() {
  const secondHand = document.querySelector('.second-hand');
  const minuteHand = document.querySelector('.min-hand');
  const hourHand = document.querySelector('.hour-hand');
  const hourContainer = document.querySelector('.hour-number');
  const hourLabel = document.querySelector('.number');
  const dateLabel = document.querySelector('.date');
  const digitalTime = document.querySelector('.digital');
  const colorInputs = document.querySelectorAll('.inputs input');

  function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    if(seconds === 59) {
      secondHand.classList.add('no-transition');
      minuteHand.classList.add('no-transition');
      hourHand.classList.add('no-transition');
    } else if (seconds === 1) {
      secondHand.classList.remove('no-transition');
      minuteHand.classList.remove('no-transition');
      hourHand.classList.remove('no-transition');
    }
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const min = now.getMinutes();
    const minDegrees = ((min / 60) * 360) + ((seconds / 60) * 6) + 90;
    minuteHand.style.transform = `rotate(${minDegrees}deg)`;

    const hour = now.getHours();
    hourLabel.textContent = (hour % 12 === 0) ? (12) : (hour % 12);
    const labelDegrees = ((hour / 12) * 360) + 90;
    hourContainer.style.transform = `rotate(${labelDegrees}deg)`;
    hourLabel.style.transform = `rotate(${360 - labelDegrees}deg)`;
    const hourDegrees = ((hour / 12) * 360) + ((min / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    const date = now.getDate();
    const day = now.toLocaleString('en-us', { weekday: 'short' }).toUpperCase();
    dateLabel.textContent = day + ' ' + date;

    digitalTime.textContent = now.toLocaleTimeString('en-us');
  }

  setInterval(setDate, 1000);

  function handleUpdate() {
    document.documentElement.style.setProperty(`--${this.name}`, this.value);
  }

  colorInputs.forEach(input => input.addEventListener('change', handleUpdate));
})();
