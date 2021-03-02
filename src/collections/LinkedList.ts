import { IteratorEnumerable } from '../enumerables/IteratorEnumerable';
import { Errors } from '../Errors';
import { LinkedListNode } from '../models/LinkedListNode';
import { LinkedListNodeInternal } from '../models/LinkedListNodeInternal';

import { Enumerable } from './Enumerable';

/**
 * Represents a linked list of objects.
 */
export class LinkedList<T> extends Enumerable<T> {
    protected sizeInternal = 0;
    protected headInternal: LinkedListNodeInternal<T> | undefined;
    protected tailInternal: LinkedListNodeInternal<T> | undefined;

    public constructor(source?: Iterable<T>) {
        super();

        if (source != null) {
            for (const item of source) {
                this.addTail(item);
            }
        }
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (let node = this.headOrDefault; node != null; node = node.next) {
            yield node.value;
        }
    }

    public get fromTail(): Enumerable<T> {
        return this.nodesFromTail.select(x => x.value);
    }

    public get nodes(): Enumerable<LinkedListNode<T>> {
        return new IteratorEnumerable(this.nodesInternal());
    }

    public get nodesFromTail(): Enumerable<LinkedListNode<T>> {
        return new IteratorEnumerable(this.nodesReverseInternal());
    }

    public get size(): number {
        return this.sizeInternal;
    }

    public get head(): LinkedListNode<T> {
        if (this.headInternal == null) {
            throw Errors.linkedListEmpty();
        }

        return this.headInternal;
    }

    public get headOrDefault(): LinkedListNode<T> | undefined {
        return this.headInternal;
    }

    public get tail(): LinkedListNode<T> {
        if (this.tailInternal == null) {
            throw Errors.linkedListEmpty();
        }

        return this.tailInternal;
    }

    public get tailOrDefault(): LinkedListNode<T> | undefined {
        return this.tailInternal;
    }

    public find(value: T): LinkedListNode<T> | undefined {
        const node = this.nodes.first(x => x.value === value);
        return node;
    }

    public findOrDefault(value: T): LinkedListNode<T> | undefined {
        const node = this.nodes.firstOrDefault(x => x.value === value);
        return node;
    }

    public findLast(value: T): LinkedListNode<T> | undefined {
        const node = this.nodes.reverse().first(x => x.value === value);
        return node;
    }

    public findLastOrDefault(value: T): LinkedListNode<T> | undefined {
        const node = this.nodes.reverse().firstOrDefault(x => x.value === value);
        return node;
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
        const item = new LinkedListNodeInternal<T>(value, this);
        if (this.size === 0) {
            this.headInternal = this.tailInternal = item;
        } else {
            this.tailInternal!.nextInternal = item;
            item.previousInternal = this.tailInternal;
            this.tailInternal = item;
        }

        ++this.sizeInternal;
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

    private *nodesInternal(): Iterator<LinkedListNodeInternal<T>> {
        for (let node = this.headInternal; node != null; node = node.nextInternal) {
            yield node;
        }
    }

    private *nodesReverseInternal(): Iterator<LinkedListNodeInternal<T>> {
        for (let node = this.tailInternal; node != null; node = node.previousInternal) {
            yield node;
        }
    }
}
