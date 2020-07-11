import { EqualityComparer } from '@src/Internal';

export class DefaultEqualityComparer<T> extends EqualityComparer<T> {
    public equals(value1: T, value2: T): boolean {
        return value1 === value2;
    }
}
