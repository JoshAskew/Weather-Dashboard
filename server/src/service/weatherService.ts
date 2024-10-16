import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
temperature: number;
humidity: number;
windSpeed: number;

constructor(temperature: number, humidity: number, windSpeed: number) {
  this.temperature = temperature;
  this.humidity = humidity;
  this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties

  baseURL: string = 'https://api.openweathermap.org'
  apiKey: string =  process.env.API_KEY || 'd73211b0465fe97bd1c4604a46d296e4';
  city: string = '';


  // TODO: Create fetchLocationData method

  private async fetchLocationData(query: string) {
      const response = await fetch(query);
     if (!response.ok) {
      throw new Error('Failed to fetch location data.');
     }
      const data = await response.json();
      return data;
      
    }
  
  // TODO: Create destructureLocationData method

  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.coord.lat,
      lon: locationData.coord.lon,
    };
  }

  // TODO: Create buildGeocodeQuery method

  private buildGeocodeQuery(): string {
    return `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create buildWeatherQuery method

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  // TODO: Create fetchAndDestructureLocationData method

  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method

  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const weatherData = await this.fetchLocationData(query);
    return weatherData;
  }

  // TODO: Build parseCurrentWeather method

  private parseCurrentWeather(response: any) { return new Weather(
    response.main.temp,
    response.main.humidity,
    response.wind.speed
  );}

  // TODO: Complete buildForecastArray method

  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map(data => new Weather(
      data.main.temp,
      data.main.humidity,
      data.wind.speed
    ));
  }

  // TODO: Complete getWeatherForCity method

  async getWeatherForCity(city: string) {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);

    return {
      currentWeather,
      coordinates,
    };
  }
}

export default new WeatherService();
