import { List } from '@src/Internal';
import { expect } from 'chai';

describe('groupBy tests', () => {
    it('Simple test', () => {
        const list = List.from('Hello', 'Hi', 'Good morning', 'Bye', 'Good evening');
        const grouped = list
            .groupBy(x => x[0])
            .toList();

        const asArray = grouped
            .select(x => x.toArray())
            .toArray();

        expect(grouped.get(0).key).to.be.equals('H');
        expect(grouped.get(1).key).to.be.equals('G');
        expect(grouped.get(2).key).to.be.equals('B');

        expect(asArray).to.be.deep.equal([
            ['Hello', 'Hi'],
            ['Good morning', 'Good evening'],
            ['Bye']
        ]);
    });

    it('ElementSelector test', () => {
        const list = List.from('Hello', 'Hi', 'Good morning', 'Bye', 'Good evening');
        const grouped = list
            .groupBy(x => x[0], x => x.toUpperCase())
            .toList();

        const asArray = grouped
            .select(x => x.toArray())
            .toArray();

        expect(asArray).to.be.deep.equal([
            ['HELLO', 'HI'],
            ['GOOD MORNING', 'GOOD EVENING'],
            ['BYE']
        ]);
    });

    it('ResultSelector test', () => {
        const list = List.from('Hello', 'Hi', 'Good morning', 'Bye', 'Good evening');
        const groupedAsArray = list
            .groupBy(x => x[0], undefined, (key, group) => group.toArray())
            .toArray();

        expect(groupedAsArray).to.be.deep.equal([
            ['Hello', 'Hi'],
            ['Good morning', 'Good evening'],
            ['Bye']
        ]);
    });

    it('ResultSelector test', () => {
        const list = List.from('Hello', 'Hi', 'Good morning', 'Bye', 'Good evening');
        const groupedAsArray = list
            .groupBy(x => x[0], x => x.toUpperCase(), (key, group) => group.toArray())
            .toArray();

        expect(groupedAsArray).to.be.deep.equal([
            ['HELLO', 'HI'],
            ['GOOD MORNING', 'GOOD EVENING'],
            ['BYE']
        ]);
    });
});
