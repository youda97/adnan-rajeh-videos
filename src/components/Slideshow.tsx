import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-feather";
import { VideoTile } from "./VideoTile";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    playlistItems: any;
}

export const Slideshow = ({ playlistItems }: Props) => {
    const playlists = useSelector((state: any) => state.playlist);
    const dispatch: any = useDispatch();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        function handleResize() {
            updateTotalPages(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        updateTotalPages(window.innerWidth);
    }, [playlistItems]);

    const updateTotalPages = (windowWidth: any) => {
        let itemWidth = 0;
        if (windowWidth > 1400) {
            itemWidth = 0.16;
        } else if (windowWidth > 1100 && windowWidth < 1399) {
            itemWidth = 0.19;
        } else if (windowWidth > 800 && windowWidth < 1099) {
            itemWidth = 0.25;
        } else if (windowWidth > 500 && windowWidth < 799) {
            itemWidth = 0.3333;
        } else if (windowWidth < 499) {
            itemWidth = 0.5;
        }

        const itemsInRow = Math.floor(windowWidth / (windowWidth * itemWidth));
        if (playlistItems && playlistItems.items) {
            const filteredVideos = playlistItems.items.filter((video: any) =>
                Object.keys(video.thumbnails).includes("default")
            );

            setTotalPages(filteredVideos.length / itemsInRow);

            dispatch({
                type: "SET_FAVORITE_ITEM",
                payload: { itemsInRow },
            });
        }
    };

    const updateCurrentIndex = (newInex: any) => {
        setCurrentIndex(newInex);
    };

    const renderListIndicators = () => {
        const indicators = [];
        for (let i = 0; i < totalPages; i++) {
            indicators.push(
                <li key={i} className={i === currentIndex ? "active" : ""}></li>
            );
        }
        return indicators;
    };

    const getPlaylistTitle = () => {
        let title = "";
        playlists.items.forEach((item: any) => {
            if (item.id === playlistItems.items[0].playlistId) {
                title = item.title;
            }
        });

        return title;
    };

    return (
        <div className="slideshow-row">
            <h2 className="row-header">
                <Link
                    to={
                        playlistItems.items[0].playlistId
                            ? "/topics/" + playlistItems.items[0].playlistId
                            : "#"
                    }
                >
                    <div className="row-header-title">
                        {playlistItems.items[0].playlistId
                            ? getPlaylistTitle()
                            : "Recent Videos"}
                    </div>

                    {playlistItems.items[0].playlistId ? (
                        <div className="arrow-header">
                            <div className="see-all-link">Explore All</div>
                            <ChevronRight size="16" className="chevron-right" />
                        </div>
                    ) : null}
                </Link>
            </h2>

            <div className="playlist__content">
                {currentIndex !== 0 && (
                    <span
                        className="handle left"
                        onClick={() => updateCurrentIndex(currentIndex - 1)}
                    >
                        <b className="indicator-icon">
                            <ChevronLeft size="40" />
                        </b>
                    </span>
                )}
                <div
                    className="inner-slider"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    <VideoTile row={playlistItems.items} rowIndex={0} key={0} />
                </div>
                {currentIndex < totalPages - 1 && (
                    <span
                        className="handle right"
                        onClick={() => updateCurrentIndex(currentIndex + 1)}
                    >
                        <b className="indicator-icon">
                            <ChevronRight size="40" />
                        </b>
                    </span>
                )}
                <ul className="pagination-indicator">
                    {renderListIndicators()}
                </ul>
            </div>
        </div>
    );
};
