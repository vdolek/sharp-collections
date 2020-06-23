export interface Enumerable<T> extends Iterable<T> {
    toArray(): T[];

    where(predicate: (x: T) => boolean): Enumerable<T>;

    firstOrDefault(): T | null;
}
