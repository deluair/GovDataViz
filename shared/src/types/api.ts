export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiCredentials {
  apiKey: string;
  baseUrl: string;
  rateLimit?: {
    requests: number;
    period: string; // 'minute', 'hour', 'day'
  };
}

export enum DataSource {
  BLS = 'bls',
  FRED = 'fred',
  CENSUS = 'census',
  TREASURY = 'treasury',
  EIA = 'eia'
}

export interface DataSourceConfig {
  source: DataSource;
  name: string;
  description: string;
  credentials: ApiCredentials;
  endpoints: Record<string, string>;
  enabled: boolean;
} 