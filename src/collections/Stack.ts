import { Errors } from '../Errors';

import { Enumerable } from './Enumerable';
import { LinkedList } from './LinkedList';

/**
 * Represents a stack of objects.
 */
export class Stack<T> extends Enumerable<T> {
    private readonly source: LinkedList<T> = new LinkedList<T>();

    public constructor(source?: Iterable<T>) {
        super();

        if (source != null) {
            for (const value of source) {
                this.push(value);
            }
        }
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

        return this.source.firstItem!.value;
    }

    public pop(): T {
        if (this.size === 0) {
            throw Errors.stackEmpty();
        }

        const value = this.source.firstItem!.value;
        this.source.removeFirst();
        return value;
    }

    public push(value: T): void {
        this.source.addFirst(value);
    }

    public clear(): void {
        this.source.clear();
    }
}
