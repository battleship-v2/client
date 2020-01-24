const conversion = time => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  return { minutes, seconds };
};

const pad = number => {
  if (number < 10) {
    return '0' + number;
  }

  return number;
};

const timer = time => {
  const myTimer = () => {
    let { minutes, seconds } = conversion(time);
    console.log(`${pad(minutes)} : ${pad(seconds)}`);

    time--;

    if (time < 0) {
      clearInterval(myVar);
    }
  };

  let myVar = setInterval(myTimer, 1000);
};

module.exports = {
  timer
};
