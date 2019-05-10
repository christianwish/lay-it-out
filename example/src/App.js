import React, { useEffect, Component, useState } from 'react'
import { withLayout, Place } from 'lay-it-out';

const MyLayout = withLayout(({ child = {}, children }) => (
    <div className="my-layout">
        { child.test1 }
        <aside>{ child.test2 }</aside>
        {children}
    </div>
));

const Something = ({ counter = 0 }) => {
    const [innerCounter, setInnerCounter] = useState(0);
    useEffect(() => {
        console.log('Something mounted');
    }, []);
    return (
        <React.Fragment>
            <h2 onClick={() => setInnerCounter(innerCounter + 1)}>
                inner counter: {innerCounter}
            </h2>
            <h3>
                counter: {counter}
            </h3>
        </React.Fragment>
    );
};

const App = () => {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <MyLayout>
                <Place toBe="test1">
                    <h1>Test1</h1>
                    <Something counter={counter} />
                </Place>
                <Place toBe="test1">
                    <h1 onClick={() => setCounter(counter + 1)}>Click Me</h1>
                </Place>
                <Place toBe="test2">Hello</Place>
                <Place toBe="test3"></Place>
                <div>NOLAYOUT</div>
            </MyLayout>
        </div>
    );
};

export default App;
