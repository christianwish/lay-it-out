import React from 'react';
import PropTypes from 'prop-types';
import { PLACE_IDENTIFIER } from './const';

const toArray = x => Array.isArray(x)
    ? x
    : typeof x === 'undefined'
        ? []
        : [x];

const noPlaceComponent = ({ type = {} }) => !type[PLACE_IDENTIFIER];

const isNotPlace = ({ props, type }) => (
    !type[PLACE_IDENTIFIER]
    || typeof props.toBe !== 'string'
    || props.toBe === ''
    || typeof props.children === 'undefined'
);

const groupPlaces = xs => xs.reduce((acc, { props, type }) => {
    if (isNotPlace({ props, type })) return acc;

    const { toBe } = props;

    return {
        ...acc,
        [toBe]: (Array.isArray(acc[toBe]))
            ? [...acc[toBe], props.children]
            : [props.children],
    };
}, {});

export const withLayout = Component => ({ children, ...props }) => {
    const childArray = toArray(children);
    const realChildren = childArray.filter(noPlaceComponent);
    const childObj = groupPlaces(childArray);

    return (
        <Component
            child={childObj}
            children={realChildren}
            {...props}
        />
    );
};

export const Place = ({ toBe = '', children = [] }) => ({
    ...children,
    isPlaceChild: true,
});

Place[PLACE_IDENTIFIER] = true;
Place.propTypes = {
    toBe: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
