import { Enumerable, Errors, List } from '@sharp-collections';

export enum ElementsAtNotFoundBehavior {
    throw,
    ignore,
    returnNull
}

export class ElementsAtEnumerable<T> extends Enumerable<T | null> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly indexes: Iterable<number>,
        private readonly behavior: ElementsAtNotFoundBehavior
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T | null> {
        const buffer = List.from(this.source);
        for (const index of this.indexes) {
            if (buffer.containsIndex(index)) {
                yield buffer.get(index);
            } else {
                switch (this.behavior) {
                    case ElementsAtNotFoundBehavior.throw: throw Errors.indexOutOfRange();
                    case ElementsAtNotFoundBehavior.returnNull: yield null; break;
                    case ElementsAtNotFoundBehavior.ignore: break;
                    default: throw Errors.argumentOutOfRange();
                }
            }
        }
    }
}
