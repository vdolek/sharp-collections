import { Enumerable, ReadOnlyHashSet } from '@src/Internal';

export class HashSet<T> extends ReadOnlyHashSet<T> {
    public static empty<T>(): HashSet<T> {
        return new HashSet<T>();
    }

    public static fromElements<T>(...elements: T[]): HashSet<T> {
        return new HashSet<T>(elements);
    }

    public static range(count: number): HashSet<number>;
    public static range(start: number, count: number): HashSet<number>;
    public static range(start: number, count: number, increment: number): HashSet<number>;
    public static range(a: number, b?: number, c?: number): HashSet<number> {
        // @ts-ignore
        return Enumerable.range(a, b, c).toHashSet();
    }

    public static single<T>(element: T): HashSet<T> {
        return HashSet.fromElements(element);
    }

    public constructor(source?: Iterable<T>) {
        super(Array.from(source ?? []));
    }

    public add(value: T): this {
        this.source.add(value);
        return this;
    }

    public clear(): void {
        this.source.clear();
    }

    public remove(value: T): boolean {
        return this.source.delete(value);
    }
}
