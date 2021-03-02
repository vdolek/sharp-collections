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
        const item = new LinkedListNodeInternal<T>(value, this);
        if (this.size === 0) {
            this.headInternal = this.tailInternal = item;
        } else {
            this.headInternal!.previousInternal = item;
            item.nextInternal = this.headInternal;
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
        this.headInternal = this.headInternal!.nextInternal;
        oldFirst!.nextInternal = undefined;

        if (this.headInternal == null) {
            this.tailInternal = undefined;
        } else {
            this.headInternal.previousInternal = undefined;
        }

        --this.sizeInternal;
    }

    public removeTail(): void {
        if (this.size === 0) {
            return;
        }

        const oldLast = this.tailInternal;
        this.tailInternal = this.tailInternal!.previousInternal;
        oldLast!.previousInternal = undefined;

        if (this.tailInternal == null) {
            this.headInternal = undefined;
        } else {
            this.tailInternal.nextInternal = undefined;
        }

        --this.sizeInternal;
    }

    public clear(): void {
        this.sizeInternal = 0;
        this.headInternal = this.tailInternal = undefined;
    }
}
