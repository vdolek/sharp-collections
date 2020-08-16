import { Enumerable } from '../internal';

export class SelectEnumerable<T, TResult> extends Enumerable<TResult> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly selector: (x: T, idx: number) => TResult) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        let index = 0;
        for (const element of this.source) {
            yield this.selector(element, index);
            ++index;
        }
    }
}
