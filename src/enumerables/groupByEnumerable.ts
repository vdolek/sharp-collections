import { Dictionary, Enumerable, Grouping, List } from '@src/internal';

export class GroupByEnumerable<TKey, TValue, TResult = Grouping<TKey, TValue>> extends Enumerable<TResult> {
    public constructor(
        protected readonly source: Iterable<TValue>,
        protected readonly keySelector: (value: TValue, index: number) => TKey,
        protected readonly resultSelector?: (key: TKey, group: Enumerable<TValue>) => TResult) {
        super();
    }

    public [Symbol.iterator](): Iterator<TResult> {
        const dict = new Dictionary<TKey, List<TValue>>();

        let index = 0;
        for (const element of this.source) {
            const key = this.keySelector(element, index++);

            if (!dict.containsKey(key)) {
                dict.add(key, new Grouping(key));
            }

            dict.get(key).add(element);
        }

        // @ts-ignore
        const resSelector = this.resultSelector ?? ((key, group) => new Grouping(key, group) as TResult);
        const result = dict.select(pair => resSelector(pair.key, pair.value));
        return result[Symbol.iterator]();
    }
}
