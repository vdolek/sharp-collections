import { Comparer } from './Comparer';

export class CombinedComparer<T> extends Comparer<T> {
    public constructor(
        private readonly firstComparer: Comparer<T>,
        private readonly secondComparer: Comparer<T>
    ) {
        super();
    }

    public compare(value1: T, value2: T): number {
        const first = this.firstComparer.compare(value1, value2);
        if (first !== 0) {
            return first;
        }

        const second = this.secondComparer.compare(value1, value2);
        return second;
    }
}
