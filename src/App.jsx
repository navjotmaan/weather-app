import { useEffect, useState } from 'react';
import Fetch from './Fetch';
import './css/App.css';

function App() {
  const [place, setPlace] = useState('');
  const [weatherData, setWeatherData] = useState('');

  useEffect(() => {
    setWeatherData(<Fetch place={'Delhi'} />);
  }, []);

  const handleInputChange = (e) => {
    setPlace(e.target.value);
  };

  const fetchData = () => {
    setWeatherData(<Fetch place={place} />);
    setPlace('');
  };

  return (
    <>
      <h1>Weather App</h1>
      <div className='input-area'>
        <input 
          type="text"
          name='place'
          value={place}
          onChange={handleInputChange}
          placeholder="Enter location"
        />
        <button onClick={fetchData}>Get</button>
      </div>

      <div className='weather-area'>{weatherData}</div>
    </>
  )
};

export default App;
