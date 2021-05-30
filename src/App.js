import React, { useState } from 'react';

const api = {

  key: "f17c45c9be25a7ceddc890859d0d2d44",
  base: "https://api.openweathermap.org/data/2.5/"
}
export default function App() {

  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);
        }
        )
    };
  }

  const DateBuilder = () => {
    let today = new Date();
    let date = today.toDateString()
    return (
      date
    )
  }

  return (

    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? "app warm" :"app"):"app"}>
      <main>
        <div className="seacrh-box">
          <input type="text" className="search-bar" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} placeholder="Search..." />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{DateBuilder()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <span className="metric"> {Math.round(weather.main.temp)} °C</span>
              </div>
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}
