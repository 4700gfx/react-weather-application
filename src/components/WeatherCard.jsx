function WeatherCard({ weatherData, cityName }) {
  if (!weatherData?.main) {
    return (
      <div className="text-white/30 text-sm mt-8">
        Enter a city to see the weather.
      </div>
    );
  }

  const convertToMilitary = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const weatherCardObjects = [
    { label: 'Feels like', value: `${Math.round(weatherData.main.feels_like)}°F` },
    { label: 'Humidity',   value: `${weatherData.main.humidity}%` },
    { label: 'Wind',       value: `${Math.round(weatherData.wind?.speed)} mph` },
    { label: 'Gust',       value: `${Math.round(weatherData.wind.gust)} mph` },
    { label: 'Sunrise',    value: convertToMilitary(weatherData.sys.sunrise) },
    { label: 'Sunset',     value: convertToMilitary(weatherData.sys.sunset) },
  ];

  return (
    <div
      className="rounded-2xl p-6 text-white flex-1 min-w-[200px] max-w-[260px] relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.055)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* subtle inner highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }}
      />

      <p className="text-[11px] tracking-[0.14em] uppercase text-white/35 mb-0.5">
        {weatherData.sys?.country}
      </p>
      <p className="text-lg font-medium text-white mb-3">{cityName}</p>

      <p
        className="text-[58px] font-extralight leading-none mb-1 text-white"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {Math.round(weatherData.main.temp)}°
      </p>
      <p className="text-[13px] text-white/50 capitalize mb-5">
        {weatherData.weather?.[0]?.description}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {weatherCardObjects.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl p-2.5"
            style={{ background: 'rgba(0,0,0,0.15)' }}
          >
            <p className="text-[10px] tracking-widest uppercase text-white/30 mb-0.5">{label}</p>
            <p className="text-[15px] font-medium text-white/90">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;