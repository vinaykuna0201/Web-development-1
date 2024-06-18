const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    // Initial weather for Pune when the page loads
    weatherFn('hyderabad');

    // Event listener for button click to get weather for the entered city
    $('#city-input-btn').click(function () {
        const cityName = $('#city-input').val();
        if (cityName.trim() !== '') {
            weatherFn(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });
});

async function weatherFn(cityName) {
    const temp = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(temp);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        // Display weather information
        weatherShowFn(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('City not found. Please try again.');
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    // Update weather icon using OpenWeatherMap icon code
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    $('#weather-icon').attr('src', iconUrl);
    $('#weather-info').fadeIn();
}
