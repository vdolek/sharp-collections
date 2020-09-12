import { Enumerable, SetEnumerable } from '../internal';

/**
 * Represents a read-only set of values.
 */
export class ReadOnlyHashSet<T> extends SetEnumerable<T> {
    public constructor(source?: Iterable<T>) {
        super(new Set(source));
    }

    public get size(): number {
        return this.source.size;
    }

    public contains(element: T): boolean {
        return this.source.has(element);
    }
}
