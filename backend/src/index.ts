import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { createServer } from 'http';

// Import routes
import { dataRoutes } from './routes/data';
import { blsRoutes } from './routes/bls';
import { fredRoutes } from './routes/fred';
import { censusRoutes } from './routes/census';
import { chartRoutes } from './routes/charts';
import { eiaRoutes } from './routes/eia';
import { noaaRoutes } from './routes/noaa';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { rateLimiterMiddleware } from './middleware/rateLimiter';
import { logger } from './utils/logger';
import { setupDatabase } from './database/setup';
import { setupCache } from './services/cache';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', rateLimiterMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'gov-data-viz-backend'
  });
});

// API Routes
app.use('/api/data', dataRoutes);
app.use('/api/bls', blsRoutes);
app.use('/api/fred', fredRoutes);
app.use('/api/census', censusRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/eia', eiaRoutes);
app.use('/api/noaa', noaaRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Government Data Visualization API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      data: '/api/data',
      bls: '/api/bls',
      fred: '/api/fred',
      census: '/api/census',
      charts: '/api/charts',
      eia: '/api/eia',
      noaa: '/api/noaa'
    }
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Create HTTP server
const server = createServer(app);

// Initialize services and start server
async function startServer() {
  try {
    // Setup database
    await setupDatabase();
    logger.info('Database initialized');

    // Setup cache
    await setupCache();
    logger.info('Cache initialized');

    // Start server
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`🏥 Health check: http://localhost:${PORT}/health`);
      logger.info(`📊 API docs: http://localhost:${PORT}/`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

startServer(); 