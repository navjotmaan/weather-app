const input = document.querySelector('#weather');
const button = document.querySelector('button');
const container = document.querySelector('.weather-data');
const loading = document.querySelector('#loading');
const toggle = document.querySelector('#toggle');

const icons = {
    'rain': 'cloud-with-rain.png',
    'clear-day': 'sun.png',
    'cloudy': 'partly-cloudy-day.png',
    'partly-cloudy-day': 'partly-cloudy-day.png'
}

let selectedData = [];
let isCelsius = true;

async function getWeatherData(place) {
    const location = input.value.trim();
    if (!location) return;

    container.innerHTML = ''; 
    loading.style.display = 'block'; 

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=JA6Z2MJZXFLT6SJCCHDRUASRM`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        loading.style.display = 'none';

        selectedData = data.days.slice(0, 3)
            .map(day => ({
                icon: day.icon,
                date: day.datetime,
                temp: day.temp,
                description: day.description,
                longitude: data.longitude, 
                latitude: data.latitude
        }));

        selectedData.forEach(day => displayWeather(day));
        
        toggle.style.display = 'block';
        toggle.textContent = '°F';

    } catch (error) {
        loading.style.display = 'none';
        container.textContent = 'Error fetching weather data.';
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
    des.id = 'des';
    des.textContent = day.description;

    const dateP = document.createElement('p');
    dateP.textContent = `Date: ${day.date}`;

    const tempP = document.createElement('p');
    tempP.classList.add('temp');
    tempP.textContent = `Temperature: ${day.temp}°C`;

    const lonP = document.createElement('p');
    lonP.textContent = `Longitude: ${day.longitude}`;

    const latP = document.createElement('p');
    latP.textContent = `Latitude: ${day.latitude}`;

    div.append(des, img, dateP, tempP, lonP, latP);

    container.appendChild(div);
}

toggle.addEventListener('click', () => {
    if (selectedData.length === 0) return;

    isCelsius = !isCelsius;

    const tempElements = document.querySelectorAll('.temp');

    tempElements.forEach((tempEl, index) => {
        const day = selectedData[index];
        if (isCelsius) {
            tempEl.textContent = `Temperature: ${day.temp}°C`;
        } else {
            const fahrenheit = (day.temp * 9 / 5) + 32;
            tempEl.textContent = `Temperature: ${fahrenheit.toFixed(1)}°F`;
        }
    });

    toggle.textContent = isCelsius ? '°F' : '°C';
});