import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/logger';

const DATA_DIR = './data';

export function getDatabase() {
  // Simple file-based storage for development
  return {
    cache: {},
    datasets: {},
    queries: {}
  };
}

export async function setupDatabase(): Promise<void> {
  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Initialize JSON files for development storage
    const cacheFile = path.join(DATA_DIR, 'cache.json');
    const datasetsFile = path.join(DATA_DIR, 'datasets.json');
    const queriesFile = path.join(DATA_DIR, 'queries.json');
    
    if (!fs.existsSync(cacheFile)) {
      fs.writeFileSync(cacheFile, '{}');
    }
    
    if (!fs.existsSync(datasetsFile)) {
      fs.writeFileSync(datasetsFile, '{}');
    }
    
    if (!fs.existsSync(queriesFile)) {
      fs.writeFileSync(queriesFile, '{}');
    }
    
    logger.info('File-based storage initialized successfully');
  } catch (error) {
    logger.error('Database setup failed:', error);
    throw error;
  }
} 