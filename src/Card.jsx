import rainIcon from './assets/cloud-with-rain.png';
import sunIcon from './assets/sun.png';
import moonIcon from './assets/moon.png';
import cloudIcon from './assets/partly-cloudy-day.png';
import snowIcon from './assets/snow.png';
import nightIcon from './assets/cloudy-night.png';

const icons = {
    'rain': rainIcon,
    'clear-day': sunIcon,
    'clear-night': moonIcon,
    'cloudy': cloudIcon,
    'snow': snowIcon,
    'partly-cloudy-day': cloudIcon,
    'partly-cloudy-night': nightIcon
};
    
const WeatherCard = ({ day }) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = date.toLocaleDateString('en-US', { month: 'long' });
    const dayNum = date.getDate();
    
    const iconImg = icons[day.icon];
    const temp = Math.round((day.temp - 32) * 5 / 9);

    return (
        <div className="next-forecast">
            <div className='weather-card'>
                <p id='day'>{dayName}</p>
                <p>{monthName}, {dayNum}</p>
            </div>
            <p id='temp'>{temp}°</p>
            <img src={iconImg} alt={day.icon} width='60px' height='60px'/>
        </div>
    )
};

const HourlyForecast = ({ allHoursData }) => {
    if (!allHoursData || allHoursData.length === 0) {
        return <p>Loading forecast...</p>;
    }

    const currentHour = new Date().getHours();
    const startIdx = Math.max(0, currentHour - 1); 
    
    const displayData = allHoursData.slice(startIdx, startIdx + 6);

    return (
        <div className="today-weather">
            {displayData.map((hour) => (
                <TodayData 
                    key={hour.id} 
                    hour={hour} 
                    isNow={parseInt(hour.time.split(':')[0], 10) === currentHour} 
                />
            ))}
        </div>
    );
};

const TodayData = ({ hour, isNow }) => {
    const dateObj = new Date(`2026-01-01 ${hour.time}`);
    
    const timeLabel = isNow 
        ? "Now" 
        : dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

    const iconImg = icons[hour.icon];
    const temp = Math.round((hour.temp - 32) * 5 / 9);

    return (
        <div className={`today ${isNow ? 'active' : ''}`}>
            <p className="time-label">{timeLabel}</p>
            <img src={iconImg} alt={hour.icon} width='60px' height='60px'/>
            <p className="temp-label">{temp}°</p>
        </div>
    );
};

export { WeatherCard, HourlyForecast };