import { Errors } from '../Errors';

import { Enumerable } from './Enumerable';
import { LinkedList } from './LinkedList';

/**
 * Represents a stack of objects.
 */
export class Stack<T> extends Enumerable<T> {
    private readonly source: LinkedList<T>;

    public constructor(source?: Iterable<T>) {
        super();
        this.source = new LinkedList<T>(source);
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.source[Symbol.iterator]();
    }

    public get size(): number {
        return this.source.size;
    }

    public peek(): T {
        if (this.size === 0) {
            throw Errors.stackEmpty();
        }

        return this.source.lastItem!.value;
    }

    public pop(): T {
        if (this.size === 0) {
            throw Errors.stackEmpty();
        }

        const value = this.source.lastItem!.value;
        this.source.removeLast();
        return value;
    }

    public push(value: T): void {
        this.source.addLast(value);
    }

    public clear(): void {
        this.source.clear();
    }
}
