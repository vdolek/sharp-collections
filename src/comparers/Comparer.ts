import { InverseComparer } from '../internal';

export abstract class Comparer<T> {
    public abstract compare(value1: T, value2: T): number;

    public invert(invert: boolean = true): Comparer<T> {
        return invert ? new InverseComparer(this) : this;
    }
}
