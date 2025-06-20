import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">BLS Data</h3>
          <p className="text-3xl font-bold text-gray-900">5.2%</p>
          <p className="text-sm text-gray-600">Current Unemployment Rate</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-600 mb-2">FRED Data</h3>
          <p className="text-3xl font-bold text-gray-900">5.25%</p>
          <p className="text-sm text-gray-600">Federal Funds Rate</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">Census Data</h3>
          <p className="text-3xl font-bold text-gray-900">335M</p>
          <p className="text-sm text-gray-600">US Population Estimate</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-900">BLS Employment Data Updated</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-900">FRED GDP Data Retrieved</span>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-900">Census Population Data Cached</span>
            <span className="text-sm text-gray-500">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 