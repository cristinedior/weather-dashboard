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

 //need the history list
 //add event listener to history list
 //add local storage for search history and recall
 //'get weather data' in specs listed on module homework
 //^^ city, date, temperature, an icon, humidity, wind
 //5 day listing of forecast with above specs
 
