const weatherKey = `b5f7e35f7037d22bd6e598b6924f2fc0`;
const weatherUrl = "https://api.openweathermap.org";
const weatherHistory = [];

// Grabs DOM Elements
const searchInput = document.getElementById("city"); // Update to match your HTML
const searchButton = document.querySelector("button[type='submit']"); // Grabbing the submit button
const weatherDisplay = document.getElementById("weather-display");
const weatherHistoryDisplay = document.getElementById("weather-history-display");

// Check if elements are found
console.log(searchInput); // Check if the element exists
console.log(searchButton); // Check if the button exists

// Event Listeners
searchButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page
  console.log("Search Button Clicked!"); // Log to check if clicked
  const searchValue = searchInput.value;
  getWeather(searchValue);
});

// Function to fetch and display the weather data
async function getWeather(city) {
  try {
    const url = `${weatherUrl}/data/2.5/weather?q=${city}&appid=${weatherKey}&units=imperial`;
    console.log("Request URL:", url); // Log the full URL

    const response = await fetch(url, {
      method: 'GET'
    });

    console.log("Response Status:", response.status); // Log the response status
    console.log("Response:", response); // Log the full response object

    if (response.ok) {
      const data = await response.json();
      renderWeather(data);
      weatherHistory.push(data);
      renderWeatherHistory();
    } else {
      const errorData = await response.json();
      console.error("Error Data:", errorData); // Log error data
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
}

// Function to render the weather data
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

// Function to render the weather history
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
