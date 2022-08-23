import React, { useState, useEffect } from 'react';
import './App.scss';
import WeatherCard from './components/WeatherCard/WeatherCard';
import './assets/Sass/_reset.scss'
import Welcome from './components/Welcome/Welcome'
import  ObliqueRain  from  'react-rainfall-animation/src/ObliqueRain'
import NewsCard from './components/NewsCard/NewsCard';


function App() {
  const [lat, setLat] = useState([]);
  const [lng, setLng] = useState([]);
  const [status, setStatus] = useState([]);
  const [weather, setWeather] = useState({coord:{lon:-0.3002,lat:51.508},weather:[{id:800,main:"Rain",description:"clear sky",icon:"01d"}],base:"stations",main:{temp:305.21,feels_like:303.71,temp_min:303.15,temp_max:306.6,pressure:1006,humidity:27},visibility:10000,wind:{speed:3.09,deg:100},clouds:{all:0},dt:1660481624,sys:{type:2,id:2010448,country:"GB",sunrise:1660452297,sunset:1660505225},timezone:3600,id:3333145,name:"Ealing",cod:200})
  const [news, setNews] = useState([])
  const [animation, setAnimation] = useState('')
  
  const getWeatherData = async () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
      setStatus(null);
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
    
    const key = '2ce74ee18416eb100f12a7a15a4d9e1f'
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`
    const res = await fetch(url)
    const data = await res.json()
    setWeather(data)
    setAnimation(data.weather[0].main)
    console.log(data);
  } 

  const getNewsData = async () => {
    const key = 'a0176ecaf59b2f64b3a8d9f3655bf4da'
    let url = `http://api.mediastack.com/v1/news?access_key=${key}&sources=en&country=gb&sort=popularity&limit=5`
    const res = await fetch(url)
    const data = await res.json()
    setNews(data.data)
    console.log(data.data);
  }

  useEffect(() => {
    getWeatherData();
    getNewsData();
  }, [lat,lng])
  
  return (
    <div className="App">
      {animation === 'Rain' ? (<div id="Rain">
        <ObliqueRain  dropletsAmount={1000} amplitude={0} />
      </div>) : (<div id="clear"></div>)}
      <Welcome/>
      <p>{status}</p>
        {(typeof weather.main != 'undefined') ? (
          <WeatherCard weatherData={weather}/>
        ): (
          null
        )}
        
      <NewsCard newsData={news}/>
    </div>
  );
}

export default App;
