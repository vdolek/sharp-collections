import { EqualityComparer } from '../comparers/EqualityComparer';

import { Enumerable } from './Enumerable';
import { List } from './List';

/**
 * Represents a read-only set of values.
 */
export class ReadOnlyHashSet<T> extends Enumerable<T> {
    protected readonly buckets: Map<number, List<T>> = new Map<number, List<T>>();
    protected readonly equalityComparer: EqualityComparer<T>;
    protected sizeInternal = 0;

    public constructor(source?: Iterable<T>, comparer?: EqualityComparer<T>) {
        super();

        this.equalityComparer = comparer ?? EqualityComparer.getDefault<T>();

        if (source != null) {
            for (const item of source) {
                this.addInternal(item);
            }
        }
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (const [, bucket] of this.buckets) {
            for (const value of bucket) {
                yield value;
            }
        }
    }

    public get size(): number {
        return this.sizeInternal;
    }

    public contains(element: T): boolean {
        const hashCode = this.equalityComparer.getHashCode(element);

        const bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            return false;
        }

        for (let i = 0; i < bucket.size; ++i) {
            const item = bucket.get(i);
            if (this.equalityComparer.equals(item, element)) {
                return true;
            }
        }

        return false;
    }

    protected addInternal(element: T): boolean {
        const hashCode = this.equalityComparer.getHashCode(element);

        let bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            bucket = new List<T>();
            this.buckets.set(hashCode, bucket);
        }

        for (let i = 0; i < bucket.size; ++i) {
            const item = bucket.get(i);
            if (this.equalityComparer.equals(item, element)) {
                return false;
            }
        }

        bucket.add(element);
        ++this.sizeInternal;
        return true;
    }
}
