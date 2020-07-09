import { Enumerable } from '@src/internal';

export class TakeEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Enumerable<T>,
        private readonly elementCount: number) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        let index = 0;
        for (const element of this.source) {
            if (index === this.elementCount) {
                break;
            }

            yield element;

            ++index;
        }
    }
}
