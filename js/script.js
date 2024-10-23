const weatherKey = `b5f7e35f7037d22bd6e598b6924f2fc0`;
const weatherUrl = "https://api.openweathermap.org";
const weatherHistory = [];

// Grabs DOM Elements

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const weatherDisplay = document.getElementById("weather-display");
const weatherHistoryDisplay = document.getElementById("weather-history-display");

// Event Listeners

//Inserts boxs with the weather data
searchButton.addEventListener("click", function () {
  const searchValue = searchInput.value;
  getWeather(searchValue);
});

//Function to fetch and display the weather data
async function getWeather(city) {
  try {
    const response = await fetch(`${weatherUrl}/data/2.5/weather?q=${city}&appid=${weatherKey}&units=imperial`);
    if (response.ok) {
      const data = await response.json();
      renderWeather(data); // pass the waeather data to the renderWeather function
      weatherHistory.push(data); // push the data to the weatherHistory array
      renderWeatherHistory(); // call the renderWeatherHistory function

    } else {
      alert("City not found");
    }
  } catch (error) {
    console.error("Error catching weather data", error);
  }
}

//Function to render the weather data
function renderWeather(weatherData) {
  const weatherBox = document.createElement("div");
  weatherBox.classList.add("weather-box");
  weatherBox.innerHTML = `
    <h2>${weatherData.name}</h2>
    <p>Temperature: ${weatherData.main.temp}°F</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Wind Speed: ${weatherData.wind.speed}mph</p>
  `;
  weatherDisplay.appendChild(weatherBox);
}

//Function to render the weather history
function renderWeatherHistory() {
  weatherHistoryDisplay.innerHTML = "";
  weatherHistory.forEach((weatherData) => {
    const weatherBox = document.createElement("div");
    weatherBox.classList.add("weather-box");
    weatherBox.innerHTML = `
      <h2>${weatherData.name}</h2>
      <p>Temperature: ${weatherData.main.temp}°F</p>
      <p>Humidity: ${weatherData.main.humidity}%</p>
      <p>Wind Speed: ${weatherData.wind.speed}mph</p>
    `;
    weatherHistoryDisplay.appendChild(weatherBox);
  });
}

