import React, { useEffect, useRef, useState } from "react";
import {
    Home,
    Bookmark,
    Radio,
    Settings,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    Search,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { fetchPlaylists } from "../redux/features/playlistSlice";
import { fetchSearch } from "../redux/features/searchSlice";

interface Props {}

export const Header = ({}: Props) => {
    const playlists = useSelector((state: any) => state.playlist);
    const dispatch: any = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [previousPath, setPreviousPath] = useState("/");

    const checkbox = useRef<any>(null);
    const searchInput = useRef<any>(null);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, []);

    useEffect(() => {
        if (pathname !== "/search") {
            searchInput.current.value = "";
            if (searchInput.current.classList.contains("focused")) {
                searchInput.current.classList.remove("focused");
            }
        }
    }, [pathname]);

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

    const handleInputChange = (e) => {
        if (pathname !== "/search") {
            setPreviousPath(pathname);
        }

        if (e.target.value !== "") {
            navigate("/search");
            // Very expensive call
            dispatch(fetchSearch(e.target.value));
        } else {
            navigate(previousPath);
        }
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

                            <div className="search-container">
                                <form action="/search" method="get">
                                    <input
                                        ref={searchInput}
                                        className={
                                            "search expandright" +
                                            (searchInput.current?.value !== ""
                                                ? " focused"
                                                : "")
                                        }
                                        id="searchright"
                                        type="search"
                                        name="q"
                                        placeholder="Search"
                                        onChange={handleInputChange}
                                    />
                                    <label
                                        className="button searchbutton"
                                        htmlFor="searchright"
                                    >
                                        <Search />
                                    </label>
                                </form>
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
                                                {playlists.items.map(
                                                    (playlist: any) => {
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
                                                                            playlist.title
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <Link to="/livestream" onClick={closeMenu}>
                                        <Radio />
                                        <span>Livestream</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/settings" onClick={closeMenu}>
                                        <Settings />
                                        <span>Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/help" onClick={closeMenu}>
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
