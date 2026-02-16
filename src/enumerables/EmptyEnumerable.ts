import { Enumerable } from '../collections/Enumerable';

export class EmptyEnumerable<T> extends Enumerable<T> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public *[Symbol.iterator](): Iterator<T> {
    }
}
