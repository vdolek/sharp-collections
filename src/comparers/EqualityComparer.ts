export abstract class EqualityComparer<T = unknown> {
    public abstract equals(value1: T, value2: T): boolean;

    public abstract getHashCode(value: T): number;
}
