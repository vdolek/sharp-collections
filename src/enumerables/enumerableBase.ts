import { Enumerable, WhereEnumerable } from '@src/internal';

export abstract class EnumerableBase<T> implements Enumerable<T> {
    abstract [Symbol.iterator](): Iterator<T>;

    toArray(): T[] {
        return Array.from(this);
    }

    where(predicate: (x: T) => boolean): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }

    first(): T {
        const iterator = this[Symbol.iterator]();
        const item = iterator.next();
        if (item.done) {
            throw new Error(); // TODO
        }

        return item.value;
    }

    firstOrDefault(): T | null {
        const iterator = this[Symbol.iterator]();
        const item = iterator.next();
        const value = item.done ? null : item.value;
        return value;
    }
}
