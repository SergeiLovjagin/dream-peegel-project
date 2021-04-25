import React from 'react';
import './App.css';
import {SettingsPage} from "./components/SettingsPage";
import {BrowserRouter, Route} from "react-router-dom";
import {Save} from "./components/Save";

function App() {
    return (
        <BrowserRouter>
        <div className="App">
                <Route exact path='/'
                    render={() => <SettingsPage/>}/>
                <Route path='/save'
                       render={() => <Save/>}/>
        </div>
        </BrowserRouter>
    );
}

export default App;
