import { List, ReadOnlyList } from '@src/internal';

export interface Enumerable<T> extends Iterable<T> {
    toArray(): T[];
    toReadOnlyList(): ReadOnlyList<T>;
    toList(): List<T>;

    concat(second: Enumerable<T>): Enumerable<T>;

    first(): T;
    first(predicate: (x: T) => boolean): T;
    firstOrDefault(): T | null;
    firstOrDefault(predicate: (x: T) => boolean): T | null;

    select<TResult>(selector: (x: T) => TResult): Enumerable<TResult>;
    select<TResult>(selector: (x: T, index: number) => TResult): Enumerable<TResult>;

    selectMany<TResult>(selector: (x: T) => Enumerable<TResult>): Enumerable<TResult>;

    single(): T;
    single(predicate: (x: T) => boolean): T;
    singleOrDefault(): T | null;
    singleOrDefault(predicate: (x: T) => boolean): T | null;

    where(predicate: (item: T) => boolean): Enumerable<T>;
    where(predicate: (item: T, index: number) => boolean): Enumerable<T>;
}
