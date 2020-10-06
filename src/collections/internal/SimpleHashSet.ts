import { HashSetAbstraction } from './HashSetAbstraction';

export class SimpleHashSet<T> implements HashSetAbstraction<T> {
    private readonly source: Set<T> = new Set<T>();

    public [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }

    public clear(): void {
        this.source.clear();
    }

    public contains(element: T): boolean {
        return this.source.has(element);
    }

    public getSize(): number {
        return this.source.size;
    }

    public remove(element: T): boolean {
        return this.source.delete(element);
    }

    public set(element: T): void {
        this.source.add(element);
    }
}
