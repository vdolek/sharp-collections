import { Enumerable, ReadOnlyList } from '../internal';

export class List<T> extends ReadOnlyList<T> {
    public static empty<T>(): List<T> {
        return new List<T>();
    }

    public static from<T>(source: Iterable<T>): List<T> {
        return new List<T>(source);
    }

    public static fromElements<T>(...elements: T[]): List<T> {
        return new List<T>(elements);
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

    public static single<T>(element: T): List<T> {
        return List.fromElements(element);
    }

    // [index: number]: T; // TODO

    public add(value: T): void {
        this.source.push(value);
    }

    public set(index: number, value: T): void {
        if (index < 0 || index >= this.source.length) {
            throw new Error('The index was out of range of the list.');
        }

        this.source[index] = value;
    }

    public clear(): void {
        this.source.length = 0;
    }
}
