import React from 'react';
import './App.css';
import { Project } from './components/Project';
import {SettingsPage} from "./components/SettingsPage";

function App() {
    return (
        <div className="App">
            <SettingsPage/>
            <Project/>
        </div>
    );
}

export default App;
