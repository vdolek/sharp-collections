import { Errors, Pair, ReadOnlyDictionary } from '@src/internal';

export class Dictionary<TKey, TValue> extends ReadOnlyDictionary<TKey, TValue> {
    public static empty<TKey, TValue>(): Dictionary<TKey, TValue> {
        return new Dictionary<TKey, TValue>();
    }

    public static from<TKey, TValue>(...elements: Pair<TKey, TValue>[]): Dictionary<TKey, TValue> {
        return new Dictionary(elements);
    }

    // [key: TKey]: T; // TODO

    public add(key: TKey, value: TValue): this {
        if (this.map.has(key)) {
            throw Errors.itemWithKeyAlreadyAdded();
        }

        this.map.set(key, new Pair<TKey, TValue>(key, value));
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
