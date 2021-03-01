import { ReadOnlyList } from './ReadOnlyList';

/**
 * Represents a linked list of objects.
 */
export class List<T> extends ReadOnlyList<T> {
    public add(value: T): void {
        this.source.push(value);
    }

    public asReadOnly(): ReadOnlyList<T> {
        return this;
    }

    public remove(index: number): void {
        this.source.splice(index, 1);
    }

    public set(index: number, value: T): void {
        if (index < 0 || index >= this.source.length) {
            throw new Error('The index was out of range of the list.');
        }

        this.source[index] = value;
    }

    public clear(): void {
        this.source.length = 0;
    }
}
