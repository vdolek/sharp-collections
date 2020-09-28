import { Enumerable } from '../collections/Enumerable';
import { Pair } from '../models/Pair';

export class MapEnumerable<TKey, TValue> extends Enumerable<Pair<TKey, TValue>> {
    public constructor(protected readonly map: Map<TKey, Pair<TKey, TValue>>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<Pair<TKey, TValue>> {
        for (const [, pair] of this.map) {
            yield pair;
        }
    }

    public count(): number {
        return this.map.size;
    }
}
