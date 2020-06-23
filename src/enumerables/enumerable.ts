export interface Enumerable<T> extends Iterable<T> {
    where(predicate: (x: T) => boolean): Enumerable<T>;

    firstOrDefault(): T | null;
}
