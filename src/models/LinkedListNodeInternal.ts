import { LinkedListNode } from './LinkedListNode';

export class LinkedListNodeInternal<TValue> {
    public constructor(
        public value: TValue,
        public previous?: LinkedListNodeInternal<TValue> | undefined,
        public next?: LinkedListNodeInternal<TValue> | undefined) {
        this.wrapper = new LinkedListNode<TValue>(this);
    }

    public readonly wrapper: LinkedListNode<TValue>;
}
