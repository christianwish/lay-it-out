import React from 'react'
import { withLayout, Place } from 'lay-it-out';

const LayoutTemplate = ({ child = {} }) => (
    <div className="layout-xyz">
        <header className="sand">{ child.header }</header>
        <section className="water">{ child.intro }</section>
        <aside className="sidebar night">
            { child.sidebar }
            <div className="special">
                { child.specialPlace }
            </div>
        </aside>
        <footer class="fire">{ child.creditNotes }</footer>
    </div>
);

const Layout = withLayout(LayoutTemplate);
const App = () => (
    <Layout>
        <Place toBe="header">
            <h1>Here is the header</h1>
        </Place>

        <Place toBe="intro">
            <h2>intro headline</h2>
            <p>intro text</p>
        </Place>

        <Place toBe="sidebar">
            <h3>Sidebar</h3>
            <ul>
                <li>link1</li>
                <li>link2</li>
                <li>link3</li>
            </ul>
        </Place>

        <Place toBe="specialPlace">
            <h4>specialPlace</h4>
            <p>special text</p>
        </Place>

        <Place toBe="creditNotes">
            Thanks for watching.
        </Place>
    </Layout>
);

export default App;
