export interface DataPoint {
  date: string;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface TimeSeries {
  id: string;
  title: string;
  description?: string;
  units: string;
  frequency: 'annual' | 'quarterly' | 'monthly' | 'weekly' | 'daily';
  source: string;
  lastUpdated: string;
  data: DataPoint[];
  seasonallyAdjusted?: boolean;
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  source: string;
  category: string;
  tags: string[];
  timeSeries: TimeSeries[];
  createdAt: string;
  updatedAt: string;
}

export interface DataFilter {
  startDate?: string;
  endDate?: string;
  frequency?: string;
  seasonalAdjustment?: boolean;
  limit?: number;
  offset?: number;
}

export interface SearchParams {
  query?: string;
  category?: string;
  source?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface DataMetrics {
  count: number;
  min: number;
  max: number;
  mean: number;
  median: number;
  standardDeviation: number;
} 