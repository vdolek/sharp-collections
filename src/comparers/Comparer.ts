import { CombinedComparer, DefaultComparer, InverseComparer } from '../internal';

export abstract class Comparer<T> {
    public static default<T>(): Comparer<T> {
        return new DefaultComparer<T>();
    }

    public static combine<T>(firstComparer: Comparer<T>, secondComparer: Comparer<T>): Comparer<T> {
        return new CombinedComparer(firstComparer, secondComparer);
    }

    public abstract compare(value1: T, value2: T): number;

    public invert(invert: boolean = true): Comparer<T> {
        return invert ? new InverseComparer(this) : this;
    }
}
