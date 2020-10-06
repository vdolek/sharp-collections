export interface HashSetAbstraction<T> {
    [Symbol.iterator](): Iterator<T>;

    contains(element: T): boolean;
    getSize(): number;

    clear(): void;
    remove(element: T): boolean;
    set(element: T): void;
}
