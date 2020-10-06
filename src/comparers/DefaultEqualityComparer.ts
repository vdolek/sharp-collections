import { HashCode } from '../hashing/HashCode';

import { EqualityComparer } from './EqualityComparer';

export class DefaultEqualityComparer<T> extends EqualityComparer<T> {
    public equals(value1: T, value2: T): boolean {
        return value1 === value2;
    }

    public getHashCode(value: T): number {
        return HashCode.getHashCode(value);
    }
}
