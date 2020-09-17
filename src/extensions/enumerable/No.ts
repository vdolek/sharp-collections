import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Determines whether no elements of a sequence satisfy a condition. */
        no(predicate?: (x: T, index: number) => boolean): boolean;
    }
}

function no<T>(this: Enumerable<T>, predicate?: (x: T, index: number) => boolean): boolean {
    return !this.any(predicate);
}

Enumerable.prototype.no = no;
