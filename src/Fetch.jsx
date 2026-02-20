import { useEffect, useState } from 'react'
import { WeatherCard, HourlyForecast } from './Card';

const key = import.meta.env.VITE_WEATHER_KEY;

const Fetch = ({ place }) => {
    const [location, setLocation] = useState('');
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        const getData = async () => {
            try {
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${key}`, { signal });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setLocation(data.address);
                
                const weather = data.days.slice(0, 5)
                    .map(day => ({
                        id: day.datetimeEpoch,
                        date: day.datetime,
                        temp: day.temp,
                        icon: day.icon,
                        hours: day.hours.map(hour => ({
                            id: hour.datetimeEpoch,
                            icon: hour.icon,
                            time: hour.datetime,
                            temp: hour.temp,
                        })),
                }));
                setSelectedData(weather);

            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted: moving on to the newer request');
                } else {
                    console.error("Error fetching weather data", err);
                }
            }
        };

        getData();

        return () => controller.abort();

    }, [place]);

    return (
        <div>
            {selectedData.length === 0 ? (
                <p>Loading...</p>
            ): <main>
                    <h2>{location}</h2>

                    <h3>Today</h3>
                    <HourlyForecast allHoursData={selectedData[0].hours} />

                    <h3>Next Forecast</h3>
                    <div className='cards-area'>
                        {selectedData.slice(1).map((day) => (
                            <WeatherCard key={day.id} day={day} />
                        ))}
                    </div>
                </main>
            }   
        </div>
    )
};

export default Fetch;