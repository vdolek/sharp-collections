import { Comparer } from '../internal';

export class SelectorComparer<T, TKey> extends Comparer<T> {
    public constructor(
        private readonly keySelector: (element: T) => TKey,
        private readonly innerComparer: Comparer<TKey>) {
        super();
    }

    public compare(value1: T, value2: T): number {
        const key1 = this.keySelector(value1);
        const key2 = this.keySelector(value2);

        const result = this.innerComparer.compare(key1, key2);
        return result;
    }
}
