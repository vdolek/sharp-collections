import { Enumerable, SelectEnumerable, WhereEnumerable } from '@src/internal';

export abstract class EnumerableBase<T> implements Enumerable<T> {
    public abstract [Symbol.iterator](): Iterator<T>;

    public toArray(): T[] {
        return Array.from(this);
    }

    public first(): T;
    public first(predicate: (x: T) => boolean): T;
    public first(predicate?: (x: T) => boolean): T {
        for (const item of this) {
            if (predicate == null || predicate(item)) {
                return item;
            }
        }

        throw new Error(); // TODO
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

    public select<TResult>(selector: (x: T) => TResult): Enumerable<TResult> {
        return new SelectEnumerable<T, TResult>(this, selector);
    }

    public single(): T;
    public single(predicate: (x: T) => boolean): T;
    public single(predicate?: (x: T) => boolean): T {
        let value: T;
        let found = false;
        for (const item of this) {
            if (predicate == null || predicate(item)) {
                if (found) {
                    throw new Error(); // TODO
                }

                value = item;
                found = true;
            }
        }

        if (!found) {
            throw new Error(); // TODO
        }

        // tslint:disable-next-line:ban-ts-ignore
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
                    throw new Error(); // TODO
                }

                value = item;
                found = true;
            }
        }

        return value;
    }

    public where(predicate: (x: T) => boolean): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }
}
