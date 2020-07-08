import { Enumerable } from '@src/internal';

export class ConcatEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly firstEnumerable: Enumerable<T>,
        private readonly secondEnumerable: Enumerable<T>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (const element of this.firstEnumerable) {
            yield element;
        }

        for (const element of this.secondEnumerable) {
            yield element;
        }
    }
}
