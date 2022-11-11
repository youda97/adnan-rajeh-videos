import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Topic } from "./components/Topic";
import ScrollToTop from "./scrollToTop";
import { Livestream } from "./components/Livestream";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="topics/:id" element={<Topic />} />
                    <Route path="/livestream" element={<Livestream />} />
                    {/* <Route path="/settings" element={< />} />
                        <Route path="/help" element={< />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
