const input = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const API_KEY = '5c72bbaef5378ab58c9d6a361eea8ddf';
let searchQuery = '';
const forecast = document.querySelector('#forecast');
const todayDisplay = document.querySelector('#today-display');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchQuery = input.value;
    fetchAPIweather();
    fetchAPIforecast();
    saveCity();
});


async function fetchAPIweather () {
    const todayBaseURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}`;
    const todayInfo = await fetch(todayBaseURL).then(response => response.json());
    generateTodayHTML(todayInfo);
}

function generateTodayHTML(results) {
        const cityName = results.name;
        const temp = Math.round(results.main.temp - 273.15);
        const windToday = results.wind.speed;
        const humidityToday = results.main.humidity;
        const iconCode = results.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        

let generatedTodayHTML =
`
<div class="section" id="today-display">
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h1 class="city-name">${cityName}</h1>
                    <div id="icon"><img id="wicon" src="${iconUrl}" alt="Weather icon"></div>
                    <p id="today-date">TODAY</p>
                    <p id="temperature-today">Temperature: ${temp}°C</p>
                    <p id="wind-today">Wind: ${windToday} meter/sec</p>
                    <p id="humidity-today">Humidity: ${humidityToday}%</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

    todayDisplay.innerHTML = generatedTodayHTML;
    
}

async function fetchAPIforecast () {
    const forecastBaseURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${API_KEY}`;
    const forecastInfo = await fetch(forecastBaseURL).then(response => response.json());
    const daily = forecastInfo.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));
    generateHTML(daily);

}

function generateHTML(results) {
    let generatedHTML = '';
    results.forEach(forecast => {
      const date = forecast.dt_txt.split(' ')[0];
      const temperature = Math.round(forecast.main.temp - 273.15);
      const wind = forecast.wind.speed;
      const humidity = forecast.main.humidity;
      const iconCodeForecast = forecast.weather[0].icon;
      const iconUrlForecast = `http://openweathermap.org/img/w/${iconCodeForecast}.png`;
      
  
      generatedHTML +=
        `
        <div class="section" id="forecast">
          <div class="container">
            <div class="columns">
              <div class="column">
                <div class="box">
                  <div class="media-center">
                    <figure class="image is-64x64">
                      <img src="${iconUrlForecast}">
                    </figure>
                  </div>
                  <p id="date">${date}</p>
                  <p class="temperature">Temp: ${temperature}°C</p>
                  <p class="wind">Wind: ${wind} meter/sec</p>
                  <p class="humidity">Humidity: ${humidity}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    });
  
    forecast.innerHTML = generatedHTML;
  }

function saveCity () {
    let savedCity = window.localStorage.getItem("savedCity") ? JSON.parse(window.localStorage.getItem("savedCity")) : [];
    let city = searchQuery;

    if(!savedCity.includes(city)) {

    savedCity.push(city);
    window.localStorage.setItem("savedCity", JSON.stringify(savedCity));
    }
    
        let searchHistoryContainer = document.querySelector('.search-history');
        let generatedHistoryHTML = '';
        for(let i=0; i< savedCity.length; i++) {
            generatedHistoryHTML +=
        `
        <button class="button" class="previous-city">${savedCity[i]}</button>
    `
    searchHistoryContainer.innerHTML = generatedHistoryHTML;
    }
}
