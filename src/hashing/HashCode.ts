/* tslint:disable:no-bitwise */

import { Enumerable } from '../collections/Enumerable';

export class HashCode {
    private static lastHashCode = 0;
    private static readonly objectHashCodes = new WeakMap<{ }, number>();

    public static getHashCode<T>(value: T): number {
        if (value == null) {
            return 561691612;
        }

        switch (typeof value) {
            case 'boolean': return HashCode.hashBoolean(value, 2354214525);
            case 'number': return HashCode.hashNumber(value, 1312455877);
            case 'string': return HashCode.hashString(value, 1745632457);
            case 'object': return HashCode.hashObject(value, 2031456879);
            case 'symbol': return HashCode.hashString(value.toString(), 1942554899);
            default: throw new Error(`Not supported type for hashing (${typeof value})`);
        }
    }

    public static combine(hashCodes: Iterable<number>): number {
        return HashCode.combineInner(hashCodes, 0);
    }

    public static combineParams(...hashCodes: number[]): number {
        return HashCode.combineInner(hashCodes, 0);
    }

    private static hashBoolean(bool: boolean, seed: number): number {
        return HashCode.hashNumber(bool ? 1 : 0, seed);
    }

    private static hashNumber(num: number, seed: number): number {
        if (Number.isFinite(num)) {
            return HashCode.combineInner(Enumerable.single(num), seed);
        }

        return 0;
    }

    private static hashString(value: string, seed: number): number {
        const charCodes = Enumerable.from(value).select(x => x.charCodeAt(0));
        return HashCode.combineInner(charCodes, seed); // TODO test
    }

    private static hashObject<T>(value: T, seed: number): number {
        let hashCode = HashCode.objectHashCodes.get(value);
        if (hashCode == null) {
            hashCode = HashCode.hashNumber(++HashCode.lastHashCode, seed);
            HashCode.objectHashCodes.set(value, hashCode);
        }

        return hashCode;
    }

    // source: https://stackoverflow.com/a/52171480/2262449
    private static combineInner(source: Iterable<number>, seed: number): number {
        let h1 = seed ^ 0xDEADBEEF;
        let h2 = seed ^ 0x41C6CE57;

        for (const hashCode of source) {
            h1 = Math.imul(h1 ^ hashCode, 2654435761);
            h2 = Math.imul(h2 ^ hashCode, 1597334677);
        }

        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return (h2 & 2097151) * 4294967296 + (h1 >>> 0);
    }
}
