import { ArrayEnumerable, Enumerable, Errors } from '@src/Internal';

export class ReadOnlyList<T> extends ArrayEnumerable<T> {
    public static empty<T>(): ReadOnlyList<T> {
        return new ReadOnlyList<T>();
    }

    public static from<T>(...elements: T[]): ReadOnlyList<T> {
        return new ReadOnlyList<T>(elements);
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

    public static single<T>(element: T): ReadOnlyList<T> {
        return ReadOnlyList.from(element);
    }

    // readonly [index: number]: T; // TODO

    public constructor(source?: Iterable<T>) {
        super(Array.from(source ?? []));
    }

    public get(index: number): T {
        if (index < 0 || index >= this.source.length) {
            throw Errors.indexOutOfRange();
        }

        return this.source[index];
    }

    public getOrNull(index: number): T | null {
        if (index < 0 || index >= this.source.length) {
            return null;
        }

        return this.source[index];
    }
}
