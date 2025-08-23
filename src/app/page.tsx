"use client";

import { useEffect, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import BGM from "@/components/BGM/BGM";
import Settings from "@/components/Settings/Settings";
import { addHourZeroPadding } from "@/utils/time_utils";

type View = "bgm" | "settings" | "playlist";
type PlayerMode = "bgm" | "playlist";

type LocationCoordinates = {
  latitude: number;
  longitude: number;
};

function Home() {
  const [playerMode, setPlayerMode] = useState<PlayerMode>("bgm");
  const [view, setView] = useState<View>("bgm");
  const [time, setTime] = useState(() => new Date());
  const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(
    null
  );
  const [temperature, setTemperature] = useState(71);
  const [weather, setWeather] = useState("Sunny");
  const [error, setError] = useState("");

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
    async function fetchWeather(
      latitude: LocationCoordinates["latitude"],
      longitude: LocationCoordinates["longitude"]
    ) {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=b93e335c0d074c2ca9874431250506&q=${latitude},${longitude}&aqi=no`
        );
        const json = await response.json();
        setTemperature(Math.round(json.current.temp_f));

        const currentCondition = json.current.condition.text.toLowerCase();
        const currentWeather = currentCondition.includes("snow")
          ? "Snowy"
          : currentCondition.includes("rain")
            ? "Rainy"
            : "Sunny";
        setWeather(currentWeather);
      } catch (error) {
        console.error(error);
      }
    }

    if (coordinates) {
      fetchWeather(coordinates.latitude, coordinates.longitude);
    }
  }, [coordinates]);

  return (
    <main className="custom-background min-h-screen max-w-full">
      <div>
        <div className="min-h-screen w-full flex flex-col items-center justify-between text-white">
          <div className="my-5 border-2 border-white px-2 py-1 rounded-md">
            Nook Radio
          </div>
          {error && <div>{error}</div>}
          {view === "bgm" && <BGM time={time} temperature={temperature} />}
          {view === "settings" && <Settings />}
          <div className="my-12">
            <AudioPlayer
              src={`https://acnh-api.netlify.app/api-v2/blobs/audio/BGM_24Hour_${addHourZeroPadding(time.getHours())}_${weather}.mp3`}
              loop={view === "bgm"}
              playerMode={playerMode}
              view={view}
              setView={setView}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
export type { PlayerMode, View };
