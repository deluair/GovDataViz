import axios from 'axios';
import { cacheService } from './cache';
import { logger } from '../utils/logger';

export class FredService {
  private apiKey: string;
  private baseUrl = 'https://api.stlouisfed.org/fred';

  constructor() {
    this.apiKey = process.env.FRED_API_KEY || '';
  }

  async getSeriesObservations(seriesId: string, options: any = {}) {
    const cacheKey = `fred:series:${seriesId}:${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/series/observations`, {
        params: {
          series_id: seriesId,
          api_key: this.apiKey,
          file_type: 'json',
          ...options
        },
        timeout: 30000
      });

      // Cache for 1 hour
      await cacheService.set(cacheKey, response.data, 3600);

      return response.data;
    } catch (error) {
      logger.error('FRED API error:', error);
      throw new Error(`Failed to fetch FRED data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async searchSeries(options: any = {}) {
    const cacheKey = `fred:search:${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/series/search`, {
        params: {
          api_key: this.apiKey,
          file_type: 'json',
          ...options
        },
        timeout: 30000
      });

      // Cache for 1 hour
      await cacheService.set(cacheKey, response.data, 3600);

      return response.data;
    } catch (error) {
      logger.error('FRED search error:', error);
      throw new Error(`Failed to search FRED data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 