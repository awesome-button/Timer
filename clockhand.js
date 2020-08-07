let countdown;
const h1 = document.getElementById("timer");
const h2 = document.getElementById("be-back");
const buttons = document.querySelectorAll("[data-time]");

const timer = seconds => {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimer(seconds);
  countTimeToBeBack(then);

  countdown = setInterval(() => {
    const secondsToDisplay = Math.round((then - Date.now()) / 1000);
    displayTimer(secondsToDisplay);

    if (secondsToDisplay < 0) {
      clearInterval(countdown);
      return;
    }
  }, 1000);
};

function displayTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${padDate(minutes)}:${padDate(secs)}`;
  h1.textContent = display;
  document.title = display;
}

function countTimeToBeBack(seconds) {
  const date = new Date(seconds);
  h2.textContent = `Be back at ${padDate(date.getHours())}:${padDate(
    date.getMinutes()
  )}`;
}

function padDate(num) {
  return num > 9 ? num : `0${num}`;
}

buttons.forEach(button => {
  button.addEventListener("click", e => {
    const seconds = e.target.dataset.time * 60;
    timer(seconds);
  });
});

document.customForm.addEventListener("submit", function(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
});
