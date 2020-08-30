import { expect } from 'chai';

import { List } from '../../src/internal';

describe('skipWhile tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6, 8, 2)
            .skipWhile(x => x < 5);

        expect(list.toArray()).to.be.deep.equal([6, 8, 2]);
    });

    it('simple indexed test', () => {
        const list = List.fromRest(2, 4, 6, 8, 2)
            .skipWhile((x, idx) => idx < 3);

        expect(list.toArray()).to.be.deep.equal([8, 2]);
    });

    it('empty source test', () => {
        const list = List.empty<number>()
            .skipWhile(x => x < 5);

        expect(list.toArray()).to.be.empty;
    });

    it('empty result test', () => {
        const list = List.fromRest(2, 4, 6, 8, 2)
            .skipWhile(x => x < 10);

        expect(list.toArray()).to.be.empty;
    });
});
