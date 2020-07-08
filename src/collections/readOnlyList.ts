import { ArrayEnumerable, Enumerable } from '@src/internal';

export class ReadOnlyList<T> extends ArrayEnumerable<T> {
    // readonly [index: number]: T; // TODO

    public constructor();
    public constructor(source: T[]);
    public constructor(source: Enumerable<T>);
    public constructor(source?: T[] | Enumerable<T>) {
        super(ReadOnlyList.getSourceArray(source));
    }

    private static getSourceArray<T>(source?: T[] | Enumerable<T>): T[] {
        if (source == null) {
            return [];
        }

        if (Array.isArray(source)) {
            return source;
        }

        return source.toArray();
    }

    public get(index: number): T {
        if (index < 0 || index >= this.source.length) {
            throw new Error('The index was out of range of the list.'); // TODO
        }

        return this.source[index];
    }
}
