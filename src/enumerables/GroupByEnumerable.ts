import { Dictionary } from '../collections/Dictionary';
import { Enumerable } from '../collections/Enumerable';
import { Grouping } from '../collections/Grouping';
import { List } from '../collections/List';
import { EqualityComparer } from '../comparers/EqualityComparer';

export class GroupByEnumerable<TKey, TValue, TElement = TValue, TResult = Grouping<TKey, TElement>> extends Enumerable<TResult> {
    public constructor(
        private readonly source: Iterable<TValue>,
        private readonly keySelector: (value: TValue, index: number) => TKey,
        private readonly keyEqualityComparer?: EqualityComparer<TKey>,
        private readonly elementSelector?: (value: TValue, index: number) => TElement,
        private readonly resultSelector?: (key: TKey, group: Enumerable<TElement>) => TResult) {
        super();
    }

    public [Symbol.iterator](): Iterator<TResult> {
        const dict = new Dictionary<TKey, List<TElement>>(this.keyEqualityComparer);

        let index = 0;
        for (const element of this.source) {
            const key = this.keySelector(element, index++);

            if (!dict.containsKey(key)) {
                dict.add(key, new Grouping(key));
            }

            const mappedElement = this.elementSelector != null ? this.elementSelector(element, index) : element as unknown as TElement;
            dict.get(key).add(mappedElement);
        }

        const resSelector = this.resultSelector ?? ((key, group) => new Grouping(key, group) as unknown as TResult);
        const result = dict.select(pair => resSelector(pair.key, pair.value));
        return result[Symbol.iterator]();
    }
}
