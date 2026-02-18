const WeatherCard = ({ day }) => {
    return (
        <div className="weather-card">
            <p><b>{day.description}</b></p>
            <p>{day.icon}</p>
            <p><i>Date: </i>{day.date}</p>
            <p><i>Temperature: </i>{day.temp}</p>
            <p><i>Longitude: </i>{day.longitude}</p>
            <p><i>Latitude: </i>{day.latitude}</p>
        </div>
    )
};

export default WeatherCard;