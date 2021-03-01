import { Errors } from '../Errors';

import { Enumerable } from './Enumerable';
import { LinkedList } from './LinkedList';

/**
 * Represents a stack of objects.
 */
export class Queue<T> extends Enumerable<T> {
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
            throw Errors.queueEmpty();
        }

        return this.source.firstItem!.value;
    }

    public dequeue(): T {
        if (this.size === 0) {
            throw Errors.queueEmpty();
        }

        const value = this.source.firstItem!.value;
        this.source.removeFirst();
        return value;
    }

    public enqueue(value: T): void {
        this.source.addLast(value);
    }

    public clear(): void {
        this.source.clear();
    }
}
