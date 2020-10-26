import { Comparer } from '../../../comparers/Comparer';
import { SelectorComparer } from '../../../comparers/SelectorComparer';

declare module '../../../comparers/Comparer' {
    namespace Comparer {
        function fromSelector<TSource, TKey>(selector: (value: TSource) => TKey, innerComparer?: Comparer<TKey>): Comparer<TSource>;
    }
}

function fromSelector<TSource, TKey>(selector: (value: TSource) => TKey, innerComparer?: Comparer<TKey>): Comparer<TSource> {
    const comparer = innerComparer ?? Comparer.getDefault();
    return new SelectorComparer<TSource, TKey>(selector, comparer);
}

Comparer.fromSelector = fromSelector;
