import Reast, { useState, useEffect } from 'react';
import './App.scss';


function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [locationStatus, setLocationStatus] = useState(false)
  const [weather, setWeather] = useState(null);
  
  const getData = async () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
      setLocationStatus(false)
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
      setStatus(null);
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setLocationStatus(true)
    }, () => {
      setStatus('Unable to retrieve your location');
      setLocationStatus(false)
    });
    }

    const key = '2ce74ee18416eb100f12a7a15a4d9e1f'
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`
    const res = await fetch(url)
    const data = await res.json()
    setWeather(data)
    console.log(data);
  } 

  useEffect(() => {
    getData();
  }, [lat, lng])
  

  // const getLocation = async() => {
  //   if (!navigator.geolocation) {
  //     setStatus('Geolocation is not supported by your browser');
  //     setLocationStatus(false)
  //   } else {
  //     setStatus('Locating...');
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setStatus(null);
  //       setLat(position.coords.latitude);
  //       setLng(position.coords.longitude);
  //       setLocationStatus(true)
  //     }, () => {
  //       setStatus('Unable to retrieve your location');
  //       setLocationStatus(false)
  //     });
  //   }

  // }

  // const getWeather = async () => {
  //   const key = '2ce74ee18416eb100f12a7a15a4d9e1f'
  //   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`
  //   const res = await fetch(url);
  //   const data = await res.json()
  //   setWeather(data)
  //   console.log(weather);
  //   setLocationStatus(false)
  // }
  
  return (
    <div className="App">
    
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      

    </div>
  );
}

export default App;
