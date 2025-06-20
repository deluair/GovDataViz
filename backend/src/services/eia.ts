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
      const response = await axios.get(`${this.baseUrl}/electricity/electric-power-operational-data/data/`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[0]': 'generation',
          'facets[fueltypeid][]': 'ALL',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 5000
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
      throw new Error(`Failed to fetch EIA data: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      const response = await axios.get(`${this.baseUrl}/electricity/electric-power-operational-data/data/`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[0]': 'generation',
          'facets[fueltypeid][]': 'SUN,WND,HYC,GEO,BIO,WAS,OTH',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 5000
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
      throw new Error(`Failed to fetch renewable energy data: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      const response = await axios.get(`${this.baseUrl}/natural-gas/pri/sum/data/`, {
        params: {
          'api_key': this.apiKey,
          'frequency': options.frequency || 'monthly',
          'data[0]': 'price',
          'facets[duoarea][]': 'NUS',
          'start': options.start || '2023-01',
          'end': options.end || '2024-12',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          'offset': 0,
          'length': 5000
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
      throw new Error(`Failed to fetch natural gas price data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 