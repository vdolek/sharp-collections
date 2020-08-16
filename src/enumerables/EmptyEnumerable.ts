import { Enumerable } from '../internal';

export class EmptyEnumerable<T> extends Enumerable<T> {
    // tslint:disable-next-line:no-empty
    public *[Symbol.iterator](): Iterator<T> {
    }

    public count(): number {
        return 0;
    }
}
