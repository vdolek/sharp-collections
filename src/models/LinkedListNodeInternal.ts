import { LinkedList } from '../collections/LinkedList';

import { LinkedListNode } from './LinkedListNode';

export class LinkedListNodeInternal<TValue> extends LinkedListNode<TValue> {
    public constructor(
        public valueInternal: TValue,
        public readonly linkedList: LinkedList<TValue>,
        public previousInternal?: LinkedListNodeInternal<TValue>,
        public nextInternal?: LinkedListNodeInternal<TValue>) {
        super();
    }

    public get value(): TValue {
        return this.valueInternal;
    }

    public set value(val: TValue) {
        this.valueInternal = val;
    }

    public get previous(): LinkedListNode<TValue> | undefined {
        return this.previousInternal;
    }

    public get next(): LinkedListNode<TValue> | undefined {
        return this.nextInternal;
    }
}
