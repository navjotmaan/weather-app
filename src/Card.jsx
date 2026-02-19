import rainIcon from './assets/cloud-with-rain.png';
import sunIcon from './assets/sun.png';
import cloudIcon from './assets/partly-cloudy-day.png';
import snowIcon from './assets/snow.png';

const icons = {
    'rain': rainIcon,
    'clear-day': sunIcon,
    'cloudy': cloudIcon,
    'snow': snowIcon,
    'partly-cloudy-day': cloudIcon
};
    
const WeatherCard = ({ day }) => {

    const iconImg = icons[day.icon];
    return (
        <div className="weather-card">
            <p><b>{day.description}</b></p>
            <img src={iconImg} alt={day.icon} width='48px'/>
            <p><i>Date: </i>{day.date}</p>
            <p><i>Temperature: </i>{day.temp}</p>
            <p><i>Longitude: </i>{day.longitude}</p>
            <p><i>Latitude: </i>{day.latitude}</p>
        </div>
    )
};

export default WeatherCard;