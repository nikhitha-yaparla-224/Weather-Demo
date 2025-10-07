import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, Search, CloudSnow, CloudDrizzle, Loader, Download } from 'lucide-react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample weather data for demonstration
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
    const weatherLower = main.toLowerCase();
    
    if (weatherLower === 'clear') {
      return <Sun className="w-20 h-20 text-yellow-400" />;
    } else if (weatherLower === 'clouds') {
      return <Cloud className="w-20 h-20 text-gray-400" />;
    } else if (weatherLower === 'rain') {
      return <CloudRain className="w-20 h-20 text-blue-500" />;
    } else if (weatherLower === 'drizzle') {
      return <CloudDrizzle className="w-20 h-20 text-blue-400" />;
    } else if (weatherLower === 'snow') {
      return <CloudSnow className="w-20 h-20 text-blue-200" />;
    } else {
      return <Cloud className="w-20 h-20 text-gray-400" />;
    }
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
        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <Download className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>

              <p className="text-xs text-yellow-700 mb-2">
                </p>
              <p className="text-xs text-yellow-600 font-semibold">
                Available demo cities: London, Paris, Tokyo, New York, Mumbai, Sydney
              </p>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Try: London, Paris, Tokyo..."
              className="w-full px-6 py-4 pr-12 rounded-full text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
            <button
              onClick={fetchWeather}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Quick Search Buttons */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {['London', 'Paris', 'Tokyo', 'New York', 'Mumbai', 'Sydney'].map((cityName) => (
            <button
              key={cityName}
              onClick={() => quickSearch(cityName)}
              disabled={loading}
              className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 rounded-full text-sm font-medium transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cityName}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="flex flex-col items-center">
              <Loader className="w-16 h-16 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-gray-500 mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getWeatherIcon(weather.weather[0].main)}
                </div>
                <h1 className="text-6xl font-bold text-gray-800 mb-2">
                  {Math.round(weather.main.temp)}°C
                </h1>
                <p className="text-xl text-gray-600 capitalize">
                  {weather.weather[0].description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 flex items-center">
                <Droplets className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Humidity</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {weather.main.humidity}%
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 flex items-center">
                <Wind className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Wind Speed</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {weather.wind.speed} m/s
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 flex items-center">
                <Gauge className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Pressure</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {weather.main.pressure} hPa
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 flex items-center">
                <Eye className="w-8 h-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Visibility</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {(weather.visibility / 1000).toFixed(1)} km
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setWeather(null)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition-colors"
            >
              Search Another City
            </button>
          </div>
        )}

        {/* Initial State */}
        {!weather && !loading && !error && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <Sun className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Weather App Demo
            </h2>
            <p className="text-gray-500 mb-4">
              Click a city button to see the interface in action
            </p>
            <div className="bg-blue-50 rounded-lg p-4 text-left mt-4">
              <p className="text-xs font-bold text-blue-800 mb-2">💡 To Use Real Weather Data:</p>
              <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;