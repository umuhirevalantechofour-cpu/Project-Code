const apiKey = "d977d3f5d4d4032a55e40ba33a9b03aa";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const weatherDiv = document.getElementById("weather");
    const weatherIcon = document.getElementById("weather-icon");
    const tripAdvice = document.getElementById("trip-advice");

  
const cityRegex = /^[A-Za-z\s]+$/;
if (city === "") {
        weatherDiv.innerHTML = "Please enter a city name.";
        weatherIcon.classList.add("hidden");
        tripAdvice.innerText = "";
        return;
    }

    if (!cityRegex.test(city)) {
    weatherDiv.innerHTML = "Please enter a valid city name (only letters and spaces).";
    weatherIcon.classList.add("hidden");
    tripAdvice.innerText = "";
    return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
     
    try {
        const response = await fetch(url);

        if (!response.ok) {
          
            if (response.status === 404) {
                weatherDiv.innerHTML = "🌍 City not found. Please check the name and try again.";
                weatherIcon.classList.add("hidden");
                tripAdvice.innerText = "Make sure the city name is spelled correctly.";
            } else {
               
                throw new Error("Unknown error occurred.");
            }
            return;
        }

        const data = await response.json();

    
        const cityName = data.name ? data.name : "Unknown City";
        const temperature = data.main?.temp ?? "N/A";
        const weatherCondition = data.weather?.[0]?.main ?? "Unknown";
        const iconCode = data.weather?.[0]?.icon ?? "01d";
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      
        weatherDiv.innerHTML = `🌍 ${cityName} - ${temperature}°C, ${weatherCondition}`;
        weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${weatherCondition}" class="mx-auto">`;
        weatherIcon.classList.remove("hidden");

      
        let advice = "";
        if (weatherCondition.includes("Rain")) {
            advice = "☔ Bring an umbrella or a raincoat.";
        } else if (weatherCondition.includes("Clear")) {
            advice = "😎 It's sunny! Bring sunglasses and sunscreen.";
        } else if (weatherCondition.includes("Clouds")) {
            advice = "🌥 It might be cloudy. A light jacket could be useful.";
        } else if (weatherCondition.includes("Snow")) {
            advice = "❄ Wear warm clothes and bring gloves!";
        } else {
            advice = "🌡 Stay prepared for any weather!";
        }

        tripAdvice.innerText = advice;
    } catch (error) {
    
        weatherDiv.innerHTML = "🌍 Unknown City - No weather data available.";
        weatherIcon.classList.add("hidden");
        tripAdvice.innerText = "Please check Connection or Internet And city name and try again.";
    }
}
