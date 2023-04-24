const searchBtn = document.getElementById('search-btn');
let input = document.getElementById('search-input');
let searchQuery = '';
const API_KEY = '5c72bbaef5378ab58c9d6a361eea8ddf';
const todayInfo = document.querySelector('#today-display');
const cityName = document.querySelector('.city-name');
const todayDate = document.querySelector('#today-date');
const tempToday = document.querySelector('#temperature-today');
const windToday = document.querySelector('#wind-today');
const humidityToday = document.querySelector('#humidity-today');
const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${API_KEY}`;

const today = dayjs();
$('#today-date').text(today.format('DD/MM/YY'));

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchQuery = input.value;
    fetchAPIweather();
    fetchAPIforecast();
});

async function fetchAPIweather () {
    const baseURL1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}`;
    const response1 = await fetch(baseURL1);
    const data1 = await response1.json();
    generateHTML();
    console.log(data1);
}

async function fetchAPIforecast () {
    const baseURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${API_KEY}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
}

function generateHTML(results) {
    let generatedHTML = '';
    results.map(result => {
      generatedHTML += `
        <div class="section" id="today-display">
          <div class="container">
            <div class="columns">
              <div class="column">
                <div class="box">
                  <h1 class="city-name">${result.name}</h1>
                  <img src="" alt="">
                  <p id="today-date"></p>
                  <p id="temperature-today">Temp: ${result.main.temp}</p>
                  <p id="wind-today">Wind: ${result.wind.speed}</p>
                  <p id="humidity-today">Humidity: ${result.main.humidity}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    todayInfo.innerHTML = generatedHTML; // agregamos el HTML generado al contenido del elemento todayInfo

}