import { DefaultComparer, InverseComparer } from '@sharp-collections';

export abstract class Comparer<T> {
    public static default<T>(): Comparer<T> {
        return new DefaultComparer<T>();
    }

    public abstract compare(value1: T, value2: T): number;

    public invert(): Comparer<T> {
        return new InverseComparer(this);
    }
}
