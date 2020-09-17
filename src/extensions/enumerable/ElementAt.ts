import { Enumerable } from '../../collections/Enumerable';
import { Errors } from '../../Errors';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the element at a specified index in a sequence. */
        elementAt(this: Enumerable<T>, index: number): T;
    }
}

function elementAt<T>(this: Enumerable<T>, index: number): T {
    if (index < 0) {
        throw Errors.indexOutOfRange();
    }

    let idx = 0;
    for (const element of this) {
        if (idx === index) {
            return element;
        }
        ++idx;
    }

    throw Errors.indexOutOfRange();
}

Enumerable.prototype.elementAt = elementAt;
