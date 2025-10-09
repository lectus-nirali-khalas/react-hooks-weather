import React, { useEffect, useState } from 'react';
import './App.css';

const LAT = process.env.REACT_APP_WEATHER_LAT;
const LON = process.env.REACT_APP_WEATHER_LON;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = process.env.REACT_APP_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5/weather';

function WeatherIcon({ icon, description }) {
  if (!icon) return null;
  return (
    <img
      className="weather-icon"
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
    />
  );
}

function WeatherField({ label, value, icon }) {
  return (
    <p>
      <span className="label">{icon} {label}:</span>{' '}
      <span className="value">{value}</span>
    </p>
  );
}

function WeatherCard({ data }) {
  if (!data) return null;
  return (
    <div className="card">
      <h1 className="title">🌦️Weather Data</h1>
      <div className="center">
        <WeatherIcon icon={data.weather?.[0]?.icon} description={data.weather?.[0]?.description} />
        <h2 className="location">
          🌳{data.name} , {data.sys?.country}
        </h2>
      </div>
      <hr className="divider" />
      <WeatherField label="Coordinates" value={`${data.coord.lat}, ${data.coord.lon}`} />
      <WeatherField label="Weather" value={`${data.weather?.[0]?.main} (${data.weather?.[0]?.description})`} />
      <WeatherField label="🌡️ Temperature" value={`${data.main?.temp} K`} />
      <WeatherField label="🌡️ Feels Like" value={`${data.main?.feels_like} K`} />
      <WeatherField label="💧 Humidity" value={`${data.main?.humidity}%`} />
      <WeatherField label="🌬️ Pressure" value={`${data.main?.pressure} hPa`} />
      <WeatherField label="💨 Wind" value={`${data.wind?.speed} m/s, ${data.wind?.deg}°`} />
      <WeatherField label=" ☁️ Clouds" value={`${data.clouds?.all}%`} />
      <WeatherField label="👁️ Visibility" value={`${data.visibility} m`} />
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_KEY || !LAT || !LON) {
      setError('API key or coordinates are missing. Please check your .env file.');
      return;
    }
    const url = `${API_URL}?lat=${LAT}&lon=${LON}&appid=${API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!json.coord) {
          setError('Invalid response from API.');
          return;
        }
        setData(json);
      })
      .catch(error => {
        setError('Error fetching data: ' + error.message);
      });
  }, []);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="background">
      {data ? (
        <WeatherCard data={data} />
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default App;
  