// Bureau of Labor Statistics (BLS) API Types

export interface BlsApiRequest {
  seriesid: string[];
  startyear?: string;
  endyear?: string;
  catalog?: boolean;
  calculations?: boolean;
  annualaverage?: boolean;
  registrationkey?: string;
}

export interface BlsApiResponse {
  status: string;
  responseTime: number;
  message: string[];
  Results: {
    series: BlsSeries[];
  };
}

export interface BlsSeries {
  seriesID: string;
  data: BlsDataPoint[];
  catalog?: BlsCatalog;
}

export interface BlsDataPoint {
  year: string;
  period: string;
  periodName: string;
  latest: string;
  value: string;
  footnotes: BlsFootnote[];
  calculations?: BlsCalculations;
}

export interface BlsFootnote {
  code: string;
  text: string;
}

export interface BlsCalculations {
  net_changes: {
    '1': string;
    '3': string;
    '6': string;
    '12': string;
  };
  pct_changes: {
    '1': string;
    '3': string;
    '6': string;
    '12': string;
  };
}

export interface BlsCatalog {
  series_title: string;
  series_id: string;
  seasonally_adjusted: string;
  survey_name: string;
  survey_abbreviation: string;
  measure_data_type: string;
  commerce_industry: string;
  data_type_code: string;
  classification_code: string;
  index_base_code: string;
  index_base_period: string;
}

// Common BLS Series IDs
export const BLS_SERIES = {
  // Consumer Price Index
  CPI_ALL_URBAN: 'CUUR0000SA0',
  CPI_FOOD: 'CUUR0000SAF1',
  CPI_ENERGY: 'CUUR0000SA0E',
  
  // Employment
  UNEMPLOYMENT_RATE: 'LNS14000000',
  EMPLOYMENT_LEVEL: 'LNS12000000',
  LABOR_FORCE: 'LNS11000000',
  
  // Producer Price Index
  PPI_FINISHED_GOODS: 'WPUFD49207',
  PPI_INTERMEDIATE: 'WPUFD49104',
  
  // Average Hourly Earnings
  HOURLY_EARNINGS_ALL: 'CES0500000003',
  HOURLY_EARNINGS_MANUFACTURING: 'CES3000000003'
} as const; 