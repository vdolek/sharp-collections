import { Enumerable, Grouping, ReadOnlyDictionary } from '../internal';

export class Lookup<TKey, TElement> extends Enumerable<Grouping<TKey, TElement>> {
    public constructor(private readonly dict: ReadOnlyDictionary<TKey, Grouping<TKey, TElement>>) {
        super();
    }

    public [Symbol.iterator](): Iterator<Grouping<TKey, TElement>> {
        return this.dict.values()[Symbol.iterator]();
    }

    public containsKey(key: TKey): boolean {
        return this.dict.containsKey(key);
    }

    public count(): number {
        return this.dict.count();
    }

    public get(key: TKey): Grouping<TKey, TElement> {
        return this.dict.get(key);
    }

    public getOrDefault(key: TKey): Grouping<TKey, TElement> | undefined {
        return this.dict.getOrDefault(key);
    }
}
