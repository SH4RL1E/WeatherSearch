document.getElementById('weatherForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let placeName = document.getElementById('weatherInput').value;
        document.getElementById('loading').style.display = 'inline-block';
        document.getElementById('weatherpreview').innerHTML = '';
        fetchWeather(placeName);
    });

    function fetchWeather(placeName) {
        let corsProxy = "https://corsproxy.io/?";
        let apiUrl = `${corsProxy}https://api.popcat.xyz/weather?q=` + encodeURIComponent(placeName);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById('loading').style.display = 'none';
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('loading').style.display = 'none';
            });
    }

    function displayWeather(data) {
        let weather = data[0];

        let weatherPreview = document.getElementById('weatherpreview');
        weatherPreview.innerHTML = `
            <h3>${weather.location.name}</h3>
            <p><strong>Day:</strong> ${weather.current.day}</p>
            <p><strong>Temperature:</strong> ${weather.current.temperature}°C</p>
            <p><strong>Condition:</strong> ${weather.current.skytext}</p>
            <p><strong>Humidity:</strong> ${weather.current.humidity}%</p>
            <p><strong>Wind:</strong> ${weather.current.winddisplay}</p>
            <img src="${weather.current.imageUrl}" alt="Weather Icon">
        `;

        let forecast = weather.forecast;
        let forecastHTML = '<h4>Forecast:</h4><ul>';
        forecast.forEach(day => {
            forecastHTML += `<li>${day.date}: ${day.skytextday}, High: ${day.high}°C, Low: ${day.low}°C</li>`;
        });
        forecastHTML += '</ul>';

        weatherPreview.innerHTML += forecastHTML;
                  }
