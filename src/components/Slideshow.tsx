import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";

interface Props {
    playlist: any;
}

export const Slideshow = ({ playlist }: Props) => {
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
    }, [playlist]);

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
        if (playlist && playlist.items) {
            const filteredVideos = playlist.items.filter((video: any) =>
                Object.keys(video.thumbnails).includes("default")
            );

            setTotalPages(filteredVideos.length / itemsInRow);
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

    return (
        <div className="row">
            <h2 className="row-header">
                <a href={void 0}>
                    <div className="row-header-title">Recent Videos</div>
                    <div className="arrow-header">
                        <div className="see-all-link">Explore All</div>
                        <ChevronRight size="16" className="chevron-right" />
                    </div>
                </a>
            </h2>

            <div className="recent-videos__content">
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
                    {playlist.items.map((video: any) => (
                        // <iframe
                        //     key={video.id.videoId}
                        //     className="recent-video"
                        //     width="560"
                        //     height="315"
                        //     src={
                        //         "https://www.youtube.com/embed/" +
                        //         video.id.videoId +
                        //         "?rel=0&modestbranding=1"
                        //     }
                        //     title={video.snippet.title}
                        //     frameBorder="0"
                        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        //     allowFullScreen
                        // ></iframe>
                        <a
                            href={void 0}
                            key={video.videoId}
                            className="recent-video"
                        >
                            <img
                                key={video.videoId}
                                src={
                                    video.thumbnails && video.thumbnails.high
                                        ? video.thumbnails.high.url
                                        : video.thumbnails.medium
                                        ? video.thumbnails.medium.url
                                        : video.thumbnails.default.url
                                }
                            ></img>
                        </a>
                    ))}
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
