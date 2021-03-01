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

    public removeFirst(): void {
        if (this.size === 0) {
            return;
        }

        const oldFirst = this.firstInternal;
        this.firstInternal = this.firstInternal!.next;
        oldFirst!.next = undefined;

        if (this.firstInternal == null) {
            this.lastInternal = undefined;
        } else {
            this.firstInternal.previous = undefined;
        }

        --this.sizeInternal;
    }

    public removeLast(): void {
        if (this.size === 0) {
            return;
        }

        const oldLast = this.lastInternal;
        this.lastInternal = this.lastInternal!.previous;
        oldLast!.previous = undefined;

        if (this.lastInternal == null) {
            this.firstInternal = undefined;
        } else {
            this.lastInternal.next = undefined;
        }

        --this.sizeInternal;
    }

    public clear(): void {
        this.sizeInternal = 0;
        this.firstInternal = this.lastInternal = undefined;
    }
}
