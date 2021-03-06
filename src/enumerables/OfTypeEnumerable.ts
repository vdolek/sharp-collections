import { Enumerable } from '../collections/Enumerable';

export class OfTypeEnumerable<T, TResult> extends Enumerable<TResult> {
    public constructor(
        private readonly source: Iterable<T>,
        // tslint:disable-next-line:no-any
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
