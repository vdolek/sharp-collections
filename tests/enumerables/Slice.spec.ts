import { List } from '@sharp-collections';
import { expect } from 'chai';

describe('slice tests', () => {
    it('simple test', () => {
        const list = List.fromElements(2, 4, 6, 8, 10);
        const sliced = list.slice(2, 2);

        expect(sliced.toArray()).to.be.deep.equal([6, 8]);
    });
});
