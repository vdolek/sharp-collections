import { Enumerable } from '../collections/Enumerable';
import { PrependEnumerable } from '../enumerables/PrependEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Adds a value to the beginning of the sequence. */
        prepend(value: T): Enumerable<T>;
    }
}

function prepend<T>(this: Enumerable<T>, value: T): Enumerable<T> {
    return new PrependEnumerable(this, value);
}

Enumerable.prototype.prepend = prepend;
