import { Router } from 'express';
import { CensusService } from '../services/census';

const router = Router();
const censusService = new CensusService();

// Get Census data
router.get('/data', async (req, res) => {
  try {
    const { get, for: forParam, in: inParam, dataset = 'acs/acs5' } = req.query;

    if (!get || typeof get !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'get parameter is required',
        timestamp: new Date().toISOString()
      });
    }

    const data = await censusService.getData({
      dataset: dataset as string,
      get: get as string,
      for: forParam as string,
      in: inParam as string
    });

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Census data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get available Census variables
router.get('/variables/:dataset', async (req, res) => {
  try {
    const { dataset } = req.params;
    const { group } = req.query;

    const data = await censusService.getVariables(dataset, group as string);

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Census variables',
      timestamp: new Date().toISOString()
    });
  }
});

// Get population by state data
router.get('/population', async (req, res) => {
  try {
    const data = await censusService.getPopulationEstimates({
      for: 'state:*',
      get: 'NAME,POP',
      year: '2023'
    });

    res.json({
      success: true,
      data: data.data.slice(0, 10).map((item: any) => ({
        state: item.state || item.NAME,
        value: parseInt(item.value || item.POP)
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch population data',
      timestamp: new Date().toISOString()
    });
  }
});

export { router as censusRoutes }; 