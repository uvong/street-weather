import React, { useState } from "react";
import axios from "axios";

function SearchBar({
  location,
  setLocation,
  setCurrentTemp,
  setCurrentCondition,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    getCurrentWeather();
    setLocation("");
  };

  const getLatLon = async () => {
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct",
      {
        params: { appid: "17a74753a498f6de59aad5b9c2c94a3e", q: location },
      }
    );
    const lat = await response.data[0].lat;
    const lon = await response.data[0].lon;
    return { lat: lat, lon: lon };
  };

  const getCurrentWeather = async () => {
    const latLon = await getLatLon();
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          appid: "17a74753a498f6de59aad5b9c2c94a3e",
          lat: latLon.lat,
          lon: latLon.lon,
        },
      }
    );
    const temp = ((response.data.main.temp - 273.15) * 9) / 5 + 32;
    const condition = response.data.weather[0].main;
    setCurrentTemp(Math.round(temp));
    setCurrentCondition(condition);
  };
  return (
    // <div className="flex justify-center">
    <form onSubmit={handleSubmit}>
      <label htmlFor="location" />
      <input
        className="text-center font-pressStart mt-8 w-48 p-1 text-red-600 bg-yellow-300 focus:outline-none"
        type="text"
        name="location"
        placeholder="City..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="submit"
        value="START"
        className="px-3 text-lg animate-pulse cursor-pointer"
      />
    </form>
    // </div>
  );
}

export default SearchBar;
