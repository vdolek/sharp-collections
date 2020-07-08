import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('SelectManyEnumerable tests', () => {
    it('Simple test', () => {
        const e1 = new ArrayEnumerable([
            { dummy: new ArrayEnumerable([2, 4, 6]) },
            { dummy: new ArrayEnumerable([]) },
            { dummy: new ArrayEnumerable([3, 5]) },
            { dummy:  new ArrayEnumerable([9]) }
        ]);

        const e2 = e1.selectMany(x => x.dummy);

        expect(e2.toArray()).to.be.deep.equal([2, 4, 6, 3, 5, 9]);
    });
});
