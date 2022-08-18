import React from 'react'
import './WeatherCard.scss'
import  ObliqueRain  from  'react-rainfall-animation/src/ObliqueRain'

const WeatherCard = ({ weatherData }) => {

    const currentTemp = (temp) => {
        return (Math.round((temp - 273.15)*10))/10;
    } 

    const convertTime = ( timestamp ) => {
        var date = new Date(timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    return (
        <div className='card'>
            <h1 className='card__name'>{weatherData.name}</h1>
            <h2 className='card__temp'>{currentTemp(weatherData.main.temp)} &#8451;</h2>
            <div className='card__display'>
                <div className='card__display__info'>
                    <p>Max Temp: {currentTemp(weatherData.main.temp_max)} &#8451;</p>
                    <p>Min Temp: {currentTemp(weatherData.main.temp_min)} &#8451;</p>
                    <p>Feels Like: {currentTemp(weatherData.main.feels_like)} &#8451;</p>
                </div>
                <div className='card__display__info'>
                    <p>Sunrise: {convertTime(weatherData.sys.sunrise)}</p>
                    <p>Sunset: {convertTime(weatherData.sys.sunset)}</p>
                </div>
                <div className='card__display__info'>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}</p>
                </div>
                
            </div>
        </div>
    )
}

export default WeatherCard