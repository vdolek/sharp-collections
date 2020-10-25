import { HashSetAbstraction } from './HashSetAbstraction';

export class SelectorEqualityHashSet<T, TKeySelector> implements HashSetAbstraction<T> {
    private readonly source = new Map<TKeySelector, T>();

    public constructor(private readonly keySelector: (key: T) => TKeySelector) {
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source.values();
    }

    public clear(): void {
        this.source.clear();
    }

    public contains(element: T): boolean {
        return this.source.has(this.keySelector(element));
    }

    public getSize(): number {
        return this.source.size;
    }

    public remove(element: T): boolean {
        return this.source.delete(this.keySelector(element));
    }

    public set(element: T): void {
        this.source.set(this.keySelector(element), element);
    }
}
