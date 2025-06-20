import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// BLS Data Service
export const blsService = {
  // Get unemployment rate data
  getUnemploymentRate: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bls/unemployment`);
      return response.data;
    } catch (error) {
      console.error('Error fetching unemployment data:', error);
      // Return mock data if API fails
      return {
        data: [
          { date: '2023-01', value: 3.7 },
          { date: '2023-02', value: 3.6 },
          { date: '2023-03', value: 3.5 },
          { date: '2023-04', value: 3.4 },
          { date: '2023-05', value: 3.7 },
          { date: '2023-06', value: 3.6 },
          { date: '2023-07', value: 3.5 },
          { date: '2023-08', value: 3.8 },
          { date: '2023-09', value: 3.8 },
          { date: '2023-10', value: 3.9 },
          { date: '2023-11', value: 3.7 },
          { date: '2023-12', value: 3.7 },
        ]
      };
    }
  },

  // Get Consumer Price Index data
  getCPI: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bls/cpi`);
      return response.data;
    } catch (error) {
      console.error('Error fetching CPI data:', error);
      return {
        data: [
          { date: '2023-01', value: 307.026 },
          { date: '2023-02', value: 307.789 },
          { date: '2023-03', value: 309.685 },
          { date: '2023-04', value: 308.417 },
          { date: '2023-05', value: 307.789 },
          { date: '2023-06', value: 307.789 },
          { date: '2023-07', value: 308.417 },
          { date: '2023-08', value: 309.685 },
          { date: '2023-09', value: 310.298 },
          { date: '2023-10', value: 310.298 },
          { date: '2023-11', value: 310.326 },
          { date: '2023-12', value: 310.834 },
        ]
      };
    }
  }
};

// FRED Data Service
export const fredService = {
  // Get GDP data
  getGDP: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fred/gdp`);
      return response.data;
    } catch (error) {
      console.error('Error fetching GDP data:', error);
      return {
        data: [
          { date: '2023-Q1', value: 26854.6 },
          { date: '2023-Q2', value: 26998.9 },
          { date: '2023-Q3', value: 27000.8 },
          { date: '2023-Q4', value: 27012.5 },
        ]
      };
    }
  },

  // Get Interest Rates
  getInterestRates: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fred/rates`);
      return response.data;
    } catch (error) {
      console.error('Error fetching interest rates:', error);
      return {
        data: [
          { date: '2023-01', value: 4.33 },
          { date: '2023-02', value: 4.67 },
          { date: '2023-03', value: 4.88 },
          { date: '2023-04', value: 5.07 },
          { date: '2023-05', value: 5.25 },
          { date: '2023-06', value: 5.25 },
          { date: '2023-07', value: 5.33 },
          { date: '2023-08', value: 5.33 },
          { date: '2023-09', value: 5.33 },
          { date: '2023-10', value: 5.33 },
          { date: '2023-11', value: 5.33 },
          { date: '2023-12', value: 5.33 },
        ]
      };
    }
  }
};

