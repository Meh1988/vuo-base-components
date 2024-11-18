class CacheService {
  private cache: Map<string, any> = new Map();

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, data);
  }

  clear(key: string): void {
    this.cache.delete(key);
  }

  clearAll(): void {
    this.cache.clear();
  }
}

export const cacheService = new CacheService();
