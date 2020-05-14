const startButton = document.querySelector('#btn-start');
const pauseButton = document.querySelector('#btn-pause');
const resetButton = document.querySelector('#btn-reset');
const infoElem = document.querySelector('#info');
const hr = document.querySelector('#hr');
const min = document.querySelector('#min');
const sec = document.querySelector('#sec');
const timer = document.querySelector('.timer');


const timeStat = {
	hr: 0,
	min: 0,
	sec: 0,
	running: false
}

let myTimer = null;
makeContentEditable();

function decrementTimer() {
	if (timeStat.running){
		makeContentNonEditable();
	}
	if ((timeStat.hr > 0 || timeStat.min > 0 || timeStat.sec > 0) && timeStat.running) {
		if (timeStat.sec){
			timeStat.sec--;
		} else if (timeStat.min) {
			timeStat.min--;	
			timeStat.sec = 59;
		} else if (timeStat.hr) {
			timeStat.hr--;
			timeStat.min = 59;
		}
	 	displayTime();
	} else {
		timeStat.running = false;
		makeContentEditable();
		clearInterval(myTimer);
		infoElem.textContent = "Please edit hr:min:sec and Press Start";
		timer.classList.remove('running');
	}
}

function makeContentEditable() {
	sec.setAttribute('contentEditable','true')
	min.setAttribute('contentEditable','true')
	hr.setAttribute('contentEditable','true')
}

function makeContentNonEditable() {
	sec.setAttribute('contentEditable','false')
	min.setAttribute('contentEditable','false')
	hr.setAttribute('contentEditable','false')
}

function setContent() {
	timeStat.hr = parseInt(hr.textContent);
	timeStat.min = parseInt(min.textContent);
	timeStat.sec = parseInt(sec.textContent);
}

function resetContent() {
	makeContentEditable();
	clearInterval(myTimer);
	sec.textContent = "00";
	timeStat.sec = 0;
	min.textContent = "00";
	timeStat.min = 0;
	hr.textContent = "00";
	timeStat.hr = 0;
}

function correctTimeStat() {
	if ( timeStat.sec > 60 ) {
		timeStat.min += parseInt(timeStat.sec/60);
		timeStat.sec = timeStat.sec % 60;
		sec.textContent = timeStat.sec;
		min.textContent = timeStat.min;
	}
	if ( timeStat.min > 60 ) {
		timeStat.hr += parseInt(timeStat.min/60);
		timeStat.min = timeStat.min % 60;
		hr.textContent = timeStat.hr;
		min.textContent = timeStat.min;
	}
}

function displayTime() {
	if(timeStat.sec<10){
		sec.textContent = `0${timeStat.sec}`;
	} else {
		sec.textContent = timeStat.sec;
	}
	if(timeStat.min<10){
		min.textContent = `0${timeStat.min}`;
	} else {
		min.textContent = timeStat.min;
	}
	hr.textContent = timeStat.hr;
}

startButton.addEventListener('click', () => {
	timer.classList.remove('stop');
	timer.classList.add('running');
	timeStat.running = true;
	infoElem.textContent = "Running";
	myTimer = setInterval( decrementTimer, 1000 )
	setContent();
	correctTimeStat();
})
pauseButton.addEventListener('click', () => {
	timer.classList.add('stop');
	clearInterval(myTimer);
	timeStat.running = false;
	infoElem.textContent = "Paused";
})
resetButton.addEventListener('click', () => {
	timer.classList.remove('running');
	timeStat.running = false;
	infoElem.textContent = "Please edit hr:min:sec and Press Start";
	resetContent();
}) 
