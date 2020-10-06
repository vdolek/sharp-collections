import { Pair } from '../../models/Pair';
import { Enumerable } from '../Enumerable';

export interface DictionaryAbstraction<TKey, TValue> {
    [Symbol.iterator](): Iterator<Pair<TKey, TValue>>;

    containsKey(key: TKey): boolean;
    getPair(key: TKey): Pair<TKey, TValue> | undefined;
    getSize(): number;
    keys(): Enumerable<TKey>;
    values(): Enumerable<TValue>;

    clear(): void;
    remove(key: TKey): boolean;
    set(key: TKey, value: TValue): void;
}
