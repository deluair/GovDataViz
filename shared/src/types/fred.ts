// Federal Reserve Economic Data (FRED) API Types

export interface FredApiResponse<T = any> {
  realtime_start: string;
  realtime_end: string;
  observation_start?: string;
  observation_end?: string;
  units?: string;
  output_type?: number;
  file_type?: string;
  order_by?: string;
  sort_order?: string;
  count?: number;
  offset?: number;
  limit?: number;
  [key: string]: T | any;
}

export interface FredSeries {
  id: string;
  realtime_start: string;
  realtime_end: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  last_updated: string;
  popularity: number;
  group_popularity?: number;
  notes?: string;
}

export interface FredObservation {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: string;
}

export interface FredCategory {
  id: number;
  name: string;
  parent_id: number;
  notes?: string;
}

export interface FredRelease {
  id: number;
  realtime_start: string;
  realtime_end: string;
  name: string;
  press_release: boolean;
  link?: string;
  notes?: string;
}

export interface FredSource {
  id: number;
  realtime_start: string;
  realtime_end: string;
  name: string;
  link?: string;
  notes?: string;
}

export interface FredSeriesSearchResult extends FredSeries {
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
}

// FRED API Parameters
export interface FredApiParams {
  api_key: string;
  file_type?: 'json' | 'xml';
  realtime_start?: string;
  realtime_end?: string;
  limit?: number;
  offset?: number;
  order_by?: string;
  sort_order?: 'asc' | 'desc';
  filter_variable?: string;
  filter_value?: string;
  tag_names?: string;
  exclude_tag_names?: string;
  search_text?: string;
  search_type?: 'full_text' | 'series_id';
}

export interface FredObservationParams extends FredApiParams {
  observation_start?: string;
  observation_end?: string;
  units?: 'lin' | 'chg' | 'ch1' | 'pch' | 'pc1' | 'pca' | 'cch' | 'cca' | 'log';
  frequency?: 'd' | 'w' | 'bw' | 'm' | 'q' | 'sa' | 'a';
  aggregation_method?: 'avg' | 'sum' | 'eop';
  output_type?: 1 | 2 | 3 | 4;
  vintage_dates?: string;
}

// Common FRED Series IDs
export const FRED_SERIES = {
  // GDP and Economic Growth
  GDP: 'GDP',
  GDP_PER_CAPITA: 'A939RX0Q048SBEA',
  REAL_GDP: 'GDPC1',
  
  // Interest Rates
  FEDERAL_FUNDS_RATE: 'FEDFUNDS',
  TEN_YEAR_TREASURY: 'GS10',
  THREE_MONTH_TREASURY: 'GS3M',
  
  // Employment
  UNEMPLOYMENT_RATE_FRED: 'UNRATE',
  NONFARM_PAYROLLS: 'PAYEMS',
  LABOR_FORCE_PARTICIPATION: 'CIVPART',
  
  // Inflation
  CPI_ALL_ITEMS: 'CPIAUCSL',
  CORE_CPI: 'CPILFESL',
  PCE_DEFLATOR: 'PCEPI',
  
  // Money Supply
  M1_MONEY_SUPPLY: 'M1SL',
  M2_MONEY_SUPPLY: 'M2SL',
  
  // Housing
  HOUSING_STARTS: 'HOUST',
  EXISTING_HOME_SALES: 'EXHOSLUSM495S',
  CASE_SHILLER_INDEX: 'CSUSHPISA'
} as const; 