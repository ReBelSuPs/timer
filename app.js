const startButton = document.querySelector('#btn-start');
const pauseButton = document.querySelector('#btn-pause');
const resetButton = document.querySelector('#btn-reset');
const infoElem = document.querySelector('#info');
const hr = document.querySelector('#hr');
const min = document.querySelector('#min');
const sec = document.querySelector('#sec');
const time = document.querySelectorAll('.time');
const timer = document.querySelector('.timer');

const timeStat = {
	hr: 0,
	min: 0,
	sec: 0,
	running: false
}

let myTimer = null;
let keys = null;
const sound = new Audio();
sound.src = 'beep.wav';

for ( let el of time ) {
	makeContentEditable(el);
}

function decrementTimer() {
	if ((timeStat.hr > 0 || timeStat.min > 0 || timeStat.sec > 0) && timeStat.running) {
		if (timeStat.sec){
			timeStat.sec--;
		} else if (timeStat.min) {
			timeStat.min--;	
			timeStat.sec = 59;
		} else if (timeStat.hr) {
			timeStat.hr--;
			timeStat.min = 59;
			timeStat.sec = 59;
		}
	 	displayTime();
	} else {
		timer.classList.remove('running');
		infoElem.textContent = "TIMES UP!!!!!!!! Press reset to start again";
		timer.classList.add('end');
		sound.play();
	}
}

function makeContentEditable( el ) {
	el.setAttribute('contentEditable','true');
}

function makeContentNonEditable( el ) {
	el.setAttribute('contentEditable','false');
}

function setContent() {
	keys = Object.keys(timeStat);
	if (hr.textContent === "hh") { hr.textContent = "00" }
	if (min.textContent === "mm") { min.textContent = "00" }
	if (sec.textContent === "ss") { sec.textContent = "00" }
	for (let i = 0; i < time.length; i++) {
		timeStat[keys[i]] = Number(time[i].textContent);
	}
}

function resetContent() {
	for ( let el of time ) {
		makeContentEditable(el);
	}
	clearInterval(myTimer);
	sound.pause();
	timer.classList.remove('running');
	timer.classList.remove('end');
	timeStat.running = false;
	hr.textContent = "hh";
	min.textContent = "mm";
	sec.textContent = "ss";
}

function correctTimeStat() {
	if ( timeStat.sec > 60 ) {
		timeStat.min += parseInt(timeStat.sec/60);
		timeStat.sec = timeStat.sec % 60;
		displayTime();
	}
	if ( timeStat.min > 60 ) {
		timeStat.hr += parseInt(timeStat.min/60);
		timeStat.min = timeStat.min % 60;
		displayTime();
	}
}

function displayTime() {
	keys = Object.keys(timeStat);
	for (let i = 0; i < time.length; i++) {
		if (timeStat[keys[i]]<10) {
			time[i].textContent = `0${timeStat[keys[i]]}`;
		} else {
			time[i].textContent = timeStat[keys[i]];
		}
	}
}

for ( el of time ) {
	el.addEventListener('click', (e) => {
		if (!timeStat.running && e.target.textContent.length < 3) {
			e.target.textContent = "";
		}
	})
	el.addEventListener('keydown', (e) => {
		if (e.keyCode === 13 || e.keyCode === 32) {
			e.target.textContent = '';
			infoElem.textContent = "Avoid spaces and enter key!!!";
		}
		if (e.target.textContent > 3){
			makeContentNonEditable(e.target);
			infoElem.textContent = "Length limit exceeded!! Press reset to set new timer or start to begin timer";
		}
	})
}

startButton.addEventListener('click', () => {
	timer.classList.remove('stop');
	timer.classList.add('running');
	setContent();
	if (isNaN(timeStat.hr) || isNaN(timeStat.min) || isNaN(timeStat.sec)) {
		infoElem.textContent = "OOPS!!! Please enter valid time";
		resetContent();
	} else {
		infoElem.textContent = "Running!!!";
		correctTimeStat();
		timeStat.running = true;
		for ( let el of time ) {
			makeContentNonEditable(el);
		}
        decrementTimer();
		myTimer = setInterval( decrementTimer, 1000 )
	}
})
pauseButton.addEventListener('click', () => {
	timer.classList.add('stop');
	clearInterval(myTimer);
	timeStat.running = false;
	infoElem.textContent = "Paused.... Press reset to start again";
})
resetButton.addEventListener('click', () => {
	resetContent();
	keys = Object.keys(timeStat);
	for (let key of keys) {
		timeStat[key] = 0;
	}
	infoElem.textContent = "Please edit hr:min:sec and Press Start";
})
