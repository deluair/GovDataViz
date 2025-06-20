import { Router } from 'express';
import { NoaaService } from '../services/noaa';

const router = Router();
const noaaService = new NoaaService();

// Get temperature data
router.get('/temperature', async (req, res) => {
  try {
    const data = await noaaService.getTemperatureData({
      startdate: '2023-01-01',
      enddate: '2024-12-31',
      locationid: 'FIPS:US'
    });

    // Group by date and calculate averages
    const groupedData = data.results.reduce((acc: any, item) => {
      const date = item.date.slice(0, 7); // YYYY-MM format
      if (!acc[date]) {
        acc[date] = { total: 0, count: 0, date };
      }
      acc[date].total += item.value;
      acc[date].count += 1;
      return acc;
    }, {});

    const avgData = Object.values(groupedData).map((item: any) => ({
      date: item.date,
      value: Math.round((item.total / item.count) * 10) / 10 // Round to 1 decimal
    }));

    res.json({
      success: true,
      data: avgData.slice(0, 12), // Last 12 months
      metadata: {
        name: 'Average Temperature',
        units: 'degrees Fahrenheit',
        description: 'Monthly average temperatures across the United States',
        source: 'noaa'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch temperature data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get precipitation data
router.get('/precipitation', async (req, res) => {
  try {
    const data = await noaaService.getPrecipitationData({
      startdate: '2023-01-01',
      enddate: '2024-12-31',
      locationid: 'FIPS:US'
    });

    // Group by month and calculate totals
    const groupedData = data.results.reduce((acc: any, item) => {
      const date = item.date.slice(0, 7); // YYYY-MM format
      if (!acc[date]) {
        acc[date] = { total: 0, count: 0, date };
      }
      acc[date].total += item.value;
      acc[date].count += 1;
      return acc;
    }, {});

    const precipData = Object.values(groupedData).map((item: any) => ({
      date: item.date,
      value: Math.round((item.total / item.count) * 100) / 100 // Round to 2 decimals
    }));

    res.json({
      success: true,
      data: precipData.slice(0, 12), // Last 12 months
      metadata: {
        name: 'Precipitation',
        units: 'inches',
        description: 'Monthly precipitation totals across the United States',
        source: 'noaa'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch precipitation data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get climate extremes
router.get('/extremes', async (req, res) => {
  try {
    const data = await noaaService.getClimateExtremes({
      startdate: '2023-01-01',
      enddate: '2024-12-31',
      locationid: 'FIPS:US'
    });

    // Process extreme data
    const extremesByType = data.results.reduce((acc: any, item) => {
      if (!acc[item.datatype]) {
        acc[item.datatype] = [];
      }
      acc[item.datatype].push({
        date: item.date,
        value: item.value
      });
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        maxTemp: extremesByType.TMAX?.slice(0, 10) || [],
        minTemp: extremesByType.TMIN?.slice(0, 10) || [],
        precipitation: extremesByType.PRCP?.slice(0, 10) || []
      },
      metadata: {
        name: 'Climate Extremes',
        units: 'various',
        description: 'Recent climate extreme events in the United States',
        source: 'noaa'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch climate extreme data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get available datasets
router.get('/datasets', async (req, res) => {
  try {
    const datasets = await noaaService.getDatasets();

    res.json({
      success: true,
      data: datasets.slice(0, 20), // Top 20 datasets
      metadata: {
        name: 'NOAA Datasets',
        description: 'Available climate and weather datasets from NOAA',
        source: 'noaa',
        total: datasets.length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch NOAA datasets',
      timestamp: new Date().toISOString()
    });
  }
});

// Get generic NOAA data
router.get('/data/:dataType', async (req, res) => {
  try {
    const { dataType } = req.params;
    const { 
      startdate = '2023-01-01', 
      enddate = '2024-12-31', 
      locationid = 'FIPS:US' 
    } = req.query;

    let data;
    switch (dataType) {
      case 'temperature':
        data = await noaaService.getTemperatureData({
          startdate: startdate as string,
          enddate: enddate as string,
          locationid: locationid as string
        });
        break;
      case 'precipitation':
        data = await noaaService.getPrecipitationData({
          startdate: startdate as string,
          enddate: enddate as string,
          locationid: locationid as string
        });
        break;
      case 'extremes':
        data = await noaaService.getClimateExtremes({
          startdate: startdate as string,
          enddate: enddate as string,
          locationid: locationid as string
        });
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid data type. Available: temperature, precipitation, extremes',
          timestamp: new Date().toISOString()
        });
    }

    res.json({
      success: true,
      data: data.results,
      metadata: data.metadata,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch NOAA data',
      timestamp: new Date().toISOString()
    });
  }
});

export { router as noaaRoutes }; 