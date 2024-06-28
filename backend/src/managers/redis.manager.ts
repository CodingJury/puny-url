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

  public async addData(key: string, data: string, expire: "1-month"|"1-day"|"6-hours"| "1-hour"|"1-minute" = '1-day') {

    const timeSecMapping = {
      "1-month": 30*86400,
      "1-day": 86400,
      "6-hours": 6*3600,
      "1-hour": 3600,
      "1-minute": 60
    }

    try {
      return await this.redisClient.set(key, data, {
        EX: timeSecMapping[expire]
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