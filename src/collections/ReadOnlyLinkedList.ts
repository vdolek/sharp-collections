import { LinkedListItem } from '../models/LinkedListItem';
import { LinkedListItemInternal } from '../models/LinkedListItemInternal';

import { Enumerable } from './Enumerable';

/**
 * Represents a linked list of objects.
 */
export class ReadOnlyLinkedList<T> extends Enumerable<T> {
    protected sizeInternal = 0;
    protected firstInternal: LinkedListItemInternal<T> | undefined;
    protected lastInternal: LinkedListItemInternal<T> | undefined;

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

        for (let item = this.firstItem; item != null; item = item.next) {
            yield item.value;
        }
    }

    public get size(): number {
        return this.sizeInternal;
    }

    public get firstItem(): LinkedListItem<T> | undefined {
        return this.firstInternal?.wrapper;
    }

    public get lastItem(): LinkedListItem<T> | undefined {
        return this.lastInternal?.wrapper;
    }

    protected add(value: T): void {
        const item = new LinkedListItemInternal<T>(value);
        if (this.size === 0) {
            this.firstInternal = this.lastInternal = item;
        } else {
            this.lastInternal!.next = item;
            item.previous = this.lastInternal;
            this.lastInternal = item;
        }

        ++this.sizeInternal;
    }
}
