"use client";

import { useEffect, useRef, useState } from "react";

function Home() {
  const [time, setTime] = useState(new Date());
  const [coordinates, setCoordinates] = useState(null);
  const [temperature, setTemperature] = useState(71);
  const [weather, setWeather] = useState("Sunny");
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    function geoFindMe() {
      function success(position: GeolocationPosition) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCoordinates({ latitude, longitude });
      }

      function error() {
        setError("Unable to retrieve your location");
      }

      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
      } else {
        return navigator.geolocation.getCurrentPosition(success, error);
      }
    }

    geoFindMe();
  }, []);

  useEffect(() => {
    async function fetchWeather(latitude, longitude) {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=b93e335c0d074c2ca9874431250506&q=${latitude},${longitude}&aqi=no`
        );
        const json = await response.json();
        setTemperature(Math.round(json.current.temp_f));

        const currentCondition = json.current.condition.text.toLowerCase();
        const currentWeather = currentCondition.includes("snow") ? "Snowy" : currentCondition.includes("rain") ? "Rainy" : "Sunny";
        setWeather(currentWeather);
      } catch (error) {
        console.error(error);
      }
    }

    if (coordinates && time) {
      window.alert(`${coordinates.latitude}, ${coordinates.longitude}`);
      fetchWeather(coordinates.latitude, coordinates.longitude);
    }
  }, [coordinates, time.getHours()]);

  const handleClickPlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  return (
    <main className="custom-background min-h-screen max-w-full">
      <div>
        <div className="min-h-screen w-full flex flex-col items-center justify-between text-white">
          <div className="my-5 border-2 border-white px-2 py-1 rounded-md">Nook Radio</div>
          {error && <div>{error}</div>}
          <div className="text-9xl flex flex-col md:flex-row justify-center items-center gap-5 text-shadow-lg text-shadow-gray-700">
            <div>
              {time.toLocaleTimeString()}
            </div>
            <div className="hidden md:block">&middot;</div>
            <div>
              {temperature}
              &deg;
            </div>
          </div>
          <div className="my-12">
            {weather && time && <audio ref={audioRef} src={`https://acnh-api.netlify.app/api-v2/blobs/audio/BGM_24Hour_${time.getHours()}_${weather}.mp3`} autoPlay loop></audio>}
            <button type="button" onClick={handleClickPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
