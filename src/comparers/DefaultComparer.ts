import { Comparer } from './Comparer';

export class DefaultComparer<T> extends Comparer<T> {
    public compare(value1: T, value2: T): number {
        if (value1 === value2) {
            return 0;
        }

        // tslint:disable-next-line:strict-comparisons
        const result = value1 < value2 ? -1 : 1;
        return result;
    }
}
