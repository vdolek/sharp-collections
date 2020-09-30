import { EqualityComparer } from '../../comparers/EqualityComparer';
import { List } from '../List';

import { HashSetAbstraction } from './HashSetAbstraction';

export class EqualityComparerHashSet<T> implements HashSetAbstraction<T> {
    protected readonly buckets = new Map<number, List<T>>();
    protected readonly comparer: EqualityComparer<T>;
    protected sizeInternal = 0;

    public constructor(comparer: EqualityComparer<T>) {
        this.comparer = comparer;
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (const [, bucket] of this.buckets) {
            for (const value of bucket) {
                yield value;
            }
        }
    }

    public clear(): void {
        this.buckets.clear();
        this.sizeInternal = 0;
    }

    public contains(element: T): boolean {
        const hashCode = this.comparer.getHashCode(element);

        const bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            return false;
        }

        for (let i = 0; i < bucket.size; ++i) {
            const item = bucket.get(i);
            if (this.comparer.equals(item, element)) {
                return true;
            }
        }

        return false;
    }

    public getSize(): number {
        return this.sizeInternal;
    }

    public remove(element: T): boolean {
        const hashCode = this.comparer.getHashCode(element);

        const bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            return false;
        }

        let removed = false;
        for (let i = 0; i < bucket.size; ++i) {
            const item = bucket.get(i);
            if (this.comparer.equals(item, element)) {
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

    public set(element: T): void {
        const hashCode = this.comparer.getHashCode(element);

        let bucket = this.buckets.get(hashCode);
        if (bucket == null) {
            bucket = new List<T>();
            this.buckets.set(hashCode, bucket);
        }

        for (let i = 0; i < bucket.size; ++i) {
            const item = bucket.get(i);
            if (this.comparer.equals(item, element)) {
                return;
            }
        }

        bucket.add(element);
        ++this.sizeInternal;
        return;
    }
}
