import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample weather data
  const sampleWeather = {
    london: {
      name: 'London',
      sys: { country: 'GB' },
      weather: [{ main: 'Clouds', description: 'overcast clouds' }],
      main: { temp: 15, feels_like: 13, humidity: 72, pressure: 1013 },
      wind: { speed: 4.5 },
      visibility: 10000
    },
    paris: {
      name: 'Paris',
      sys: { country: 'FR' },
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 18, feels_like: 17, humidity: 65, pressure: 1015 },
      wind: { speed: 3.2 },
      visibility: 10000
    },
    tokyo: {
      name: 'Tokyo',
      sys: { country: 'JP' },
      weather: [{ main: 'Rain', description: 'light rain' }],
      main: { temp: 22, feels_like: 21, humidity: 85, pressure: 1008 },
      wind: { speed: 5.8 },
      visibility: 8000
    },
    'new york': {
      name: 'New York',
      sys: { country: 'US' },
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 20, feels_like: 19, humidity: 60, pressure: 1012 },
      wind: { speed: 4.1 },
      visibility: 10000
    },
    mumbai: {
      name: 'Mumbai',
      sys: { country: 'IN' },
      weather: [{ main: 'Clouds', description: 'scattered clouds' }],
      main: { temp: 30, feels_like: 33, humidity: 75, pressure: 1010 },
      wind: { speed: 6.2 },
      visibility: 9000
    },
    sydney: {
      name: 'Sydney',
      sys: { country: 'AU' },
      weather: [{ main: 'Clear', description: 'sunny' }],
      main: { temp: 25, feels_like: 24, humidity: 55, pressure: 1018 },
      wind: { speed: 3.8 },
      visibility: 10000
    }
  };

  const fetchWeather = async () => {
    const searchCity = city.trim().toLowerCase();
    if (!searchCity) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      if (sampleWeather[searchCity]) {
        setWeather(sampleWeather[searchCity]);
        setCity('');
        setError('');
      } else {
        setError(`"${city}" not available in demo. Try: London, Paris, Tokyo, New York, Mumbai, or Sydney`);
        setWeather(null);
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const getWeatherIcon = (main) => {
    const w = main.toLowerCase();
    if (w === 'clear') return '☀️';
    if (w === 'clouds') return '☁️';
    if (w === 'rain') return '🌧️';
    if (w === 'drizzle') return '🌦️';
    if (w === 'snow') return '❄️';
    return '🌤️';
  };

  const quickSearch = (cityName) => {
    const searchCity = cityName.toLowerCase();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (sampleWeather[searchCity]) {
        setWeather(sampleWeather[searchCity]);
        setCity('');
        setError('');
      } else {
        setError(`City not available in demo`);
        setWeather(null);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg text-yellow-700 text-sm">
          ⚠️ Available demo cities: London, Paris, Tokyo, New York, Mumbai, Sydney
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="🔍 Try: London, Paris, Tokyo..."
            className="w-full px-6 py-4 pr-12 rounded-full text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? '⏳' : '🔎'}
          </button>
        </div>

        {/* Quick buttons */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {['London', 'Paris', 'Tokyo', 'New York', 'Mumbai', 'Sydney'].map((cityName) => (
            <button
              key={cityName}
              onClick={() => quickSearch(cityName)}
              disabled={loading}
              className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 rounded-full text-sm font-medium transition-colors shadow disabled:opacity-50"
            >
              {cityName}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            ❌ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="text-5xl mb-3 animate-pulse">🌤️</div>
            <p className="text-gray-600 font-medium">Loading weather data...</p>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="text-7xl my-6">{getWeatherIcon(weather.weather[0].main)}</div>
            <h1 className="text-6xl font-bold text-gray-800">{Math.round(weather.main.temp)}°C</h1>
            <p className="text-xl text-gray-600 capitalize">{weather.weather[0].description}</p>
            <p className="text-sm text-gray-500 mt-2">Feels like {Math.round(weather.main.feels_like)}°C</p>

            <div className="grid grid-cols-2 gap-4 mt-8 text-left">
              <div className="bg-blue-50 rounded-xl p-4">
                💧 <b>Humidity:</b> {weather.main.humidity}%
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                🌬️ <b>Wind:</b> {weather.wind.speed} m/s
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                🌡️ <b>Pressure:</b> {weather.main.pressure} hPa
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                👁️ <b>Visibility:</b> {(weather.visibility / 1000).toFixed(1)} km
              </div>
            </div>

            <button
              onClick={() => setWeather(null)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition-colors"
            >
              🔁 Search Another City
            </button>
          </div>
        )}

        {/* Initial Screen */}
        {!weather && !loading && !error && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-4">☀️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Weather App Demo</h2>
            <p className="text-gray-500 mb-4">Click a city to view demo weather data!</p>
            <p className="text-sm text-blue-700">💡 Replace sample data with real API for live updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
