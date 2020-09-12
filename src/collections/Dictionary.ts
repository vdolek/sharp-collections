import { Errors, Pair, ReadOnlyDictionary } from '../internal';

/**
 * Represents a collection of keys and values. Values can be accessed by keys.
 */
export class Dictionary<TKey, TValue> extends ReadOnlyDictionary<TKey, TValue> {
    public add(key: TKey, value: TValue): this {
        if (this.map.has(key)) {
            throw Errors.itemWithKeyAlreadyAdded();
        }

        this.map.set(key, new Pair<TKey, TValue>(key, value));
        return this;
    }

    public asReadOnly(): ReadOnlyDictionary<TKey, TValue> {
        return this;
    }

    public clear(): void {
        this.map.clear();
    }

    public remove(key: TKey): boolean {
        return this.map.delete(key);
    }

    public set(key: TKey, value: TValue): this {
        this.map.set(key, new Pair<TKey, TValue>(key, value));
        return this;
    }
}
