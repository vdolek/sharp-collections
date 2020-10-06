import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { PredicateEqualityComparer } from '../../../comparers/PredicateEqualityComparer';

declare module '../../../comparers/EqualityComparer' {
    namespace EqualityComparer {
        function fromSelector<TSource, TKey>(selector: (value: TSource) => TKey, keyEqualityComparer?: EqualityComparer<TKey>): EqualityComparer<TSource>;
    }
}

function fromSelector<TSource, TKey>(selector: (value: TSource) => TKey, keyEqualityComparer?: EqualityComparer<TKey>): EqualityComparer<TSource> {
    const comparer = keyEqualityComparer ?? EqualityComparer.getDefault();
    return new PredicateEqualityComparer<TSource>(
        (x, y) => comparer.equals(selector(x), selector(y)),
        x => comparer.getHashCode(selector(x)));
}

EqualityComparer.fromSelector = fromSelector;
