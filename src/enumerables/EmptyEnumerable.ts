import { Enumerable } from '../collections/Enumerable';

export class EmptyEnumerable<T> extends Enumerable<T> {
    // tslint:disable-next-line:no-empty
    public *[Symbol.iterator](): Iterator<T> {
    }
}
