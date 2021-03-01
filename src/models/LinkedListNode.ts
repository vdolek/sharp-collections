import { LinkedListNodeInternal } from './LinkedListNodeInternal';

export class LinkedListNode<TValue> {
    public constructor(
        private readonly internal: LinkedListNodeInternal<TValue>) {
    }

    public get previous(): LinkedListNode<TValue> | undefined {
        return this.internal.previous?.wrapper;
    }

    public get next(): LinkedListNode<TValue> | undefined {
        return this.internal.next?.wrapper;
    }

    public get value(): TValue {
        return this.internal.value;
    }

    public set value(val: TValue) {
        this.internal.value = val;
    }
}
