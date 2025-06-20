import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import { 
  blsService, 
  fredService, 
  censusService, 
  eiaService, 
  noaaService, 
  formatLineChartData, 
  formatBarChartData, 
  formatDoughnutChartData 
} from '../services/dataService';

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
  const [electricityData, setElectricityData] = useState<ApiResponse | null>(null);
  const [renewableData, setRenewableData] = useState<ApiResponse | null>(null);
  const [temperatureData, setTemperatureData] = useState<ApiResponse | null>(null);
  const [windData, setWindData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from multiple sources including new EIA and NOAA endpoints
        const [
          unemployment, 
          gdp, 
          population, 
          rates, 
          electricity, 
          renewable, 
          temperature, 
          wind
        ] = await Promise.all([
          blsService.getUnemploymentRate(),
          fredService.getGDP(),
          censusService.getPopulationByState(),
          fredService.getInterestRates(),
          eiaService.getElectricityGeneration(),
          eiaService.getRenewableEnergy(),
          noaaService.getTemperature(),
          noaaService.getWind()
        ]);

        setUnemploymentData(unemployment);
        setGdpData(gdp);
        setPopulationData(population);
        setInterestRatesData(rates);
        setElectricityData(electricity);
        setRenewableData(renewable);
        setTemperatureData(temperature);
        setWindData(wind);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading government data...</p>
          <p className="text-sm text-gray-500">Fetching data from BLS, FRED, Census, EIA, and NOAA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🏛️ Government Data Visualization Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Real-time insights from Bureau of Labor Statistics, Federal Reserve Economic Data, 
            U.S. Census Bureau, Energy Information Administration, and National Oceanic and Atmospheric Administration
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
              📊 Explore 20+ Charts
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              📈 View Analytics
            </button>
          </div>
        </div>

        {/* Data Source Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            📊 BLS - Labor Statistics
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            💰 FRED - Economic Data
          </span>
          <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            🗺️ Census - Demographics
          </span>
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            ⚡ EIA - Energy Data
          </span>
          <span className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
            🌡️ NOAA - Climate Data
          </span>
        </div>

        {/* Live Data Dashboard */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📈 Live Government Data Dashboard</h2>
          
          {/* Economic Indicators Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Unemployment Rate Chart */}
            {unemploymentData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Chart
                  type="line"
                  title="📊 U.S. Unemployment Rate"
                  data={formatLineChartData(unemploymentData.data, 'Unemployment Rate (%)', '#EF4444')}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
                <p className="text-xs text-gray-500 mt-2 text-center">Source: Bureau of Labor Statistics</p>
              </div>
            )}

            {/* GDP Growth Chart */}
            {gdpData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Chart
                  type="bar"
                  title="💰 U.S. GDP by Quarter"
                  data={formatBarChartData(gdpData.data, 'GDP (Billions USD)', '#10B981')}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
                <p className="text-xs text-gray-500 mt-2 text-center">Source: Federal Reserve Economic Data</p>
              </div>
            )}
          </div>

          {/* Energy Data Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Electricity Generation Chart */}
            {electricityData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Chart
                  type="line"
                  title="⚡ Total Electricity Generation"
                  data={formatLineChartData(electricityData.data, 'Generation (MWh)', '#3B82F6')}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Thousand Megawatthours'
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
                <p className="text-xs text-gray-500 mt-2 text-center">Source: Energy Information Administration</p>
              </div>
            )}

            {/* Renewable Energy Chart */}
            {renewableData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Chart
                  type="bar"
                  title="🌿 Renewable Energy Generation"
                  data={formatBarChartData(renewableData.data, 'Generation (MWh)', '#10B981')}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Thousand Megawatthours'
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
                <p className="text-xs text-gray-500 mt-2 text-center">Source: Energy Information Administration</p>
              </div>
            )}
          </div>

          {/* Climate & Financial Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Temperature Chart */}
            {temperatureData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Chart
                  type="line"
                  title="🌡️ Average U.S. Temperature"
                  data={formatLineChartData(temperatureData.data, 'Temperature (°F)', '#DC2626')}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                    scales: {
                      y: {
                        title: {
                          display: true,
                          text: 'Degrees Fahrenheit'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Date'
                        }
                      }
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">Source: National Oceanic and Atmospheric Administration</p>
              </div>
            )}

            {/* Interest Rates Chart */}
            {interestRatesData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Chart
                  type="line"
                  title="💹 Federal Fund Interest Rates"
                  data={formatLineChartData(interestRatesData.data, 'Interest Rate (%)', '#8B5CF6')}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
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
                <p className="text-xs text-gray-500 mt-2 text-center">Source: Federal Reserve Economic Data</p>
              </div>
            )}
          </div>

          {/* Demographics & Climate Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Population by State Chart */}
            {populationData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Chart
                  type="doughnut"
                  title="🗺️ Top 10 States by Population"
                  data={formatDoughnutChartData(populationData.data.slice(0, 10))}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">Source: U.S. Census Bureau</p>
              </div>
            )}

            {/* Wind Speed Chart */}
            {windData && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Chart
                  type="line"
                  title="💨 Average Wind Speed"
                  data={formatLineChartData(windData.data, 'Wind Speed (mph)', '#059669')}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Miles per Hour'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Date'
                        }
                      }
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">Source: National Oceanic and Atmospheric Administration</p>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-sm text-gray-600 font-medium">Government</div>
            <div className="text-sm text-gray-600">Data Sources</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">20+</div>
            <div className="text-sm text-gray-600 font-medium">Interactive</div>
            <div className="text-sm text-gray-600">Charts</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-sm text-gray-600 font-medium">Real-time</div>
            <div className="text-sm text-gray-600">Dashboards</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">Live</div>
            <div className="text-sm text-gray-600 font-medium">Data</div>
            <div className="text-sm text-gray-600">Updates</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600 font-medium">API</div>
            <div className="text-sm text-gray-600">Access</div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🚀 Platform Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-lg font-semibold mb-2">Multi-Source Data</h4>
              <p className="text-gray-600 text-sm">
                Integrates data from BLS, FRED, Census, EIA, and NOAA for comprehensive insights
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-lg font-semibold mb-2">Real-time Updates</h4>
              <p className="text-gray-600 text-sm">
                Live data feeds with intelligent caching and graceful fallback systems
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="text-lg font-semibold mb-2">Interactive Charts</h4>
              <p className="text-gray-600 text-sm">
                Professional visualizations with filtering, export, and customization options
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore Government Data?</h3>
          <p className="text-gray-600 mb-6">
            Discover insights from economic indicators, energy production, climate data, and demographic trends
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              🚀 View All Charts
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              📖 API Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 