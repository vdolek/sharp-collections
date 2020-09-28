import { Errors } from '../Errors';

import { ReadOnlyDictionary } from './ReadOnlyDictionary';

/**
 * Represents a collection of keys and values. Values can be accessed by keys.
 */
export class Dictionary<TKey, TValue> extends ReadOnlyDictionary<TKey, TValue> {
    public add(key: TKey, value: TValue): this {
        if (this.containsKey(key)) {
            throw Errors.itemWithKeyAlreadyAdded();
        }

        this.set(key, value);
        return this;
    }

    public asReadOnly(): ReadOnlyDictionary<TKey, TValue> {
        return this;
    }

    public clear(): void {
        this.buckets.clear();
        this.sizeInternal = 0;
    }

    public remove(key: TKey): boolean {
        const hashCode = this.equalityComparer.getHashCode(key);

        const bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            return false;
        }

        let removed = false;
        for (let i = 0; i < bucket.size; ++i) {
            const pair = bucket.get(i);
            if (this.equalityComparer.equals(pair.key, key)) {
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

    public set(key: TKey, value: TValue): this {
        this.setInternal(key, value);
        return this;
    }
}
