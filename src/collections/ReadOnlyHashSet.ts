import { Enumerable, SetEnumerable } from '@src/Internal';

export class ReadOnlyHashSet<T> extends SetEnumerable<T> {
    public static empty<T>(): ReadOnlyHashSet<T> {
        return new ReadOnlyHashSet<T>();
    }

    public static fromElements<T>(...elements: T[]): ReadOnlyHashSet<T> {
        return new ReadOnlyHashSet<T>(elements);
    }

    public static range(count: number): ReadOnlyHashSet<number>;
    public static range(start: number, count: number): ReadOnlyHashSet<number>;
    public static range(start: number, count: number, increment: number): ReadOnlyHashSet<number>;
    public static range(a: number, b?: number, c?: number): ReadOnlyHashSet<number> {
        // @ts-ignore
        return Enumerable.range(a, b, c).toReadOnlyHashSet();
    }

    public static single<T>(element: T): ReadOnlyHashSet<T> {
        return ReadOnlyHashSet.fromElements(element);
    }

    public constructor(source?: Iterable<T>) {
        super(new Set(source));
    }

    public contains(element: T): boolean {
        return this.source.has(element);
    }
}
