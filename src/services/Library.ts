import { Identifiable } from "../types";

export class Library<T extends Identifiable> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  add(item: T): void {
    if (this.findById(item.id)) {
      throw new Error(`Item with id ${item.id} already exists`);
    }
    this.items.push(item);
  }

  remove(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  find(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  getAll(): T[] {
    return [...this.items];
  }

  get count(): number {
    return this.items.length;
  }
}
