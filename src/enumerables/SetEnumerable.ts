import { Enumerable } from '../collections/Enumerable';

export class SetEnumerable<T> extends Enumerable<T> {
    public constructor(protected readonly source: Set<T>) {
        super();
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }
}
