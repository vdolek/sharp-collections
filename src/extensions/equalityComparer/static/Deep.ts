import { DeepEqualityComparer } from '../../../comparers/DeepEqualityComparer';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../comparers/EqualityComparer' {
    namespace EqualityComparer {
        function deep<T>(): EqualityComparer<T>;
    }
}

function deep<T>(): EqualityComparer<T> {
    return new DeepEqualityComparer<T>();
}

EqualityComparer.deep = deep;
