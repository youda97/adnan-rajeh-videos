import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../redux/features/playlistSlice";

interface Props {}

export const Header = ({}: Props) => {
    const playlist = useSelector((state: any) => state.playlist);
    const dispatch: any = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const checkbox = useRef<any>(null);

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, []);

    const onMenuClick = () => {
        checkbox.current.checked
            ? document.body.classList.add("menu-open")
            : document.body.classList.remove("menu-open");
    };

    const onDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        checkbox.current.checked = false;
        document.body.classList.remove("menu-open");
    };

    return (
        <>
            <nav>
                <div className="navbar">
                    <div className="nav-container">
                        <input
                            ref={checkbox}
                            onClick={onMenuClick}
                            className="checkbox"
                            type="checkbox"
                            name=""
                            id=""
                        />
                        <div className="nav-container__top">
                            <div className="hamburger-lines">
                                <span className="line line1"></span>
                                <span className="line line2"></span>
                                <span className="line line3"></span>
                            </div>
                            <div className="logo">
                                <h1>Adnan Rajeh TV</h1>
                            </div>
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
                                        className="side-nav__submenu--button"
                                        onClick={onDropdownClick}
                                    >
                                        <Bookmark />
                                        <div className="submenu-button__contents">
                                            <span>Topics</span>
                                            <div className="submenu-button__icon">
                                                {isOpen ? (
                                                    <ChevronUp />
                                                ) : (
                                                    <ChevronDown />
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <div className="side-nav__submenu">
                                            <ul>
                                                {playlist.playlists.items.map(
                                                    (playlist: any) => {
                                                        if (
                                                            playlist
                                                                .contentDetails
                                                                .itemCount > 0
                                                        ) {
                                                            return (
                                                                <li
                                                                    key={
                                                                        playlist.id
                                                                    }
                                                                >
                                                                    <Link
                                                                        className="submenu-link"
                                                                        to={
                                                                            "/topics/" +
                                                                            playlist.id
                                                                        }
                                                                        onClick={
                                                                            closeMenu
                                                                        }
                                                                    >
                                                                        <span className="submenu-span">
                                                                            {
                                                                                playlist
                                                                                    .snippet
                                                                                    .title
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                    }
                                                )}
                                            </ul>
                                        </div>
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
