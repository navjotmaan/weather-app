import { useState } from 'react';
import type { ChangeEvent, ReactElement } from 'react';
import Fetch from './Fetch';
import './css/App.css';

function App(): ReactElement {
  const [place, setPlace] = useState<string>('');
  const [submittedPlace, setSubmittedPlace] = useState<string>('Delhi');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const fetchData = () => {
    const trimmedPlace = place.trim();
    if (!trimmedPlace) return;

    setSubmittedPlace(trimmedPlace);
    setPlace('');
  };

  return (
    <>
      <h1>Weather App</h1>
      <div className='input-area'>
        <input
          type='text'
          name='place'
          value={place}
          onChange={handleInputChange}
          placeholder='Enter location'
        />
        <button onClick={fetchData}>Get</button>
      </div>

      <div className='weather-area'>
        <Fetch place={submittedPlace} />
      </div>
    </>
  );
}

export default App;
