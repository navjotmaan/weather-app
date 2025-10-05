const input = document.querySelector('#weather');
const button = document.querySelector('button');

async function getWeatherData(place) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=JA6Z2MJZXFLT6SJCCHDRUASRM`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

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

