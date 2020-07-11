import { Enumerable, Pair } from '@src/Internal';

export class MapEnumerable<TKey, TValue> extends Enumerable<Pair<TKey, TValue>> {
    public constructor(protected readonly map: Map<TKey, Pair<TKey, TValue>>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<Pair<TKey, TValue>> {
        for (const element of this.map) {
            const pair = element[1];
            yield pair;
        }
    }

    public count(): number {
        return this.map.size;
    }
}
