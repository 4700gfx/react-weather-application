import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Button Clicked');
    setSubmittedCity(inputValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentCity = submittedCity;
        const apiKey = import.meta.env.VITE_WEATHER_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`
        );
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
        console.log(data.main.temp);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [submittedCity]);

  return (
    <section className="min-h-screen flex flex-col items-center px-6 py-12"
      style={{ background: 'linear-gradient(160deg, #0f2027, #203a43, #2c5364)' }}>

      {/* Search bar */}
      <div className="flex gap-3 w-full max-w-md mb-10">
        <input
          className="flex-1 h-[52px] rounded-full px-5 text-white text-sm outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'inherit',
          }}
          placeholder="Search cities…"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="h-[52px] px-6 rounded-full text-sm font-medium transition-all whitespace-nowrap"
          style={{
            background: 'rgba(99,210,255,0.2)',
            border: '1px solid rgba(99,210,255,0.45)',
            color: '#a8eeff',
            backdropFilter: 'blur(8px)',
          }}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>

      {/* Weather Card */}
      <WeatherCard
        weatherData={weatherData}
        cityName={submittedCity}
      />
    </section>
  );
}

export default App;