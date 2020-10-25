import { DefaultEqualityComparer } from '../comparers/DefaultEqualityComparer';
import { EqualityComparer } from '../comparers/EqualityComparer';
import { SelectorEqualityComparer } from '../comparers/SelectorEqualityComparer';
import { Errors } from '../Errors';

import { Enumerable } from './Enumerable';
import { EqualityComparerHashSet } from './internal/EqualityComparerHashSet';
import { HashSetAbstraction } from './internal/HashSetAbstraction';
import { SelectorEqualityHashSet } from './internal/SelectorEqualityHashSet';
import { SimpleHashSet } from './internal/SimpleHashSet';

/**
 * Represents a read-only set of values.
 */
export class ReadOnlyHashSet<T> extends Enumerable<T> {
    protected readonly internalHashSet: HashSetAbstraction<T>;

    public constructor();
    public constructor(source?: Iterable<T>);
    public constructor(comparer?: EqualityComparer<T>);
    public constructor(source?: Iterable<T>, comparer?: EqualityComparer<T>);
    public constructor(a?: Iterable<T> | EqualityComparer<T>, b?: EqualityComparer<T>) {
        super();

        let source: Iterable<T> | undefined;
        let comparer: EqualityComparer<T> | undefined;

        if (a instanceof EqualityComparer) {
            source = undefined;
            comparer = a;
        } else {
            source = a;
            comparer = b;
        }

        if (comparer == null || comparer instanceof DefaultEqualityComparer) {
            this.internalHashSet = new SimpleHashSet<T>();
        } else if (comparer instanceof SelectorEqualityComparer) {
            // tslint:disable-next-line:no-any
            this.internalHashSet = new SelectorEqualityHashSet<T, any>(comparer.keySelector);
        } else {
            this.internalHashSet = new EqualityComparerHashSet<T>(comparer);
        }

        if (source != null) {
            for (const element of source) {
                this.addInternal(element);
            }
        }
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.internalHashSet[Symbol.iterator]();
    }

    public get size(): number {
        return this.internalHashSet.getSize();
    }

    public contains(element: T): boolean {
        return this.internalHashSet.contains(element);
    }

    protected addInternal(element: T): void {
        if (this.contains(element)) {
            throw Errors.elementAlreadyAdded();
        }

        this.internalHashSet.set(element);
    }
}
