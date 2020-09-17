import { Comparer } from './Comparer';

export class InverseComparer<T> extends Comparer<T> {
    public constructor(private readonly innerComparer: Comparer<T>) {
        super();
    }

    public compare(value1: T, value2: T): number {
        return -this.innerComparer.compare(value1, value2);
    }
}
