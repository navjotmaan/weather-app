import { useEffect, useState } from 'react'
import WeatherCard from './Card';

const Fetch = ({ place }) => {
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=JA6Z2MJZXFLT6SJCCHDRUASRM`)
        .then((res) =>  res.json())
        .then((data) => {
        const weather = data.days.slice(0, 6)
                .map(day => ({
                    location: data.address,
                    icon: day.icon,
                    id: day.datetimeEpoch,
                    date: day.datetime,
                    temp: day.temp,
                    description: day.description,
                    longitude: data.longitude, 
                    latitude: data.latitude
            }));
        setSelectedData(weather);
        })
        .catch((err) => console.error("Error fetching weather data", err));
    }, [place]);

    return (
        <div className='weather-area'>
            {selectedData.length === 0 ? (
                <p>Loading...</p>
            ): <main>
                    <h2>Location: {selectedData[0].location}</h2>
                    <div className='cards-area'>
                        {selectedData.map((day) => (
                            <WeatherCard key={day.id} day={day} />
                        ))}
                    </div>
                </main>
            }   
        </div>
    )
}

export default Fetch;