import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { create, act } from 'react-test-renderer';
import App from './App';

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("Main view", () => {
    test('Makes sure the root component renders without crashing', () => {
        const app = create(<App />, container);
        expect(app).toMatchSnapshot();
    });

    test("Back button shouldn't do anything if the current directory is root", () => {
        const app = create(<App />);
        const instance = app.root;
        const backButton = instance.findByProps({id: "back-button"});
        expect(app).toMatchSnapshot();
        act(() => {
            backButton.props.onClick();
        });
        expect(app).toMatchSnapshot();
    });
});

