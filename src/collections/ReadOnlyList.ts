import { ArrayEnumerable, Enumerable, Errors } from '../internal';

/**
 * Represents a read-only list of objects that can be accessed by index.
 */
export class ReadOnlyList<T> extends ArrayEnumerable<T> {
    public static empty<T>(): ReadOnlyList<T> {
        return new ReadOnlyList<T>();
    }

    public static from<T>(source: Iterable<T>): ReadOnlyList<T> {
        return new ReadOnlyList<T>(source);
    }

    public static fromElements<T>(...elements: T[]): ReadOnlyList<T> {
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
        return ReadOnlyList.fromElements(element);
    }

    // readonly [index: number]: T; // TODO

    public constructor(source?: Iterable<T>) {
        super(Array.from(source ?? []));
    }

    public containsIndex(index: number): boolean {
        if (Math.round(index) !== index) {
            throw Errors.indexNotInteger();
        }

        return index >= 0 && index < this.source.length;
    }

    public get(index: number): T {
        if (!this.containsIndex(index)) {
            throw Errors.indexOutOfRange();
        }

        return this.source[index];
    }

    public getOrNull(index: number): T | null {
        if (!this.containsIndex(index)) {
            return null;
        }

        return this.source[index];
    }
}
