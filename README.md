# Government Data Visualization Platform

A comprehensive, production-ready platform for visualizing and analyzing U.S. government data from multiple official sources including BLS (Bureau of Labor Statistics), FRED (Federal Reserve Economic Data), and U.S. Census Bureau.

## 🎯 Overview

This platform provides real-time access to critical economic and demographic data through interactive charts and dashboards. Built with modern web technologies and optimized for Windows development environments.

## ✨ Features

### 📊 Data Sources
- **Bureau of Labor Statistics (BLS)**: Unemployment rates, Consumer Price Index (CPI), employment data
- **Federal Reserve Economic Data (FRED)**: GDP, interest rates, economic indicators
- **U.S. Census Bureau**: Population demographics, housing data, economic census
- **Energy Information Administration (EIA)**: Electricity generation, renewable energy, natural gas prices
- **National Oceanic and Atmospheric Administration (NOAA)**: Temperature, precipitation, climate data

### 🚀 Core Capabilities
- **Real-time Data**: Live government API integration with authenticated access
- **Interactive Charts**: Line charts, bar charts, doughnut charts with Chart.js
- **Professional UI**: Modern React interface with Tailwind CSS
- **Data Caching**: File-based caching system for optimal performance
- **Error Handling**: Comprehensive error handling with graceful fallbacks
- **Rate Limiting**: Built-in API rate limiting and request optimization
- **Responsive Design**: Mobile-friendly interface with modern UX

### 🏗️ Architecture
- **Monorepo Structure**: Organized frontend, backend, and shared packages
- **TypeScript**: Full type safety across the entire stack
- **File-based Storage**: Windows-compatible storage solution (no database dependencies)
- **RESTful APIs**: Clean, documented API endpoints
- **Security**: Helmet.js security middleware, CORS protection
- **Logging**: Winston-based comprehensive logging system

## 🏭 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **Chart.js & react-chartjs-2** for data visualizations
- **Axios** for API communication
- **React Router** for navigation

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **File-based storage** (Windows optimized)
- **Winston** logging
- **Helmet.js** security
- **Compression** middleware

### Development Tools
- **Concurrently** for running multiple services
- **ESLint & Prettier** for code quality
- **Hot reloading** for fast development

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Government API keys (provided setup instructions below)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/deluair/GovDataViz.git
cd GovDataViz
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create a `.env` file in the root directory:
```env
# API Keys for Government Data Sources
FRED_API_KEY=your_fred_api_key_here
BLS_API_KEY=your_bls_api_key_here
CENSUS_API_KEY=your_census_api_key_here
EIA_API_KEY=your_eia_api_key_here
NOAA_API_TOKEN=your_noaa_api_token_here

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. **Start development servers**
```bash
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🔑 API Keys Setup

