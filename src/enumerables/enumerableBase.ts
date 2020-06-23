import { Enumerable } from '@src/enumerables/enumerable';
import { WhereEnumerable } from '@src/enumerables/whereEnumerable';

export abstract class EnumerableBase<T> implements Enumerable<T> {
    abstract [Symbol.iterator](): Iterator<T>;

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
