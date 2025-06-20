import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Government Data Visualization</h3>
            <p className="text-gray-300">
              Making government data accessible and understandable through modern visualization tools.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Data Sources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://www.bls.gov/developers/" className="hover:text-white">BLS API</a></li>
              <li><a href="https://fred.stlouisfed.org/docs/api/" className="hover:text-white">FRED API</a></li>
              <li><a href="https://www.census.gov/data/developers/" className="hover:text-white">Census API</a></li>
              <li><a href="https://fiscaldata.treasury.gov/" className="hover:text-white">Treasury API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">API Reference</a></li>
              <li><a href="#" className="hover:text-white">Examples</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Government Data Visualization Platform. Built for transparency and public access.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 