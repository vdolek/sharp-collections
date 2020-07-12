import { Enumerable } from '@sharp-collections';

export class SelectManyEnumerable<T, TResult> extends Enumerable<TResult> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly selector: (x: T) => Iterable<TResult>) {
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
}
