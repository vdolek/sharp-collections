import { ArrayEnumerable } from '@src/internal';

export class ReadOnlyList<T> extends ArrayEnumerable<T> {
    //readonly [index: number]: T; // TODO

    constructor(source: T[] = []) {
        super(source);
    }

    get(index: number): T {
        if (index < 0 || index >= this.source.length) {
            throw new Error("The index was out of range of the list.");
        }

        return this.source[index];
    }
}
