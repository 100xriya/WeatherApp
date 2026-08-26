const cityNameInput = document.getElementById("city-input");
const weatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityDisplay = document.getElementById("city-name");
const temp = document.getElementById("temperature");
const weatherDescription = document.getElementById("description");
const errorMsg = document.getElementById("error-message");

const API_KEY = "c91f2ad11c5e8931032611297adf796b"; //env 

weatherBtn.addEventListener('click', async () => {
    const city = cityNameInput.value.trim();
    if (!city) {
        return;
    }

    // server may throw an error-> catch it
    // server/ db is always on another continent -> so await it ->fetch() is asynchronous and returns a Promise
    try {
        const weatherData = await fetchWeatherData(city);
        displayWeather(weatherData);
    } catch (error) {
        showError();
    }
})

async function fetchWeatherData(city) {
    // const url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}"; //this wont work bcz double quotes
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    /* if (!response.ok) {
        throw new Error("City not found!");             // no point in creating second error msg, we already have one in catch
        showError();
    } */

    const weather = await response.json();
    return weather;

}

function displayWeather(weatherData) {
    console.log(weatherData);
    const { name, main, weather } = weatherData;
    cityDisplay.textContent = name;
    temp.textContent = `Temperature: ${main.temp}`;
    weatherDescription.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
}

function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.toggle("hidden");
}