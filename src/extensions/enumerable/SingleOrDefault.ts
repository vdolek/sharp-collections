import { Enumerable } from '../../collections/Enumerable';
import { Errors } from '../../Errors';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /**
         *  Returns the only element of a sequence that satisfies a specified condition or
         *  undefined if no such element exists; this method throws an exception if
         *  more than one element satisfies the condition.
         */
        singleOrDefault(predicate?: (x: T, index: number) => boolean): T | undefined;
    }
}

function singleOrDefault<T>(this: Enumerable<T>, predicate?: (x: T, index: number) => boolean): T | undefined {
    let value: T | undefined;
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

    return value;
}

Enumerable.prototype.singleOrDefault = singleOrDefault;
