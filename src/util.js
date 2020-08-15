import { PLACE_IDENTIFIER } from './const';

export const toArray = x => Array.isArray(x)
    ? x
    : typeof x === 'undefined'
        ? []
        : [x];

export const isNotPlace = ({ props, type = {} } = {}) => (
    !type[PLACE_IDENTIFIER]
    || typeof props.toBe !== 'string'
    || props.toBe === ''
    || typeof props.children === 'undefined'
);

export const groupChildren = xs => xs.reduce(({ placeObj, realChildren }, child) => {
    // child nodes that arn't `<Place>`
    // will be grouped in `children` prop
    if (isNotPlace(child)) {
        return {
            realChildren: [ ...realChildren, child ],
            placeObj,
        };
    }

    const { props: { toBe, children } } = child;
    const childrenArray = toArray(children);

    // the rest will collect in either a new <Place> `toBe` key
    // or a key thats already in the set
    const newPlaceObj = {
        ...placeObj,
        [toBe]: (Array.isArray(placeObj[toBe]))
            ? [...placeObj[toBe], ...childrenArray]
            : childrenArray,
    };

    return { realChildren, placeObj: newPlaceObj };
}, {
    realChildren: [],
    placeObj: {},
});
