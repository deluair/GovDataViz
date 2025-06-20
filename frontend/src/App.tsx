import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DataSourcesPage from './pages/DataSourcesPage';
import ChartsPage from './pages/ChartsPage';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import styles
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/data-sources" element={<DataSourcesPage />} />
            <Route path="/charts" element={<ChartsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 