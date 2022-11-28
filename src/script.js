const timer = ms => new Promise(res => setTimeout(res, ms))

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const againButton = document.getElementById('again-button');

const downLights = document.getElementsByClassName('light-down');

const timeTextParagraph = document.getElementById('time-text');

let startTime = 0;
let endTime = 0;

startButton.addEventListener('click', () => {
  startCount();
});

stopButton.addEventListener('click', () => {
  endTime = Date.now();
  if (startTime === 0 || endTime === 0) {
    timeTextParagraph.innerHTML = 'Falstart! Too early!';
  } else {
    const timeDiff = endTime - startTime;
    console.log('[LOG] startTime: ', startTime, '; endTime: ', endTime, '; timeDiff: ', timeDiff);
    timeTextParagraph.innerHTML = 'Your reaction time: ' + timeDiff + ' ms';
  }
  startButton.style.visibility = 'hidden';
  stopButton.style.visibility = 'hidden';
  
});

againButton.addEventListener('click', () => {
  startCount();
})


async function startCount() {
  startTime = 0;
  endTime = 0;
  timeTextParagraph.innerHTML = '';
  startButton.style.visibility = 'hidden';
  againButton.style.visibility = 'hidden';
  stopButton.style.visibility = 'visible';
  for (let i=0 ; i< downLights.length; i++) {
    downLights[i].style.backgroundColor = 'red';
    await timer(1000);
    if (i === downLights.length-1) {
      for (let j=0 ; j< downLights.length; j++) {
        downLights[j].style.backgroundColor = 'black';
        startTime = Date.now();
        setTimeout(()=> againButton.style.visibility = 'visible', 1000);
      }
    }
  }  
}





