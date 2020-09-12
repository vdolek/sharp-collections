import { DefaultEqualityComparer } from '../../../comparers/DefaultEqualityComparer';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../comparers/EqualityComparer' {
    namespace EqualityComparer {
        function defaultComparer<T>(): EqualityComparer<T>;
    }
}

function defaultComparer<T>(): EqualityComparer<T> {
    return new DefaultEqualityComparer<T>();
}

EqualityComparer.defaultComparer = defaultComparer;
