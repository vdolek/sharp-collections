import { Enumerable } from '../../collections/Enumerable';
import { OfTypeEnumerable } from '../../enumerables/OfTypeEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Filters the elements based on a specified type. */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ofType<TResult>(type: new(...args: any[]) => TResult): Enumerable<TResult>;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ofType<T, TResult>(this: Enumerable<T>, type: new(...args: any[]) => TResult): Enumerable<TResult> {
    return new OfTypeEnumerable(this, type);
}

Enumerable.prototype.ofType = ofType;
