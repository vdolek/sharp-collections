import { Enumerable } from '@src/Internal';

export class IteratorEnumerable<T> extends Enumerable<T> {
    public constructor(protected readonly source: Iterator<T>) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source;
    }
}
