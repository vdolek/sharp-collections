import { Enumerable } from '../collections/Enumerable';

export class IteratorEnumerable<T> extends Enumerable<T> {
    public constructor(private readonly source: Iterator<T>) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source;
    }
}
