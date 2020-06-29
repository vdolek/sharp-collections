import { Enumerable, SelectEnumerable, WhereEnumerable } from '@src/internal';

export abstract class EnumerableBase<T> implements Enumerable<T> {
    public abstract [Symbol.iterator](): Iterator<T>;

    public toArray(): T[] {
        return Array.from(this);
    }

    public first(predicate?: (x: T) => boolean): T {
        for (const item of this) {
            if (predicate == null || predicate(item)) {
                return item;
            }
        }

        throw new Error(); // TODO
    }

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

    public where(predicate: (x: T) => boolean): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }
}
