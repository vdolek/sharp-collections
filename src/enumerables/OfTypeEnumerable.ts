import { Enumerable } from '../collections/Enumerable';

export class OfTypeEnumerable<T, TResult> extends Enumerable<TResult> {
    public constructor(
        private readonly source: Iterable<T>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        private readonly type: new(...args: any[]) => TResult) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        for (const element of this.source) {
            if (element instanceof this.type) {
                yield element;
            }
        }
    }
}
