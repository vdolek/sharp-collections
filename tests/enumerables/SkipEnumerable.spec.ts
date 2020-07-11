import { List } from '@src/Internal';
import { expect } from 'chai';

describe('SkipEnumerable tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6, 8, 10);

        expect(list.skip(0).toArray()).to.be.deep.equal([2, 4, 6, 8, 10]);
        expect(list.skip(1).toArray()).to.be.deep.equal([4, 6, 8, 10]);
        expect(list.skip(3).toArray()).to.be.deep.equal([8, 10]);
        expect(list.skip(5).toArray()).to.be.empty;
        expect(list.skip(10).toArray()).to.be.empty;
    });
});
