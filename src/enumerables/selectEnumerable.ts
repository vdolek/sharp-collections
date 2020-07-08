import { Enumerable } from '@src/internal';

export class SelectEnumerable<T, TResult> extends Enumerable<TResult> {
    public constructor(
        private readonly innerEnumerable: Enumerable<T>,
        private readonly selector: ((x: T) => TResult) | ((x: T, idx: number) => TResult)) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        let index = 0;
        for (const element of this.innerEnumerable) {
            yield this.selector(element, index);
            ++index;
        }
    }
}
