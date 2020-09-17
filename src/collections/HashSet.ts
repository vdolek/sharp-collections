import { ReadOnlyHashSet } from './ReadOnlyHashSet';

/**
 * Represents a set of values.
 */
export class HashSet<T> extends ReadOnlyHashSet<T> {
    public constructor(source?: Iterable<T>) {
        super(source ?? []);
    }

    public add(value: T): this {
        this.source.add(value);
        return this;
    }

    public asReadOnly(): ReadOnlyHashSet<T> {
        return this;
    }

    public clear(): void {
        this.source.clear();
    }

    public remove(value: T): boolean {
        return this.source.delete(value);
    }
}
