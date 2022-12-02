const goButton = document.getElementById('go-button');
const downLights = document.getElementsByClassName('light-down');
const primaryTimeText = document.getElementById('primary-time-text');
const secondaryTimeText = document.getElementById('secondary-time-text');

let countingInProgress = false;
let reactionMeasurementDone = false

let startTime = 0;
let endTime = 0;

let countingSound = new Audio('audio/start-13691.mp3');
let startSound = new Audio('audio/usp-pistol-sfx-80490.mp3');

let lightsCountingIntervalCallback;
const timer = ms => new Promise(res => setTimeout(res, ms));

goButton.addEventListener('click', () => {
  if (!countingInProgress) {
    startLightsInterval();
  } else {
    stopCounter();
    if (reactionMeasurementDone) {
      clearInterval(lightsCountingIntervalCallback);
      turnOffAllLights();
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    if (!countingInProgress) {
      startLightsInterval();
    } else {
      stopCounter();
      if (reactionMeasurementDone) {
        clearInterval(lightsCountingIntervalCallback);
        turnOffAllLights();
      }
    }
  }
});

function stopCounter() {
  endTime = Date.now();
  if (startTime === 0 || endTime === 0) {
    primaryTimeText.innerHTML = 'Falstart! Too early!';
  } else {
    const timeDiff = endTime - startTime;
    console.log('[LOG] startTime: ', startTime, '; endTime: ', endTime, '; timeDiff: ', timeDiff);
    primaryTimeText.innerHTML = 'Your reaction time: ' + timeDiff/1000 + ' s';
  }
  secondaryTimeText.innerHTML = 'Tap to try again';
  goButton.style.visibility = 'visible';
  reactionMeasurementDone = true;
  countingInProgress = false;
}

function startLightsInterval() {
  reactionMeasurementDone = false;
  primaryTimeText.innerHTML = '';
  secondaryTimeText.innerHTML = '';
  goButton.style.visibility = 'visible';
  startTime = 0;
  endTime = 0;
  let lightIndex = 0;
  lightsCountingIntervalCallback = setInterval(() =>{
    countingInProgress = true;
    if (lightIndex === downLights.length) {
      clearInterval(lightsCountingIntervalCallback);
      turnOffAllLights();
      startSound.play();
      startTime = Date.now();
    } else {
      countingSound.play();
      downLights[lightIndex].style.backgroundColor = 'red';
    }
    lightIndex++;
  }, 1000);
}

function turnOffAllLights() {
  for (let j=0 ; j< downLights.length; j++) {
    downLights[j].style.backgroundColor = '#484643';
  }
}