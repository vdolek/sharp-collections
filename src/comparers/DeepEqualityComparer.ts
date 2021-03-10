// @ts-ignore
import equal from 'fast-deep-equal';
import stringify from 'fast-json-stable-stringify';

import { HashCode } from '../hashing/HashCode';

import { EqualityComparer } from './EqualityComparer';

export class DeepEqualityComparer<T> extends EqualityComparer<T> {
    public equals(value1: T, value2: T): boolean {
        // tslint:disable-next-line:no-unsafe-any
        return equal(value1, value2);
    }

    public getHashCode(value: T): number {
        const str = stringify(value, {
            cycles: false // this has to be false, because of compatibility with deepEqual
        });

        return HashCode.getHashCode(str);
    }
}
