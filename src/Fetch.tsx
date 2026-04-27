import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import type { HourData, DayForecast } from './Card.js';
import { HourlyForecast, WeatherCard } from './Card.js';

interface FetchProps {
  place: string;
}

interface VisualCrossingHour {
  datetimeEpoch: number;
  icon: string;
  datetime: string;
  temp: number;
}

interface VisualCrossingDay {
  datetimeEpoch: number;
  datetime: string;
  temp: number;
  icon: string;
  hours: VisualCrossingHour[];
}

interface VisualCrossingResponse {
  address: string;
  days: VisualCrossingDay[];
}

const key = import.meta.env.VITE_WEATHER_KEY ?? '';

const Fetch = ({ place }: FetchProps): ReactElement => {
  const [location, setLocation] = useState<string>('');
  const [selectedData, setSelectedData] = useState<DayForecast[]>([]);

  useEffect(() => {
    if (!place) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const getData = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${key}`,
          { signal },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as VisualCrossingResponse;

        setLocation(data.address);

        const weather = data.days.slice(0, 5).map((day): DayForecast => ({
          id: day.datetimeEpoch,
          date: day.datetime,
          temp: day.temp,
          icon: day.icon as HourData['icon'],
          hours: day.hours.map((hour) => ({
            id: hour.datetimeEpoch,
            icon: hour.icon as HourData['icon'],
            time: hour.datetime,
            temp: hour.temp,
          })),
        }));

        setSelectedData(weather);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('Fetch aborted: moving on to the newer request');
        } else if (err instanceof Error) {
          console.error('Error fetching weather data', err.message);
        } else {
          console.error('Unexpected error fetching weather data', err);
        }
      }
    };

    getData();

    return () => controller.abort();
  }, [place]);

  const todayHours = selectedData[0]?.hours ?? [];

  return (
    <div>
      {selectedData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <main>
          <h2>{location}</h2>

          <h3>Today</h3>
          <HourlyForecast allHoursData={todayHours} />

          <h3>Next Forecast</h3>
          <div className='cards-area'>
            {selectedData.slice(1).map((day) => (
              <WeatherCard key={day.id} day={day} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default Fetch;
