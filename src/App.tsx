import React from "react";
import "./App.scss";
import { useSelector } from "react-redux";
import { Facebook, Instagram, Twitter, Youtube } from "react-feather";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./scrollToTop";
import { Header } from "./components/Header";
import { Help } from "./components/Help";
import { Home } from "./components/Home";
import { Livestream } from "./components/Livestream";
import { Search } from "./components/Search";
import { Settings } from "./components/Settings";
import { Topic } from "./components/Topic";

function App() {
    const settings = useSelector((state: any) => state.settings);
    const playlistItems = useSelector((state: any) => state.playlistItem);

    return (
        <div className={settings.theme ? "dark-mode" : "light-mode"}>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Header />}>
                        <Route index element={<Home />} />
                        <Route
                            path="topics/:id"
                            element={<Topic state={playlistItems} />}
                        />
                        <Route path="/livestream" element={<Livestream />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/search" element={<Search />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <section className="footer">
                <div className="footer-container">
                    <div className="social-links">
                        <a
                            className="social-link"
                            href="https://www.facebook.com/adnan.rajeh.3"
                            target="_blank"
                        >
                            <Facebook size={30} />
                        </a>
                        <a
                            className="social-link"
                            href="https://www.instagram.com/adnanrajehinsta"
                            target="_blank"
                        >
                            <Instagram size={30} />
                        </a>
                        <a className="social-link" href="#">
                            <Twitter size={30} />
                        </a>
                        <a
                            className="social-link"
                            href="https://www.youtube.com/c/AdnanRajeh"
                            target="_blank"
                        >
                            <Youtube size={30} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
