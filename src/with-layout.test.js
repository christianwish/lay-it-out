import React from 'react';
import { create } from 'react-test-renderer';
import { withLayout, Place } from './index';

const TestScenario = (TestComponent, withLayoutOptionsObj = {}) => {
    const TestLayout = withLayout(TestComponent, withLayoutOptionsObj);

    it('renders when no children are given', () => {
        const wrapper = create(<TestLayout />).root;
        const actual = wrapper.findByProps({ id: 'wrapper' });
        expect(actual).toBeTruthy();
    });

    it('add no children to "child" prop when they are not wrappes into <Place>', () => {
        const wrapper = create(
            <TestLayout>
                <div id="noChild">No Child</div>
            </TestLayout>
        ).root;
        const actual = wrapper.findAllByProps({ id: 'noChild' }).length;
        const expected = 0;
        expect(actual).toEqual(expected);
    });

    it(`adds children to "child" prop when they are wrapped into <Place>,
    But just renders them when child key is used in layout`, () => {
        {
            const wrapper = create(
                <TestLayout>
                    <Place toBe="place1">
                        <div id="child">Child</div>
                    </Place>
                </TestLayout>
            ).root;
            const actual = wrapper.findAllByProps({ id: 'child' }).length;
            const expected = 1;
            expect(actual).toEqual(expected);
        }
        {
            const wrapper = create(
                <TestLayout>
                    <Place toBe="place1">
                        TestChildString
                    </Place>
                </TestLayout>
            );
            const actual = JSON.stringify(wrapper.toJSON()).match('TestChildString');
            expect(actual).toBeTruthy();
        }
        {
            const wrapper = create(
                <TestLayout>
                    <Place toBe="place1">
                        {null}
                        {undefined}
                    </Place>
                </TestLayout>
            );
            const actual = wrapper.toJSON().children;
            const expected = null;
            expect(actual).toEqual(expected);
        }
        {
            const wrapper = create(
                <TestLayout>
                    <Place toBe="place-wrong">
                        <div id="child">Child</div>
                    </Place>
                </TestLayout>
            ).root;
            const actual = wrapper.findAllByProps({ id: 'child' }).length;
            const expected = 0;
            expect(actual).toEqual(expected);
        }
    });

    it('collects all <Places> by prop "toBe"', () => {
        const wrapper = create(
            <TestLayout>
                <Place toBe="place1">
                    <div className="child">Child</div>
                </Place>
                <Place toBe="place1">
                    <div className="child">Child</div>
                </Place>
            </TestLayout>
        ).root;
        const actual = wrapper.findAllByProps({ className: 'child' }).length;
        const expected = 2;
        expect(actual).toEqual(expected);
    });

    it('supports other props', () => {
        {
            const wrapper = create(
                <TestLayout hasAdditionalProp>
                    <Place toBe="place1">
                        <div className="child">Child</div>
                    </Place>
                    <Place toBe="place1">
                        <div className="child">Child</div>
                    </Place>
                </TestLayout>
            ).root;
            const actual = wrapper.findAllByProps({ id: 'additional-prop' }).length;
            const expected = 1;
            expect(actual).toEqual(expected);
        }
        {
            const wrapper = create(
                <TestLayout hasAdditionalProp={false}>
                    <Place toBe="place1">
                        <div className="child">Child</div>
                    </Place>
                    <Place toBe="place1">
                        <div className="child">Child</div>
                    </Place>
                </TestLayout>
            ).root;
            const actual = wrapper.findAllByProps({ id: 'additional-prop' }).length;
            const expected = 0;
            expect(actual).toEqual(expected);
        }
    });

    it('collects all children not wrapped in Place as "children" prop', () => {
        const TestChildren = ({ child = {}, children }) => (
            <div id="wrapper">
                {child.place1}
                {children}
            </div>
        );

        const ChildrenLayout = withLayout(TestChildren);

        const wrapper = create(
            <ChildrenLayout>
                <Place toBe="place1">
                    <div className="child">Child</div>
                </Place>
                <Place toBe="place1">
                    <div className="child">Child</div>
                </Place>
                <span className="real-child" />
                <span className="real-child" />
                <span className="real-child" />
            </ChildrenLayout>
        ).root;
        {
            const actual = wrapper.findAllByProps({ className: 'child' }).length;
            const expected = 2;
            expect(actual).toEqual(expected);
        }
        {
            const actual = wrapper.findAllByProps({ className: 'real-child' }).length;
            const expected = 3;
            expect(actual).toEqual(expected);
        }
    });
};

describe('withLayout(Component, options = {})', () => {
    const TestComponent = ({ child = {}, hasAdditionalProp }) => (
        <div id="wrapper">
            {child.place1}
            {
                hasAdditionalProp
                && <span id="additional-prop" />
            }
        </div>
    );

    TestScenario(TestComponent, undefined);
});

describe('withLayout works when options accidentally not of type object', () => {
    const TestComponent = ({ child = {}, hasAdditionalProp }) => (
        <div id="wrapper">
            {child.place1}
            {
                hasAdditionalProp
                && <span id="additional-prop" />
            }
        </div>
    );

    TestScenario(TestComponent, null);
    TestScenario(TestComponent, /regex/);
});

describe('withLayout { customChildPropName: "custom" } )', () => {
    const TestComponent = ({ custom = {}, hasAdditionalProp }) => (
        <div id="wrapper">
            {custom.place1}
            {
                hasAdditionalProp
                && <span id="additional-prop" />
            }
        </div>
    );

    TestScenario(TestComponent, { customChildPropName: 'custom' });
});

describe('customChildPropName uses "child" when a empty string is given', () => {
    const TestComponent = ({ child = {}, hasAdditionalProp }) => (
        <div id="wrapper">
            {child.place1}
            {
                hasAdditionalProp
                && <span id="additional-prop" />
            }
        </div>
    );

    TestScenario(TestComponent, { customChildPropName: '' });
});

describe('customChildPropName trims whitespace', () => {
    const TestComponent = ({ whitespace = {}, hasAdditionalProp }) => (
        <div id="wrapper">
            {whitespace.place1}
            {
                hasAdditionalProp
                && <span id="additional-prop" />
            }
            {whitespace.place2}
        </div>
    );

    TestScenario(TestComponent, { customChildPropName: '  whitespace  ' });
});

describe('customChildPropName uses "child" not of type string', () => {
    const TestComponent = ({ child = {}, hasAdditionalProp }) => (
        <div id="wrapper">
            {child.place1}
            {
                hasAdditionalProp
                && <span id="additional-prop" />
            }
        </div>
    );

    TestScenario(TestComponent, { customChildPropName: 123 });
    TestScenario(TestComponent, { customChildPropName: /regex/ });
});

describe('customChildPropName uses "child" when "children is given', () => {
    const TestComponent = ({ child = {}, hasAdditionalProp }) => (
        <div id="wrapper">
            {child.place1}
            {
                hasAdditionalProp
                && <span id="additional-prop" />
            }
        </div>
    );

    TestScenario(TestComponent, { customChildPropName: 'children' });
});
