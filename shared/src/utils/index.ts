/**
 * Format a date string to YYYY-MM-DD format
 */
export function formatDateString(date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Parse API date strings to Date objects
 */
export function parseApiDate(dateString: string): Date {
  return new Date(dateString);
}

/**
 * Convert BLS period to date
 */
export function blsPeriodToDate(year: string, period: string): Date {
  const yearNum = parseInt(year, 10);
  
  if (period === 'M13') {
    // Annual average
    return new Date(yearNum, 11, 31);
  }
  
  if (period.startsWith('M')) {
    const month = parseInt(period.substring(1), 10) - 1;
    return new Date(yearNum, month, 1);
  }
  
  if (period.startsWith('Q')) {
    const quarter = parseInt(period.substring(1), 10);
    const month = (quarter - 1) * 3;
    return new Date(yearNum, month, 1);
  }
  
  // Default to year end
  return new Date(yearNum, 11, 31);
}

/**
 * Validate API key format
 */
export function validateApiKey(apiKey: string, source: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }
  
  switch (source) {
    case 'bls':
      return apiKey.length === 32; // BLS API keys are 32 characters
    case 'fred':
      return apiKey.length === 32; // FRED API keys are 32 characters
    case 'census':
      return apiKey.length === 40; // Census API keys are 40 characters
    default:
      return apiKey.length > 0;
  }
}

/**
 * Safely parse numeric values from API responses
 */
export function parseNumericValue(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '' || value === '.') {
    return null;
  }
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? null : num;
}

/**
 * Create cache key for API requests
 */
export function createCacheKey(source: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  return `${source}:${sortedParams}`;
}

/**
 * Rate limiting delay calculator
 */
export function calculateDelay(requestCount: number, maxRequests: number, timeWindow: number): number {
  if (requestCount < maxRequests) {
    return 0;
  }
  
  return Math.ceil(timeWindow / maxRequests) * 1000; // Convert to milliseconds
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      const targetValue = result[key] || ({} as any);
      result[key] = deepMerge(targetValue, source[key] as any);
    } else if (source[key] !== undefined) {
      result[key] = source[key] as any;
    }
  }
  
  return result;
} 