import { IteratorEnumerable } from '../enumerables/IteratorEnumerable';
import { LinkedListNode } from '../models/LinkedListNode';
import { LinkedListNodeInternal } from '../models/LinkedListNodeInternal';

import { Enumerable } from './Enumerable';

/**
 * Represents a linked list of objects.
 */
export class ReadOnlyLinkedList<T> extends Enumerable<T> {
    protected sizeInternal = 0;
    protected headInternal: LinkedListNodeInternal<T> | undefined;
    protected tailInternal: LinkedListNodeInternal<T> | undefined;

    public constructor(source?: Iterable<T>) {
        super();

        if (source != null) {
            for (const item of source) {
                this.add(item);
            }
        }
    }

    public *[Symbol.iterator](): Iterator<T> {
        if (this.size === 0) {
            return;
        }

        for (let item = this.head; item != null; item = item.next) {
            yield item.value;
        }
    }

    public get items(): Enumerable<LinkedListNode<T>> {
        return new IteratorEnumerable(this.itemsInternal());
    }

    public get size(): number {
        return this.sizeInternal;
    }

    public get head(): LinkedListNode<T> | undefined {
        return this.headInternal?.wrapper;
    }

    public get tail(): LinkedListNode<T> | undefined {
        return this.tailInternal?.wrapper;
    }

    protected add(value: T): void {
        const item = new LinkedListNodeInternal<T>(value);
        if (this.size === 0) {
            this.headInternal = this.tailInternal = item;
        } else {
            this.tailInternal!.next = item;
            item.previous = this.tailInternal;
            this.tailInternal = item;
        }

        ++this.sizeInternal;
    }

    private *itemsInternal(): Iterator<LinkedListNode<T>> {
        for (let item = this.head; item != null; item = item.next) {
            yield item;
        }
    }
}
