import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import { blsService, fredService, censusService, formatLineChartData, formatBarChartData, formatDoughnutChartData } from '../services/dataService';

interface DataPoint {
  date?: string;
  state?: string;
  value: number;
}

interface ApiResponse {
  data: DataPoint[];
}

const ChartsPage: React.FC = () => {
  const [selectedDataSource, setSelectedDataSource] = useState('all');
  const [selectedChartType, setSelectedChartType] = useState('all');
  const [unemploymentData, setUnemploymentData] = useState<ApiResponse | null>(null);
  const [gdpData, setGdpData] = useState<ApiResponse | null>(null);
  const [populationData, setPopulationData] = useState<ApiResponse | null>(null);
  const [interestRatesData, setInterestRatesData] = useState<ApiResponse | null>(null);
  const [cpiData, setCpiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [unemployment, gdp, population, rates, cpi] = await Promise.all([
          blsService.getUnemploymentRate(),
          fredService.getGDP(),
          censusService.getPopulationByState(),
          fredService.getInterestRates(),
          blsService.getCPI()
        ]);

        setUnemploymentData(unemployment);
        setGdpData(gdp);
        setPopulationData(population);
        setInterestRatesData(rates);
        setCpiData(cpi);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = (chartTitle: string) => {
    alert(`Exporting ${chartTitle}... (Feature coming soon!)`);
  };

  const handleShare = (chartTitle: string) => {
    navigator.clipboard.writeText(window.location.href);
    alert(`Link to ${chartTitle} copied to clipboard!`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading chart data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📊 Charts & Visualizations</h1>
        <p className="text-lg text-gray-600 mb-8">
          Interactive charts powered by real-time government data sources
        </p>
        
        <div className="flex gap-4 mb-6 flex-wrap">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
            ➕ Create New Chart
          </button>
          <select 
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm"
            value={selectedDataSource}
            onChange={(e) => setSelectedDataSource(e.target.value)}
          >
            <option value="all">All Data Sources</option>
            <option value="bls">📊 BLS (Labor Statistics)</option>
            <option value="fred">💰 FRED (Federal Reserve)</option>
            <option value="census">🗺️ Census Bureau</option>
          </select>
          <select 
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm"
            value={selectedChartType}
            onChange={(e) => setSelectedChartType(e.target.value)}
          >
            <option value="all">All Chart Types</option>
            <option value="line">📈 Line Chart</option>
            <option value="bar">📊 Bar Chart</option>
            <option value="doughnut">🍩 Doughnut Chart</option>
          </select>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors bg-white shadow-sm">
            🔄 Refresh Data
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Unemployment Rate Chart */}
        {unemploymentData && (selectedDataSource === 'all' || selectedDataSource === 'bls') && 
         (selectedChartType === 'all' || selectedChartType === 'line') && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <Chart
                type="line"
                title="📈 U.S. Unemployment Rate Trend"
                data={formatLineChartData(unemploymentData.data, 'Unemployment Rate (%)', '#EF4444')}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      title: {
                        display: true,
                        text: 'Percentage (%)'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Month (2023)'
                      }
                    }
                  }
                }}
              />
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600 font-medium">Source: Bureau of Labor Statistics</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExport('Unemployment Rate')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    📤 Export
                  </button>
                  <button 
                    onClick={() => handleShare('Unemployment Rate')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GDP Growth Chart */}
        {gdpData && (selectedDataSource === 'all' || selectedDataSource === 'fred') && 
         (selectedChartType === 'all' || selectedChartType === 'bar') && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <Chart
                type="bar"
                title="💰 U.S. GDP by Quarter"
                data={formatBarChartData(gdpData.data, 'GDP (Billions USD)', '#10B981')}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'Billions USD'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Quarter (2023)'
                      }
                    }
                  }
                }}
              />
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600 font-medium">Source: Federal Reserve Economic Data</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExport('GDP Growth')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    📤 Export
                  </button>
                  <button 
                    onClick={() => handleShare('GDP Growth')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Population by State Chart */}
        {populationData && (selectedDataSource === 'all' || selectedDataSource === 'census') && 
         (selectedChartType === 'all' || selectedChartType === 'doughnut') && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <Chart
                type="doughnut"
                title="🗺️ Top 10 States by Population"
                data={formatDoughnutChartData(populationData.data.slice(0, 10))}
                options={{
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }}
              />
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600 font-medium">Source: U.S. Census Bureau</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExport('Population by State')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    📤 Export
                  </button>
                  <button 
                    onClick={() => handleShare('Population by State')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interest Rates Chart */}
        {interestRatesData && (selectedDataSource === 'all' || selectedDataSource === 'fred') && 
         (selectedChartType === 'all' || selectedChartType === 'line') && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <Chart
                type="line"
                title="💹 Federal Fund Interest Rates"
                data={formatLineChartData(interestRatesData.data, 'Interest Rate (%)', '#8B5CF6')}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'Interest Rate (%)'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Month (2023)'
                      }
                    }
                  }
                }}
              />
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600 font-medium">Source: Federal Reserve Economic Data</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExport('Interest Rates')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    📤 Export
                  </button>
                  <button 
                    onClick={() => handleShare('Interest Rates')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consumer Price Index Chart */}
        {cpiData && (selectedDataSource === 'all' || selectedDataSource === 'bls') && 
         (selectedChartType === 'all' || selectedChartType === 'bar') && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <Chart
                type="bar"
                title="💲 Consumer Price Index (CPI)"
                data={formatBarChartData(cpiData.data, 'CPI Value', '#F59E0B')}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'CPI Value'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Month (2023)'
                      }
                    }
                  }
                }}
              />
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600 font-medium">Source: Bureau of Labor Statistics</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExport('Consumer Price Index')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    📤 Export
                  </button>
                  <button 
                    onClick={() => handleShare('Consumer Price Index')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Population Bar Chart Alternative */}
        {populationData && (selectedDataSource === 'all' || selectedDataSource === 'census') && 
         (selectedChartType === 'all' || selectedChartType === 'bar') && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <Chart
                type="bar"
                title="🏙️ Population by State (Top 10)"
                data={formatBarChartData(populationData.data.slice(0, 10), 'Population', '#06B6D4')}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'Population'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'State'
                      }
                    }
                  }
                }}
              />
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600 font-medium">Source: U.S. Census Bureau</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExport('Population by State (Bar)')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    📤 Export
                  </button>
                  <button 
                    onClick={() => handleShare('Population by State (Bar)')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Statistics */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Chart Statistics</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-600">Active Charts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Data Sources</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">48</div>
            <div className="text-sm text-gray-600">Data Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">Live</div>
            <div className="text-sm text-gray-600">Data Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage; 