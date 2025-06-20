import axios from 'axios';
import { 
  BlsApiRequest, 
  BlsApiResponse, 
  TimeSeries, 
  DataPoint,
  API_URLS,
  parseNumericValue,
  blsPeriodToDate 
} from '@gov-viz/shared';
import { cacheService } from './cache';
import { logger } from '../utils/logger';

export class BlsService {
  private apiKey: string;
  private baseUrl = API_URLS.BLS;

  constructor() {
    this.apiKey = process.env.BLS_API_KEY || '';
  }

  async getSeries(
    seriesId: string, 
    options: {
      startYear?: string;
      endYear?: string;
      calculations?: boolean;
    } = {}
  ): Promise<TimeSeries> {
    const cacheKey = `bls:series:${seriesId}:${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = await cacheService.get<TimeSeries>(cacheKey);
    if (cached) {
      return cached;
    }

    const request: BlsApiRequest = {
      seriesid: [seriesId],
      startyear: options.startYear,
      endyear: options.endYear,
      calculations: options.calculations,
      registrationkey: this.apiKey || undefined
    };

    try {
      const response = await axios.post<BlsApiResponse>(
        `${this.baseUrl}/timeseries/data/`,
        request,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data.status !== 'REQUEST_SUCCEEDED') {
        throw new Error(`BLS API error: ${response.data.message.join(', ')}`);
      }

      const series = response.data.Results.series[0];
      if (!series) {
        throw new Error('No data found for series');
      }

      const timeSeries: TimeSeries = {
        id: seriesId,
        title: series.catalog?.series_title || seriesId,
        description: series.catalog?.survey_name || '',
        units: series.catalog?.measure_data_type || '',
        frequency: 'monthly',
        source: 'bls',
        lastUpdated: new Date().toISOString(),
        data: series.data.map((point): DataPoint => ({
          date: blsPeriodToDate(point.year, point.period).toISOString().split('T')[0],
          value: parseNumericValue(point.value) || 0,
          label: point.periodName,
          metadata: {
            footnotes: point.footnotes,
            calculations: point.calculations
          }
        })).reverse(), // BLS returns newest first, we want oldest first
        seasonallyAdjusted: series.catalog?.seasonally_adjusted === 'Seasonally Adjusted'
      };

      // Cache for 1 hour
      await cacheService.set(cacheKey, timeSeries, 3600);

      return timeSeries;
    } catch (error) {
      logger.error('BLS API error:', error);
      throw new Error(`Failed to fetch BLS data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getMultipleSeries(
    seriesIds: string[],
    options: {
      startYear?: string;
      endYear?: string;
      calculations?: boolean;
    } = {}
  ): Promise<TimeSeries[]> {
    if (seriesIds.length > 50) {
      throw new Error('Maximum 50 series can be requested at once');
    }

    const cacheKey = `bls:multiple:${seriesIds.join(',')}:${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = await cacheService.get<TimeSeries[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const request: BlsApiRequest = {
      seriesid: seriesIds,
      startyear: options.startYear,
      endyear: options.endYear,
      calculations: options.calculations,
      registrationkey: this.apiKey || undefined
    };

    try {
      const response = await axios.post<BlsApiResponse>(
        `${this.baseUrl}/timeseries/data/`,
        request,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data.status !== 'REQUEST_SUCCEEDED') {
        throw new Error(`BLS API error: ${response.data.message.join(', ')}`);
      }

      const timeSeriesArray: TimeSeries[] = response.data.Results.series.map(series => ({
        id: series.seriesID,
        title: series.catalog?.series_title || series.seriesID,
        description: series.catalog?.survey_name || '',
        units: series.catalog?.measure_data_type || '',
        frequency: 'monthly',
        source: 'bls',
        lastUpdated: new Date().toISOString(),
        data: series.data.map((point): DataPoint => ({
          date: blsPeriodToDate(point.year, point.period).toISOString().split('T')[0],
          value: parseNumericValue(point.value) || 0,
          label: point.periodName,
          metadata: {
            footnotes: point.footnotes,
            calculations: point.calculations
          }
        })).reverse(),
        seasonallyAdjusted: series.catalog?.seasonally_adjusted === 'Seasonally Adjusted'
      }));

      // Cache for 1 hour
      await cacheService.set(cacheKey, timeSeriesArray, 3600);

      return timeSeriesArray;
    } catch (error) {
      logger.error('BLS API error:', error);
      throw new Error(`Failed to fetch BLS data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 