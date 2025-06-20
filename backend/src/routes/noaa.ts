import { Router } from 'express';
import { NoaaService } from '../services/noaa';

const router = Router();
const noaaService = new NoaaService();

// Get temperature data
router.get('/temperature', async (req, res) => {
  try {
    const data = await noaaService.getTemperatureData({
      startdate: '2024-01-01',
      enddate: '2024-06-30',
      locationid: 'FIPS:US',
      limit: 100
    });

    res.json({
      success: true,
      data: data.results.map((point: any) => ({
        date: point.date,
        value: point.value,
        datatype: point.datatype
      })),
      metadata: {
        name: 'Average Temperature',
        units: 'degrees Fahrenheit',
        description: 'Average daily temperature across the United States',
        source: 'noaa',
        count: data.metadata.resultset.count
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
      startdate: '2024-01-01',
      enddate: '2024-06-30',
      locationid: 'FIPS:US',
      limit: 100
    });

    res.json({
      success: true,
      data: data.results.map((point: any) => ({
        date: point.date,
        value: point.value,
        datatype: point.datatype
      })),
      metadata: {
        name: 'Precipitation',
        units: 'inches',
        description: 'Daily precipitation totals across the United States',
        source: 'noaa',
        count: data.metadata.resultset.count
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

// Get climate extremes data
router.get('/extremes', async (req, res) => {
  try {
    const data = await noaaService.getClimateExtremes({
      startdate: '2024-01-01',
      enddate: '2024-06-30',
      locationid: 'FIPS:US',
      limit: 100
    });

    res.json({
      success: true,
      data: data.results.map((point: any) => ({
        date: point.date,
        value: point.value,
        datatype: point.datatype
      })),
      metadata: {
        name: 'Climate Extremes',
        units: 'degrees Fahrenheit',
        description: 'Maximum daily temperatures and extreme weather events',
        source: 'noaa',
        count: data.metadata.resultset.count
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch climate extremes data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get snowfall data
router.get('/snowfall', async (req, res) => {
  try {
    const data = await noaaService.getSnowfallData({
      startdate: '2024-01-01',
      enddate: '2024-06-30',
      locationid: 'FIPS:US',
      limit: 100
    });

    res.json({
      success: true,
      data: data.results.map((point: any) => ({
        date: point.date,
        value: point.value,
        datatype: point.datatype
      })),
      metadata: {
        name: 'Snowfall',
        units: 'inches',
        description: 'Daily snowfall totals across the United States',
        source: 'noaa',
        count: data.metadata.resultset.count
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch snowfall data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get wind data
router.get('/wind', async (req, res) => {
  try {
    const data = await noaaService.getWindData({
      startdate: '2024-01-01',
      enddate: '2024-06-30',
      locationid: 'FIPS:US',
      limit: 100
    });

    res.json({
      success: true,
      data: data.results.map((point: any) => ({
        date: point.date,
        value: point.value,
        datatype: point.datatype
      })),
      metadata: {
        name: 'Wind Speed',
        units: 'miles per hour',
        description: 'Average daily wind speed across the United States',
        source: 'noaa',
        count: data.metadata.resultset.count
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch wind data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get humidity data
router.get('/humidity', async (req, res) => {
  try {
    const data = await noaaService.getHumidityData({
      startdate: '2024-01-01',
      enddate: '2024-06-30',
      locationid: 'FIPS:US',
      limit: 100
    });

    res.json({
      success: true,
      data: data.results.map((point: any) => ({
        date: point.date,
        value: point.value,
        datatype: point.datatype
      })),
      metadata: {
        name: 'Relative Humidity',
        units: 'percent',
        description: 'Average daily relative humidity across the United States',
        source: 'noaa',
        count: data.metadata.resultset.count
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch humidity data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get sea level data
router.get('/sea-level', async (req, res) => {
  try {
    const data = await noaaService.getSeaLevelData({
      startdate: '2024-01-01',
      enddate: '2024-06-30',
      locationid: 'FIPS:US',
      limit: 100
    });

    res.json({
      success: true,
      data: data.results.map((point: any) => ({
        date: point.date,
        value: point.value,
        datatype: point.datatype
      })),
      metadata: {
        name: 'Sea Level Change',
        units: 'millimeters',
        description: 'Sea level rise measurements from U.S. tide gauge stations',
        source: 'noaa',
        count: data.metadata.resultset.count
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch sea level data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get ocean temperature data
router.get('/ocean-temperature', async (req, res) => {
  try {
    const data = await noaaService.getOceanTemperatureData({
      startdate: '2024-01-01',
      enddate: '2024-06-30',
      locationid: 'FIPS:US',
      limit: 100
    });

    res.json({
      success: true,
      data: data.results.map((point: any) => ({
        date: point.date,
        value: point.value,
        datatype: point.datatype
      })),
      metadata: {
        name: 'Ocean Temperature',
        units: 'degrees Fahrenheit',
        description: 'Ocean surface temperature measurements from U.S. coastal waters',
        source: 'noaa',
        count: data.metadata.resultset.count
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch ocean temperature data',
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