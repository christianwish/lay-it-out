import React from 'react';
import PropTypes from 'prop-types';
import { PLACE_IDENTIFIER, HOC_DISPLAY_NAME } from './const';
import { toArray, groupChildren } from './util';

export const withLayout = (Component, options) => {
    const WithLayoutHOC = ({ children, ...props } = {}) => {
        const childArray = toArray(children);
        const { realChildren, placeObj } = groupChildren(childArray);

        const validOptions = (options && typeof options === 'object')
            ? options
            : {};

        const { customChildPropName } = validOptions;
        const customChildPropNameString = (typeof customChildPropName === 'string')
            ? customChildPropName.trim()
            : '';

        const childPropName = (
            customChildPropNameString
            && customChildPropNameString !== 'children'
                ? customChildPropNameString
                : 'child'
        );

        const componentProps = {
            [childPropName]: placeObj,
            children: realChildren,
            ...props,
        };

        return <Component {...componentProps} />;
    };

    WithLayoutHOC.propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
    };

    WithLayoutHOC.displayName = HOC_DISPLAY_NAME;

    return WithLayoutHOC;
};

const empty = {};
export const Place = ({ toBe = '', children = [] }) => empty;

Place[PLACE_IDENTIFIER] = true;
Place.displayName = 'Place';
Place.propTypes = {
    toBe: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
