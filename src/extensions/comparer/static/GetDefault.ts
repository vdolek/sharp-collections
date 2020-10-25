import { Comparer } from '../../../comparers/Comparer';
import { DefaultComparer } from '../../../comparers/DefaultComparer';

declare module '../../../comparers/Comparer' {
    namespace Comparer {
        function getDefault<T>(): Comparer<T>;
    }
}

function getDefault<T>(): Comparer<T> {
    return new DefaultComparer<T>();
}

Comparer.getDefault = getDefault;
