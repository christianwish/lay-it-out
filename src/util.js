import { PLACE_IDENTIFIER } from './const';

export const toArray = x => Array.isArray(x)
    ? x
    : typeof x === 'undefined'
        ? []
        : [x];

export const noPlaceComponent = ({ type = {} }) => !type[PLACE_IDENTIFIER];

export const isNotPlace = ({ props, type = {} } = {}) => (
    !type[PLACE_IDENTIFIER]
    || typeof props.toBe !== 'string'
    || props.toBe === ''
    || typeof props.children === 'undefined'
);

export const groupChildren = xs => xs.reduce(({ placeObj, realChildren }, child) => {
    if (isNotPlace(child)) {
        return {
            realChildren: [ ...realChildren, child ],
            placeObj,
        };
    }

    const { props } = child;
    const { toBe, children } = props;

    const childrenArray = toArray(children);

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
