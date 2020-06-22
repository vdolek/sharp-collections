export interface Enumerable<T> extends Iterable<T> {
    where(predicate: (x: T) => boolean): Enumerable<T>;

    firstOrDefault(): T | null;
}

export abstract class EnumerableBase<T> implements Enumerable<T> {
    abstract [Symbol.iterator](): Iterator<T>;

    where(predicate: (x: T) => boolean): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }

    firstOrDefault(): T | null {
        const iterator = this[Symbol.iterator]();
        const item = iterator.next();
        const value = item.done ? null : item.value;
        return value;
    }
}

class ArrayEnumerable<T> extends EnumerableBase<T> {
    constructor(protected readonly source: T[]) {
        super();
    }

    [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }
}

class WhereEnumerable<T> extends EnumerableBase<T> {
    constructor(
        private readonly innerEnumerable: Enumerable<T>,
        private readonly predicate: (x: T) => boolean) {
        super();
    }

    *[Symbol.iterator](): Iterator<T> {
        for (const item of this.innerEnumerable) {
            if (this.predicate(item)) {
                yield item;
            }
        }
    }
}

export class ReadOnlyList<T> extends ArrayEnumerable<T> {
    //readonly [index: number]: T; // TODO

    constructor(source: T[] = []) {
        super(source);
    }

    get(index: number): T {
        if (index < 0 || index >= this.source.length) {
            throw new Error("The index was out of range of the list.");
        }

        return this.source[index];
    }
}

export class List<T> extends ReadOnlyList<T> {
    //[index: number]: T; // TODO

    constructor(source: T[] = []) {
        super(source);
    }

    set(index: number, value: T): void {
        if (index < 0 || index >= this.source.length) {
            throw new Error("The index was out of range of the list.");
        }

        this.source[index] = value;
    }

    add(value: T): void {
        this.source.push(value);
    }
}
