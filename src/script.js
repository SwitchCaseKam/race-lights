const timer = ms => new Promise(res => setTimeout(res, ms))

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const againButton = document.getElementById('again-button');

const downLights = document.getElementsByClassName('light-down');

const timeTextParagraph = document.getElementById('time-text');

let startTime = 0;
let endTime = 0;

let startFlag = false;
let countingInProgress = false;

let countingSound = new Audio('audio/start-13691.mp3');
let startSound = new Audio('audio/usp-pistol-sfx-80490.mp3');


startButton.addEventListener('click', () => {
  startCounter();
});

stopButton.addEventListener('click', () => {
  stopCounter();
  
});

againButton.addEventListener('click', () => {
  startCounter();
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    if (!startFlag && !countingInProgress) {
      startCounter();
      startFlag = !startFlag;
    } else {
      stopCounter();
      
    }
  }
});

async function startCounter() {
  startTime = 0;
  endTime = 0;
  timeTextParagraph.innerHTML = '';
  startButton.style.visibility = 'hidden';
  againButton.style.visibility = 'hidden';
  stopButton.style.visibility = 'visible';
  countingInProgress = true;
  for (let i=0 ; i< downLights.length; i++) {
    downLights[i].style.backgroundColor = 'red';
    console.log('x')
    countingSound.play();
    await timer(1000);
    
    if (i === downLights.length-1) {
      for (let j=0 ; j< downLights.length; j++) {
        downLights[j].style.backgroundColor = '#484643';
        startSound.play();
        startTime = Date.now();
        countingInProgress = false;
        setTimeout(()=> againButton.style.visibility = 'visible', 1000);
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
    timeTextParagraph.innerHTML = 'Your reaction time: ' + timeDiff + ' ms';
  }
  startFlag = false;
  startButton.style.visibility = 'hidden';
  stopButton.style.visibility = 'hidden';
}





