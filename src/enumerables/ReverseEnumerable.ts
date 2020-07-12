import { Enumerable } from '@src/Internal';

export class ReverseEnumerable<T> extends Enumerable<T> {
    public constructor(private readonly source: Iterable<T>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        const array = Array.from(this.source);
        for (let idx = array.length - 1; idx >= 0; --idx) {
            yield array[idx];
        }
    }
}
