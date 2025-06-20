import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import { 
  eiaService, 
  noaaService, 
  formatLineChartData, 
  formatBarChartData,
  formatDoughnutChartData 
} from '../services/dataService';

interface ChartConfig {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'doughnut';
  service: string;
  method: string;
  color: string;
  description: string;
  units: string;
}

const ChartsPage: React.FC = () => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [chartData, setChartData] = useState<{ [key: string]: any }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Define all available charts
  const chartConfigs: ChartConfig[] = [
    // EIA Charts
    {
      id: 'eia-electricity',
      title: 'Total Electricity Generation',
      type: 'line',
      service: 'eia',
      method: 'getElectricityGeneration',
      color: '#3B82F6',
      description: 'Monthly electricity generation across the United States',
      units: 'thousand megawatthours'
    },
    {
      id: 'eia-renewable',
      title: 'Renewable Energy Generation',
      type: 'line',
      service: 'eia',
      method: 'getRenewableEnergy',
      color: '#10B981',
      description: 'Renewable energy generation from all sources',
      units: 'thousand megawatthours'
    },
    {
      id: 'eia-gas-prices',
      title: 'Natural Gas Prices',
      type: 'line',
      service: 'eia',
      method: 'getNaturalGasPrices',
      color: '#F59E0B',
      description: 'U.S. natural gas wellhead prices',
      units: 'dollars per thousand cubic feet'
    },
    {
      id: 'eia-solar',
      title: 'Solar Energy Generation',
      type: 'bar',
      service: 'eia',
      method: 'getSolar',
      color: '#FCD34D',
      description: 'Solar photovoltaic and thermal energy generation',
      units: 'thousand megawatthours'
    },
    {
      id: 'eia-wind',
      title: 'Wind Energy Generation',
      type: 'line',
      service: 'eia',
      method: 'getWind',
      color: '#06B6D4',
      description: 'Wind turbine energy generation',
      units: 'thousand megawatthours'
    },
    {
      id: 'eia-coal',
      title: 'Coal Energy Generation',
      type: 'bar',
      service: 'eia',
      method: 'getCoal',
      color: '#6B7280',
      description: 'Coal-fired power plant energy generation',
      units: 'thousand megawatthours'
    },
    {
      id: 'eia-nuclear',
      title: 'Nuclear Energy Generation',
      type: 'line',
      service: 'eia',
      method: 'getNuclear',
      color: '#8B5CF6',
      description: 'Nuclear power plant energy generation',
      units: 'thousand megawatthours'
    },
    {
      id: 'eia-petroleum',
      title: 'Petroleum Prices',
      type: 'line',
      service: 'eia',
      method: 'getPetroleum',
      color: '#EF4444',
      description: 'U.S. petroleum and crude oil prices',
      units: 'dollars per barrel'
    },
    // NOAA Charts
    {
      id: 'noaa-temperature',
      title: 'Average Temperature',
      type: 'line',
      service: 'noaa',
      method: 'getTemperature',
      color: '#DC2626',
      description: 'Average daily temperature across the United States',
      units: 'degrees Fahrenheit'
    },
    {
      id: 'noaa-precipitation',
      title: 'Precipitation',
      type: 'bar',
      service: 'noaa',
      method: 'getPrecipitation',
      color: '#2563EB',
      description: 'Daily precipitation totals across the United States',
      units: 'inches'
    },
    {
      id: 'noaa-snowfall',
      title: 'Snowfall',
      type: 'bar',
      service: 'noaa',
      method: 'getSnowfall',
      color: '#E5E7EB',
      description: 'Daily snowfall totals across the United States',
      units: 'inches'
    },
    {
      id: 'noaa-wind',
      title: 'Wind Speed',
      type: 'line',
      service: 'noaa',
      method: 'getWind',
      color: '#059669',
      description: 'Average daily wind speed across the United States',
      units: 'miles per hour'
    },
    {
      id: 'noaa-humidity',
      title: 'Relative Humidity',
      type: 'line',
      service: 'noaa',
      method: 'getHumidity',
      color: '#7C3AED',
      description: 'Average daily relative humidity across the United States',
      units: 'percent'
    },
    {
      id: 'noaa-sea-level',
      title: 'Sea Level Change',
      type: 'line',
      service: 'noaa',
      method: 'getSeaLevel',
      color: '#0891B2',
      description: 'Sea level rise measurements from U.S. tide gauge stations',
      units: 'millimeters'
    },
    {
      id: 'noaa-ocean-temp',
      title: 'Ocean Temperature',
      type: 'line',
      service: 'noaa',
      method: 'getOceanTemperature',
      color: '#0C4A6E',
      description: 'Ocean surface temperature measurements from U.S. coastal waters',
      units: 'degrees Fahrenheit'
    },
    // Economic Charts
    {
      id: 'bls-unemployment',
      title: 'Unemployment Rate',
      type: 'line',
      service: 'bls',
      method: 'getUnemployment',
      color: '#B91C1C',
      description: 'U.S. unemployment rate over time',
      units: 'percent'
    },
    {
      id: 'fred-gdp',
      title: 'GDP Growth',
      type: 'bar',
      service: 'fred',
      method: 'getGdp',
      color: '#059669',
      description: 'U.S. Gross Domestic Product growth',
      units: 'percent change'
    },
    {
      id: 'fred-rates',
      title: 'Interest Rates',
      type: 'line',
      service: 'fred',
      method: 'getRates',
      color: '#7C2D12',
      description: 'Federal funds interest rates',
      units: 'percent'
    },
    {
      id: 'census-population',
      title: 'Population by State',
      type: 'doughnut',
      service: 'census',
      method: 'getPopulation',
      color: '#4338CA',
      description: 'Population distribution across U.S. states',
      units: 'people'
    }
  ];

  // Load chart data
  const loadChartData = async (config: ChartConfig) => {
    setLoading(prev => ({ ...prev, [config.id]: true }));
    
    try {
      let service;
      switch (config.service) {
        case 'eia':
          service = eiaService;
          break;
        case 'noaa':
          service = noaaService;
          break;
        default:
          // For other services, we'll handle them separately or use mock data
          service = eiaService; // fallback
      }

      const response = await (service as any)[config.method]();
      const data = response.data || response;

      let formattedData;
      switch (config.type) {
        case 'line':
          formattedData = formatLineChartData(data, config.title, config.color);
          break;
        case 'bar':
          formattedData = formatBarChartData(data, config.title, config.color);
          break;
        case 'doughnut':
          formattedData = formatDoughnutChartData(data);
          break;
        default:
          formattedData = formatLineChartData(data, config.title, config.color);
      }

      setChartData(prev => ({
        ...prev,
        [config.id]: {
          data: formattedData,
          metadata: response.metadata || {},
          lastUpdated: new Date().toLocaleString()
        }
      }));
    } catch (error) {
      console.error(`Error loading ${config.title}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [config.id]: false }));
    }
  };

  // Load initial charts
  useEffect(() => {
    // Load first 8 charts by default
    chartConfigs.slice(0, 8).forEach(config => {
      loadChartData(config);
    });
  }, []);

  // Filter charts based on selected category and type
  const filteredCharts = chartConfigs.filter(config => {
    const categoryMatch = selectedCategory === 'all' || config.service === selectedCategory;
    const typeMatch = selectedType === 'all' || config.type === selectedType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Government Data Charts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive visualization of government data from multiple agencies including 
            Energy Information Administration (EIA), National Oceanic and Atmospheric Administration (NOAA), 
            Bureau of Labor Statistics (BLS), Federal Reserve (FRED), and U.S. Census Bureau.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Source
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Sources</option>
                  <option value="eia">EIA (Energy)</option>
                  <option value="noaa">NOAA (Climate)</option>
                  <option value="bls">BLS (Labor)</option>
                  <option value="fred">FRED (Economic)</option>
                  <option value="census">Census (Population)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chart Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="line">Line Charts</option>
                  <option value="bar">Bar Charts</option>
                  <option value="doughnut">Doughnut Charts</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Showing {filteredCharts.length} of {chartConfigs.length} charts
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCharts.map((config) => (
            <div key={config.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {config.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    config.service === 'eia' ? 'bg-blue-100 text-blue-800' :
                    config.service === 'noaa' ? 'bg-green-100 text-green-800' :
                    config.service === 'bls' ? 'bg-purple-100 text-purple-800' :
                    config.service === 'fred' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {config.service.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{config.description}</p>
                <p className="text-gray-500 text-xs">Units: {config.units}</p>
              </div>
              
              <div className="p-6">
                {loading[config.id] ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : chartData[config.id] ? (
                  <div>
                                         <Chart
                       type={config.type}
                       title={config.title}
                       data={chartData[config.id].data}
                       options={{
                         responsive: true,
                         maintainAspectRatio: false,
                         plugins: {
                           legend: {
                             display: config.type !== 'doughnut',
                             position: 'top' as const,
                           },
                           title: {
                             display: false,
                           },
                         },
                         scales: config.type !== 'doughnut' ? {
                           y: {
                             beginAtZero: true,
                             grid: {
                               color: 'rgba(0, 0, 0, 0.1)',
                             },
                           },
                           x: {
                             grid: {
                               display: false,
                             },
                           },
                         } : undefined,
                       }}
                     />
                    <div className="mt-4 text-xs text-gray-500 text-center">
                      Last updated: {chartData[config.id].lastUpdated}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <button
                      onClick={() => loadChartData(config)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Load Chart
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredCharts.length > 8 && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                // Load all remaining charts
                const unloadedCharts = filteredCharts.filter(config => !chartData[config.id]);
                unloadedCharts.forEach(config => loadChartData(config));
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Load All Charts ({filteredCharts.filter(config => !chartData[config.id]).length} remaining)
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Chart Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{chartConfigs.filter(c => c.service === 'eia').length}</div>
              <div className="text-sm text-gray-500">EIA Charts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{chartConfigs.filter(c => c.service === 'noaa').length}</div>
              <div className="text-sm text-gray-500">NOAA Charts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{chartConfigs.filter(c => c.service === 'bls').length}</div>
              <div className="text-sm text-gray-500">BLS Charts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{chartConfigs.filter(c => c.service === 'fred').length}</div>
              <div className="text-sm text-gray-500">FRED Charts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{Object.keys(chartData).length}</div>
              <div className="text-sm text-gray-500">Loaded Charts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage; 