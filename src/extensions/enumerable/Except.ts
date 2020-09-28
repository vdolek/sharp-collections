import { Enumerable } from '../../collections/Enumerable';
import { EqualityComparer } from '../../comparers/EqualityComparer';
import { ExceptEnumerable } from '../../enumerables/ExceptEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Produces the set difference of two sequences. */
        except<T>(this: Enumerable<T>, except: Iterable<T>, comparer?: EqualityComparer<T>): Enumerable<T>;
    }
}

function except<T>(this: Enumerable<T>, exceptLocal: Iterable<T>, comparer?: EqualityComparer<T>): Enumerable<T> {
    return new ExceptEnumerable(this, exceptLocal, comparer);
}

Enumerable.prototype.except = except;
