import { Enumerable } from '../collections/Enumerable';
import { Errors } from '../Errors';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists. */
        single(predicate?: (x: T, index: number) => boolean): T;
    }
}

function single<T>(this: Enumerable<T>, predicate?: (x: T, index: number) => boolean): T {
    let value: T;
    let found = false;
    let index = 0;
    for (const element of this) {
        if (predicate == null || predicate(element, index++)) {
            if (found) {
                throw predicate != null ? Errors.moreThanOneMatch() : Errors.moreThanOneElement();
            }

            value = element;
            found = true;
        }
    }

    if (!found) {
        throw predicate != null ? Errors.noMatch() : Errors.noElements();
    }

    // @ts-ignore
    return value;
}

Enumerable.prototype.single = single;
