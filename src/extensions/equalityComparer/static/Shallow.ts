import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { ShallowEqualityComparer } from '../../../comparers/ShallowEqualityComparer';

declare module '../../../comparers/EqualityComparer' {
    namespace EqualityComparer {
        function shallow<T>(): EqualityComparer<T>;
    }
}

function shallow<T>(): EqualityComparer<T> {
    return new ShallowEqualityComparer<T>();
}

EqualityComparer.shallow = shallow;
