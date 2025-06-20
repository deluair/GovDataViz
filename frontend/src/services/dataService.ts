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