import { Enumerable, SelectEnumerable, WhereEnumerable } from '@src/internal';

export abstract class EnumerableBase<T> implements Enumerable<T> {
    abstract [Symbol.iterator](): Iterator<T>;

    toArray(): T[] {
        return Array.from(this);
    }

    first(predicate?: (x: T) => boolean): T {
        for (const item of this) {
            if (!predicate || predicate(item)) {
                return item;
            }
        }

        throw new Error(); // TODO
    }

    firstOrDefault(predicate?: (x: T) => boolean): T | null {
        for (const item of this) {
            if (!predicate || predicate(item)) {
                return item;
            }
        }

        return null;
    }

    select<TResult>(selector: (x: T) => TResult): Enumerable<TResult> {
        return new SelectEnumerable<T, TResult>(this, selector);
    }

    where(predicate: (x: T) => boolean): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }
}
