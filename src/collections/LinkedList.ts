import { LinkedListNodeInternal } from '../models/LinkedListNodeInternal';

import { ReadOnlyLinkedList } from './ReadOnlyLinkedList';

/**
 * Represents a linked list of objects.
 */
export class LinkedList<T> extends ReadOnlyLinkedList<T> {
    public asReadOnly(): ReadOnlyLinkedList<T> {
        return this;
    }

    public addHead(value: T): void {
        const item = new LinkedListNodeInternal<T>(value);
        if (this.size === 0) {
            this.headInternal = this.tailInternal = item;
        } else {
            this.headInternal!.previous = item;
            item.next = this.headInternal;
            this.headInternal = item;
        }

        ++this.sizeInternal;
    }

    public addTail(value: T): void {
        this.add(value);
    }

    public removeHead(): void {
        if (this.size === 0) {
            return;
        }

        const oldFirst = this.headInternal;
        this.headInternal = this.headInternal!.next;
        oldFirst!.next = undefined;

        if (this.headInternal == null) {
            this.tailInternal = undefined;
        } else {
            this.headInternal.previous = undefined;
        }

        --this.sizeInternal;
    }

    public removeTail(): void {
        if (this.size === 0) {
            return;
        }

        const oldLast = this.tailInternal;
        this.tailInternal = this.tailInternal!.previous;
        oldLast!.previous = undefined;

        if (this.tailInternal == null) {
            this.headInternal = undefined;
        } else {
            this.tailInternal.next = undefined;
        }

        --this.sizeInternal;
    }

    public clear(): void {
        this.sizeInternal = 0;
        this.headInternal = this.tailInternal = undefined;
    }
}
