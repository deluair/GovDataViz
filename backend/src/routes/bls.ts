import { Router } from 'express';
import { BlsService } from '../services/bls';

const router = Router();
const blsService = new BlsService();

// Get BLS series data
router.get('/series/:seriesId', async (req, res) => {
  try {
    const { seriesId } = req.params;
    const { startYear, endYear, calculations } = req.query;

    const data = await blsService.getSeries(seriesId, {
      startYear: startYear as string,
      endYear: endYear as string,
      calculations: calculations === 'true'
    });

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch BLS data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get multiple BLS series
router.post('/series', async (req, res) => {
  try {
    const { seriesIds, startYear, endYear, calculations } = req.body;

    if (!Array.isArray(seriesIds)) {
      return res.status(400).json({
        success: false,
        error: 'seriesIds must be an array',
        timestamp: new Date().toISOString()
      });
    }

    const data = await blsService.getMultipleSeries(seriesIds, {
      startYear,
      endYear,
      calculations
    });

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch BLS data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get unemployment rate data
router.get('/unemployment', async (req, res) => {
  try {
    const data = await blsService.getSeries('LNS14000000', {
      startYear: '2023',
      endYear: '2024'
    });

    res.json({
      success: true,
      data: data.data.map(point => ({
        date: point.date.slice(0, 7), // Format to YYYY-MM
        value: point.value
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch unemployment data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get Consumer Price Index data
router.get('/cpi', async (req, res) => {
  try {
    const data = await blsService.getSeries('CUUR0000SA0', {
      startYear: '2023',
      endYear: '2024'
    });

    res.json({
      success: true,
      data: data.data.map(point => ({
        date: point.date.slice(0, 7), // Format to YYYY-MM
        value: point.value
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch CPI data',
      timestamp: new Date().toISOString()
    });
  }
});

export { router as blsRoutes }; 