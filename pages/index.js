import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const [location, setLocation] = useState("");
  const [currentTemp, setCurrentTemp] = useState();
  const [currentCondition, setCurrentCondition] = useState();
  const [currentLocation, setCurrentLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getCurrentWeather();
    setCurrentLocation(location);
    setLocation("");
  };

  const getLatLon = async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: { appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY, q: location },
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
          appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
          lat: latLon.lat,
          lon: latLon.lon,
        },
      }
    );
    const temp = ((response.data.main.temp - 273.15) * 9) / 5 + 32;
    setCurrentTemp(Math.round(temp));
    setCurrentCondition(response.data.weather[0].main);
  };

  return (
    <div className="">
      <Head>
        <title>Street Weather</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6 h-screen bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="flex justify-center my-4">
          <div className="absolute w-4/6 h-5/6 max-w-7xl">
            <Image
              className="object-cover rounded-lg"
              src={
                currentCondition
                  ? `/${currentCondition}.gif`
                  : "/default_image.gif"
              }
              fill
              alt="image of current weather"
            />
          </div>
          <div className="z-10 text-center font-pressStart">
            <form onSubmit={handleSubmit} className="mt-8 ">
              <label htmlFor="location" />
              <input
                className="text-center font-pressStart text-xs w-36 p-1 text-red-600 bg-yellow-300 focus:outline-none md:text-lg md:w-52"
                type="text"
                name="location"
                placeholder="City..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="submit"
                value="START"
                className="mx-2 text-sm animate-pulse cursor-pointer md:text-lg"
              />
            </form>
            <h1 className="text-3xl pt-12 z-20 text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-pink-600 md:text-5xl">
              {currentTemp ? `${currentTemp}\u00B0F` : ""}
            </h1>
            <h2 className="z-10 text-xl mt-2 bg-black/70 md:text-2xl">
              {currentCondition}
            </h2>
            <h2 className="z-10 py-4 text-lg">
              {currentLocation.toUpperCase()}
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}
