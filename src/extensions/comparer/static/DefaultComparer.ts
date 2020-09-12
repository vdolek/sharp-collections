import { Comparer } from '../../../comparers/Comparer';
import { DefaultComparer } from '../../../comparers/DefaultComparer';

declare module '../../../comparers/Comparer' {
    namespace Comparer {
        function defaultComparer<T>(): Comparer<T>;
    }
}

function defaultComparer<T>(): Comparer<T> {
    return new DefaultComparer<T>();
}

Comparer.defaultComparer = defaultComparer;
