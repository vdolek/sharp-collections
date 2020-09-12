import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the element at a specified index in a sequence or a default value if the index is out of range. */
        elementAtOrDefault<T>(index: number): T | undefined;
    }
}

function elementAtOrDefault<T>(this: Enumerable<T>, index: number): T | undefined {
    if (index < 0) {
        return undefined;
    }

    let idx = 0;
    for (const element of this) {
        if (idx === index) {
            return element;
        }
        ++idx;
    }

    return undefined;
}

Enumerable.prototype.elementAtOrDefault = elementAtOrDefault;
