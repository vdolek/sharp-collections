import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { PredicateEqualityComparer } from '../../../comparers/PredicateEqualityComparer';
import { SelectorEqualityComparer } from '../../../comparers/SelectorEqualityComparer';

declare module '../../../comparers/EqualityComparer' {
    namespace EqualityComparer {
        function fromSelector<TSource, TKey>(selector: (value: TSource) => TKey, keyEqualityComparer?: EqualityComparer<TKey>): EqualityComparer<TSource>;
    }
}

function fromSelector<TSource, TKey>(selector: (value: TSource) => TKey, keyEqualityComparer?: EqualityComparer<TKey>): EqualityComparer<TSource> {
    return new SelectorEqualityComparer<TSource, TKey>(selector, keyEqualityComparer);
}

EqualityComparer.fromSelector = fromSelector;
