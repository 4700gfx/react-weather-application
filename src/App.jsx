
import React, {useState, useEffect} from 'react';
import './App.css'
import WeatherCard from './components/WeatherCard';



function App() {

  //State Management for Data 
  const [data, setData] = useState({})
  const [cities, setCities] = useState(['Miami'])

  // useEffect(() => {
  //   while (cities.length < 3){
  //     const answer = prompt('Enter a City')
  //     if (answer) {
  //       setCities([...cities, answer])
  //     }
  //   }

  // }, [cities])


  useEffect(() => {
    const fetchData = async () => {
      try{
        const lat = 25.8106
        const lon = 80.1489
        const apiKey = 'd032196e0aedb2ebaa25d8e7df7286f7'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        const data = await response.json();
        setData(data);
        console.log(data)
        console.log(data.main.temp)
      } catch(error){
        console.error('Error Fetching the Data:', error)
      }
    }
    fetchData()
  }, [])

  return (

  <section className= 'flex text-white h-auto'>
    <WeatherCard 
      weatherData={data}
    />
  </section>

  )
}

export default App
