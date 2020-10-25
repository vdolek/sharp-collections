import { Pair } from '../../models/Pair';
import { Enumerable } from '../Enumerable';

import { DictionaryAbstraction } from './DictionaryAbstraction';

export class SelectorEqualityDictionary<TKey, TValue, TKeySelector> implements DictionaryAbstraction<TKey, TValue> {
    private readonly source = new Map<TKeySelector, Pair<TKey, TValue>>();

    public constructor(private readonly keySelector: (key: TKey) => TKeySelector) {
    }

    public [Symbol.iterator](): Iterator<Pair<TKey, TValue>> {
        return this.source.values();
    }

    public clear(): void {
        this.source.clear();
    }

    public containsKey(key: TKey): boolean {
        return this.source.has(this.keySelector(key));
    }

    public getPair(key: TKey): Pair<TKey, TValue> | undefined {
        return this.source.get(this.keySelector(key));
    }

    public getSize(): number {
        return this.source.size;
    }

    public keys(): Enumerable<TKey> {
        return Enumerable.from(this.source.values())
            .select(x => x.key);
    }

    public remove(key: TKey): boolean {
        return this.source.delete(this.keySelector(key));
    }

    public set(key: TKey, value: TValue): void {
        this.source.set(this.keySelector(key), Pair.from(key, value));
    }

    public values(): Enumerable<TValue> {
        return Enumerable.from(this.source.values())
            .select(x => x.value);
    }
}
