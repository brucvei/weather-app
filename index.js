const container = document.querySelector('.container');
const btn = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const img = document.querySelector('.weather-box img');

btn.addEventListener('click', () => {
  const APIKey = "09583161bc976100c7b1d2e5c7395426";
  const city = document.querySelector('.search-box input').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

  if (city === '') return;

  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.cod === '404') {
      console.log('error')
      container.style.height = '400px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'block';
      error404.classList.add("fade-in");
      return;
    }

    error404.style.display = 'none';
    error404.classList.remove("fade-in");

    const temp = document.querySelector('#temperature');
    const weather = document.querySelector('#description');
    const humidity = document.querySelector('#humidity .text span');
    const wind = document.querySelector('#wind .text span');

    switch (data.weather[0].main) {
      case 'Clear':
        img.src = "images/clear.png";
        break;
      case 'Rain':
        img.src = "images/rain.png";
        break;
      case 'Snow':
        img.src = "images/snow.png";
        break;
      case 'Clouds':
        img.src = "images/cloud.png";
        break;
      case 'Haze':
        img.src = "images/mist.png";
        break;
      default:
        img.src = "";
    }
    temp.innerHTML = `${Math.round(data.main.temp)}°C`;
    weather.innerHTML = data.weather[0].main;
    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed} km/h`;

    console.log(weatherDetails.style.display)
    console.log(weatherBox.style.display)
    weatherBox.style.display = 'block';
    weatherDetails.style.display = 'block';
    weatherBox.classList.add("fade-in");
    weatherDetails.classList.add("fade-in");
    container.style.height = '500px';
    console.log(humidity.textContent, wind.textContent)

  });
});
