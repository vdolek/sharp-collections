import { Enumerable } from '../collections/Enumerable';
import { AppendEnumerable } from '../enumerables/AppendEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Appends a value to the end of the sequence. */
        append(value: T): Enumerable<T>;
    }
}

function append<T>(this: Enumerable<T>, value: T): Enumerable<T> {
    return new AppendEnumerable(this, value);
}

Enumerable.prototype.append = append;
