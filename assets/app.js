document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}appid=f21472b06c689d01e7f1f9cfb87d9667&units=imperial';
  const form = document.getElementById('search-form');
  const cityInput = document.getElementById('city-input');
  const currentWeatherSection = document.getElementById('current-weather');
  const forecastSection = document.getElementById('forecast');
  const historyList = document.getElementById('history-list');
 
 
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
     if (cityName !== '') {
      getWeatherData(cityName);
    }
  });
 
 
  historyList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      const cityName = event.target.textContent;
      getWeatherData(cityName);
    }
  });
   function getWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f21472b06c689d01e7f1f9cfb87d9667&units=imperial`;
     fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        updateCurrentWeather(data);
        updateForecast(data);
        addToHistory(cityName);
      })
  }

   function updateCurrentWeather(data) {
    const city = data.city.name;
    const date = new Date(data.list[0].dt_txt);
    const icon = data.list[0].weather[0].icon;
    const temperature = data.list[0].main.temp;
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;
     currentWeatherSection.innerHTML = `
      <h2>${city} - ${date.toDateString()}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
      <p>Temperature: ${temperature}°F</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} ft/s</p>
    `;
  }
  //got help figuring out why my dates were not showing sequential.
  function updateForecast(data) {
    const forecastData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
    forecastSection.innerHTML = '<h2>5-Day Forecast</h2>';
    
    forecastData.forEach((item) => {
      const date = new Date(item.dt_txt);
      const icon = item.weather[0].icon;
      const temperature = item.main.temp;
      const humidity = item.main.humidity;
      const windSpeed = item.wind.speed;
  
      forecastSection.innerHTML += `
        <div class="forecast-day">
          <p>Date: ${date.toDateString()}</p>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
          <p>Temperature: ${temperature}°F</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
        </div>
      `;
    });
  }

  //ai really helped with this part, in understanding how to use "parse" for my recall in history.
   function addToHistory(cityName) {
    const historyItem = document.createElement('li');
    historyItem.textContent = cityName;
    historyList.appendChild(historyItem);
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    history.push(cityName);
    localStorage.setItem('weatherHistory', JSON.stringify(history));
  }
   function loadHistory() {
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    history.forEach(city => {
      const historyItem = document.createElement('li');
      historyItem.textContent = city;
      historyList.appendChild(historyItem);
    });
  }
   loadHistory();
 });
 