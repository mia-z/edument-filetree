import React from 'react';
import App from '../App';
import { render, fireEvent, screen } from "@testing-library/react";
import Folder from "../Components/SubComponents/Folder";
import File from "../Components/SubComponents/File";

describe("Tests to make sure the create functions work", () => {
    it("Make sure the create file button renders into view", () => {
        render(<App />)
        expect(screen.getByText(/Create new file/)).toBeVisible();
    });

    it("Make sure the correct modal appears when trying to create a new file", () => {
        let app = render(<App />)
        let button = screen.getByText(/Create new file/);
        fireEvent.click(button);
        expect(app).toMatchSnapshot();
    });

    it("Make sure a new file is created when modal is submitted", () => {
        let app = render(<App />)
        fireEvent.click(screen.getByText(/Create new file/));
        fireEvent.change(screen.getByPlaceholderText(/Enter new name../), { target: { value: "Marvelsucks.txt" } });
        fireEvent.click(screen.getByText(/Confirm/));
        expect(screen.getByText(/Marvelsucks./)).toBeVisible();
    });

    it("Make sure the create folder button renders into view", () => {
        render(<App />)
        expect(screen.getByText(/Create new folder/)).toBeVisible();
    });

    it("Make sure the correct modal appears when trying to create a new folder", () => {
        let app = render(<App />)
        let button = screen.getByText(/Create new folder/);
        fireEvent.click(button);
        expect(app).toMatchSnapshot();
    });

    it("Make sure a new folder is created when modal is submitted", () => {
        let app = render(<App />)
        fireEvent.click(screen.getByText(/Create new folder/));
        fireEvent.change(screen.getByPlaceholderText(/Enter new name../), { target: { value: "dcuniverse" } });
        fireEvent.click(screen.getByText(/Confirm/));
        expect(screen.getByText(/dcuniverse/)).toBeVisible();
    });
});

