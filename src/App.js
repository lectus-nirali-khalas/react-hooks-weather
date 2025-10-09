import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiKey) {
      setError('API key is missing. Please check your .env file.');
      return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=23.215635&lon=72.636940&appid=${apiKey}`)
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
  }, [apiKey]);

  if (error) return <div style={{ color: 'red', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', marginTop: '2rem' }}>{error}</div>;
  const backgroundStyle = {
    minHeight: '100vh',
    minWidth: '100vw',
    background: 'linear-gradient(120deg, #9f36b9 0%, #66a6ff 50%, #fbc2eb 100%)',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Card style with a colored border and shadow
  const cardStyle = {
    background: 'rgba(255,255,255,0.92)',
    borderRadius: '1.5rem',
    border: '3px solid #66a6ff',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    maxWidth: '420px',
    width: '100%',
    padding: '2rem'
  };

  // Label style for data fields
  const labelStyle = {
    color: '#9f36b9',
    fontWeight: 'bold'
  };

  // Value style for data fields
  const valueStyle = {
    color: '#333',
    fontWeight: '500'
  };

  // Weather icon style
  const iconStyle = {
    width: '60px',
    height: '60px',
    marginBottom: '1rem'
  };

  return (
    <div style={backgroundStyle}>
      <div style={cardStyle}>
        <h1 className="mb-4" style={{ color: '#ff9800', fontWeight: 'bold', textAlign: 'center' }}>🌦️Weather Data</h1>
        {data ? (
          <>
            <div style={{ textAlign: 'center' }}>
              {data.weather && data.weather[0].icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].description}
                  style={iconStyle}
                />
              )}
              <h2 style={{ color: '#66a6ff', fontWeight: 'bold' }}>
                {data.name}, {data.sys && data.sys.country}
              </h2>
            </div>
            <hr style={{ borderTop: '2px solid #fbc2eb' }} />
            <p>
              <span style={labelStyle}>Coordinates:</span>{' '}
              <span style={valueStyle}>{data.coord.lat}, {data.coord.lon}</span>
            </p>
            <p>
              <span style={labelStyle}> Weather:</span>{' '}
              <span style={valueStyle}>{data.weather && data.weather[0].main} ({data.weather && data.weather[0].description})</span>
            </p>
            <p>
              <span style={labelStyle}>🌡️ Temperature:</span>{' '}
              <span style={{ ...valueStyle, color: '#e57373' }}>{data.main && data.main.temp} K</span>
            </p>
            <p>
              <span style={labelStyle}>🌡️ Feels Like:</span>{' '}
              <span style={{ ...valueStyle, color: '#ba68c8' }}>{data.main && data.main.feels_like} K</span>
            </p>
            <p>
              <span style={labelStyle}>💧 Humidity:</span>{' '}
              <span style={{ ...valueStyle, color: '#4fc3f7' }}>{data.main && data.main.humidity}%</span>
            </p>
            <p>
              <span style={labelStyle}>🌬️ Pressure:</span>{' '}
              <span style={valueStyle}>{data.main && data.main.pressure} hPa</span>
            </p>
            <p>
              <span style={labelStyle}>💨 Wind:</span>{' '}
              <span style={valueStyle}>{data.wind && data.wind.speed} m/s, {data.wind && data.wind.deg}&deg;</span>
            </p>
            <p>
              <span style={labelStyle}>Clouds:</span>{' '}
              <span style={valueStyle}>{data.clouds && data.clouds.all}%</span>
            </p>
            <p>
              <span style={labelStyle}>👁️ Visibility:</span>{' '}
              <span style={valueStyle}>{data.visibility} m</span>
            </p>
          </>
        ) : (
          <p style={{ color: '#9f36b9', textAlign: 'center', fontWeight: 'bold' }}>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
