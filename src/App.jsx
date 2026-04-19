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
    if (inputValue === ""){
      alert(`Add A City to Start`)
    } else {
      setSubmittedCities([...submittedCities, inputValue]);
      setInputValue("")   
    } 
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      if(submittedCities.length === 0){
        alert('Add a City to Continue')
        return
      } 

      if(submittedCities.length >= 4){
        alert(`Maximum 4 Cities Limited Reached`)
      }

      try {
        const apiKey = import.meta.env.VITE_WEATHER_KEY;
        const promises = submittedCities.map(city => {
          return fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
          .then(response => response.json()) 
        });
        const results = await Promise.all(promises)
        setWeatherDataList(results)
        console.log(results)
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
    <section className="min-h-screen flex flex-col items-center px-6 py-12"
      style={{ background: 'linear-gradient(160deg, #0f2027, #203a43, #2c5364)' }}>

      <h3 className='text-white text-7xl mb-10'> Shek's Weather App </h3>

      {/* Search bar */}
      <div className="flex gap-3 w-full max-w-md mb-10">
        <input
          className="flex-1 h-[42px] rounded-full px-5 text-white text-sm outline-none transition-all"
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
          className="h-[32px] px-6 mt-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
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
      <div className='flex flex-row'>
      
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