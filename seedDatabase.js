import axios from 'axios';
import { writeFileSync, readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data.slice(0, 10);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const processCountries = (countries) => {
  return countries.map(country => {
    return {
      id: uuidv4(),
      name: country.name.common,
      duration: '1 Week',
      price: Math.floor(Math.random() * 10000),
      about: country.region,
      likes: 0,
      deleted: false,
      image: '',
      translations: {
        ka: {
          name: country.name.common,
          duration: '1 კვირა',
          about: country.region,
        },
      },
    };
  });
};

const seedDatabase = async () => {
  const countries = await fetchCountries();
  const processedCountries = processCountries(countries);

  const databasePath = join(__dirname, 'database.json');
  const database = JSON.parse(readFileSync(databasePath, 'utf-8'));
  database.countries = processedCountries;
  writeFileSync(databasePath, JSON.stringify(database, null, 2));
  console.log('Database seeded successfully');
};

seedDatabase();