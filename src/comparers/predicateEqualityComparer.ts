import { EqualityComparer } from '@src/internal';

export class PredicateEqualityComparer<T> extends EqualityComparer<T> {
    public constructor(private readonly predicate: (value1: T, value2: T) => boolean) {
        super();
    }

    public equals(value1: T, value2: T): boolean {
        return this.predicate(value1, value2);
    }
}
