import { Enumerable } from '../../collections/Enumerable';
import { ExceptEnumerable } from '../../enumerables/ExceptEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Produces the set difference of two sequences. */
        except<T>(this: Enumerable<T>, except: Iterable<T>): Enumerable<T>;
    }
}

function except<T>(this: Enumerable<T>, exceptLocal: Iterable<T>): Enumerable<T> { // TODO MV EqualityComparer
    return new ExceptEnumerable(this, exceptLocal);
}

Enumerable.prototype.except = except;
