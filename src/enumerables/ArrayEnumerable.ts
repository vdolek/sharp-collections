import { Enumerable } from '../collections/Enumerable';

import { ReversibleIteratorEnumerable } from './ReversibleIteratorEnumerable';

export class ArrayEnumerable<T> extends Enumerable<T> {
    public constructor(protected readonly source: T[]) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }

    public reverse(): Enumerable<T> {
        return new ReversibleIteratorEnumerable(this.reverseInternal(), this[Symbol.iterator]());
    }

    public count(): number {
        return this.source.length;
    }

    private *reverseInternal(): Iterator<T> {
        for (let i = this.source.length - 1; i >= 0; --i) {
            yield this.source[i];
        }
    }
}
