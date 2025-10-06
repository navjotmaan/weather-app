const input = document.querySelector('#weather');
const button = document.querySelector('button');
const container = document.querySelector('.weather-data');

const icons = {
    'rain': 'cloud-with-rain.png',
    'clear-day': 'sun.png',
    'cloudy': 'partly-cloudy-day.png',
    'partly-cloudy-day': 'partly-cloudy-day.png'
}

async function getWeatherData(place) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=JA6Z2MJZXFLT6SJCCHDRUASRM`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const selectedData = data.days.slice(0, 3)
            .map(day => ({
                icon: day.icon,
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
    div.classList.add('info-box');

    const iconFile = icons[day.icon];

    const img = document.createElement('img');
    img.classList.add('icon');
    img.src = `./resources/${iconFile}`;
    img.alt = 'weather icon';

    const des = document.createElement('p');
    des.setAttribute('id', 'des');
    des.textContent = day.description;

    div.innerHTML = `
                    <p>${day.date}</p>
                    <p>Temperature: ${day.temp}
                    <p>Longitude: ${day.longitude}</p>
                    <p>Latitide: ${day.latitude}</p>`;

    div.prepend(img); 
    div.prepend(des);             
    container.appendChild(div);
}