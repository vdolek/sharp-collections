export abstract class EqualityComparer<T> {
    public abstract equals(value1: T, value2: T): boolean;
}
