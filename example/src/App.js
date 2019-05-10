import React from 'react'
import { withLayout, Place } from 'lay-it-out';

const LayoutTemplate = ({ child = {} }) => (
    <div className="view-a">
        <header>{ child.header }</header>
        { child.intro }
        <aside>{ child.sidebar }</aside>
    </div>
);

const Layout = withLayout(LayoutTemplate);

const App = () => (
    <Layout>
        <Place toBe="header">
            <h1>Here is the header</h1>
        </Place>

        <Place toBe="intro">
            <p>intro text</p>
        </Place>

        <Place toBe="sidebar">
            <ul>
                <li>link1</li>
                <li>link2</li>
                <li>link3</li>
            </ul>
        </Place>
    </Layout>
);

export default App;
