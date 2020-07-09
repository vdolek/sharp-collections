import { Enumerable } from '@src/internal';

export class SelectManyEnumerable<T, TResult> extends Enumerable<TResult> {
    public constructor(
        private readonly source: Enumerable<T>,
        private readonly selector: (x: T) => Enumerable<TResult>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        for (const element of this.source) {
            const subEnumerable = this.selector(element);
            for (const x of subEnumerable) {
                yield x;
            }
        }
    }

    public count(): number {
        let count = 0;
        for (const element of this.source) {
            const subEnumerable = this.selector(element);
            count += subEnumerable.count();
        }

        return count;
    }
}
