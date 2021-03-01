import { LinkedListItem } from './LinkedListItem';

export class LinkedListItemInternal<TValue> {
    public constructor(
        public value: TValue,
        public previous?: LinkedListItemInternal<TValue> | undefined,
        public next?: LinkedListItemInternal<TValue> | undefined) {
        this.wrapper = new LinkedListItem<TValue>(this);
    }

    public readonly wrapper: LinkedListItem<TValue>;
}
