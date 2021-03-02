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

    public find(value: T): LinkedListNode<T> {
        const node = this.findOrDefault(value);
        if (node == null) {
            throw Errors.valueNotFoundLinkedList();
        }

        return node;
    }

    public findOrDefault(value: T): LinkedListNode<T> | undefined {
        const node = this.nodes.firstOrDefault(x => x.value === value);
        return node;
    }

    public findLast(value: T): LinkedListNode<T> {
        const node = this.findLastOrDefault(value);
        if (node == null) {
            throw Errors.valueNotFoundLinkedList();
        }

        return node;
    }

    public findLastOrDefault(value: T): LinkedListNode<T> | undefined {
        const node = this.nodes.reverse().firstOrDefault(x => x.value === value);
        return node;
    }

    public addHead(value: T): void {
        this.addBefore(this.headInternal, value);
    }

    public addTail(value: T): void {
        this.addAfter(this.tailInternal, value);
    }

    public addAfter(node: LinkedListNode<T> | undefined, value: T): void {
        const nodeInternal = this.extractNode(node);
        const newNode = new LinkedListNodeInternal(value, this, nodeInternal, nodeInternal?.nextInternal);
        this.addNode(newNode);
    }

    public addBefore(node: LinkedListNode<T> | undefined, value: T): void {
        const nodeInternal = this.extractNode(node);
        const newNode = new LinkedListNodeInternal(value, this, nodeInternal?.previousInternal, nodeInternal);
        this.addNode(newNode);
    }

    public removeHead(): void {
        this.remove(this.head);
    }

    public removeTail(): void {
        this.remove(this.tail);
    }

    public remove(node: LinkedListNode<T>): void {
        const n = this.extractNode(node);
        const prev = n.previousInternal;
        const next = n.nextInternal;

        if (prev != null) {
            prev.nextInternal = next;
        }

        if (next != null) {
            next.previousInternal = prev;
        }

        if (node === this.headInternal) {
            this.headInternal = next;
        }

        if (node === this.tailInternal) {
            this.tailInternal = prev;
        }

        --this.sizeInternal;

        n.previousInternal = undefined;
        n.nextInternal = undefined;
    }

    public clear(): void {
        this.sizeInternal = 0;
        this.headInternal = this.tailInternal = undefined;
    }

    private addNode(node: LinkedListNodeInternal<T>): void {
        if (node.previousInternal != null) {
            node.previousInternal.nextInternal = node;
        }

        if (node.nextInternal != null) {
            node.nextInternal.previousInternal = node;
        }

        if (node.previousInternal == null) {
            this.headInternal = node;
        }

        if (node.nextInternal == null) {
            this.tailInternal = node;
        }

        ++this.sizeInternal;
    }

    private extractNode(node: LinkedListNode<T>): LinkedListNodeInternal<T>;
    private extractNode(node: LinkedListNode<T> | undefined): LinkedListNodeInternal<T> | undefined;
    private extractNode(node: LinkedListNode<T> | undefined): LinkedListNodeInternal<T> | undefined {
        if (node == null) {
            return undefined;
        }

        if (node instanceof LinkedListNodeInternal) {
            if (node.linkedList === this) {
                return node;
            }
        }

        throw new Error('Node does not belong to LinkedList');
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
