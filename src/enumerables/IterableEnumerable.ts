import { Enumerable } from '@src/Internal';

export class IterableEnumerable<T> extends Enumerable<T> {
    public constructor(private readonly source: Iterable<T>) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }
}
