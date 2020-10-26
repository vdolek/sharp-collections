import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { SelectorEqualityComparer } from '../../../comparers/SelectorEqualityComparer';

declare module '../../../comparers/EqualityComparer' {
    namespace EqualityComparer {
        function fromSelector<TSource, TKey>(selector: (value: TSource) => TKey, innerComparer?: EqualityComparer<TKey>): EqualityComparer<TSource>;
    }
}

function fromSelector<TSource, TKey>(selector: (value: TSource) => TKey, innerComparer?: EqualityComparer<TKey>): EqualityComparer<TSource> {
    const comparer = innerComparer ?? EqualityComparer.getDefault();
    return new SelectorEqualityComparer<TSource, TKey>(selector, comparer);
}

EqualityComparer.fromSelector = fromSelector;
