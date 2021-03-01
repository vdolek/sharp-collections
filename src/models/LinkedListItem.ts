import { LinkedListItemInternal } from './LinkedListItemInternal';

export class LinkedListItem<TValue> {
    public constructor(
        private readonly internal: LinkedListItemInternal<TValue>) {
    }

    public get previous(): LinkedListItem<TValue> | undefined {
        return this.internal.previous?.wrapper;
    }

    public get next(): LinkedListItem<TValue> | undefined {
        return this.internal.next?.wrapper;
    }

    public get value(): TValue {
        return this.internal.value;
    }

    public set value(val: TValue) {
        this.internal.value = val;
    }
}
