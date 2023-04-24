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

        let generatedTodayHTML =
        `
        <div class="section" id="today-display">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <div class="box">
                        <h1 class="city-name">${cityName}</h1>
                        <img src="" alt="">
                        <p id="today-date"></p>
                        <p id="temperature-today">Temperature: ${temp}</p>
                        <p id="wind-today">Wind: ${windToday}</p>
                        <p id="humidity-today">Humidity: ${humidityToday}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
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
  
      generatedHTML +=
        `
        <div class="section" id="forecast">
          <div class="container">
            <div class="columns">
              <div class="column">
                <div class="box">
                  <div class="media-center">
                    <figure class="image is-64x64">
                      <img src="./assets/img/weather example.png">
                    </figure>
                  </div>
                  <p id="date">${date}</p>
                  <p class="temperature">Temp: ${temperature}</p>
                  <p class="wind">Wind: ${wind}</p>
                  <p class="humidity">Humidity: ${humidity}</p>
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
    </div>
    `
    searchHistoryContainer.innerHTML = generatedHistoryHTML;
    }
}
