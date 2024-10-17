import { promises as fs } from 'fs';

// TODO: Define a City class with name and id properties

class City {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = 'searchHistory.json'; // Assuming the file is in the current directory
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await this.readFile(this.filePath);
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
     await this.writeFile(this.filePath, data);
    } catch (error) {
      console.error('Error writing file:', error);
   
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {

    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<void> {
    const cities = await this.getCities();
    const newId = cities.length > 0 ? cities[cities.length - 1].id + 1 : 1;
    const newCity = new City(newId, city);
    cities.push(newCity);
    await this.write(cities);
  }


  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
 async removeCity(id: number): Promise<void> {
  const cities = await this.getCities();
  const updatedCities = cities.filter(city => city.id !== id);
  await this.write(updatedCities);
 }

 private async readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf8');
}

private async writeFile(filePath: string, data: string): Promise<void> {
  await fs.writeFile(filePath, data, 'utf8');
}

}

export default new HistoryService();
