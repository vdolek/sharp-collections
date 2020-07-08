import { Enumerable } from '@src/internal';

export class RepeatEnumerable<T> extends Enumerable<T> {
    public constructor(
        protected readonly element: T,
        protected readonly elementCount: number) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (let i = 0; i < this.elementCount; ++i) {
            yield this.element;
        }
    }
}
