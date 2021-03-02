export abstract class LinkedListNode<TValue> {
    public abstract get value(): TValue;

    public abstract set value(val: TValue);

    public abstract get previous(): LinkedListNode<TValue> | undefined;

    public abstract get next(): LinkedListNode<TValue> | undefined;
}
