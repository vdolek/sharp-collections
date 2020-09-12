/**
 * Represents a collection which supports a simple iteration.
 */
export abstract class Enumerable<T> implements Iterable<T> {
    public abstract [Symbol.iterator](): Iterator<T>;
}
