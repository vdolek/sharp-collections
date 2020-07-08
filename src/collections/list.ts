import { Enumerable, ReadOnlyList } from '@src/internal';

export class List<T> extends ReadOnlyList<T> {
    // [index: number]: T; // TODO

    public constructor();
    public constructor(source: T[]);
    public constructor(source: Enumerable<T>);
    public constructor(source?: T[] | Enumerable<T>) {
        // @ts-ignore
        super(source);
    }

    public set(index: number, value: T): void {
        if (index < 0 || index >= this.source.length) {
            throw new Error('The index was out of range of the list.');
        }

        this.source[index] = value;
    }

    public add(value: T): void {
        this.source.push(value);
    }
}
