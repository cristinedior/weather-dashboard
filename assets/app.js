document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=cb47a85dd08dbea1301282eef46f7c17';
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

  historyList.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
      const cityName = e.target.textContent;
      getWeatherData(cityName);
    }
  });
  function getWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.cod === 200) {
          addToHistory(cityName);
          renderCurrentWeather(data);
          renderForecast(data);
        } else {
          alert(data.message);
        }
      });
  }

  function addToHistory(cityName)
  function renderCurrentWeather(data)
  function renderForecast(data)
  function renderHistory()

  function loadHistory()

  function getWeatherData()

 //'get weather data' in specs listed on module homework
 //^^ city, date, temperature, an icon, humidity, wind
 //5 day listing of forecast with above specs