import { List } from './List';

export class Grouping<TKey, TElement> extends List<TElement> {
    public readonly key: TKey;

    public constructor(key: TKey, source?: Iterable<TElement>) {
        super(source);
        this.key = key;
    }
}
