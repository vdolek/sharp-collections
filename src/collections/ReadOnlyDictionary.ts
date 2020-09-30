import { EqualityComparer } from '../comparers/EqualityComparer';
import { Errors } from '../Errors';
import { Pair } from '../models/Pair';

import { Enumerable } from './Enumerable';
import { DictionaryAbstraction } from './internal/DictionaryAbstraction';
import { EqualityComparerDictionary } from './internal/EqualityComparerDictionary';
import { SimpleDictionary } from './internal/SimpleDictionary';

/**
 * Represents a read-only collection of keys and values. Values can be accessed by keys.
 */
// @ts-ignore
export class ReadOnlyDictionary<TKey, TValue> extends Enumerable<Pair<TKey, TValue>> {
    protected readonly innerDictionary: DictionaryAbstraction<TKey, TValue>;

    public constructor();
    public constructor(source?: Iterable<Pair<TKey, TValue>>);
    public constructor(comparer?: EqualityComparer<TKey>);
    public constructor(source?: Iterable<Pair<TKey, TValue>>, comparer?: EqualityComparer<TKey>);
    public constructor(a?: Iterable<Pair<TKey, TValue>> | EqualityComparer<TKey>, b?: EqualityComparer<TKey>) {
        super();

        let source: Iterable<Pair<TKey, TValue>> | undefined;
        let comparer: EqualityComparer<TKey> | undefined;

        if (a instanceof EqualityComparer) {
            source = undefined;
            comparer = a;
        } else {
            source = a;
            comparer = b;
        }

        if (comparer == null) {
            this.innerDictionary = new SimpleDictionary<TKey, TValue>(source);
        } else {
            this.innerDictionary = new EqualityComparerDictionary<TKey, TValue>(source, comparer);
        }
    }

    public get size(): number {
        return this.innerDictionary.getSize();
    }

    public [Symbol.iterator](): Iterator<Pair<TKey, TValue>> {
        return this.innerDictionary[Symbol.iterator]();
    }

    public containsKey(key: TKey): boolean {
        return this.innerDictionary.containsKey(key);
    }

    public get(key: TKey): TValue {
        const pair = this.innerDictionary.getPair(key);
        if (pair == null) {
            throw Errors.keyNotInDictionary();
        }

        return pair.value;
    }

    public getOrDefault(key: TKey): TValue | undefined {
        const pair = this.innerDictionary.getPair(key);
        return pair?.value;
    }

    public keys(): Enumerable<TKey> {
        return this.innerDictionary.keys();
    }

    public values(): Enumerable<TValue> {
        return this.innerDictionary.values();
    }
}
