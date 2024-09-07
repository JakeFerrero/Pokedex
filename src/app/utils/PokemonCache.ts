import { Pokemon } from '../types/Pokemon';

export interface CachedPokemon extends Pokemon {
  ttl: number;
}

export const CACHE_TTL_IN_MS = 10 * 1000; // 10s in ms

/**
 * A cache that holds a map of name -> pokemon details.
 * A get, set, and clear cache callback function is provided,
 * and these functions will be used when actually getting/updating/clearing
 * the cache. This way, the class can be datastore agnostic - the cache
 * could be browser local storage, in-memory storage, or something like Redis.
 */
export class PokemonCache {
  private getCacheFunc: () => string;
  private setCacheFunc: (detailsMap: Record<string, CachedPokemon>) => void;
  private clearCacheFunc: () => void;

  constructor(getCacheFunc: any, setCacheFunc: any, clearCacheFunc: any) {
    this.getCacheFunc = getCacheFunc;
    this.setCacheFunc = setCacheFunc;
    this.clearCacheFunc = clearCacheFunc;
  }

  /**
   * Retrieve a pokemon's details from the cache via their name.
   */
  getPokemonDetails(name: string): Pokemon | undefined {
    let pokemonDetailsMap = this.getCache();
    if (!pokemonDetailsMap || !pokemonDetailsMap[name]) return;

    // if ttl has expired, get a new version from the database
    if (this.isStale(pokemonDetailsMap[name].ttl)) return;
    const { ttl, ...details } = pokemonDetailsMap[name];
    return {
      ...details
    };
  }

  /**
   * Add a pokemon's details to the cache via their name.
   */
  setPokemonDetails(name: string, details: Pokemon): void {
    let pokemonDetailsMap = this.getCache();
    if (!pokemonDetailsMap) pokemonDetailsMap = {};
    if (!Object.keys(pokemonDetailsMap).includes(name) || this.isStale(pokemonDetailsMap[name].ttl)) {
      pokemonDetailsMap[name] = {
        ...details,
        ttl: Date.now() + CACHE_TTL_IN_MS
      };
    }
    this.setCache(pokemonDetailsMap);
  }

  /**
   * Clear the cache.
   */
  clear(): void {
    this.clearCacheFunc();
  }

  private getCache(): Record<string, CachedPokemon> | undefined {
    const cache = this.getCacheFunc();
    return !cache || !Object.keys(cache).length ? undefined : JSON.parse(cache);
  }

  private setCache(detailsMap: Record<string, CachedPokemon>): void {
    this.setCacheFunc(detailsMap);
  }

  private isStale(ttl: number) {
    return Date.now() > ttl;
  }
}
