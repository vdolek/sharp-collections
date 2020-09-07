import { Enumerable } from '../collections/Enumerable';
import { OfTypeEnumerable } from '../enumerables/OfTypeEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Filters the elements based on a specified type. */
        // tslint:disable-next-line:no-any
        ofType<TResult>(type: new(...args: any[]) => TResult): Enumerable<TResult>;
    }
}

/** Filters the elements based on a specified type. */
// tslint:disable-next-line:no-any
function ofType<T, TResult>(this: Enumerable<T>, type: new(...args: any[]) => TResult): Enumerable<TResult> {
    return new OfTypeEnumerable(this, type);
}

Enumerable.prototype.ofType = ofType;
