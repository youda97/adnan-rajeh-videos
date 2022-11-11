import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylistItems } from "../redux/features/playlistItemSlice";
import { useLocation } from "react-router-dom";
import { VideoTile } from "./VideoTile";
import { LargeVideoTile } from "./LargeVideoTile";
import { VideoModal } from "./VideoModal";

interface Props {}

export const Topic = ({}: Props) => {
    const location = useLocation();
    const playlists = useSelector((state: any) => state.playlist);
    const playlistItems = useSelector((state: any) => state.playlistItem);
    const hoveredItem = useSelector((state: any) => state.hoveredItem);
    const dispatch: any = useDispatch();

    const [playlistId, setPlaylistId] = useState<string | undefined>("");
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [itemsPerRow, setItemsPerRow] = React.useState(0);
    const [updatedItems, setUpdatedItems] = React.useState([]);

    const playlistRef = useRef<any>(null);
    const rowRef = useRef<any>(null);

    useEffect(() => {
        dispatch({
            type: "SET_FAVORITE_ITEM",
            payload: {
                isHovered: false,
                item: { videoId: 0 },
            },
        });

        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setPlaylistId(location.pathname.split("/").pop());
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
        const items = playlistItems.items;
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
    }, [itemsPerRow, playlistItems]);

    useEffect(() => {
        if (playlistRef.current) {
            const playlistContainer = playlistRef.current;
            const row = rowRef.current;
            const videoTile =
                playlistContainer.querySelector(".playlist-video");

            if (row) {
                const rowStyles = getComputedStyle(row);

                if (videoTile) {
                    const positionTop =
                        hoveredItem.rowIndex *
                        (videoTile.offsetHeight +
                            parseInt(rowStyles.marginBottom, 10));
                    const positionLeft =
                        parseInt(rowStyles.paddingLeft, 10) +
                        hoveredItem.columnIndex * videoTile.offsetWidth;

                    dispatch({
                        type: "SET_FAVORITE_ITEM",
                        payload: {
                            positionLeft,
                            positionTop,
                            isHovered: true,
                        },
                    });
                }
            }
        }
    }, [hoveredItem.item.videoId]);

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
        if (Object.keys(playlists).length) {
            playlists.items.forEach((item: any) => {
                if (item.id === playlistId) {
                    title = item.title;
                }
            });
        }

        return title;
    };

    return (
        <div className="container">
            {playlistItems.loading && <div>Loading...</div>}
            {!playlistItems.loading && playlistItems.error ? (
                <div>Error: {playlistItems.error.message}</div>
            ) : null}

            {!playlistItems.loading && playlistItems.items.length && (
                <>
                    <h4 className="playlist-videos__title">
                        {getPlaylistTitle()}
                    </h4>
                    <div className="playlist-videos" ref={playlistRef}>
                        {updatedItems.length &&
                            updatedItems.map((row: any, i: any) => (
                                <div className="row" key={i} ref={rowRef}>
                                    <VideoTile
                                        row={row}
                                        allRows={updatedItems}
                                        rowIndex={i}
                                        key={i}
                                        isTopic={true}
                                    />
                                </div>
                            ))}

                        <LargeVideoTile isTopic={true} />

                        <VideoModal isTopic={true} />
                    </div>
                </>
            )}
        </div>
    );
};
