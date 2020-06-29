import { EnumerableBase } from '@src/internal';

export class ArrayEnumerable<T> extends EnumerableBase<T> {
    public constructor(protected readonly source: T[]) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }
}
