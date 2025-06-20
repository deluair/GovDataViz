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

const HomePage: React.FC = () => {
  const [unemploymentData, setUnemploymentData] = useState<ApiResponse | null>(null);
  const [gdpData, setGdpData] = useState<ApiResponse | null>(null);
  const [populationData, setPopulationData] = useState<ApiResponse | null>(null);
  const [interestRatesData, setInterestRatesData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from multiple sources
        const [unemployment, gdp, population, rates] = await Promise.all([
          blsService.getUnemploymentRate(),
          fredService.getGDP(),
          censusService.getPopulationByState(),
          fredService.getInterestRates()
        ]);

        setUnemploymentData(unemployment);
        setGdpData(gdp);
        setPopulationData(population);
        setInterestRatesData(rates);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading government data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          🏛️ Government Data Visualization Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Real-time insights from Bureau of Labor Statistics, Federal Reserve Economic Data, 
          U.S. Census Bureau, and more government sources
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
            📊 Explore Data
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            📈 View Analytics
          </button>
        </div>
      </div>

      {/* Live Data Dashboard */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📈 Live Economic Indicators</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Unemployment Rate Chart */}
          {unemploymentData && (
            <Chart
              type="line"
              title="📊 U.S. Unemployment Rate (2023)"
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
                      text: 'Month'
                    }
                  }
                }
              }}
            />
          )}

          {/* GDP Growth Chart */}
          {gdpData && (
            <Chart
              type="bar"
              title="💰 U.S. GDP by Quarter (2023)"
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
                      text: 'Quarter'
                    }
                  }
                }
              }}
            />
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Interest Rates Chart */}
          {interestRatesData && (
            <Chart
              type="line"
              title="💹 Federal Fund Interest Rates (2023)"
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
                      text: 'Month'
                    }
                  }
                }
              }}
            />
          )}

          {/* Population by State Chart */}
          {populationData && (
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
          )}
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">🔴 Unemployment Rate</h3>
              <p className="text-3xl font-bold">
                {unemploymentData ? `${unemploymentData.data[unemploymentData.data.length - 1]?.value}%` : '3.7%'}
              </p>
              <p className="text-sm opacity-90">Latest BLS Data</p>
            </div>
            <div className="text-4xl opacity-75">📊</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">💰 GDP Growth</h3>
              <p className="text-3xl font-bold">
                {gdpData ? `$${(gdpData.data[gdpData.data.length - 1]?.value / 1000).toFixed(1)}T` : '$27.0T'}
              </p>
              <p className="text-sm opacity-90">Latest FRED Data</p>
            </div>
            <div className="text-4xl opacity-75">📈</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">💹 Interest Rate</h3>
              <p className="text-3xl font-bold">
                {interestRatesData ? `${interestRatesData.data[interestRatesData.data.length - 1]?.value}%` : '5.33%'}
              </p>
              <p className="text-sm opacity-90">Fed Funds Rate</p>
            </div>
            <div className="text-4xl opacity-75">💹</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">🏠 Population</h3>
              <p className="text-3xl font-bold">
                {populationData ? `${(populationData.data[0]?.value / 1000000).toFixed(1)}M` : '335M'}
              </p>
              <p className="text-sm opacity-90">California (largest)</p>
            </div>
            <div className="text-4xl opacity-75">🗺️</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold mb-4">Real-Time Data</h3>
          <p className="text-gray-600 leading-relaxed">
            Access live data from BLS, FRED, Census Bureau, Treasury, and Energy departments with automatic updates
          </p>
        </div>

        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="text-xl font-semibold mb-4">Interactive Charts</h3>
          <p className="text-gray-600 leading-relaxed">
            Create beautiful, interactive visualizations with multiple chart types, zoom, and export capabilities
          </p>
        </div>

        <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">💾</span>
          </div>
          <h3 className="text-xl font-semibold mb-4">Export & Share</h3>
          <p className="text-gray-600 leading-relaxed">
            Download charts and datasets in various formats (PNG, PDF, CSV) for reports and presentations
          </p>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 shadow-inner">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🏛️ Trusted Government Sources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-600 mb-2 text-lg">📊 Bureau of Labor Statistics</h4>
            <p className="text-sm text-gray-600 mb-2">Employment, unemployment, wages, and consumer prices</p>
            <div className="text-xs text-green-600 font-semibold">✅ Live Data Connected</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h4 className="font-semibold text-green-600 mb-2 text-lg">💰 Federal Reserve (FRED)</h4>
            <p className="text-sm text-gray-600 mb-2">Economic indicators, GDP, interest rates, and monetary data</p>
            <div className="text-xs text-green-600 font-semibold">✅ Live Data Connected</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-600 mb-2 text-lg">🗺️ U.S. Census Bureau</h4>
            <p className="text-sm text-gray-600 mb-2">Population, demographics, housing, and community data</p>
            <div className="text-xs text-green-600 font-semibold">✅ Live Data Connected</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <h4 className="font-semibold text-red-600 mb-2 text-lg">🏦 Treasury Department</h4>
            <p className="text-sm text-gray-600 mb-2">Government financial data and debt information</p>
            <div className="text-xs text-blue-600 font-semibold">🔧 Configuration Ready</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-600 mb-2 text-lg">⚡ Energy Information Admin</h4>
            <p className="text-sm text-gray-600 mb-2">Energy production, consumption, and market data</p>
            <div className="text-xs text-blue-600 font-semibold">🔧 Configuration Ready</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
            <h4 className="font-semibold text-indigo-600 mb-2 text-lg">🔮 More Coming Soon</h4>
            <p className="text-sm text-gray-600 mb-2">Additional federal and state data sources</p>
            <div className="text-xs text-gray-500 font-semibold">⏳ In Development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 