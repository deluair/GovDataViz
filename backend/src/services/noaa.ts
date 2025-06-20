import axios from 'axios';
import { logger } from '../utils/logger';
import { cacheService } from './cache';

export interface NoaaDataPoint {
  date: string;
  value: number;
  datatype: string;
  station?: string;
  attributes?: string;
}

export interface NoaaDataset {
  id: string;
  name: string;
  datacoverage: number;
  mindate: string;
  maxdate: string;
}

export interface NoaaData {
  metadata: {
    resultset: {
      offset: number;
      count: number;
      limit: number;
    };
  };
  results: NoaaDataPoint[];
}

export class NoaaService {
  private apiToken: string;
  private baseUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2';

  constructor() {
    this.apiToken = process.env.NOAA_API_TOKEN || '';
  }

  async getTemperatureData(options: {
    startdate?: string;
    enddate?: string;
    locationid?: string;
    datasetid?: string;
  } = {}): Promise<NoaaData> {
    const cacheKey = `noaa:temperature:${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = await cacheService.get<NoaaData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/data`, {
        params: {
          datasetid: options.datasetid || 'GHCND',
          datatypeid: 'TAVG,TMAX,TMIN',
          locationid: options.locationid || 'FIPS:US',
          startdate: options.startdate || '2023-01-01',
          enddate: options.enddate || '2024-12-31',
          units: 'standard',
          limit: 1000
        },
        headers: {
          'token': this.apiToken
        },
        timeout: 30000
      });

      if (!response.data.results) {
        throw new Error('No temperature data found in NOAA response');
      }

      const data: NoaaData = {
        metadata: response.data.metadata,
        results: response.data.results.map((item: any) => ({
          date: item.date,
          value: parseFloat(item.value) || 0,
          datatype: item.datatype,
          station: item.station,
          attributes: item.attributes
        }))
      };

      // Cache for 4 hours
      await cacheService.set(cacheKey, data, 14400);

      return data;
    } catch (error) {
      logger.error('NOAA API error:', error);
      throw new Error(`Failed to fetch NOAA temperature data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPrecipitationData(options: {
    startdate?: string;
    enddate?: string;
    locationid?: string;
    datasetid?: string;
  } = {}): Promise<NoaaData> {
    const cacheKey = `noaa:precipitation:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<NoaaData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/data`, {
        params: {
          datasetid: options.datasetid || 'GHCND',
          datatypeid: 'PRCP',
          locationid: options.locationid || 'FIPS:US',
          startdate: options.startdate || '2023-01-01',
          enddate: options.enddate || '2024-12-31',
          units: 'standard',
          limit: 1000
        },
        headers: {
          'token': this.apiToken
        },
        timeout: 30000
      });

      if (!response.data.results) {
        throw new Error('No precipitation data found in NOAA response');
      }

      const data: NoaaData = {
        metadata: response.data.metadata,
        results: response.data.results.map((item: any) => ({
          date: item.date,
          value: parseFloat(item.value) || 0,
          datatype: item.datatype,
          station: item.station,
          attributes: item.attributes
        }))
      };

      await cacheService.set(cacheKey, data, 14400);

      return data;
    } catch (error) {
      logger.error('NOAA Precipitation API error:', error);
      throw new Error(`Failed to fetch NOAA precipitation data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getClimateExtremes(options: {
    startdate?: string;
    enddate?: string;
    locationid?: string;
  } = {}): Promise<NoaaData> {
    const cacheKey = `noaa:extremes:${JSON.stringify(options)}`;
    
    const cached = await cacheService.get<NoaaData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/data`, {
        params: {
          datasetid: 'GHCND',
          datatypeid: 'TMAX,TMIN,PRCP',
          locationid: options.locationid || 'FIPS:US',
          startdate: options.startdate || '2023-01-01',
          enddate: options.enddate || '2024-12-31',
          units: 'standard',
          limit: 1000,
          sortfield: 'date',
          sortorder: 'desc'
        },
        headers: {
          'token': this.apiToken
        },
        timeout: 30000
      });

      if (!response.data.results) {
        throw new Error('No climate extreme data found');
      }

      const data: NoaaData = {
        metadata: response.data.metadata,
        results: response.data.results.map((item: any) => ({
          date: item.date,
          value: parseFloat(item.value) || 0,
          datatype: item.datatype,
          station: item.station,
          attributes: item.attributes
        }))
      };

      await cacheService.set(cacheKey, data, 14400);

      return data;
    } catch (error) {
      logger.error('NOAA Climate Extremes API error:', error);
      throw new Error(`Failed to fetch climate extreme data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getDatasets(): Promise<NoaaDataset[]> {
    const cacheKey = 'noaa:datasets';
    
    const cached = await cacheService.get<NoaaDataset[]>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/datasets`, {
        params: {
          limit: 1000
        },
        headers: {
          'token': this.apiToken
        },
        timeout: 30000
      });

      if (!response.data.results) {
        throw new Error('No datasets found');
      }

      const datasets: NoaaDataset[] = response.data.results;

      // Cache for 24 hours (datasets don't change often)
      await cacheService.set(cacheKey, datasets, 86400);

      return datasets;
    } catch (error) {
      logger.error('NOAA Datasets API error:', error);
      throw new Error(`Failed to fetch NOAA datasets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 