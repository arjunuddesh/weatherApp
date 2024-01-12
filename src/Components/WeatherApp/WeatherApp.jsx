import React from "react";
import { useEffect, useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
function WeatherApp() {
  const [cityName, setCityName] = useState(localStorage.getItem("cityName"));
  const [data, setData] = useState("");
  const [apiKey] = useState("5c17164fb58c3e52028258b9fc3bec13");
  const [weatherIcon, setWeatherIcon] = useState("");
  useEffect(() => {
    search();
  }, []);
  const search = async () => {
    if (cityName && cityName != "") {
     localStorage.setItem("cityName", cityName);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${apiKey}`
      );
      const response = await res.json();
      handleWeatherIconName(response?.weather?.icon);
      setData(response);
    }
  };
  const handleWeatherIconName = (code) => {
    switch (code) {
      case "01d":
      case "01n":
        setWeatherIcon(clear_icon);
        break;
      case "02d":
      case "02n":
        setWeatherIcon(cloud_icon);
        break;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        setWeatherIcon(drizzle_icon);
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        setWeatherIcon(rain_icon);
        break;
      case "13d":
      case "13n":
        setWeatherIcon(snow_icon);
        break;
      default:
        setWeatherIcon(clear_icon);
        break;
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search City"
          onChange={(e) => setCityName(e.target.value)}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="" />
      </div>
      {data?  (
        <>
          <div className="weather-temp">{data?.main?.temp}°c</div>
          <div className="weather-location">{data?.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">{data?.main?.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">{data?.wind?.speed}km/hr</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="errorMessage">
          Please enter city name
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
