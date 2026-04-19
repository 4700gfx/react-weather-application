import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [submittedCities, setSubmittedCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue === "") {
      alert(`Add A City to Start`);
    } else {
      setSubmittedCities([...submittedCities, inputValue]);
      setInputValue("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      if (submittedCities.length === 0) {
        alert('Add a City to Continue');
        return;
      }
      if (submittedCities.length >= 4) {
        alert(`Maximum 4 Cities Limited Reached`);
      }
      try {
        const apiKey = import.meta.env.VITE_WEATHER_KEY;
        const promises = submittedCities.map(city =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
            .then(response => response.json())
        );
        const results = await Promise.all(promises);
        setWeatherDataList(results);
        console.log(results);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [submittedCities]);

  return (
    <section
      className="flex flex-col mx-auto min-h-screen px-8 py-10"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0a2e2a 100%)',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Google Font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');`}</style>

      {/* Title Row */}
      <div className='mx-auto'>
          <div className="flex items-baseline gap-3 mb-8">
          <h1
            className="text-4xl font-normal text-white/95 m-0 leading-none"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            Shek's Weather App
          </h1>
          <span className="text-xs tracking-widest text-white/35 uppercase">
            {submittedCities.length} / 4 cities
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-10 max-w-md">
          <input
            className="flex-1 h-[32px] rounded-full px-5 text-white text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              fontFamily: 'inherit',
            }}
            placeholder="Add a city…"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            className="h-[32px] px-5 rounded-full text-sm font-medium whitespace-nowrap tracking-wide"
            style={{
              background: 'rgba(100,220,180,0.12)',
              border: '1px solid rgba(100,220,180,0.4)',
              color: '#7ef0c8',
              fontFamily: 'inherit',
            }}
            onClick={handleSubmit}
          >
            + Add City
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-row mx-auto flex-wrap gap-4">
        {weatherDataList.map((weatherData, index) => (
          <WeatherCard
            key={index}
            weatherData={weatherData}
            cityName={weatherData.name}
          />
        ))}
      </div>
    </section>
  );
}

export default App;