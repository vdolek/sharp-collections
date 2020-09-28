import { EqualityComparer } from '../comparers/EqualityComparer';

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
        this.buckets.clear();
        this.sizeInternal = 0;
    }

    public remove(element: T): boolean {
        const hashCode = this.equalityComparer.getHashCode(element);

        const bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            return false;
        }

        let removed = false;
        for (let i = 0; i < bucket.size; ++i) {
            const item = bucket.get(i);
            if (this.equalityComparer.equals(item, element)) {
                bucket.remove(i);
                removed = true;
                --this.sizeInternal;
                break;
            }
        }

        if (bucket.size === 0) {
            this.buckets.delete(hashCode);
        }

        return removed;
    }
}
