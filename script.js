// Select DOM elements
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const cityName = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind');

// Fetch JSON data
let weatherData = null;

fetch('weather.json')
    .then(response => response.json())
    .then(data => {
        weatherData = data.cities;
        console.log('JSON Data Loaded:', weatherData);
        searchButton.disabled = false; // Enable button after data loads
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });

// Initially disable the button
searchButton.disabled = true;

// Function to update the weather card
function updateWeather(cityData) {
    if (!cityData) {
        // alert('City not found!');
        cityName.textContent = 'City not found';
        temp.textContent = '--°C';
        humidity.textContent = '--%';
        windSpeed.textContent = '-- km/h';
        weatherIcon.src = './images/rain.png'; // Set icon to rain
        return;
    }

    cityName.textContent = cityData.city;
    temp.textContent = `${cityData.temperature}°C`;
    humidity.textContent = `${cityData.humidity}%`;
    windSpeed.textContent = `${cityData.wind_speed} km/h`;

    console.log('Temperature:', cityData.temperature); 
    if (cityData.temperature >= 30) {
        weatherIcon.src = './images/clear.png'; // Set icon to sun
    } else if (cityData.temperature >= 20) {
        weatherIcon.src = './images/clouds.png'; // Set icon to cloud
    } else if (cityData.temperature < 15) {
        weatherIcon.src = './images/mist.png'; // Set icon to mist
    } else if (cityData.temperature < 10) {
        weatherIcon.src = './images/rain.png'; // Set icon to rain
    } else if (cityData.temperature < 5) {
        weatherIcon.src = './images/drizzle.png'; // Set icon to snow
    } else{
        weatherIcon.src = './images/snow.png'; // Set icon to snow
    }
    console.log('Weather icon src set to:', weatherIcon.src); 

    // document.querySelector('.weather').style.display = 'block';
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    console.log('Search button clicked');
    const city = searchInput.value.trim();
    console.log('City entered:', city);
    if (city && weatherData) {
        const cityData = weatherData.find(c => c.city.toLowerCase() === city.toLowerCase());
        console.log('City data found:', cityData);
        updateWeather(cityData);
    } else if (!weatherData) {
        alert('Weather data is still loading. Please wait.');
    }
});

// Event listener for Enter key
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
        const city = searchInput.value.trim();
        console.log('City entered:', city);
        if (city && weatherData) {
            const cityData = weatherData.find(c => c.city.toLowerCase() === city.toLowerCase());
            console.log('City data found:', cityData);
            updateWeather(cityData);
        } else if (!weatherData) {
            alert('Weather data is still loading. Please wait.');
        }
    }
});


// oninput change
function handleInputChange () {
    const input = searchInput.value.trim().toLowerCase();
    console.log("input changed to :", input);
}

if(!weatherData) {
    alert("Weather data is still loading. Please wait.");
    return;
}

if(input == '') {
    updateWeather(null);
    return;
}

// Find the first city that starts with the input
const cityData = weatherData.find(c => c.city.toLowerCase().startsWith(input));
console.log('Matching city data:', cityData);
updateWeather(cityData);

// Event listener for input change (real-time typing)
searchInput.addEventListener('input', handleInputChange);

// Event listener for search button (optional, for exact match)
searchButton.addEventListener('click', () => {
console.log('Search button clicked');
handleInputChange(); // Reuse the same logic
});

// Event listener for Enter key (optional, for exact match)
searchInput.addEventListener('keypress', (event) => {
if (event.key === 'Enter') {
    console.log('Enter key pressed');
    handleInputChange(); // Reuse the same logic
}
});