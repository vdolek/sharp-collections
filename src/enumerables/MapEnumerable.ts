import { Enumerable } from '../collections/Enumerable';

export class MapEnumerable<TKey, TValue> extends Enumerable<[TKey, TValue]> {
    public constructor(protected readonly source: Map<TKey, TValue>) {
        super();
    }

    public [Symbol.iterator](): Iterator<[TKey, TValue]> {
        return this.source[Symbol.iterator]();
    }
}
