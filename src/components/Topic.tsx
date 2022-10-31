import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistItems } from "../redux/features/playlistItemSlice";
import { fetchPlaylists } from "../redux/features/playlistSlice";
import { fetchVideo } from "../redux/features/videoSlice";
import { useLocation } from "react-router-dom";
import { Eye, ThumbsUp } from "react-feather";

interface Props {}

export const Topic = ({}: Props) => {
    const location = useLocation();
    const video = useSelector((state: any) => state.video);
    const playlist = useSelector((state: any) => state.playlist);
    const playlistItem = useSelector((state: any) => state.playlistItem);
    const dispatch: any = useDispatch();

    const [playlistId, setPlaylistId] = useState<string | undefined>("");
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [itemsPerRow, setItemsPerRow] = React.useState(0);
    const [updatedItems, setUpdatedItems] = React.useState([]);
    const [hoveredItem, setHoveredItem] = React.useState<any>({});
    const [isHovered, setIsHovered] = React.useState(false);

    const delay = useRef<any>(null);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setPlaylistId(location.pathname.split("/").pop());
        dispatch(fetchPlaylists());
    }, [location]);

    useEffect(() => {
        if (playlistId) {
            dispatch(fetchPlaylistItems(playlistId));
        }
    }, [playlistId]);

    useEffect(() => {
        setItemsInRow();
    }, [windowWidth]);

    useEffect(() => {
        const items = playlistItem.playlistItems;
        if (items) {
            const result = items.reduce(
                (resultArray: any, item: any, index: any) => {
                    const chunkIndex = Math.floor(index / itemsPerRow);
                    if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = []; // start a new chunk
                    }

                    resultArray[chunkIndex].push(item);
                    return resultArray;
                },
                []
            );
            setUpdatedItems(result);
        }
    }, [itemsPerRow, playlistItem]);

    useEffect(() => {
        if (isHovered) {
            // TODO reduce fetch calls, only fetch on load
            dispatch(fetchVideo(hoveredItem.item.id));
        }
    }, [isHovered]);

    const setItemsInRow = () => {
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

        setItemsPerRow(Math.floor(windowWidth / (windowWidth * itemWidth)));
    };

    const getPlaylistTitle = () => {
        let title = "";
        if (Object.keys(playlist.playlists).length) {
            playlist.playlists.items.forEach((item: any) => {
                if (item.id === playlistId) {
                    title = item.snippet.title;
                }
            });
        }

        return title;
    };

    const onImageHover = (event: any, item: any, i: any, j: any) => {
        const width = event.target.closest("a").offsetWidth;
        const height = event.target.closest("a").parentElement.offsetHeight;
        console.log(height);

        const rowStyles = getComputedStyle(
            event.target.closest("a").parentElement
        );
        const itemStyles = getComputedStyle(event.target.closest("a"));
        const paddingLeftRow = parseInt(rowStyles.paddingLeft, 10);
        const paddingMarginRow = parseInt(rowStyles.marginBottom, 10);

        const paddingLeftItem = parseInt(itemStyles.paddingLeft, 10);

        const positionTop = i * (height + paddingMarginRow);
        const positionLeft = j * width + paddingLeftRow + paddingLeftItem;

        delay.current = setTimeout(() => {
            setHoveredItem({ item, positionTop, positionLeft, width, j });
            setIsHovered(true);
        }, 600);
    };

    const onLargeImageLeave = () => {
        // setHoveredItem({});
        setIsHovered(false);
    };

    const formatDuration = (duration: any) => {
        var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        match = match.slice(1).map(function (x: any) {
            if (x != null) {
                return x.replace(/\D/, "");
            }
        });

        var hours = parseInt(match[0]) || 0;
        var minutes = parseInt(match[1]) || 0;
        var seconds = parseInt(match[2]) || 0;

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m ${seconds}s`;
        }
    };

    const onVideoClick = () => {
        console.log("video click");
    };

    return (
        <div className="container">
            {playlistItem.loading && <div>Loading...</div>}
            {!playlistItem.loading && playlistItem.error ? (
                <div>Error: {playlistItem.error}</div>
            ) : null}

            {!playlistItem.loading && playlistItem.playlistItems.length && (
                <>
                    <h4 className="playlist-videos__title">
                        {getPlaylistTitle()}
                    </h4>
                    <div className="playlist-videos">
                        {updatedItems.length &&
                            updatedItems.map((rows: any, i: any) => (
                                <div className="row" key={i}>
                                    {rows.map((item: any, j: any) => {
                                        // if (
                                        //     item.snippet.title !==
                                        //     "Private video"
                                        // ) {
                                        return (
                                            <a
                                                className="playlist-video"
                                                key={item && item.id}
                                                href={void 0}
                                                onClick={onVideoClick}
                                                onMouseEnter={(event) =>
                                                    onImageHover(
                                                        event,
                                                        item,
                                                        i,
                                                        j
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    clearTimeout(delay.current)
                                                }
                                            >
                                                <img
                                                    style={{
                                                        padding:
                                                            item &&
                                                            item.url
                                                                .split("/")
                                                                .pop()
                                                                .replace(
                                                                    /\.[^/.]+$/,
                                                                    ""
                                                                ) ===
                                                                "mqdefault"
                                                                ? "21px 0.2vw"
                                                                : "0 0.2vw",
                                                    }}
                                                    // className="playlist-video"
                                                    // onMouseEnter={(event) =>
                                                    //     onImageHover(
                                                    //         event,
                                                    //         item,
                                                    //         i,
                                                    //         j
                                                    //     )
                                                    // }
                                                    // onMouseLeave={() =>
                                                    //     clearTimeout(
                                                    //         delay.current
                                                    //     )
                                                    // }
                                                    key={item && item.id}
                                                    src={item && item.url}
                                                />
                                            </a>
                                            // <iframe
                                            //     key={
                                            //         item.snippet
                                            //             .resourceId
                                            //             .videoId
                                            //     }
                                            //     className="playlist-video"
                                            //     width="560"
                                            //     height="315"
                                            //     src={
                                            //         "https://www.youtube.com/embed/" +
                                            //         item.snippet
                                            //             .resourceId
                                            //             .videoId +
                                            //         "?rel=0&modestbranding=1"
                                            //     }
                                            //     title={
                                            //         item.snippet.title
                                            //     }
                                            //     frameBorder="0"
                                            //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            //     allowFullScreen
                                            // ></iframe>
                                        );
                                        // }
                                    })}
                                </div>
                            ))}

                        {hoveredItem.item && hoveredItem.item.url && (
                            <a
                                href={void 0}
                                onClick={onVideoClick}
                                style={{
                                    top: hoveredItem.positionTop + "px",
                                    left: hoveredItem.positionLeft + "px",
                                    width: hoveredItem.width + "px",
                                    // transform:
                                    //     hoveredItem.j === 0
                                    //         ? "transform: translateX(51px) translateY(0px) scaleX(1) scaleY(1) translateZ(0px)"
                                    //         : hoveredItem.j + 1 === itemsPerRow
                                    //         ? "translateX(-51px) translateY(0px) scaleX(1) scaleY(1) translateZ(0px)"
                                    //         :  "none",
                                }}
                                className={
                                    "playlist-video--large" +
                                    (isHovered
                                        ? " playlist-video--large-open"
                                        : " playlist-video--large-closed")
                                }
                                onMouseLeave={onLargeImageLeave}
                            >
                                <img
                                    style={{
                                        padding:
                                            hoveredItem.item &&
                                            hoveredItem.item.url
                                                .split("/")
                                                .pop()
                                                .replace(/\.[^/.]+$/, "") ===
                                                "mqdefault"
                                                ? "20px 0"
                                                : "0",
                                    }}
                                    key={
                                        hoveredItem.item && hoveredItem.item.url
                                    }
                                    src={
                                        hoveredItem.item && hoveredItem.item.url
                                    }
                                />
                                <div className="playlist-video__info">
                                    {video.video.items && (
                                        <>
                                            <div className="title">
                                                {
                                                    video.video.items[0].snippet
                                                        .title
                                                }
                                            </div>
                                            {/* {
                                            video.video.items[0].snippet
                                                .description
                                        } */}
                                            <div className="metadata">
                                                <Eye size="14" />
                                                <div className="statistics">
                                                    {
                                                        video.video.items[0]
                                                            .statistics
                                                            .viewCount
                                                    }
                                                </div>
                                                <ThumbsUp size="14" />
                                                <div className="statistics">
                                                    {
                                                        video.video.items[0]
                                                            .statistics
                                                            .likeCount
                                                    }
                                                </div>
                                                <div className="duration">
                                                    {formatDuration(
                                                        video.video.items[0]
                                                            .contentDetails
                                                            .duration
                                                    )}
                                                </div>
                                            </div>
                                            {/* <div className="tags">
                                            {video.video.items[0].snippet
                                                .tags &&
                                                video.video.items[0].snippet.tags.map(
                                                    (tag: any, index: any) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="tag"
                                                            >
                                                                {tag}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div> */}
                                        </>
                                    )}
                                </div>
                            </a>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
