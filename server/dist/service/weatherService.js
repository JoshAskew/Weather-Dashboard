import dotenv from 'dotenv';
dotenv.config();
// TODO: Define a class for the Weather object
class Weather {
    constructor(temperature, humidity, windSpeed) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        // TODO: Define the baseURL, API key, and city name properties
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
        this.cityName = '';
        console.log("API Key:", this.apiKey); // Log the API key
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
        this.cityName = '';
    }
    // TODO: Create fetchLocationData method
    async fetchLocationData(query) {
        const response = await fetch(query);
        if (!response.ok) {
            const errorData = await response.text(); // Get the response text for debugging
            console.error('Fetch Error:', response.status, errorData);
            throw new Error('Failed to fetch location data.');
        }
        const data = await response.json();
        return data;
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        console.log('location data:', locationData[0].lat);
        if (!locationData || locationData.length === 0) {
            throw new Error('Invalid location data received.');
        }
        return {
            lat: locationData[0].lat,
            lon: locationData[0].lon,
        };
    }
    // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery(cityName) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
        const query = this.buildGeocodeQuery(this.cityName);
        console.log('Geocode query:', query);
        const locationData = await this.fetchLocationData(query);
        return this.destructureLocationData(locationData);
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const query = this.buildWeatherQuery(coordinates);
        console.log('Weather query:', query);
        const weatherData = await this.fetchLocationData(query);
        return weatherData;
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        return new Weather(response.main.temp, response.main.humidity, response.wind.speed);
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(weatherData) {
        return weatherData.map(data => new Weather(data.main.temp, data.main.humidity, data.wind.speed));
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(cityName) {
        this.cityName = cityName;
        console.log("City Name:", cityName); // Log the city name
        // ...
        try {
            const coordinates = await this.fetchAndDestructureLocationData();
            console.log('Coordinates:', coordinates);
            const weatherData = await this.fetchWeatherData(coordinates);
            console.log("Weather Data:", weatherData);
            const currentWeather = this.parseCurrentWeather(weatherData);
            const forecastArray = this.buildForecastArray(weatherData);
            return {
                currentWeather,
                coordinates,
                forecastArray,
            };
        }
        catch (error) {
            console.error('Error in getWeatherForCity:', error);
            throw new Error('Could not fetch weather data');
        }
    }
}
export default new WeatherService();
