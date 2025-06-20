import React from 'react';

const DataSourcesPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Sources</h1>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Bureau of Labor Statistics (BLS)</h2>
          <p className="text-gray-600 mb-4">
            Access employment, unemployment, wages, and price data from the Bureau of Labor Statistics.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Available Data:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Employment and Unemployment</li>
                <li>• Consumer Price Index (CPI)</li>
                <li>• Producer Price Index (PPI)</li>
                <li>• Average Hourly Earnings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">API Status:</h4>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Connected
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Federal Reserve Economic Data (FRED)</h2>
          <p className="text-gray-600 mb-4">
            Economic indicators and financial market data from the Federal Reserve Bank of St. Louis.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Available Data:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GDP and Economic Growth</li>
                <li>• Interest Rates</li>
                <li>• Money Supply</li>
                <li>• Housing Market Data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">API Status:</h4>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Connected
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">U.S. Census Bureau</h2>
          <p className="text-gray-600 mb-4">
            Population demographics, housing statistics, and economic census data.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Available Data:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Population Demographics</li>
                <li>• American Community Survey</li>
                <li>• Housing Statistics</li>
                <li>• Economic Census</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">API Status:</h4>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourcesPage; 