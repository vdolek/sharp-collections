/* tslint:disable:no-bitwise */

export class HashCode {
    private static lastHashCode = 0;
    private static readonly objectHashCodes = new WeakMap<{ }, number>();

    public static getHashCode<T>(value: T): number {
        if (value == null) {
            return 0;
        }

        if (typeof value === 'number') {
            if (isFinite(value)) {
                return HashCode.getNumberHashCode(value);
            }

            return 1;
        }

        if (typeof value === 'string') {
            return HashCode.getStringHashCode(value);
        }

        return HashCode.getObjectHashCode(value);
    }

    private static getNumberHashCode(value: number): number {
        const hashCode = value | 0; // convert to 32bit integer
        return hashCode;
    }

    private static getStringHashCode(value: string): number {
        const hashCode = HashCode.cyrb53(value);
        return hashCode;
    }

    private static getObjectHashCode<T>(value: T): number {
        let hashCode = HashCode.objectHashCodes.get(value);
        if (hashCode == null) {
            hashCode = HashCode.getNumberHashCode(++HashCode.lastHashCode);
            HashCode.objectHashCodes.set(value, hashCode);
        }

        return hashCode;
    }

    // source: https://stackoverflow.com/a/52171480/2262449
    private static cyrb53(str: string, seed: number = 0): number {
        let h1 = seed ^ 0xDEADBEEF;
        let h2 = seed ^ 0x41C6CE57;

        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }

        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return (h2 & 2097151) * 4294967296 + (h1 >>> 0);
    }
}
