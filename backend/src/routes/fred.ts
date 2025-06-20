import { Router } from 'express';
import { FredService } from '../services/fred';

const router = Router();
const fredService = new FredService();

// Get FRED series data
router.get('/series/:seriesId', async (req, res) => {
  try {
    const { seriesId } = req.params;
    const { 
      observation_start, 
      observation_end, 
      frequency,
      units 
    } = req.query;

    const data = await fredService.getSeriesObservations(seriesId, {
      observation_start: observation_start as string,
      observation_end: observation_end as string,
      frequency: frequency as string,
      units: units as string
    });

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch FRED data',
      timestamp: new Date().toISOString()
    });
  }
});

// Search FRED series
router.get('/search', async (req, res) => {
  try {
    const { search_text, limit = 20, offset = 0 } = req.query;

    if (!search_text || typeof search_text !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'search_text parameter is required',
        timestamp: new Date().toISOString()
      });
    }

    const data = await fredService.searchSeries({
      search_text,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    });

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search FRED data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get GDP data
router.get('/gdp', async (req, res) => {
  try {
    const data = await fredService.getSeriesObservations('GDP', {
      observation_start: '2023-01-01',
      observation_end: '2024-12-31'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.date,
        value: point.value
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch GDP data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get interest rates data
router.get('/rates', async (req, res) => {
  try {
    const data = await fredService.getSeriesObservations('FEDFUNDS', {
      observation_start: '2023-01-01',
      observation_end: '2024-12-31'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.date.slice(0, 7), // Format to YYYY-MM
        value: point.value
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch interest rates data',
      timestamp: new Date().toISOString()
    });
  }
});

export { router as fredRoutes }; 