import { Enumerable, ReadOnlyList } from '@src/internal';

export class List<T> extends ReadOnlyList<T> {
    public static empty<T>(): List<T> {
        return Enumerable.empty<T>().toList();
    }

    public static from<T>(...elements: T[]): List<T> {
        return Enumerable.from(...elements).toList();
    }

    public static repeat<T>(element: T, count: number): List<T> {
        return Enumerable.repeat(element, count).toList();
    }

    public static range(count: number): List<number>;
    public static range(start: number, count: number): List<number>;
    public static range(start: number, count: number, increment: number): List<number>;
    public static range(a: number, b?: number, c?: number): List<number> {
        // @ts-ignore
        return Enumerable.range(a, b, c).toList();
    }

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
