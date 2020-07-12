import { Enumerable, Grouping, ReadOnlyDictionary } from '@src/Internal';

export class Lookup<TKey, TElement> extends Enumerable<Grouping<TKey, TElement>> {
    public constructor(private readonly dict: ReadOnlyDictionary<TKey, Grouping<TKey, TElement>>) {
        super();
    }

    public [Symbol.iterator](): Iterator<Grouping<TKey, TElement>> {
        return this.dict.values()[Symbol.iterator]();
    }

    public count(): number {
        return this.dict.count();
    }

    public get(key: TKey): Grouping<TKey, TElement> {
        return this.dict.get(key);
    }

    public getOrNull(key: TKey): Grouping<TKey, TElement> | null {
        return this.dict.getOrNull(key);
    }
}