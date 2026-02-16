import { Enumerable } from '../collections/Enumerable';
import { HashCode } from '../hashing/HashCode';

import { EqualityComparer } from './EqualityComparer';

export class ShallowEqualityComparer<T> extends EqualityComparer<T> {
    public equals(value1: T, value2: T): boolean {
        if (typeof value1 !== typeof value2) {
            return false;
        }

        if (typeof value1 !== 'object') {
            return value1 === value2;
        }

        const keys1 = Object.getOwnPropertyNames(value1);
        const keys2 = Object.getOwnPropertyNames(value1);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1.concat(...keys2)) {
            if ((value1 as Record<string, unknown>)[key] !== (value2 as Record<string, unknown>)[key]) {
                return false;
            }
        }

        return true;
    }

    public getHashCode(value: T): number {
        if (typeof value !== 'object') {
            return HashCode.getHashCode(value);
        }

        const hashCodes = Enumerable.from(Object.getOwnPropertyNames(value))
            .orderBy(x => x)
            .selectMany(x => [x, (value as Record<string, unknown>)[x]])
            .select(x => HashCode.getHashCode(x));

        return HashCode.combine(hashCodes);
    }
}
