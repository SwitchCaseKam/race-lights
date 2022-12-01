const timer = ms => new Promise(res => {
  console.log('ppp')
  return setTimeout(res, ms)
})

const goButton = document.getElementById('go-button');
const againButton = document.getElementById('again-button');

const downLights = document.getElementsByClassName('light-down');

const timeTextParagraph = document.getElementById('time-text');

let startTime = 0;
let endTime = 0;

let countingInProgress = false;


let countingSound = new Audio('audio/start-13691.mp3');
let startSound = new Audio('audio/usp-pistol-sfx-80490.mp3');

let intervalID;


goButton.addEventListener('click', () => {
  if (!countingInProgress) {
    testSetInterval();
  } else {
    clearInterval(intervalID);
    turnOffAllLights();
    testSetInterval();
  }
});

againButton.addEventListener('click', () => {
  startCounter();
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    if (!countingInProgress) {
      startCounter();
    } else {
      if (reactionMeasurementDone) {
        startCounter();
      } else {
        stopCounter();
      }
    }
  }
});

async function startCounter() {
  reactionMeasurementDone = false;
  startTime = 0;
  endTime = 0;
  timeTextParagraph.innerHTML = '';
  againButton.style.visibility = 'hidden';
  goButton.style.visibility = 'visible';
  countingInProgress = true;
  for (let i=0 ; i< downLights.length; i++) {
    downLights[i].style.backgroundColor = 'red';
    countingSound.play();
    await timer(1000);
    
    if (i === downLights.length-1) {
      for (let j=0 ; j< downLights.length; j++) {
        downLights[j].style.backgroundColor = '#484643';
        startSound.play();
        startTime = Date.now();
        setTimeout(()=> {
          againButton.style.visibility = 'visible';
          countingInProgress = false;
        }, 1500);
      }
    }
  }  
}

function stopCounter() {
  endTime = Date.now();
  if (startTime === 0 || endTime === 0) {
    timeTextParagraph.innerHTML = 'Falstart! Too early!';
  } else {
    const timeDiff = endTime - startTime;
    console.log('[LOG] startTime: ', startTime, '; endTime: ', endTime, '; timeDiff: ', timeDiff);
    timeTextParagraph.innerHTML = 'Your reaction time: ' + timeDiff/1000 + ' s';
  }
  goButton.style.visibility = 'hidden';
  countingInProgress = false;
}


function testSetInterval() {
  let i = 0;
  intervalID = setInterval(() =>{
    console.log('i = ', i);
    countingInProgress = true;
    if (i === downLights.length) {
      clearInterval(intervalID);
      countingInProgress = false;
      turnOffAllLights();
      startSound.play();
    } else {
      countingSound.play();
      downLights[i].style.backgroundColor = 'red';
    }
    i++;
  }, 1000);
}

function turnOffAllLights() {
  for (let j=0 ; j< downLights.length; j++) {
    console.log('a')
    downLights[j].style.backgroundColor = '#484643';
  }
}