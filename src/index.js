import React from 'react';
import PropTypes from 'prop-types';
import { PLACE_IDENTIFIER } from './const';
import { toArray, groupChildren } from './util';

export const withLayout = Component => {
    const WithLayoutHOC = ({ children, ...props }) => {
        const childArray = toArray(children);
        const { realChildren, placeObj } = groupChildren(childArray);

        return (
            <Component
                child={placeObj}
                children={realChildren}
                {...props}
            />
        );
    };

    WithLayoutHOC.propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
    };

    WithLayoutHOC.displayName = 'WithLayoutHOC';

    return WithLayoutHOC;
};

export const Place = ({ toBe = '', children = [] }) => ({
    ...children,
    isPlaceChild: true,
});

Place[PLACE_IDENTIFIER] = true;
Place.displayName = 'Place';
Place.propTypes = {
    toBe: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
