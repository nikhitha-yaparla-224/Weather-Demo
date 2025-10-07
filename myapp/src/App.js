import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sampleWeather = {
    london: {
      name: "London",
      sys: { country: "GB" },
      weather: [{ main: "Clouds", description: "overcast clouds" }],
      main: { temp: 15, feels_like: 13, humidity: 72, pressure: 1013 },
      wind: { speed: 4.5 },
      visibility: 10000
    },
    paris: {
      name: "Paris",
      sys: { country: "FR" },
      weather: [{ main: "Clear", description: "clear sky" }],
      main: { temp: 18, feels_like: 17, humidity: 65, pressure: 1015 },
      wind: { speed: 3.2 },
      visibility: 10000
    },
    tokyo: {
      name: "Tokyo",
      sys: { country: "JP" },
      weather: [{ main: "Rain", description: "light rain" }],
      main: { temp: 22, feels_like: 21, humidity: 85, pressure: 1008 },
      wind: { speed: 5.8 },
      visibility: 8000
    },
    "new york": {
      name: "New York",
      sys: { country: "US" },
      weather: [{ main: "Clear", description: "clear sky" }],
      main: { temp: 20, feels_like: 19, humidity: 60, pressure: 1012 },
      wind: { speed: 4.1 },
      visibility: 10000
    },
    mumbai: {
      name: "Mumbai",
      sys: { country: "IN" },
      weather: [{ main: "Clouds", description: "scattered clouds" }],
      main: { temp: 30, feels_like: 33, humidity: 75, pressure: 1010 },
      wind: { speed: 6.2 },
      visibility: 9000
    },
    sydney: {
      name: "Sydney",
      sys: { country: "AU" },
      weather: [{ main: "Clear", description: "sunny" }],
      main: { temp: 25, feels_like: 24, humidity: 55, pressure: 1018 },
      wind: { speed: 3.8 },
      visibility: 10000
    }
  };

  const fetchWeather = () => {
    const searchCity = city.trim().toLowerCase();
    if (!searchCity) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      if (sampleWeather[searchCity]) {
        setWeather(sampleWeather[searchCity]);
        setCity("");
      } else {
        setError(
          `"${city}" not available in demo. Try: London, Paris, Tokyo, New York, Mumbai, or Sydney`
        );
        setWeather(null);
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  const quickSearch = (cityName) => {
    const searchCity = cityName.toLowerCase();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (sampleWeather[searchCity]) {
        setWeather(sampleWeather[searchCity]);
        setCity("");
      } else {
        setError(`City not available in demo`);
        setWeather(null);
      }
      setLoading(false);
    }, 1000);
  };

  const getWeatherEmoji = (main) => {
    const weatherLower = main.toLowerCase();
    if (weatherLower === "clear") return "☀️";
    if (weatherLower === "clouds") return "☁️";
    if (weatherLower === "rain") return "🌧️";
    if (weatherLower === "drizzle") return "🌦️";
    if (weatherLower === "snow") return "❄️";
    return "☁️";
  };

  return (
    <div className="app-container">
      <div className="card">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Try: London, Paris, Tokyo..."
          className="input-city"
        />
        <button className="search-button" onClick={fetchWeather}>
          {loading ? "⏳" : "🔍"}
        </button>

        <div>
          {["London", "Paris", "Tokyo", "New York", "Mumbai", "Sydney"].map(
            (cityName) => (
              <button
                key={cityName}
                onClick={() => quickSearch(cityName)}
                className="city-button"
              >
                {cityName}
              </button>
            )
          )}
        </div>

        {error && <p className="error">{error}</p>}
        {loading && <p className="loading">Loading weather data...</p>}

        {weather && !loading && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>{new Date().toLocaleDateString()}</p>

            <div>
              <div className="icon">{getWeatherEmoji(weather.weather[0].main)}</div>
              <h1>{Math.round(weather.main.temp)}°C</h1>
              <p>{weather.weather[0].description}</p>
              <p>Feels like {Math.round(weather.main.feels_like)}°C</p>
            </div>

            <div className="weather-details">
              <div>💧 Humidity: {weather.main.humidity}%</div>
              <div>💨 Wind: {weather.wind.speed} m/s</div>
              <div>🌡️ Pressure: {weather.main.pressure} hPa</div>
              <div>👀 Visibility: {(weather.visibility / 1000).toFixed(1)} km</div>
            </div>

            <button className="search-button" onClick={() => setWeather(null)}>
              🔄 Search Another City
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
