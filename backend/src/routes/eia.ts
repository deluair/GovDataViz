import { Router } from 'express';
import { EiaService } from '../services/eia';

const router = Router();
const eiaService = new EiaService();

// Get electricity generation data
router.get('/electricity', async (req, res) => {
  try {
    const data = await eiaService.getElectricityGeneration({
      frequency: 'monthly',
      start: '2023-01',
      end: '2024-12'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.period,
        value: point.value
      })),
      metadata: {
        name: data.name,
        units: data.units,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch electricity data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get renewable energy data
router.get('/renewable', async (req, res) => {
  try {
    const data = await eiaService.getRenewableEnergy({
      frequency: 'monthly',
      start: '2023-01',
      end: '2024-12'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.period,
        value: point.value
      })),
      metadata: {
        name: data.name,
        units: data.units,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch renewable energy data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get natural gas prices
router.get('/gas-prices', async (req, res) => {
  try {
    const data = await eiaService.getNaturalGasPrices({
      frequency: 'monthly',
      start: '2023-01',
      end: '2024-12'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.period,
        value: point.value
      })),
      metadata: {
        name: data.name,
        units: data.units,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch natural gas price data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get solar energy generation data
router.get('/solar', async (req, res) => {
  try {
    const data = await eiaService.getSolarGeneration({
      frequency: 'monthly',
      start: '2023-01',
      end: '2024-12'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.period,
        value: point.value
      })),
      metadata: {
        name: data.name,
        units: data.units,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch solar generation data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get wind energy generation data
router.get('/wind', async (req, res) => {
  try {
    const data = await eiaService.getWindGeneration({
      frequency: 'monthly',
      start: '2023-01',
      end: '2024-12'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.period,
        value: point.value
      })),
      metadata: {
        name: data.name,
        units: data.units,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch wind generation data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get coal energy generation data
router.get('/coal', async (req, res) => {
  try {
    const data = await eiaService.getCoalGeneration({
      frequency: 'monthly',
      start: '2023-01',
      end: '2024-12'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.period,
        value: point.value
      })),
      metadata: {
        name: data.name,
        units: data.units,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch coal generation data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get nuclear energy generation data
router.get('/nuclear', async (req, res) => {
  try {
    const data = await eiaService.getNuclearGeneration({
      frequency: 'monthly',
      start: '2023-01',
      end: '2024-12'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.period,
        value: point.value
      })),
      metadata: {
        name: data.name,
        units: data.units,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch nuclear generation data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get petroleum prices data
router.get('/petroleum', async (req, res) => {
  try {
    const data = await eiaService.getPetroleumPrices({
      frequency: 'monthly',
      start: '2023-01',
      end: '2024-12'
    });

    res.json({
      success: true,
      data: data.data.map((point: any) => ({
        date: point.period,
        value: point.value
      })),
      metadata: {
        name: data.name,
        units: data.units,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch petroleum prices data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get generic EIA data
router.get('/data/:dataType', async (req, res) => {
  try {
    const { dataType } = req.params;
    const { frequency = 'monthly', start = '2023-01', end = '2024-12' } = req.query;

    let data;
    switch (dataType) {
      case 'electricity':
        data = await eiaService.getElectricityGeneration({
          frequency: frequency as string,
          start: start as string,
          end: end as string
        });
        break;
      case 'renewable':
        data = await eiaService.getRenewableEnergy({
          frequency: frequency as string,
          start: start as string,
          end: end as string
        });
        break;
      case 'gas-prices':
        data = await eiaService.getNaturalGasPrices({
          frequency: frequency as string,
          start: start as string,
          end: end as string
        });
        break;
      case 'solar':
        data = await eiaService.getSolarGeneration({
          frequency: frequency as string,
          start: start as string,
          end: end as string
        });
        break;
      case 'wind':
        data = await eiaService.getWindGeneration({
          frequency: frequency as string,
          start: start as string,
          end: end as string
        });
        break;
      case 'coal':
        data = await eiaService.getCoalGeneration({
          frequency: frequency as string,
          start: start as string,
          end: end as string
        });
        break;
      case 'nuclear':
        data = await eiaService.getNuclearGeneration({
          frequency: frequency as string,
          start: start as string,
          end: end as string
        });
        break;
      case 'petroleum':
        data = await eiaService.getPetroleumPrices({
          frequency: frequency as string,
          start: start as string,
          end: end as string
        });
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid data type. Available: electricity, renewable, gas-prices, solar, wind, coal, nuclear, petroleum',
          timestamp: new Date().toISOString()
        });
    }

    res.json({
      success: true,
      data: data.data,
      metadata: {
        series_id: data.series_id,
        name: data.name,
        units: data.units,
        frequency: data.frequency,
        description: data.description,
        source: data.source
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch EIA data',
      timestamp: new Date().toISOString()
    });
  }
});

export { router as eiaRoutes }; 