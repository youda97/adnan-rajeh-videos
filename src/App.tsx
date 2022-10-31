import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Youtube } from "./components/Youtube";
import { Header } from "./components/Header";
import { Topic } from "./components/Topic";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Youtube />} />
                    <Route path="topics/:id" element={<Topic />} />
                    {/* <Route path="/livestream" element={< />} />
                        <Route path="/settings" element={< />} />
                        <Route path="/help" element={< />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
