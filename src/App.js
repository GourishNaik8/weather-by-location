import "./styles.scss";
import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";

function App() {
  const [data, setData] = useState({});
  const [loc, setLoc] = useState("");
  const [temp, setTemp] = useState(Number);
  const [errorMsg, setMsg] = useState("");

  const key = "you'r api key";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`;

  const ifocus = useRef(null);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        setTemp((res.data.main.temp - 273.15).toFixed(2));
        setMsg("");
      });
      axios.get(url).catch((err) => {
        setMsg(err.response.data.message);
        setData({});
      });
      setLoc("");
    }
  };

  function map(lat, lon) {
    window.open(
      `http://maps.google.com?q=${lat},${lon}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const serachError = () => {
    return (
      <div className="xyz">
        {errorMsg ? (
          <strong
            className="ani-text error"
            onClick={() => {
              setMsg("");
            }}
          >
            {errorMsg}
          </strong>
        ) : (
          <strong
            className="ani-text"
            onClick={() => {
              ifocus.current.focus();
            }}
          >
            Search City
          </strong>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="searchField">
        <input
          ref={ifocus}
          className="searchInput"
          value={loc}
          onChange={(event) => {
            setLoc(event.target.value);
            setMsg("");
          }}
          placeholder="Enter City"
          onKeyPress={searchLocation}
          type="text"
        />
        {!data.main ? <div className="overlay"></div> : null}
      </div>

      <div className="container">
        {data.main ? (
          <>
            <div className="top">
              <div className="location °">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                <h2>{temp}°c</h2>
                <div className="weathericon">
                  <img
                    className="w-icon"
                    alt="weather-icon"
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  />
                </div>
              </div>
              <div className="desc d-f-j">
                <div
                  className="d-f-r"
                  data-class="tooltip"
                  data-arrow-color="transprent"
                  data-tip="Open in Map"
                  onClick={() => map(data.coord.lat, data.coord.lon)}
                >
                  <div className="bold">{data.sys.country}</div>
                  <div className="location">
                    <span>Lat : {data.coord.lat}</span>
                    <span>Lon : {data.coord.lon}</span>
                  </div>
                </div>
                <ReactTooltip />
                <span className="bold pl-2">
                  {data.weather[0].description.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                <p className="info-data">
                  {(data.main.feels_like - 273.15).toFixed(2)}°c
                </p>
                <p
                  className={
                    "txt-label " +
                    (temp <= 25
                      ? "cool"
                      : temp > 25 && temp < 30
                      ? "normal"
                      : temp > 30
                      ? "hot"
                      : "non")
                  }
                >
                  Feels like
                </p>
              </div>
              <div className="humidity">
                <p className="info-data">
                  {data.main.humidity} <sup>%</sup>
                </p>
                <p
                  className={
                    "txt-label " +
                    (temp < 25
                      ? "cool"
                      : temp > 25 && temp < 30
                      ? "normal"
                      : temp > 30
                      ? "hot"
                      : "non")
                  }
                >
                  Humidity
                </p>
              </div>
              <div className="wind">
                <p className="info-data">
                  {data.wind.speed} <sup>Kmph</sup>
                </p>
                <p
                  className={
                    "txt-label " +
                    (temp < 25
                      ? "cool"
                      : temp > 25 && temp < 30
                      ? "normal"
                      : temp > 30
                      ? "hot"
                      : "non")
                  }
                >
                  Winds
                </p>
              </div>
            </div>
          </>
        ) : (
          serachError()
        )}
      </div>
    </div>
  );
}

export default App;
