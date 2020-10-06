import { Pair } from '../../models/Pair';
import { Enumerable } from '../Enumerable';

import { DictionaryAbstraction } from './DictionaryAbstraction';

export class SimpleDictionary<TKey, TValue> implements DictionaryAbstraction<TKey, TValue> {
    private readonly source = new Map<TKey, Pair<TKey, TValue>>();

    public [Symbol.iterator](): Iterator<Pair<TKey, TValue>> {
        return this.source.values();
    }

    public clear(): void {
        this.source.clear();
    }

    public containsKey(key: TKey): boolean {
        return this.source.has(key);
    }

    public getPair(key: TKey): Pair<TKey, TValue> | undefined {
        return this.source.get(key);
    }

    public getSize(): number {
        return this.source.size;
    }

    public keys(): Enumerable<TKey> {
        return Enumerable.from(this.source.keys());
    }

    public remove(key: TKey): boolean {
        return this.source.delete(key);
    }

    public set(key: TKey, value: TValue): void {
        this.source.set(key, Pair.from(key, value));
    }

    public values(): Enumerable<TValue> {
        return Enumerable.from(this.source.values())
            .select(x => x.value);
    }
}
