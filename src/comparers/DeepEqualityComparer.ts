import equal from 'fast-deep-equal';
import stringify from 'fast-json-stable-stringify';

import { HashCode } from '../hashing/HashCode';

import { EqualityComparer } from './EqualityComparer';

export class DeepEqualityComparer<T> extends EqualityComparer<T> {
    public equals(value1: T, value2: T): boolean {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
        return equal(value1, value2) as boolean;
    }

    public getHashCode(value: T): number {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const str = (stringify as any)(value, {
            cycles: false // this has to be false, because of compatibility with deepEqual
        });

        return HashCode.getHashCode(str);
    }
}
