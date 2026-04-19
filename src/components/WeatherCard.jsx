// WeatherCard.jsx
function WeatherCard({ weatherData, cityName }) {
  if (!weatherData?.main) {
    return (
      <div className="text-white/30 text-sm mt-8">
        Enter a city to see the weather.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl p-10 text-white"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(16px)',
      }}>

      <p className="text-xs tracking-widest uppercase text-white/40 mb-1">
        {cityName}, {weatherData.sys?.country}
      </p>
      <p className="text-[80px] font-light leading-none mb-2">
        {Math.round(weatherData.main.temp)}°
      </p>
      <p className="text-lg text-white/60 capitalize mb-8">
        {weatherData.weather?.[0]?.description}
      </p>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Feels like', value: `${Math.round(weatherData.main.feels_like)}°F` },
          { label: 'Humidity',   value: `${weatherData.main.humidity}%` },
          { label: 'Wind',       value: `${Math.round(weatherData.wind?.speed)} mph` },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.07)' }}>
            <p className="text-[11px] tracking-widest uppercase text-white/35 mb-1">{label}</p>
            <p className="text-xl font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;