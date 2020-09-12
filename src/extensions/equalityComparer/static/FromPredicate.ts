import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { PredicateEqualityComparer } from '../../../comparers/PredicateEqualityComparer';

declare module '../../../comparers/EqualityComparer' {
    namespace EqualityComparer {
        function fromPredicate<T>(predicate: (value1: T, value2: T) => boolean): EqualityComparer<T>;
    }
}

function fromPredicate<T>(predicate: (value1: T, value2: T) => boolean): EqualityComparer<T> {
    return new PredicateEqualityComparer<T>(predicate);
}

EqualityComparer.fromPredicate = fromPredicate;
