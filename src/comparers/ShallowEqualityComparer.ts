import { Enumerable } from '../collections/Enumerable';
import { HashCode } from '../hashing/HashCode';

import { EqualityComparer } from './EqualityComparer';

export class ShallowEqualityComparer<T> extends EqualityComparer<T> {
    public equals(value1: T, value2: T): boolean {
        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value1);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1.concat(...keys2)) {
            // @ts-ignore
            if (value1[key] !== value2[key]) {
                return false;
            }
        }

        return true;
    }

    public getHashCode(value: T): number {
        const hashCodes = Enumerable.from(Object.keys(value))
            .orderBy(x => x)
            // @ts-ignore
            .selectMany(x => [x, value[x]])
            .select(x => HashCode.getHashCode(x));

        return HashCode.combine(hashCodes);
    }
}
