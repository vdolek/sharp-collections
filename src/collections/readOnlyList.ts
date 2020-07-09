import { ArrayEnumerable, Enumerable, Errors } from '@src/internal';

export class ReadOnlyList<T> extends ArrayEnumerable<T> {
    public static empty<T>(): ReadOnlyList<T> {
        return Enumerable.empty<T>().toReadOnlyList();
    }

    public static from<T>(...elements: T[]): ReadOnlyList<T> {
        return Enumerable.from(...elements).toReadOnlyList();
    }

    public static repeat<T>(element: T, count: number): ReadOnlyList<T> {
        return Enumerable.repeat(element, count).toReadOnlyList();
    }

    public static range(count: number): ReadOnlyList<number>;
    public static range(start: number, count: number): ReadOnlyList<number>;
    public static range(start: number, count: number, increment: number): ReadOnlyList<number>;
    public static range(a: number, b?: number, c?: number): ReadOnlyList<number> {
        // @ts-ignore
        return Enumerable.range(a, b, c).toReadOnlyList();
    }

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
            throw Errors.indexOutOfRange();
        }

        return this.source[index];
    }
}
