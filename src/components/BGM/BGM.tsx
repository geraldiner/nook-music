function BGM({ time, temperature }: { time: Date; temperature: number }) {
  return (
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
  );
}

export default BGM;
