import { DefaultEqualityComparer, PredicateEqualityComparer } from '@src/Internal';

export abstract class EqualityComparer<T> {
    public static default<T>(): EqualityComparer<T> {
        return new DefaultEqualityComparer<T>();
    }

    public static from<T>(predicate: (value1: T, value2: T) => boolean): EqualityComparer<T> {
        return new PredicateEqualityComparer<T>(predicate);
    }

    public abstract equals(value1: T, value2: T): boolean;
}
