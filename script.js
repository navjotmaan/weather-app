const input = document.querySelector('#weather');
const button = document.querySelector('button');
const container = document.querySelector('.container');

async function getWeatherData(place) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=JA6Z2MJZXFLT6SJCCHDRUASRM`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const selectedData = data.days.slice(0, 3)
            .map(day => ({
                date: day.datetime,
                temp: day.temp,
                description: day.description,
                longitude: data.longitude, 
                latitude: data.latitude
        }));

        console.log(selectedData);

        selectedData.forEach(day => {
            displayWeather(day);
            console.log(day);
        });
        

    } catch (error) {
        console.error('weather fetching:', error);
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault();

    const location = input.value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        console.log('please enter a location');
    }
});

function displayWeather(day) {
    const div = document.createElement('div');
    div.textContent = `Date: ${day.date}
            Temperature: ${day.temp}
            Description: ${day.description}
            Longitude: ${day.longitude}
            Latitide: ${day.latitude}`;

    container.appendChild(div);
}