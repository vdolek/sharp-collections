import { DefaultEqualityComparer } from '../../../comparers/DefaultEqualityComparer';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../comparers/EqualityComparer' {
    namespace EqualityComparer {
        function getDefault<T>(): EqualityComparer<T>;
    }
}

function getDefault<T>(): EqualityComparer<T> {
    return new DefaultEqualityComparer<T>();
}

EqualityComparer.getDefault = getDefault;
