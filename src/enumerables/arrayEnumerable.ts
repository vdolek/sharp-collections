import { EnumerableBase } from '@src/internal';

export class ArrayEnumerable<T> extends EnumerableBase<T> {
    constructor(protected readonly source: T[]) {
        super();
    }

    [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }
}

