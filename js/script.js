
const TIME = document.querySelector('.time')
const DATE = document.querySelector('.date')
const WELCOME = document.querySelector('.greeting')
const NAME = document.querySelector('.name')
const BODY = document.querySelector('body')
const SLIDENEXT = document.querySelector('.slide-next');
const SlIDEPREV = document.querySelector('.slide-prev');
const WEATHER_ICON = document.querySelector('.weather-icon');
const TEMPERATURE = document.querySelector('.temperature');
const WEATHER_DISCRIPTION = document.querySelector('.weather-description');
const CITY = document.querySelector('.city');
const BTN_CHANGE_QUOTE = document.querySelector('.change-quote');
const QUOTE = document.querySelector('.quote');
const AUTHOR = document.querySelector('.author');
const BTN_PLAYER_PREV = document.querySelector('.play-prev')
const BTN_PLAYER_NEXT = document.querySelector('.play-next')
const BTN_PLAYER_PLAY = document.querySelector('.play')


let rundomNum = getRandomNum();


function showTime() {
    const date = new Date()
    const currentTime = date.toLocaleTimeString()
    TIME.textContent = currentTime;
    setTimeout(showTime, 1000)
    showDate()
    greetings()

}
showTime()

function showDate() {
    const date = new Date();
    const option = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'}
    const currentDate = date.toLocaleDateString('en-US', option)
    DATE.textContent=currentDate
}
showDate()


// function getTimeOfDay (){
//     const date = new Date();
//     const hours = date.getHours();
//     let partOfTheDay = ['Night', 'Morning', 'Day', 'Evening']
//     if( hours >= 0 && hours < 6) {
//         return partOfTheDay[0];
//     }
//     if ( hours >= 6 && hours < 12) {
//         return partOfTheDay[1];
//     } else if (12 >= hours && hours < 18) {
//         return partOfTheDay[2];
//     } else if (hours >= 18 && hours < 24) {
//         return partOfTheDay[3];
//     }
// }
function getTimeOfDay (){
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 6) {
        return 'Night';
    } else if (hours >= 6 && hours < 12) {
        return 'Morning';
    } else if (hours >= 12 && hours < 18) {
        return 'Afternoon';
    } else {
        return 'Evening'
    }
}
getTimeOfDay()

function greetings() {
    const timeOfDay = getTimeOfDay();
    const greetingsText = `Good ${timeOfDay}`;
    WELCOME.textContent=greetingsText;
}

function setLocalStorage() {
    localStorage.setItem('name', NAME.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        NAME.value = localStorage.getItem('name')
    }
}
window.addEventListener('load', getLocalStorage)

function getRandomNum(min, max) {
    min = Math.ceil(1);
    max = Math.floor(20);
    return Math.floor(Math.random() * (max - min)) + min;
}

function setBg(){
    let timeOfDay = getTimeOfDay().toLowerCase();
    let bgNum = getRandomNum().toString().padStart(2,'0')
    const img = new Image();
    img.src = `../assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
        BODY.style.backgroundImage =  `url(${img.src})`;
    }
}
setBg();


function getSliderNext() {
     if (getRandomNum === 20) {
         return rundomNum = 1
     } else {
         rundomNum += 1
     }
    setBg()
}
SLIDENEXT.addEventListener('click', getSliderNext)

function getSliderPrev() {
    if (getRandomNum === 20) {
        return rundomNum = 1
    } else {
        rundomNum -= 1
    }
    setBg()
}
SlIDEPREV.addEventListener('click', getSliderPrev)

CITY.addEventListener('change', getWeather)

async function getWeather(){
    const city = CITY.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=8897c558e3bed8c955a579bc2784323a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    WEATHER_ICON.className = 'weather-icon owf';
    WEATHER_ICON.classList.add(`owf-${data.weather[0].id}`);
    TEMPERATURE.textContent = `${data.main.temp}°C`;
    WEATHER_DISCRIPTION.textContent = data.weather[0].description;
}

getWeather()

async function getQuotes() {
    const quotes = 'phrases.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let randomNum = getRandomNum()

    QUOTE.textContent = data[randomNum].text;
    AUTHOR.textContent = data[randomNum].author;
}
getQuotes()
BTN_CHANGE_QUOTE.addEventListener('click', getQuotes);


let isPlay = false;
let playNum = 0;
let audio = new Audio()
//
function playAudio() {
    if(!isPlay){
       audio.src = playList[playNum].src;
       audio.currentTime = 0;
       audio.play();
        isPlay = true
    } else {
        audio.pause()
        isPlay = false
    }
}


function toggleBtn() {
    BTN_PLAYER_PLAY.classList.toggle('pause');
    playAudio()
}
BTN_PLAYER_PLAY.addEventListener('click', toggleBtn);



function playNext() {
    if(!isPlay) {
        BTN_PLAYER_PLAY.classList.add('pause')
    }
    if (playNum < 3){
        playNum += 1
    } else if( playNum === 3) {
        playNum = 0
    }
    playAudio()
    console.log(playNum)
}
console.log(playNum)
BTN_PLAYER_NEXT.addEventListener('click', playNext);

function playPrev() {
    if(!isPlay) {
        BTN_PLAYER_PLAY.classList.add('pause')
    }
    if (playNum > 3){
        playNum -= 1
    } else if( playNum === 0) {
        playNum = 3
    }
    playAudio()
}
BTN_PLAYER_PREV.addEventListener('click', playPrev);


function createPlaylist() {
    playList.forEach(el => {
        const li = document.createElement('li')
        li.classList.add('play-item')
        li.textContent = el.title
       document.querySelector('.play-list').appendChild(li)
    })
}
createPlaylist()

// console.log(playList)
