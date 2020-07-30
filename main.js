let now = new Date();
let date = document.querySelector('.location .date');
date.innerText = dateBuild(now);
const api = {
    key: "1d1d3e765f5d9c02d5a7187591b95580",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
                .then(weather => {
                    return weather.json();
                }).then(display);
        })
    }
})

function setQuery(e) {
    if (e.keyCode == 13) {
        getResult(searchbox.value);
    }
}

function getResult(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(display);
}

function display(weather) {
    //console.log(weather);
    let city = document.querySelector('.location .city');
    let temp = document.querySelector('.current .temp');
    let weather_t = document.querySelector('.current .weather');
    let hilow = document.querySelector('.current .hi-low');
    if (weather.cod == 404) {
        city.innerText = "Not Found";
        temp.innerHTML = " ";
        weather_t.innerText = " ";
        hilow.innerText = " ";
    } else {
        city.innerText = `${weather.name},${weather.sys.country}`;
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
        weather_t.innerText = weather.weather[0].main;
        hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    }
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuild(now);
}

function dateBuild(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}