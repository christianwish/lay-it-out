import React from 'react'
import { withLayout, Place } from 'lay-it-out';

const _Modal = ({ children, child }) => (
    <section className="modal">
        <header className="modal-header">
            {child.header}
        </header>
        <div className="modal-content">
            {children}
        </div>
        <footer className="modal-footer">
            {child.footer}
        </footer>
    </section>
)

const Modal = withLayout(_Modal);

const App = () => (
    <Modal open>
        <Place toBe="header">
            <h2><small>the</small> Header</h2>
        </Place>

        <h1><small>the</small> Content</h1>

        <Place toBe="footer">
            <button>Ok, cool!</button>
        </Place>
    </Modal>
);

export default App;
