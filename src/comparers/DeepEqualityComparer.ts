import deepEqual from 'deep-equal';
import stringify from 'fast-json-stable-stringify';

import { HashCode } from '../hashing/HashCode';

import { EqualityComparer } from './EqualityComparer';

export class DeepEqualityComparer<T> extends EqualityComparer<T> {
    public equals(value1: T, value2: T): boolean {
        return deepEqual(value1, value2, {
            strict: true
        });
    }

    public getHashCode(value: T): number {
        const str = stringify(value, {
            cycles: false // this has to be false, because of compatibility with deepEqual
        });

        return HashCode.getHashCode(str);
    }
}
