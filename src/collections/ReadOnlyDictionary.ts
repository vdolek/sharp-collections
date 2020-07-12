import { Enumerable, Errors, IteratorEnumerable, MapEnumerable, Pair } from '@src/Internal';

// @ts-ignore
export class ReadOnlyDictionary<TKey, TValue> extends MapEnumerable<TKey, TValue> {
    public static empty<TKey, TValue>(): ReadOnlyDictionary<TKey, TValue> {
        return new ReadOnlyDictionary<TKey, TValue>();
    }

    public static fromElements<TKey, TValue>(...elements: Pair<TKey, TValue>[]): ReadOnlyDictionary<TKey, TValue> {
        return new ReadOnlyDictionary(elements);
    }

    public static single<TKey, TValue>(key: TKey, value: TValue): ReadOnlyDictionary<TKey, TValue> {
        return ReadOnlyDictionary.fromElements(Pair.fromElements(key, value));
    }

    // readonly [key: TKey]: T; // TODO

    public constructor(source?: Iterable<Pair<TKey, TValue>>) {
        super(ReadOnlyDictionary.getSourceMap(source));
    }

    private static getSourceMap<TKey, TValue>(source?: Iterable<Pair<TKey, TValue>>): Map<TKey, Pair<TKey, TValue>> {
        const sourceArray = Array.from(source ?? []).map<[TKey, Pair<TKey, TValue>]>(pair => [pair.key, pair]);
        return new Map<TKey, Pair<TKey, TValue>>(sourceArray);
    }

    public containsKey(key: TKey): boolean {
        return this.map.has(key);
    }

    public get(key: TKey): TValue {
        if (!this.map.has(key)) {
            throw Errors.keyNotInDictionary();
        }

        // tslint:disable-next-line:no-non-null-assertion // TODO MV remove
        return this.map.get(key)!.value;
    }

    public getOrNull(key: TKey): TValue | null {
        if (!this.map.has(key)) {
            return null;
        }

        // tslint:disable-next-line:no-non-null-assertion // TODO MV remove
        return this.map.get(key)!.value;
    }

    public keys(): Enumerable<TKey> {
        return new IteratorEnumerable(this.map.keys());
    }

    public values(): Enumerable<TValue> {
        return new IteratorEnumerable(this.map.values())
            .select(x => x.value);
    }
}
