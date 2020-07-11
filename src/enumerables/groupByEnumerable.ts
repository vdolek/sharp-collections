import { Dictionary, Enumerable, Grouping } from '@src/internal';

export class GroupByEnumerable<TKey, TValue> extends Enumerable<Grouping<TKey, TValue>> {
    public constructor(
        protected readonly source: Enumerable<TValue>,
        protected readonly keySelector: (value: TValue, index: number) => TKey) {
        super();
    }

    public [Symbol.iterator](): Iterator<Grouping<TKey, TValue>> {
        const dict = new Dictionary<TKey, Grouping<TKey, TValue>>();

        let index = 0;
        for (const element of this.source) {
            const key = this.keySelector(element, index++);

            if (!dict.containsKey(key)) {
                dict.add(key, new Grouping(key));
            }

            dict.get(key).add(element);
        }

        return dict.values()[Symbol.iterator]();
    }
}
