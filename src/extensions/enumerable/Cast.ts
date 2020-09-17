import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Casts the elements to the specified type. */
        cast<TResult>(): Enumerable<TResult>;
    }
}

function cast<T, TResult>(this: Enumerable<T>): Enumerable<TResult> { // TODO MV similar to ofType
    return this as unknown as Enumerable<TResult>; // TODO MV throw?
}

Enumerable.prototype.cast = cast;
