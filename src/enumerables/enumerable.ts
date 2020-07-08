import {
    ConcatEnumerable,
    Errors,
    List,
    ReadOnlyList,
    SelectEnumerable,
    SelectManyEnumerable, SkipEnumerable, SkipWhileEnumerable,
    TakeEnumerable, TakeWhileEnumerable,
    WhereEnumerable
} from '@src/internal';

export abstract class Enumerable<T> implements Iterable<T> {
    public abstract [Symbol.iterator](): Iterator<T>;

    public toArray(): T[] {
        return Array.from(this);
    }

    public toReadOnlyList(): ReadOnlyList<T> {
        return new ReadOnlyList<T>(this.toArray());
    }

    public toList(): List<T> {
        return new List<T>(this.toArray());
    }

    public concat(second: Enumerable<T>): Enumerable<T> {
        return new ConcatEnumerable(this, second);
    }

    public first(): T;
    public first(predicate: (x: T) => boolean): T;
    public first(predicate?: (x: T) => boolean): T {
        for (const item of this) {
            if (predicate == null || predicate(item)) {
                return item;
            }
        }

        throw predicate != null ? Errors.noMatch() : Errors.noElements();
    }

    public firstOrDefault(): T | null;
    public firstOrDefault(predicate: (x: T) => boolean): T | null;
    public firstOrDefault(predicate?: (x: T) => boolean): T | null {
        for (const item of this) {
            if (predicate == null || predicate(item)) {
                return item;
            }
        }

        return null;
    }

    public select<TResult>(selector: (x: T) => TResult): Enumerable<TResult>;
    public select<TResult>(selector: (x: T, index: number) => TResult): Enumerable<TResult>;
    public select<TResult>(selector: ((x: T) => TResult) | ((x: T, idx: number) => TResult)): Enumerable<TResult> {
        return new SelectEnumerable(this, selector);
    }

    public selectMany<TResult>(selector: (x: T) => Enumerable<TResult>): Enumerable<TResult> {
        return new SelectManyEnumerable(this, selector);
    }

    public single(): T;
    public single(predicate: (x: T) => boolean): T;
    public single(predicate?: (x: T) => boolean): T {
        let value: T;
        let found = false;
        for (const item of this) {
            if (predicate == null || predicate(item)) {
                if (found) {
                    throw predicate != null ? Errors.moreThanOneMatch() : Errors.moreThanOneElement();
                }

                value = item;
                found = true;
            }
        }

        if (!found) {
            throw predicate != null ? Errors.noMatch() : Errors.noElements();
        }

        // @ts-ignore
        return value;
    }

    public singleOrDefault(): T | null;
    public singleOrDefault(predicate: (x: T) => boolean): T | null;
    public singleOrDefault(predicate?: (x: T) => boolean): T | null {
        let value: T | null = null;
        let found = false;
        for (const item of this) {
            if (predicate == null || predicate(item)) {
                if (found) {
                    throw predicate != null ? Errors.moreThanOneMatch() : Errors.moreThanOneElement();
                }

                value = item;
                found = true;
            }
        }

        return value;
    }

    public skip(count: number): Enumerable<T> {
        return new SkipEnumerable(this, count);
    }

    public skipWhile(predicate: (item: T) => boolean): Enumerable<T>;
    public skipWhile(predicate: (item: T, index: number) => boolean): Enumerable<T>;
    public skipWhile(predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)): Enumerable<T> {
        return new SkipWhileEnumerable(this, predicate);
    }

    public take(count: number): Enumerable<T> {
        return new TakeEnumerable(this, count);
    }

    public takeWhile(predicate: (item: T) => boolean): Enumerable<T>;
    public takeWhile(predicate: (item: T, index: number) => boolean): Enumerable<T>;
    public takeWhile(predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)): Enumerable<T> {
        return new TakeWhileEnumerable(this, predicate);
    }

    public where(predicate: (item: T) => boolean): Enumerable<T>;
    public where(predicate: (item: T, index: number) => boolean): Enumerable<T>;
    public where(predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }
}
