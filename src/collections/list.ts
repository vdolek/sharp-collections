import { ReadOnlyList } from '@src/collections/readOnlyList';

export class List<T> extends ReadOnlyList<T> {
    //[index: number]: T; // TODO

    constructor(source: T[] = []) {
        super(source);
    }

    set(index: number, value: T): void {
        if (index < 0 || index >= this.source.length) {
            throw new Error("The index was out of range of the list.");
        }

        this.source[index] = value;
    }

    add(value: T): void {
        this.source.push(value);
    }
}
