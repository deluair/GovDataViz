import { Router } from 'express';
import { ChartService } from '../services/chart';

const router = Router();
const chartService = new ChartService();

// Generate chart configuration
router.post('/config', async (req, res) => {
  try {
    const { type, data, options } = req.body;

    if (!type || !data) {
      return res.status(400).json({
        success: false,
        error: 'Chart type and data are required',
        timestamp: new Date().toISOString()
      });
    }

    const config = await chartService.generateConfig(type, data, options);

    res.json({
      success: true,
      data: config,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate chart config',
      timestamp: new Date().toISOString()
    });
  }
});

// Export chart as image
router.post('/export', async (req, res) => {
  try {
    const { config, format = 'png', width = 800, height = 600 } = req.body;

    if (!config) {
      return res.status(400).json({
        success: false,
        error: 'Chart configuration is required',
        timestamp: new Date().toISOString()
      });
    }

    const buffer = await chartService.exportChart(config, {
      format: format as 'png' | 'jpg' | 'svg',
      width: parseInt(width),
      height: parseInt(height)
    });

    res.setHeader('Content-Type', `image/${format}`);
    res.setHeader('Content-Disposition', `attachment; filename="chart.${format}"`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to export chart',
      timestamp: new Date().toISOString()
    });
  }
});

export { router as chartRoutes }; 