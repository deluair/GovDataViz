import axios from 'axios';
import { cacheService } from './cache';
import { logger } from '../utils/logger';

export class CensusService {
  private apiKey: string;
  private baseUrl = 'https://api.census.gov/data';

  constructor() {
    this.apiKey = process.env.CENSUS_API_KEY || '';
  }

  async getData(options: any = {}) {
    const { dataset, get, ...params } = options;
    const cacheKey = `census:data:${dataset}:${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const url = `${this.baseUrl}/${new Date().getFullYear() - 1}/${dataset}`;
      const response = await axios.get(url, {
        params: {
          get,
          key: this.apiKey,
          ...params
        },
        timeout: 30000
      });

      // Cache for 1 hour
      await cacheService.set(cacheKey, response.data, 3600);

      return response.data;
    } catch (error) {
      logger.error('Census API error:', error);
      throw new Error(`Failed to fetch Census data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getVariables(dataset: string, group?: string) {
    const cacheKey = `census:variables:${dataset}:${group || 'all'}`;
    
    // Try cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const url = `${this.baseUrl}/${new Date().getFullYear() - 1}/${dataset}/variables`;
      const response = await axios.get(url, {
        params: {
          key: this.apiKey,
          ...(group && { group })
        },
        timeout: 30000
      });

      // Cache for 24 hours (variables don't change often)
      await cacheService.set(cacheKey, response.data, 86400);

      return response.data;
    } catch (error) {
      logger.error('Census variables error:', error);
      throw new Error(`Failed to fetch Census variables: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 