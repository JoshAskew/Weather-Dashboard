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
  private async read(): Promise<City[]> {
    try {
      const data = await this.readFile(this.filePath);
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
 async removeCity(id: string) {}
}

export default new HistoryService();
