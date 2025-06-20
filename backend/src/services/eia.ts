import axios from 'axios';
import { logger } from '../utils/logger';
import { cacheService } from './cache';

export interface EiaDataPoint {
  period: string;
  value: number;
}

export interface EiaSeriesData {
  series_id: string;
  name: string;
  units: string;
  frequency: string;
  data: EiaDataPoint[];
  description: string;
  copyright: string;
  source: string;
}

export class EiaService {
  private apiKey: string;
  private baseUrl = 'https://api.eia.gov/v2';

  constructor() {
    this.apiKey = process.env.EIA_API_KEY || '';
  }

  async getElectricityGeneration(options: {
    frequency?: string;
    start?: string;
    end?: string;
  } = {}): Promise<EiaSeriesData> {
    const cacheKey = `eia:electricity:${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = await cacheService.get<EiaSeriesData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Use correct EIA v2 electricity endpoint
      const response = await axios.get(`${this.baseUrl}/electricity/electric-power-operational-data/data`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[]': 'generation',
          'facets[fueltypeid][]': 'ALL',
          'facets[location][]': 'US',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 100
        },
        timeout: 30000
      });

      if (!response.data.response || !response.data.response.data) {
        throw new Error('No data found in EIA response');
      }

      const data: EiaSeriesData = {
        series_id: 'EIA_ELECTRICITY_GENERATION',
        name: 'Total Electricity Generation',
        units: 'thousand megawatthours',
        frequency: options.frequency || 'monthly',
        data: response.data.response.data.map((item: any) => ({
          period: item.period,
          value: parseFloat(item.generation) || 0
        })).reverse(),
        description: 'Total electricity generation in the United States',
        copyright: 'U.S. Energy Information Administration',
        source: 'eia'
      };

      // Cache for 2 hours
      await cacheService.set(cacheKey, data, 7200);

      return data;
    } catch (error) {
      logger.error('EIA API error:', error);
      
      // Fallback to mock data
      const mockData: EiaSeriesData = {
        series_id: 'EIA_ELECTRICITY_GENERATION',
        name: 'Total Electricity Generation (Mock)',
        units: 'thousand megawatthours',
        frequency: 'monthly',
        data: [
          { period: '2024-01', value: 325000 },
          { period: '2024-02', value: 310000 },
          { period: '2024-03', value: 315000 },
          { period: '2024-04', value: 295000 },
          { period: '2024-05', value: 305000 },
          { period: '2024-06', value: 340000 }
        ],
        description: 'Mock electricity generation data (API unavailable)',
        copyright: 'U.S. Energy Information Administration',
        source: 'mock'
      };
      
      return mockData;
    }
  }

  async getRenewableEnergy(options: {
    frequency?: string;
    start?: string;
    end?: string;
  } = {}): Promise<EiaSeriesData> {
    const cacheKey = `eia:renewable:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<EiaSeriesData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Use correct renewable energy facets
      const response = await axios.get(`${this.baseUrl}/electricity/electric-power-operational-data/data`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[]': 'generation',
          'facets[fueltypeid][]': 'SUN',
          'facets[location][]': 'US',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 100
        },
        timeout: 30000
      });

      if (!response.data.response || !response.data.response.data) {
        throw new Error('No renewable energy data found');
      }

      const data: EiaSeriesData = {
        series_id: 'EIA_RENEWABLE_GENERATION',
        name: 'Renewable Energy Generation',
        units: 'thousand megawatthours',
        frequency: options.frequency || 'monthly',
        data: response.data.response.data.map((item: any) => ({
          period: item.period,
          value: parseFloat(item.generation) || 0
        })).reverse(),
        description: 'Renewable energy generation (solar, wind, hydro, geothermal, biomass)',
        copyright: 'U.S. Energy Information Administration',
        source: 'eia'
      };

      await cacheService.set(cacheKey, data, 7200);

      return data;
    } catch (error) {
      logger.error('EIA Renewable API error:', error);
      
      // Fallback to mock data
      const mockData: EiaSeriesData = {
        series_id: 'EIA_RENEWABLE_GENERATION',
        name: 'Renewable Energy Generation (Mock)',
        units: 'thousand megawatthours',
        frequency: 'monthly',
        data: [
          { period: '2024-01', value: 45000 },
          { period: '2024-02', value: 48000 },
          { period: '2024-03', value: 52000 },
          { period: '2024-04', value: 58000 },
          { period: '2024-05', value: 62000 },
          { period: '2024-06', value: 68000 }
        ],
        description: 'Mock renewable energy data (API unavailable)',
        copyright: 'U.S. Energy Information Administration',
        source: 'mock'
      };
      
      return mockData;
    }
  }

  async getNaturalGasPrices(options: {
    frequency?: string;
    start?: string;
    end?: string;
  } = {}): Promise<EiaSeriesData> {
    const cacheKey = `eia:gas-prices:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<EiaSeriesData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Use correct natural gas price endpoint
      const response = await axios.get(`${this.baseUrl}/natural-gas/pri/sum/data`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[]': 'price',
          'facets[duoarea][]': 'NUS',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 100
        },
        timeout: 30000
      });

      if (!response.data.response || !response.data.response.data) {
        throw new Error('No natural gas price data found');
      }

      const data: EiaSeriesData = {
        series_id: 'EIA_NATURAL_GAS_PRICES',
        name: 'Natural Gas Prices',
        units: 'dollars per thousand cubic feet',
        frequency: options.frequency || 'monthly',
        data: response.data.response.data.map((item: any) => ({
          period: item.period,
          value: parseFloat(item.price) || 0
        })).reverse(),
        description: 'U.S. natural gas wellhead prices',
        copyright: 'U.S. Energy Information Administration',
        source: 'eia'
      };

      await cacheService.set(cacheKey, data, 7200);

      return data;
    } catch (error) {
      logger.error('EIA Natural Gas API error:', error);
      
      // Fallback to mock data
      const mockData: EiaSeriesData = {
        series_id: 'EIA_NATURAL_GAS_PRICES',
        name: 'Natural Gas Prices (Mock)',
        units: 'dollars per thousand cubic feet',
        frequency: 'monthly',
        data: [
          { period: '2024-01', value: 2.85 },
          { period: '2024-02', value: 2.92 },
          { period: '2024-03', value: 2.78 },
          { period: '2024-04', value: 2.65 },
          { period: '2024-05', value: 2.58 },
          { period: '2024-06', value: 2.71 }
        ],
        description: 'Mock natural gas price data (API unavailable)',
        copyright: 'U.S. Energy Information Administration',
        source: 'mock'
      };
      
      return mockData;
    }
  }

  async getSolarGeneration(options: {
    frequency?: string;
    start?: string;
    end?: string;
  } = {}): Promise<EiaSeriesData> {
    const cacheKey = `eia:solar:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<EiaSeriesData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/electricity/electric-power-operational-data/data`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[]': 'generation',
          'facets[fueltypeid][]': 'SUN',
          'facets[location][]': 'US',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 100
        },
        timeout: 30000
      });

      if (!response.data.response || !response.data.response.data) {
        throw new Error('No solar generation data found');
      }

      const data: EiaSeriesData = {
        series_id: 'EIA_SOLAR_GENERATION',
        name: 'Solar Energy Generation',
        units: 'thousand megawatthours',
        frequency: options.frequency || 'monthly',
        data: response.data.response.data.map((item: any) => ({
          period: item.period,
          value: parseFloat(item.generation) || 0
        })).reverse(),
        description: 'Solar photovoltaic and thermal energy generation',
        copyright: 'U.S. Energy Information Administration',
        source: 'eia'
      };

      await cacheService.set(cacheKey, data, 7200);
      return data;
    } catch (error) {
      logger.error('EIA Solar API error:', error);
      
      const mockData: EiaSeriesData = {
        series_id: 'EIA_SOLAR_GENERATION',
        name: 'Solar Energy Generation (Mock)',
        units: 'thousand megawatthours',
        frequency: 'monthly',
        data: [
          { period: '2024-01', value: 8500 },
          { period: '2024-02', value: 11200 },
          { period: '2024-03', value: 15800 },
          { period: '2024-04', value: 18900 },
          { period: '2024-05', value: 22400 },
          { period: '2024-06', value: 24100 }
        ],
        description: 'Mock solar energy data (API unavailable)',
        copyright: 'U.S. Energy Information Administration',
        source: 'mock'
      };
      
      return mockData;
    }
  }

  async getWindGeneration(options: {
    frequency?: string;
    start?: string;
    end?: string;
  } = {}): Promise<EiaSeriesData> {
    const cacheKey = `eia:wind:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<EiaSeriesData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/electricity/electric-power-operational-data/data`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[]': 'generation',
          'facets[fueltypeid][]': 'WND',
          'facets[location][]': 'US',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 100
        },
        timeout: 30000
      });

      if (!response.data.response || !response.data.response.data) {
        throw new Error('No wind generation data found');
      }

      const data: EiaSeriesData = {
        series_id: 'EIA_WIND_GENERATION',
        name: 'Wind Energy Generation',
        units: 'thousand megawatthours',
        frequency: options.frequency || 'monthly',
        data: response.data.response.data.map((item: any) => ({
          period: item.period,
          value: parseFloat(item.generation) || 0
        })).reverse(),
        description: 'Wind turbine energy generation',
        copyright: 'U.S. Energy Information Administration',
        source: 'eia'
      };

      await cacheService.set(cacheKey, data, 7200);
      return data;
    } catch (error) {
      logger.error('EIA Wind API error:', error);
      
      const mockData: EiaSeriesData = {
        series_id: 'EIA_WIND_GENERATION',
        name: 'Wind Energy Generation (Mock)',
        units: 'thousand megawatthours',
        frequency: 'monthly',
        data: [
          { period: '2024-01', value: 38500 },
          { period: '2024-02', value: 35200 },
          { period: '2024-03', value: 32800 },
          { period: '2024-04', value: 29900 },
          { period: '2024-05', value: 26400 },
          { period: '2024-06', value: 25100 }
        ],
        description: 'Mock wind energy data (API unavailable)',
        copyright: 'U.S. Energy Information Administration',
        source: 'mock'
      };
      
      return mockData;
    }
  }

  async getCoalGeneration(options: {
    frequency?: string;
    start?: string;
    end?: string;
  } = {}): Promise<EiaSeriesData> {
    const cacheKey = `eia:coal:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<EiaSeriesData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/electricity/electric-power-operational-data/data`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[]': 'generation',
          'facets[fueltypeid][]': 'COL',
          'facets[location][]': 'US',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 100
        },
        timeout: 30000
      });

      if (!response.data.response || !response.data.response.data) {
        throw new Error('No coal generation data found');
      }

      const data: EiaSeriesData = {
        series_id: 'EIA_COAL_GENERATION',
        name: 'Coal Energy Generation',
        units: 'thousand megawatthours',
        frequency: options.frequency || 'monthly',
        data: response.data.response.data.map((item: any) => ({
          period: item.period,
          value: parseFloat(item.generation) || 0
        })).reverse(),
        description: 'Coal-fired power plant energy generation',
        copyright: 'U.S. Energy Information Administration',
        source: 'eia'
      };

      await cacheService.set(cacheKey, data, 7200);
      return data;
    } catch (error) {
      logger.error('EIA Coal API error:', error);
      
      const mockData: EiaSeriesData = {
        series_id: 'EIA_COAL_GENERATION',
        name: 'Coal Energy Generation (Mock)',
        units: 'thousand megawatthours',
        frequency: 'monthly',
        data: [
          { period: '2024-01', value: 85500 },
          { period: '2024-02', value: 78200 },
          { period: '2024-03', value: 75800 },
          { period: '2024-04', value: 69900 },
          { period: '2024-05', value: 72400 },
          { period: '2024-06', value: 82100 }
        ],
        description: 'Mock coal energy data (API unavailable)',
        copyright: 'U.S. Energy Information Administration',
        source: 'mock'
      };
      
      return mockData;
    }
  }

  async getNuclearGeneration(options: {
    frequency?: string;
    start?: string;
    end?: string;
  } = {}): Promise<EiaSeriesData> {
    const cacheKey = `eia:nuclear:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<EiaSeriesData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/electricity/electric-power-operational-data/data`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[]': 'generation',
          'facets[fueltypeid][]': 'NUC',
          'facets[location][]': 'US',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 100
        },
        timeout: 30000
      });

      if (!response.data.response || !response.data.response.data) {
        throw new Error('No nuclear generation data found');
      }

      const data: EiaSeriesData = {
        series_id: 'EIA_NUCLEAR_GENERATION',
        name: 'Nuclear Energy Generation',
        units: 'thousand megawatthours',
        frequency: options.frequency || 'monthly',
        data: response.data.response.data.map((item: any) => ({
          period: item.period,
          value: parseFloat(item.generation) || 0
        })).reverse(),
        description: 'Nuclear power plant energy generation',
        copyright: 'U.S. Energy Information Administration',
        source: 'eia'
      };

      await cacheService.set(cacheKey, data, 7200);
      return data;
    } catch (error) {
      logger.error('EIA Nuclear API error:', error);
      
      const mockData: EiaSeriesData = {
        series_id: 'EIA_NUCLEAR_GENERATION',
        name: 'Nuclear Energy Generation (Mock)',
        units: 'thousand megawatthours',
        frequency: 'monthly',
        data: [
          { period: '2024-01', value: 67500 },
          { period: '2024-02', value: 71200 },
          { period: '2024-03', value: 69800 },
          { period: '2024-04', value: 65900 },
          { period: '2024-05', value: 68400 },
          { period: '2024-06', value: 72100 }
        ],
        description: 'Mock nuclear energy data (API unavailable)',
        copyright: 'U.S. Energy Information Administration',
        source: 'mock'
      };
      
      return mockData;
    }
  }

  async getPetroleumPrices(options: {
    frequency?: string;
    start?: string;
    end?: string;
  } = {}): Promise<EiaSeriesData> {
    const cacheKey = `eia:petroleum:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<EiaSeriesData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/petroleum/pri/spt/data`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[]': 'price',
          'facets[duoarea][]': 'NUS',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 100
        },
        timeout: 30000
      });

      if (!response.data.response || !response.data.response.data) {
        throw new Error('No petroleum price data found');
      }

      const data: EiaSeriesData = {
        series_id: 'EIA_PETROLEUM_PRICES',
        name: 'Petroleum Prices',
        units: 'dollars per barrel',
        frequency: options.frequency || 'monthly',
        data: response.data.response.data.map((item: any) => ({
          period: item.period,
          value: parseFloat(item.price) || 0
        })).reverse(),
        description: 'U.S. petroleum and crude oil prices',
        copyright: 'U.S. Energy Information Administration',
        source: 'eia'
      };

      await cacheService.set(cacheKey, data, 7200);
      return data;
    } catch (error) {
      logger.error('EIA Petroleum API error:', error);
      
      const mockData: EiaSeriesData = {
        series_id: 'EIA_PETROLEUM_PRICES',
        name: 'Petroleum Prices (Mock)',
        units: 'dollars per barrel',
        frequency: 'monthly',
        data: [
          { period: '2024-01', value: 78.50 },
          { period: '2024-02', value: 82.30 },
          { period: '2024-03', value: 75.80 },
          { period: '2024-04', value: 79.60 },
          { period: '2024-05', value: 81.20 },
          { period: '2024-06', value: 77.90 }
        ],
        description: 'Mock petroleum price data (API unavailable)',
        copyright: 'U.S. Energy Information Administration',
        source: 'mock'
      };
      
      return mockData;
    }
  }
} 