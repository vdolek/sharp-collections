import { Comparer } from '../../../comparers/Comparer';
import { InverseComparer } from '../../../comparers/InverseComparer';

declare module '../../../comparers/Comparer' {
    namespace Comparer {
        function invert<T>(comparer: Comparer<T>, invert?: boolean): Comparer<T>;
    }
}

function invertFunction<T>(comparer: Comparer<T>, invert: boolean = true): Comparer<T> {
    return invert ? new InverseComparer(comparer) : comparer;
}

Comparer.invert = invertFunction;
