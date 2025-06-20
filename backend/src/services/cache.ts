import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/logger';

const CACHE_FILE = './data/cache.json';

export class CacheService {
  private cache: Record<string, { value: any; expires: number }> = {};

  async get<T>(key: string): Promise<T | null> {
    try {
      this.loadCache();
      const item = this.cache[key];
      
      if (!item) return null;
      
      if (item.expires < Date.now()) {
        delete this.cache[key];
        this.saveCache();
        return null;
      }
      
      return item.value as T;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<boolean> {
    try {
      this.loadCache();
      this.cache[key] = {
        value,
        expires: Date.now() + (ttlSeconds * 1000)
      };
      this.saveCache();
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      this.loadCache();
      delete this.cache[key];
      this.saveCache();
      return true;
    } catch (error) {
      logger.error('Cache delete error:', error);
      return false;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      this.loadCache();
      const item = this.cache[key];
      return item ? item.expires > Date.now() : false;
    } catch (error) {
      logger.error('Cache exists error:', error);
      return false;
    }
  }

  private loadCache() {
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const data = fs.readFileSync(CACHE_FILE, 'utf8');
        this.cache = JSON.parse(data);
      }
    } catch (error) {
      this.cache = {};
    }
  }

  private saveCache() {
    try {
      fs.writeFileSync(CACHE_FILE, JSON.stringify(this.cache, null, 2));
    } catch (error) {
      logger.error('Cache save error:', error);
    }
  }
}

export const cacheService = new CacheService();

// Mock redisClient for compatibility
export const redisClient = {
  connect: async () => {},
  disconnect: async () => {}
};

export async function setupCache(): Promise<void> {
  try {
    logger.info('File-based cache initialized successfully');
  } catch (error) {
    logger.error('Cache setup failed:', error);
  }
} 