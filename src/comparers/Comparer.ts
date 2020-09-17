export abstract class Comparer<T> {
    public abstract compare(value1: T, value2: T): number;
}
