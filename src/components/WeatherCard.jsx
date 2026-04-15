import React, {useState, useEffect} from 'react';


const WeatherCard = ({weatherData}) => {
  return (
    <section className='weather-container flex-row mx-auto'>
      <h1 className='text-8xl mx-auto'> Weather App </h1>
      <div className='bg-blue-500 h-1/2 w-10/12 p-10 rounded-3xl'>
        <p className='text-xl'> Miami Weather </p>
        {weatherData.main && <p>Main Temperture: {weatherData.main.temp} F°</p>}
        {weatherData.main && <p>Feels Like: {weatherData.main.feels_like} F°</p>}
      </div>
    </section>
  )
}

export default WeatherCard