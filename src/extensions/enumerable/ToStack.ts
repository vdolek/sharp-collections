import { Enumerable } from '../../collections/Enumerable';
import { Stack } from '../../collections/Stack';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a Stack. */
        toStack(): Stack<T>;
    }
}

function toStack<T>(this: Enumerable<T>): Stack<T> {
    return new Stack(this);
}

Enumerable.prototype.toStack = toStack;
