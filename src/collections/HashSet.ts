import { ReadOnlyHashSet } from './ReadOnlyHashSet';

/**
 * Represents a set of values.
 */
export class HashSet<T> extends ReadOnlyHashSet<T> {
    public add(element: T): this {
        this.addInternal(element);
        return this;
    }

    public asReadOnly(): ReadOnlyHashSet<T> {
        return this;
    }

    public clear(): void {
        this.internalHashSet.clear();
    }

    public remove(element: T): boolean {
        return this.internalHashSet.remove(element);
    }

    public set(element: T): this {
        this.internalHashSet.set(element);
        return this;
    }
}
