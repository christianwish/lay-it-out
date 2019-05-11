import { toArray, isNotPlace, groupChildren } from './util';
import { PLACE_IDENTIFIER } from './const';

describe('toArray(x)', () => {
    it('returns array', () => {
        const actual = Array.isArray(toArray());
        expect(actual).toBeTruthy();
    });

    it('returns empty array when x is undefined', () => {
        const actual = toArray(undefined);
        const expected = [];
        expect(actual).toEqual(expected);
    });

    it('returns empty array when x is empty array', () => {
        const actual = toArray([]);
        const expected = [];
        expect(actual).toEqual(expected);
    });

    it('returns x when x is array', () => {
        const actual = toArray(['test']);
        const expected = ['test'];
        expect(actual).toEqual(expected);
    });

    it('returns x when wrapped in array when x not of type array', () => {
        const actual = toArray('test');
        const expected = ['test'];
        expect(actual).toEqual(expected);
    });
});

describe('isNotPlace({ props, type })', () => {
    it('returns bool', () => {
        const actual = typeof isNotPlace();
        const expected = 'boolean';
        expect(actual).toEqual(expected);
    });

    it('returns true when x is undefined', () => {
        const actual = isNotPlace();
        const expected = true;
        expect(actual).toEqual(expected);
    });

    it('returns false when x has prop "toBe", "children" and type labeled for Place component', () => {
        const testPlace = {
            props: { toBe: 'toBeId', children: ['test'] },
            type: { [PLACE_IDENTIFIER]: true },
        };
        const actual = isNotPlace(testPlace);
        const expected = false;
        expect(actual).toEqual(expected);
    });
});

describe('groupChildren(children)', () => {
    it('returns object', () => {
        const actual = typeof groupChildren([]);
        const expected = 'object';
        expect(actual).toEqual(expected);
    });

    it('returns object with props realChildren: [], placeObj: {}', () => {
        const actual = groupChildren([]);
        const expected = { realChildren: [], placeObj: {} };
        expect(actual).toEqual(expected);
    });

    it('groups given array to realChildren: [] and placeObj: {}', () => {
        const children = [
            {
                props: { toBe: 'toBeId1', children: 'test1' },
                type: { [PLACE_IDENTIFIER]: true },
            },
            'child1',
            {
                props: { toBe: 'toBeId2', children: ['test2'] },
                type: { [PLACE_IDENTIFIER]: true },
            },
            'child2',
        ];
        const actual = groupChildren(children);
        const expected = {
            realChildren: ['child1', 'child2'],
            placeObj: {
                toBeId1: ['test1'],
                toBeId2: ['test2'],
            },
        };
        expect(actual).toEqual(expected);
    });
});
