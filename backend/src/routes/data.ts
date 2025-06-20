import { Router } from 'express';
import { ApiResponse } from '@gov-viz/shared';

const router = Router();

// Get available data sources
router.get('/sources', async (req, res) => {
  try {
    const sources = [
      {
        id: 'bls',
        name: 'Bureau of Labor Statistics',
        description: 'Employment, unemployment, wages, and price data',
        available: true
      },
      {
        id: 'fred',
        name: 'Federal Reserve Economic Data',
        description: 'Economic indicators and financial data',
        available: true
      },
      {
        id: 'census',
        name: 'U.S. Census Bureau',
        description: 'Population, demographics, and economic census data',
        available: true
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: sources,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data sources',
      timestamp: new Date().toISOString()
    });
  }
});

// Search across all data sources
router.get('/search', async (req, res) => {
  try {
    const { query, source, limit = 20 } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
        timestamp: new Date().toISOString()
      });
    }

    // TODO: Implement search across data sources
    const results: any[] = [];

    const response: ApiResponse = {
      success: true,
      data: {
        query,
        source,
        results,
        total: results.length,
        limit: parseInt(limit as string)
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Search failed',
      timestamp: new Date().toISOString()
    });
  }
});

export { router as dataRoutes }; 