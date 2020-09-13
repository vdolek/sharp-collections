import { Enumerable } from '../../collections/Enumerable';
import { IndexedPair } from '../../collections/models/IndexedPair';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns indexed sequence. */
        asIndexed(): Enumerable<IndexedPair<T>>;
    }
}

function asIndexed<T>(this: Enumerable<T>): Enumerable<IndexedPair<T>> {
    return this.select((x, idx) => IndexedPair.from(idx, x));
}

Enumerable.prototype.asIndexed = asIndexed;
