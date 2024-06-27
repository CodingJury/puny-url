import { RedisClientType, createClient } from "redis";

interface StringKeyValueStore {
  [key: string]: string;
}

export class RedisManager {
  private static instance: RedisManager;
  private redisClient: RedisClientType;

  private constructor() {
    this.redisClient = createClient({
      url: process.env.REDIS_URL
    });
    this.redisClient.connect();
  }

  public static getInstance(): RedisManager {
    if(!RedisManager.instance) {
      RedisManager.instance = new RedisManager()
    }
    return RedisManager.instance;
  }

  public async addData(key: string, data: string) {
    try {
      return await this.redisClient.set(key, data, {
        EX: 86400 // 1 day
      });
    } catch(error) {
      console.log(error)
    }
  }

  public async getData(key: string) {
    try {
      return await this.redisClient.get(key);
    } catch(error) {
      console.log(error)
    }
  }

  public async listData() {
    try {
      const keys = await this.redisClient.keys('*');

      const keyValues: StringKeyValueStore = {};
      for (const key of keys) {
        const value = await this.redisClient.get(key);
        if (value !== null) {
          keyValues[key] = value;
        }
      }
  
      return keyValues;
    } catch(error) {
      console.log(error)
    }
  }

  public async checkValueExist(valueToCheck: string) {
    try {
      const keys = await this.redisClient.keys('*');

      for (const key of keys) {
        const value = await this.redisClient.get(key);
        if (value === valueToCheck) {
          return true;
        }
      }
  
      return false;
    } catch(error) {
      console.log(error)
    }
  }

  public async clearAll() {
    try {
      return await this.redisClient.flushAll();
    } catch(error) {
      console.log(error)
    }
  }
}