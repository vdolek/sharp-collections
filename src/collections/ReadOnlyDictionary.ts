import { MapEnumerable } from '../enumerables/MapEnumerable';
import { Errors } from '../Errors';

import { Enumerable } from './Enumerable';
import { Pair } from '../models/Pair';

/**
 * Represents a read-only collection of keys and values. Values can be accessed by keys.
 */
// @ts-ignore
export class ReadOnlyDictionary<TKey, TValue> extends MapEnumerable<TKey, TValue> {
    public constructor(source?: Iterable<Pair<TKey, TValue>>) {
        super(ReadOnlyDictionary.getSourceMap(source));
    }

    public get size(): number {
        return this.map.size;
    }

    private static getSourceMap<TKey, TValue>(source?: Iterable<Pair<TKey, TValue>>): Map<TKey, Pair<TKey, TValue>> {
        const sourceEnumerable = Enumerable.from(source ?? []);
        const mapped = sourceEnumerable.select<[TKey, Pair<TKey, TValue>]>(pair => [pair.key, pair]);
        return new Map<TKey, Pair<TKey, TValue>>(mapped);
    }

    public containsKey(key: TKey): boolean {
        return this.map.has(key);
    }

    public get(key: TKey): TValue {
        if (!this.map.has(key)) {
            throw Errors.keyNotInDictionary();
        }

        // tslint:disable-next-line:no-non-null-assertion // TODO MV remove
        return this.map.get(key)!.value;
    }

    public getOrDefault(key: TKey): TValue | undefined {
        if (!this.map.has(key)) {
            return undefined;
        }

        // tslint:disable-next-line:no-non-null-assertion // TODO MV remove
        return this.map.get(key)!.value;
    }

    public keys(): Enumerable<TKey> {
        return Enumerable.from(this.map.keys());
    }

    public values(): Enumerable<TValue> {
        return Enumerable.from(this.map.values())
            .select(x => x.value);
    }
}
