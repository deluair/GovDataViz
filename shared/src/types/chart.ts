export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  AREA = 'area',
  PIE = 'pie',
  SCATTER = 'scatter',
  HISTOGRAM = 'histogram',
  HEATMAP = 'heatmap',
  CANDLESTICK = 'candlestick'
}

export interface ChartConfig {
  type: ChartType;
  title: string;
  subtitle?: string;
  width?: number;
  height?: number;
  responsive?: boolean;
  animation?: boolean;
  theme?: 'light' | 'dark';
}

export interface ChartAxis {
  label: string;
  type: 'linear' | 'logarithmic' | 'datetime' | 'category';
  min?: number;
  max?: number;
  format?: string;
  grid?: boolean;
}

export interface ChartSeries {
  name: string;
  data: { x: any; y: number; label?: string }[];
  color?: string;
  type?: ChartType;
  yAxis?: number;
  visible?: boolean;
}

export interface ChartOptions {
  config: ChartConfig;
  xAxis: ChartAxis;
  yAxis: ChartAxis[];
  series: ChartSeries[];
  legend?: {
    enabled: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
  };
  tooltip?: {
    enabled: boolean;
    format?: string;
  };
  zoom?: {
    enabled: boolean;
    type: 'x' | 'y' | 'xy';
  };
}

export interface ChartExportOptions {
  format: 'png' | 'jpg' | 'svg' | 'pdf';
  width?: number;
  height?: number;
  quality?: number;
} 