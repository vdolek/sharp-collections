import { ArrayEnumerable } from '../enumerables/ArrayEnumerable';
import { Errors } from '../Errors';

/**
 * Represents a read-only linked list of objects.
 */
export class ReadOnlyList<T> extends ArrayEnumerable<T> {
    public constructor(source?: Iterable<T>) {
        super(Array.from(source ?? []));
    }

    public get size(): number {
        return this.source.length;
    }

    public containsIndex(index: number): boolean {
        if (Math.round(index) !== index) {
            throw Errors.indexNotInteger();
        }

        return index >= 0 && index < this.source.length;
    }

    public get(index: number): T {
        if (!this.containsIndex(index)) {
            throw Errors.indexOutOfRange();
        }

        return this.source[index];
    }

    public getOrDefault(index: number): T | undefined {
        if (!this.containsIndex(index)) {
            return undefined;
        }

        return this.source[index];
    }
}
