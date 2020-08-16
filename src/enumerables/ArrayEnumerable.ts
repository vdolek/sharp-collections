import { Enumerable } from '../internal';

export class ArrayEnumerable<T> extends Enumerable<T> {
    public constructor(protected readonly source: T[]) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }

    public count(): number {
        return this.source.length;
    }
}
