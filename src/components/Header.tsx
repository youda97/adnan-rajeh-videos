import React, { useRef, useState } from "react";
import {
    Home,
    Bookmark,
    Radio,
    Settings,
    HelpCircle,
    ChevronDown,
    ChevronUp,
} from "react-feather";
import { Outlet, Link } from "react-router-dom";

interface Props {}

export const Header = ({}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const checkbox = useRef<any>(null);

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        checkbox.current.checked = false;
    };

    return (
        <>
            <nav>
                <div className="navbar">
                    <div className="nav-container">
                        <input
                            ref={checkbox}
                            className="checkbox"
                            type="checkbox"
                            name=""
                            id=""
                        />
                        <div className="hamburger-lines">
                            <span className="line line1"></span>
                            <span className="line line2"></span>
                            <span className="line line3"></span>
                        </div>
                        <div className="logo">
                            <h1>Adnan Rajeh TV</h1>
                        </div>
                        <div className="menu">
                            <div className="menu-items">
                                <li>
                                    <Link to="/" onClick={closeMenu}>
                                        <Home />
                                        <span>Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="side-nav__submenu"
                                        onClick={onClick}
                                    >
                                        <Bookmark />
                                        <div className="side-nav__contents">
                                            <span>Topics</span>
                                            <div className="side-nav__icon">
                                                {isOpen ? (
                                                    <ChevronUp />
                                                ) : (
                                                    <ChevronDown />
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <ul>
                                            <li>
                                                <Link
                                                    to="/topics"
                                                    onClick={closeMenu}
                                                >
                                                    <span>Test 1</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/"
                                                    onClick={closeMenu}
                                                >
                                                    <span>Test 1</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <Link to="/" onClick={closeMenu}>
                                        <Radio />
                                        <span>Livestream</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={closeMenu}>
                                        <Settings />
                                        <span>Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={closeMenu}>
                                        <HelpCircle />
                                        <span>Help</span>
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};
