# lay-it-out

> React HOC and helper for complex layouts

When layouts get complex and you have to write a lot of jsx over and over again, this approach may help reuse layouts in a readable way.

[![NPM](https://img.shields.io/npm/v/lay-it-out.svg)](https://www.npmjs.com/package/lay-it-out)

## Install

```bash
npm install --save lay-it-out
```

## Usage

```jsx
import React from 'react'
import { withLayout, Place } from 'lay-it-out';

const LayoutTemplate = ({ child = {} }) => (
    <div className="layout-xyz">
        <header>{ child.header }</header>
        { child.intro }
        <aside>
            { child.sidebar }
            <div className="special">
                { child.specialPlace }
            </div>
        </aside>
        <footer>{ child.creditNotes }</footer>
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

```

## License

MIT © [christianheyn](https://github.com/christianheyn)
