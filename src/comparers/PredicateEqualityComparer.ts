import { HashCode } from '../hashing/HashCode';

import { EqualityComparer } from './EqualityComparer';

export class PredicateEqualityComparer<T> extends EqualityComparer<T> {
    public constructor(
        private readonly predicate: (value1: T, value2: T) => boolean,
        private readonly getHashCodeFunc?: (value: T) => number) {
        super();
    }

    public equals(value1: T, value2: T): boolean {
        return this.predicate(value1, value2);
    }

    public getHashCode(value: T): number {
        if (this.getHashCodeFunc != null) {
            return this.getHashCodeFunc(value);
        }

        return HashCode.getHashCode(value);
    }
}