// Census Data Service
export const censusService = {
  // Get population by state
  getPopulationByState: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/census/population`);
      return response.data;
    } catch (error) {
      console.error('Error fetching population data:', error);
      return {
        data: [
          { state: 'California', value: 39538223 },
          { state: 'Texas', value: 29145505 },
          { state: 'Florida', value: 21538187 },
          { state: 'New York', value: 20201249 },
          { state: 'Pennsylvania', value: 13002700 },
          { state: 'Illinois', value: 12812508 },
          { state: 'Ohio', value: 11799448 },
          { state: 'Georgia', value: 10711908 },
          { state: 'North Carolina', value: 10439388 },
          { state: 'Michigan', value: 10037261 },
        ]
      };
    }
  }
};

// Chart data formatters
export const formatLineChartData = (data: any[], label: string, color: string = '#3B82F6') => {
  return {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: label,
        data: data.map(item => item.value),
        borderColor: color,
        backgroundColor: color + '20',
        tension: 0.1,
      },
    ],
  };
};

export const formatBarChartData = (data: any[], label: string, color: string = '#10B981') => {
  return {
    labels: data.map(item => item.state || item.date),
    datasets: [
      {
        label: label,
        data: data.map(item => item.value),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };
};

// EIA Data Service
export const eiaService = {
  // Get electricity generation data
  getElectricityGeneration: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eia/electricity`);
      return response.data;
    } catch (error) {
      console.error('Error fetching electricity data:', error);
      return {
        data: [
          { date: '2023-01', value: 350000 },
          { date: '2023-02', value: 340000 },
          { date: '2023-03', value: 365000 },
          { date: '2023-04', value: 355000 },
          { date: '2023-05', value: 375000 },
          { date: '2023-06', value: 390000 },
          { date: '2023-07', value: 410000 },
          { date: '2023-08', value: 405000 },
          { date: '2023-09', value: 385000 },
          { date: '2023-10', value: 370000 },
          { date: '2023-11', value: 360000 },
          { date: '2023-12', value: 375000 },
        ]
      };
    }
  },

  // Get renewable energy data
  getRenewableEnergy: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eia/renewable`);
      return response.data;
    } catch (error) {
      console.error('Error fetching renewable energy data:', error);
      return {
        data: [
          { date: '2023-01', value: 45000 },
          { date: '2023-02', value: 48000 },
          { date: '2023-03', value: 52000 },
          { date: '2023-04', value: 55000 },
          { date: '2023-05', value: 58000 },
          { date: '2023-06', value: 62000 },
          { date: '2023-07', value: 65000 },
          { date: '2023-08', value: 63000 },
          { date: '2023-09', value: 59000 },
          { date: '2023-10', value: 54000 },
          { date: '2023-11', value: 50000 },
          { date: '2023-12', value: 47000 },
        ]
      };
    }
  },

  // Get natural gas prices
  getNaturalGasPrices: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eia/gas-prices`);
      return response.data;
    } catch (error) {
      console.error('Error fetching natural gas prices:', error);
      return {
        data: [
          { date: '2023-01', value: 4.2 },
          { date: '2023-02', value: 3.8 },
          { date: '2023-03', value: 3.5 },
          { date: '2023-04', value: 3.1 },
          { date: '2023-05', value: 2.9 },
          { date: '2023-06', value: 2.7 },
          { date: '2023-07', value: 2.8 },
          { date: '2023-08', value: 3.0 },
          { date: '2023-09', value: 3.2 },
          { date: '2023-10', value: 3.6 },
          { date: '2023-11', value: 4.0 },
          { date: '2023-12', value: 4.3 },
        ]
      };
    }
  },

  // Get solar energy data
  getSolar: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eia/solar`);
      return response.data;
    } catch (error) {
      console.error('Error fetching solar energy data:', error);
      return {
        data: [
          { date: '2024-01', value: 8500 },
          { date: '2024-02', value: 11200 },
          { date: '2024-03', value: 15800 },
          { date: '2024-04', value: 18900 },
          { date: '2024-05', value: 22400 },
          { date: '2024-06', value: 24100 }
        ]
      };
    }
  },

  // Get wind energy data
  getWind: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eia/wind`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wind energy data:', error);
      return {
        data: [
          { date: '2024-01', value: 38500 },
          { date: '2024-02', value: 35200 },
          { date: '2024-03', value: 32800 },
          { date: '2024-04', value: 29900 },
          { date: '2024-05', value: 26400 },
          { date: '2024-06', value: 25100 }
        ]
      };
    }
  },

  // Get coal energy data
  getCoal: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eia/coal`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coal energy data:', error);
      return {
        data: [
          { date: '2024-01', value: 85500 },
          { date: '2024-02', value: 78200 },
          { date: '2024-03', value: 75800 },
          { date: '2024-04', value: 69900 },
          { date: '2024-05', value: 72400 },
          { date: '2024-06', value: 82100 }
        ]
      };
    }
  },

  // Get nuclear energy data
  getNuclear: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eia/nuclear`);
      return response.data;
    } catch (error) {
      console.error('Error fetching nuclear energy data:', error);
      return {
        data: [
          { date: '2024-01', value: 67500 },
          { date: '2024-02', value: 71200 },
          { date: '2024-03', value: 69800 },
          { date: '2024-04', value: 65900 },
          { date: '2024-05', value: 68400 },
          { date: '2024-06', value: 72100 }
        ]
      };
    }
  },

  // Get petroleum prices
  getPetroleum: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eia/petroleum`);
      return response.data;
    } catch (error) {
      console.error('Error fetching petroleum prices:', error);
      return {
        data: [
          { date: '2024-01', value: 78.50 },
          { date: '2024-02', value: 82.30 },
          { date: '2024-03', value: 75.80 },
          { date: '2024-04', value: 79.60 },
          { date: '2024-05', value: 81.20 },
          { date: '2024-06', value: 77.90 }
        ]
      };
    }
  }
};

// NOAA Data Service
export const noaaService = {
  // Get temperature data
  getTemperature: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/noaa/temperature`);
      return response.data;
    } catch (error) {
      console.error('Error fetching temperature data:', error);
      return {
        data: [
          { date: '2023-01', value: 42.1 },
          { date: '2023-02', value: 45.3 },
          { date: '2023-03', value: 52.7 },
          { date: '2023-04', value: 61.2 },
          { date: '2023-05', value: 70.8 },
          { date: '2023-06', value: 79.4 },
          { date: '2023-07', value: 84.6 },
          { date: '2023-08', value: 82.9 },
          { date: '2023-09', value: 76.1 },
          { date: '2023-10', value: 65.3 },
          { date: '2023-11', value: 54.7 },
          { date: '2023-12', value: 45.2 },
        ]
      };
    }
  },

  // Get precipitation data
  getPrecipitation: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/noaa/precipitation`);
      return response.data;
    } catch (error) {
      console.error('Error fetching precipitation data:', error);
      return {
        data: [
          { date: '2023-01', value: 2.1 },
          { date: '2023-02', value: 1.8 },
          { date: '2023-03', value: 2.9 },
          { date: '2023-04', value: 3.2 },
          { date: '2023-05', value: 3.8 },
          { date: '2023-06', value: 3.1 },
          { date: '2023-07', value: 2.4 },
          { date: '2023-08', value: 2.7 },
          { date: '2023-09', value: 2.9 },
          { date: '2023-10', value: 2.6 },
          { date: '2023-11', value: 2.3 },
          { date: '2023-12', value: 2.0 },
        ]
      };
    }
  },

  // Get snowfall data
  getSnowfall: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/noaa/snowfall`);
      return response.data;
    } catch (error) {
      console.error('Error fetching snowfall data:', error);
      return {
        data: [
          { date: '2024-01-01', value: 12.5 },
          { date: '2024-02-01', value: 8.3 },
          { date: '2024-03-01', value: 3.2 },
          { date: '2024-04-01', value: 0.1 },
          { date: '2024-05-01', value: 0.0 },
          { date: '2024-06-01', value: 0.0 }
        ]
      };
    }
  },

  // Get wind data
  getWind: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/noaa/wind`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wind data:', error);
      return {
        data: [
          { date: '2024-01-01', value: 8.5 },
          { date: '2024-02-01', value: 9.2 },
          { date: '2024-03-01', value: 10.8 },
          { date: '2024-04-01', value: 9.6 },
          { date: '2024-05-01', value: 8.3 },
          { date: '2024-06-01', value: 7.9 }
        ]
      };
    }
  },

  // Get humidity data
  getHumidity: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/noaa/humidity`);
      return response.data;
    } catch (error) {
      console.error('Error fetching humidity data:', error);
      return {
        data: [
          { date: '2024-01-01', value: 65.2 },
          { date: '2024-02-01', value: 58.8 },
          { date: '2024-03-01', value: 62.5 },
          { date: '2024-04-01', value: 68.9 },
          { date: '2024-05-01', value: 72.3 },
          { date: '2024-06-01', value: 78.7 }
        ]
      };
    }
  },

  // Get sea level data
  getSeaLevel: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/noaa/sea-level`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sea level data:', error);
      return {
        data: [
          { date: '2024-01-01', value: 3.2 },
          { date: '2024-02-01', value: 3.3 },
          { date: '2024-03-01', value: 3.4 },
          { date: '2024-04-01', value: 3.5 },
          { date: '2024-05-01', value: 3.6 },
          { date: '2024-06-01', value: 3.7 }
        ]
      };
    }
  },

  // Get ocean temperature data
  getOceanTemperature: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/noaa/ocean-temperature`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ocean temperature data:', error);
      return {
        data: [
          { date: '2024-01-01', value: 58.2 },
          { date: '2024-02-01', value: 56.8 },
          { date: '2024-03-01', value: 60.5 },
          { date: '2024-04-01', value: 64.9 },
          { date: '2024-05-01', value: 68.3 },
          { date: '2024-06-01', value: 72.7 }
        ]
      };
    }
  }
};

export const formatDoughnutChartData = (data: any[], colors: string[] = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#F97316', '#06B6D4', '#84CC16', '#EC4899', '#6B7280'
]) => {
  return {
    labels: data.map(item => item.state || item.category),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };
}; 