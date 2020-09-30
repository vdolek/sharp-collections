import { Errors } from '../Errors';

import { ReadOnlyDictionary } from './ReadOnlyDictionary';

/**
 * Represents a collection of keys and values. Values can be accessed by keys.
 */
export class Dictionary<TKey, TValue> extends ReadOnlyDictionary<TKey, TValue> {
    public add(key: TKey, value: TValue): this {
        this.addInternal(key, value);
        return this;
    }

    public asReadOnly(): ReadOnlyDictionary<TKey, TValue> {
        return this;
    }

    public clear(): void {
        this.innerDictionary.clear();
    }

    public remove(key: TKey): boolean {
        return this.innerDictionary.remove(key);
    }

    public set(key: TKey, value: TValue): this {
        this.innerDictionary.set(key, value);
        return this;
    }
}
