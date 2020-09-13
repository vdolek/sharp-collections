import { expect } from 'chai';

import { List } from '../../src/index';

describe('firstOrDefault tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.firstOrDefault();

        expect(value).to.be.equal(2);
    });

    it('simple predicate test', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.firstOrDefault(x => x > 3);

        expect(value).to.be.equal(4);
    });

    it('empty source test', () => {
        const list = List.fromRest<number>();
        const value = list.firstOrDefault();

        expect(value).to.be.undefined;
    });

    it('empty source predicate test', () => {
        const list = List.fromRest<number>();
        const value = list.firstOrDefault(x => x > 3);

        expect(value).to.be.undefined;
    });

    it('empty source predicate test 2', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.firstOrDefault(x => x > 10);

        expect(value).to.be.undefined;
    });
});
