import { EqualityComparer } from '../comparers/EqualityComparer';
import { Errors } from '../Errors';
import { Pair } from '../models/Pair';

import { Enumerable } from './Enumerable';
import { List } from './List';

/**
 * Represents a read-only collection of keys and values. Values can be accessed by keys.
 */
// @ts-ignore
export class ReadOnlyDictionary<TKey, TValue> extends Enumerable<Pair<TKey, TValue>> {
    protected readonly equalityComparer: EqualityComparer<TKey>;
    protected buckets: Map<number, List<Pair<TKey, TValue>>> = new Map<number, List<Pair<TKey, TValue>>>();
    protected sizeInternal = 0;

    public constructor(source?: Iterable<Pair<TKey, TValue>>, comparer?: EqualityComparer<TKey>) {
        super();

        this.equalityComparer = comparer ?? EqualityComparer.getDefault<TKey>();

        if (source != null) {
            for (const { key, value } of source) {
                this.setInternal(key, value);
            }
        }
    }

    public get size(): number {
        return this.sizeInternal;
    }

    public *[Symbol.iterator](): Iterator<Pair<TKey, TValue>> {
        for (const [, bucket] of this.buckets) {
            for (const pair of bucket) {
                yield pair;
            }
        }
    }

    public containsKey(key: TKey): boolean {
        const pair = this.getPair(key);
        return pair != null;
    }

    public get(key: TKey): TValue {
        const pair = this.getPair(key);
        if (pair == null) {
            throw Errors.keyNotInDictionary();
        }

        return pair.value;
    }

    public getOrDefault(key: TKey): TValue | undefined {
        const pair = this.getPair(key);
        return pair?.value;
    }

    public keys(): Enumerable<TKey> {
        return Enumerable.from(this.buckets.values())
            .selectMany(x => Enumerable.from(x))
            .select(x => x.key);
    }

    public values(): Enumerable<TValue> {
        return Enumerable.from(this.buckets.values())
            .selectMany(x => Enumerable.from(x))
            .select(x => x.value);
    }

    protected setInternal(key: TKey, value: TValue): void {
        const hashCode = this.equalityComparer.getHashCode(key);

        let bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            bucket = new List<Pair<TKey, TValue>>();
            this.buckets.set(hashCode, bucket);
        }

        let set = false;
        for (let i = 0; i < bucket.size; ++i) {
            const pair = bucket.get(i);
            if (this.equalityComparer.equals(pair.key, key)) {
                bucket.set(i, Pair.from(key, value));
                set = true;
                break;
            }
        }

        if (!set) {
            bucket.add(Pair.from(key, value));
            ++this.sizeInternal;
        }
    }

    protected getPair(key: TKey): Pair<TKey, TValue> | undefined {
        const hashCode = this.equalityComparer.getHashCode(key);
        const bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            return undefined;
        }

        for (const pair of bucket) {
            if (this.equalityComparer.equals(key, pair.key)) {
                return pair;
            }
        }

        return undefined;
    }
}
