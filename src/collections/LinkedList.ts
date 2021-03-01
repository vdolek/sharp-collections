import { LinkedListItemInternal } from '../models/LinkedListItemInternal';

import { ReadOnlyLinkedList } from './ReadOnlyLinkedList';

/**
 * Represents a linked list of objects.
 */
export class LinkedList<T> extends ReadOnlyLinkedList<T> {
    public asReadOnly(): ReadOnlyLinkedList<T> {
        return this;
    }

    public addFirst(value: T): void {
        const item = new LinkedListItemInternal<T>(value);
        if (this.size === 0) {
            this.firstInternal = this.lastInternal = item;
        } else {
            this.firstInternal!.previous = item;
            item.next = this.firstInternal;
            this.firstInternal = item;
        }

        ++this.sizeInternal;
    }

    public addLast(value: T): void {
        this.add(value);
    }
}
