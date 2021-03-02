import { Enumerable } from '../collections/Enumerable';

export class ArrayEnumerable<T> extends Enumerable<T> {
    public constructor(protected readonly source: T[]) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }

    private *reverseInternal(): Iterator<T> {
        for (let i = this.source.length - 1; i >= 0; --i) {
            yield this.source[i];
        }
    }
}
