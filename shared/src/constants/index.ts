// API Base URLs
export const API_URLS = {
  BLS: 'https://api.bls.gov/publicAPI/v2',
  FRED: 'https://api.stlouisfed.org/fred',
  CENSUS: 'https://api.census.gov/data',
  TREASURY: 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service',
  EIA: 'https://api.eia.gov'
} as const;

// Rate Limits (requests per time period)
export const RATE_LIMITS = {
  BLS: {
    PUBLIC: { requests: 25, period: 'day' },
    REGISTERED: { requests: 500, period: 'day' }
  },
  FRED: {
    DEFAULT: { requests: 120, period: 'minute' }
  },
  CENSUS: {
    DEFAULT: { requests: 500, period: 'day' }
  },
  TREASURY: {
    DEFAULT: { requests: 100, period: 'minute' }
  },
  EIA: {
    DEFAULT: { requests: 5000, period: 'hour' }
  }
} as const;

// Cache TTL (Time To Live) in seconds
export const CACHE_TTL = {
  REAL_TIME: 60,      // 1 minute
  HOURLY: 3600,       // 1 hour
  DAILY: 86400,       // 24 hours
  WEEKLY: 604800,     // 7 days
  MONTHLY: 2592000,   // 30 days
  QUARTERLY: 7776000, // 90 days
  YEARLY: 31536000    // 365 days
} as const;

// Chart Colors (Material Design inspired)
export const CHART_COLORS = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5',
  '#c49c94', '#f7b6d3', '#c7c7c7', '#dbdb8d', '#9edae5'
];

// Default Chart Configuration
export const DEFAULT_CHART_CONFIG = {
  responsive: true,
  animation: true,
  theme: 'light' as const,
  width: 800,
  height: 400
};

// Date Formats
export const DATE_FORMATS = {
  API: 'YYYY-MM-DD',
  DISPLAY: 'MMM DD, YYYY',
  SHORT: 'MM/DD/YYYY',
  ISO: 'YYYY-MM-DDTHH:mm:ss.sssZ'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_API_KEY: 'Invalid or missing API key',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded, please try again later',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_PARAMETERS: 'Invalid request parameters',
  DATA_NOT_FOUND: 'Requested data not found',
  PARSING_ERROR: 'Error parsing API response',
  CACHE_ERROR: 'Cache operation failed'
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const; 