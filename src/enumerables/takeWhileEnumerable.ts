import { Enumerable } from '@src/internal';

export class TakeWhileEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Enumerable<T>,
        private readonly predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        let index = 0;
        for (const element of this.source) {
            if (!this.predicate(element, index)) {
                break;
            }

            yield element;
            ++index;
        }
    }
}
