import { Enumerable } from '@src/internal';

export class SelectManyEnumerable<T, TResult> extends Enumerable<TResult> {
    public constructor(
        private readonly innerEnumerable: Enumerable<T>,
        private readonly selector: (x: T) => Enumerable<TResult>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        for (const element of this.innerEnumerable) {
            const subEnumerable = this.selector(element);
            for (const x of subEnumerable) {
                yield x;
            }
        }
    }
}
