import { CombinedComparer } from '../../../comparers/CombinedComparer';
import { Comparer } from '../../../comparers/Comparer';

declare module '../../../comparers/Comparer' {
    namespace Comparer {
        function combine<T>(firstComparer: Comparer<T>, secondComparer: Comparer<T>): Comparer<T>;
    }
}

function combine<T>(firstComparer: Comparer<T>, secondComparer: Comparer<T>): Comparer<T> {
    return new CombinedComparer(firstComparer, secondComparer);
}

Comparer.combine = combine;
