import { Enumerable } from '../collections/Enumerable';

export class ReversibleIteratorEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly iterator: Iterator<T>,
        private readonly reverseIterator: Iterator<T>) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.iterator;
    }

    public reverse(): Enumerable<T> {
        return new ReversibleIteratorEnumerable(this.reverseIterator, this.iterator);
    }
}
