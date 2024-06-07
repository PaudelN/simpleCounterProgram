//WEATHER APP--

const form = document.querySelector(".form");
const cityNames = document.querySelector(".cityNames");
const card = document.querySelector(".card");
const API_KEY = "49d7cf524ee44a9a44d4b7374eeb641f";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityNames.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a valid cityname");
  }
});

async function getWeatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const response = await fetch(apiurl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}
function displayWeatherInfo(data) {
  //This is object destructing after looking at the console of the retrieved data.
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmojiDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmojiDisplay.textContent = weatherEmoji(id);

  cityDisplay.classList.add("name");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("weatherInfo");
  weatherEmojiDisplay.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmojiDisplay);
}

function weatherEmoji(weatherID) {
  switch (true) {
    case weatherID >= 200 && weatherID < 300:
      return "⛈️";
    case weatherID >= 300 && weatherID < 400:
      return "🌧️";
    case weatherID >= 500 && weatherID < 600:
      return "🌧️";
    case weatherID >= 600 && weatherID < 700:
      return "🌨️";
    case weatherID >= 700 && weatherID < 800:
      return "🌫️";
    case weatherID === 800:
      return "🌞";
    case weatherID >= 801 && weatherID < 810:
      return "☁️";
    default:
      return "😑";
  }
}

function displayError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorMessage);
}
