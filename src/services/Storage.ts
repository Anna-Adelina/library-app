export class Storage {
  constructor(private readonly prefix: string = "library-app:") {}

  save<T>(key: string, value: T): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  load<T>(key: string): T | null {
    const raw = localStorage.getItem(this.prefix + key);
    if (raw === null) {
      return null;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key !== null && key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}