### FRED API Key
1. Visit [FRED Economic Data](https://fred.stlouisfed.org/)
2. Create a free account
3. Request an API key from your account dashboard
4. Add to `.env` file as `FRED_API_KEY`

### BLS API Key
1. Visit [Bureau of Labor Statistics](https://www.bls.gov/developers/)
2. Register for a free API key
3. Add to `.env` file as `BLS_API_KEY`

### Census API Key
1. Visit [U.S. Census Bureau](https://api.census.gov/data/key_signup.html)
2. Request a free API key
3. Add to `.env` file as `CENSUS_API_KEY`

## 📱 Application Structure

```
data_visualization_gov/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API service layer
│   │   └── main.tsx         # Application entry point
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Government API services
│   │   ├── middleware/      # Express middleware
│   │   └── utils/           # Utility functions
│   └── package.json
├── shared/                   # Shared TypeScript types
│   ├── src/
│   │   ├── types/           # Type definitions
│   │   └── constants/       # Shared constants
│   └── package.json
├── data/                     # File-based storage
│   ├── cache.json           # API response caching
│   ├── datasets.json        # Dataset metadata
│   └── queries.json         # Query history
└── package.json             # Root package configuration
```

## 🔌 API Endpoints

### BLS (Bureau of Labor Statistics)
- ✅ `/api/bls/unemployment` - Real unemployment data (series LNS14000000)
- ✅ `/api/bls/cpi` - Consumer Price Index data (series CUUR0000SA0)
- `GET /api/bls/series/:seriesId` - Generic BLS series data

### FRED (Federal Reserve Economic Data)
- ✅ `/api/fred/gdp` - Real GDP data from FRED
- ✅ `/api/fred/rates` - Federal funds interest rates (FEDFUNDS)
- `GET /api/fred/series/:seriesId` - Generic FRED series data

### Census Bureau
- ✅ `/api/census/population` - Real Census population data
- `GET /api/census/demographics` - Demographic data

### EIA (Energy Information Administration) 🔧 **Recently Fixed**
- ✅ `/api/eia/electricity` - Total electricity generation data
- ✅ `/api/eia/renewable` - Renewable energy generation (solar, wind, hydro, etc.)
- ✅ `/api/eia/gas-prices` - Natural gas prices

### NOAA (National Oceanic and Atmospheric Administration) 🔧 **Recently Fixed**
- ✅ `/api/noaa/temperature` - Average temperature data
- ✅ `/api/noaa/precipitation` - Monthly precipitation totals
- ✅ `/api/noaa/extremes` - Climate extremes (max/min temperatures)

### Utility Endpoints
- `GET /health` - Health check
- `GET /api/data` - Available data sources
- `GET /api/charts` - Chart configurations

## 🎨 Features in Detail

### Dashboard
- Real-time economic indicators
- Interactive charts with live data
- Key statistics cards
- Professional loading animations

### Charts Page
- Multiple chart types (line, bar, doughnut)
- Data filtering by source and type
- Export functionality (planned)
- Chart statistics and metadata

### Data Sources Page
- Complete list of available datasets
- API documentation
- Data source reliability indicators

## 🔧 Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 🌐 Windows Compatibility

This project is specifically optimized for Windows development:
- File-based storage instead of SQLite/Redis
- PowerShell-compatible scripts
- No native module dependencies
- Memory-based rate limiting

## 📊 Data Flow

1. **Frontend** makes requests to backend API endpoints
2. **Backend** authenticates with government APIs using stored keys
3. **Government APIs** return official data
4. **Caching layer** stores responses for performance
5. **Frontend** receives processed data for visualization

## 🚦 Performance

- **Caching**: 1-hour cache for government API responses
- **Rate Limiting**: Respects government API rate limits
- **Compression**: Gzip compression for all responses
- **Lazy Loading**: Components loaded on demand
- **Optimized Bundles**: Vite optimization for fast loading

## 🔒 Security

- **Helmet.js**: Security headers and protection
- **CORS**: Configured for cross-origin requests
- **Environment Variables**: Secure API key storage
- **Input Validation**: All inputs validated and sanitized
- **Error Handling**: No sensitive data in error responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Open an issue on GitHub
- Check the [documentation](docs/)
- Review API endpoints at http://localhost:3001

## 🚀 Deployment

### Production Environment Variables
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com
FRED_API_KEY=your_production_fred_key
BLS_API_KEY=your_production_bls_key
CENSUS_API_KEY=your_production_census_key
```

### Build Process
```bash
npm run build
npm start
```

## 📈 Roadmap

- [ ] Additional government data sources (Treasury, EIA)
- [ ] Real-time data streaming
- [ ] Advanced analytics and forecasting
- [ ] Data export functionality (CSV, PDF)
- [ ] Custom dashboard builder
- [ ] User authentication and saved dashboards
- [ ] Mobile application
- [ ] API rate limiting dashboard

## 🏷️ Version History

- **v1.1.0** - Enhanced with EIA and NOAA data sources (5 government APIs)
- **v1.0.0** - Initial release with BLS, FRED, and Census integration
- Real-time government data visualization
- Professional UI with interactive charts
- Windows-optimized development environment
- File-based storage and caching system

## API Endpoints Status ✅

All API endpoints are now fully operational and tested:

### BLS (Bureau of Labor Statistics)
- ✅ `/api/bls/unemployment` - Real unemployment data (series LNS14000000)
- ✅ `/api/bls/cpi` - Consumer Price Index data (series CUUR0000SA0)

### FRED (Federal Reserve Economic Data)
- ✅ `/api/fred/gdp` - Real GDP data from FRED
- ✅ `/api/fred/rates` - Federal funds interest rates (FEDFUNDS)

### U.S. Census Bureau
- ✅ `/api/census/population` - Real Census population data

### EIA (Energy Information Administration) 🔧 **Recently Enhanced**
- ✅ `/api/eia/electricity` - Total electricity generation data
- ✅ `/api/eia/renewable` - Renewable energy generation (solar, wind, hydro, etc.)
- ✅ `/api/eia/gas-prices` - Natural gas prices
- ✅ `/api/eia/solar` - **NEW** Solar photovoltaic and thermal energy generation
- ✅ `/api/eia/wind` - **NEW** Wind turbine energy generation
- ✅ `/api/eia/coal` - **NEW** Coal-fired power plant energy generation
- ✅ `/api/eia/nuclear` - **NEW** Nuclear power plant energy generation
- ✅ `/api/eia/petroleum` - **NEW** U.S. petroleum and crude oil prices

### NOAA (National Oceanic and Atmospheric Administration) 🔧 **Recently Enhanced**
- ✅ `/api/noaa/temperature` - Average daily temperature across the United States
- ✅ `/api/noaa/precipitation` - Daily precipitation totals across the United States
- ✅ `/api/noaa/extremes` - Maximum daily temperatures and extreme weather events
- ✅ `/api/noaa/snowfall` - **NEW** Daily snowfall totals across the United States
- ✅ `/api/noaa/wind` - **NEW** Average daily wind speed across the United States
- ✅ `/api/noaa/humidity` - **NEW** Average daily relative humidity across the United States
- ✅ `/api/noaa/sea-level` - **NEW** Sea level rise measurements from U.S. tide gauge stations
- ✅ `/api/noaa/ocean-temperature` - **NEW** Ocean surface temperature measurements from U.S. coastal waters

**Total Available Charts**: 20+ comprehensive data visualizations

## 🆕 Recent Updates (Version 1.2.0)

### Enhanced Chart Portfolio
- **5 New EIA Energy Charts**: Solar, Wind, Coal, Nuclear generation + Petroleum prices
- **5 New NOAA Climate Charts**: Snowfall, Wind speed, Humidity, Sea level, Ocean temperature
- **Comprehensive Energy Mix**: Complete breakdown of U.S. electricity generation by source
- **Advanced Climate Data**: Extended weather and environmental monitoring capabilities

### Improved Data Visualization
- **Dynamic Chart Loading**: Load charts on-demand for better performance
- **Advanced Filtering**: Filter by data source (EIA, NOAA, BLS, FRED, Census) and chart type
- **Enhanced Metadata**: Detailed descriptions, units, and data source information for each chart
- **Real-time Statistics**: Live chart statistics dashboard

### API Improvements
- **Expanded EIA Integration**: 8 total energy-related endpoints covering all major fuel types
- **Enhanced NOAA Coverage**: 8 climate and weather data endpoints for comprehensive environmental monitoring
- **Robust Error Handling**: Graceful fallbacks to mock data when APIs are unavailable
- **Optimized Caching**: 2-hour cache for all data endpoints to improve performance

### Frontend Enhancements
- **Responsive Grid Layout**: Adaptive chart display for all screen sizes
- **Interactive Controls**: Dynamic filtering and chart loading capabilities
- **Professional Styling**: Color-coded data sources and modern UI design
- **Performance Optimized**: Lazy loading and efficient data management

---

**Built with ❤️ for transparent government data access** 