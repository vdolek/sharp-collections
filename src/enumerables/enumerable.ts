export interface Enumerable<T> extends Iterable<T> {
    toArray(): T[];

    first(): T;
    first(predicate: (x: T) => boolean): T;
    firstOrDefault(): T | null;
    firstOrDefault(predicate: (x: T) => boolean): T | null;

    select<TResult>(selector: (x: T) => TResult): Enumerable<TResult>;

    where(predicate: (x: T) => boolean): Enumerable<T>;
}
