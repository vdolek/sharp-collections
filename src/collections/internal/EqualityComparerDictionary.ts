import { EqualityComparer } from '../../comparers/EqualityComparer';
import { Pair } from '../../models/Pair';
import { Enumerable } from '../Enumerable';
import { List } from '../List';

import { DictionaryAbstraction } from './DictionaryAbstraction';

export class EqualityComparerDictionary<TKey, TValue> implements DictionaryAbstraction<TKey, TValue> {
    protected readonly buckets = new Map<number, List<Pair<TKey, TValue>>>();
    protected readonly comparer: EqualityComparer<TKey>;
    protected sizeInternal = 0;

    public constructor(comparer: EqualityComparer<TKey>) {
        this.comparer = comparer;
    }

    public *[Symbol.iterator](): Iterator<Pair<TKey, TValue>> {
        for (const [, bucket] of this.buckets) {
            for (const pair of bucket) {
                yield pair;
            }
        }
    }

    public clear(): void {
        this.buckets.clear();
        this.sizeInternal = 0;
    }

    public containsKey(key: TKey): boolean {
        const pair = this.getPair(key);
        return pair != null;
    }

    public getPair(key: TKey): Pair<TKey, TValue> | undefined {
        const hashCode = this.comparer.getHashCode(key);
        const bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            return undefined;
        }

        for (const pair of bucket) {
            if (this.comparer.equals(key, pair.key)) {
                return pair;
            }
        }

        return undefined;
    }

    public getSize(): number {
        return this.sizeInternal;
    }

    public keys(): Enumerable<TKey> {
        return Enumerable.from(this.buckets.values())
            .selectMany(x => Enumerable.from(x))
            .select(x => x.key);
    }

    public remove(key: TKey): boolean {
        const hashCode = this.comparer.getHashCode(key);

        const bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            return false;
        }

        let removed = false;
        for (let i = 0; i < bucket.size; ++i) {
            const pair = bucket.get(i);
            if (this.comparer.equals(pair.key, key)) {
                bucket.remove(i);
                removed = true;
                --this.sizeInternal;
                break;
            }
        }

        if (bucket.size === 0) {
            this.buckets.delete(hashCode);
        }

        return removed;
    }

    public set(key: TKey, value: TValue): void {
        this.setInternal(key, value);
    }

    public values(): Enumerable<TValue> {
        return Enumerable.from(this.buckets.values())
            .selectMany(x => Enumerable.from(x))
            .select(x => x.value);
    }

    protected setInternal(key: TKey, value: TValue): void {
        const hashCode = this.comparer.getHashCode(key);

        let bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            bucket = new List<Pair<TKey, TValue>>();
            this.buckets.set(hashCode, bucket);
        }

        let set = false;
        for (let i = 0; i < bucket.size; ++i) {
            const pair = bucket.get(i);
            if (this.comparer.equals(pair.key, key)) {
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
}
