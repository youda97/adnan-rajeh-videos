import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo } from "../redux/features/videoSlice";

interface Props {
    row: any[];
    allRows?: any[];
    rowIndex: any;
    isTopic: boolean;
}

export const VideoTile = ({ row, rowIndex, isTopic, allRows }: Props) => {
    const hoveredItem = useSelector((state: any) => state.hoveredItem);
    const dispatch: any = useDispatch();

    const delay = useRef<any>(null);

    useEffect(() => {
        dispatch({
            type: "SET_HOVERED_ITEM",
            payload: { isHovered: false },
        });
    }, [hoveredItem.isVideoOpen]);

    const onVideoClick = (event: any, item: any, i: any, j: any) => {
        if (!hoveredItem.isHovered) {
            onImageHover(event, item, i, j);
        }
        dispatch({
            type: "SET_HOVERED_ITEM",
            payload: { isHovered: false, isVideoOpen: true },
        });
    };

    const setPrevNextVideo = (id: any) => {
        let updatedRow;
        if (isTopic) {
            updatedRow = [...allRows.flat()];
        } else {
            updatedRow = [...row];
        }

        updatedRow.forEach((item: any, index: any) => {
            if (item.videoId === id) {
                dispatch({
                    type: "SET_HOVERED_ITEM",
                    payload: {
                        videoPrev: updatedRow[index - 1],
                        videoNext: updatedRow[index + 1],
                    },
                });
            }
        });
    };

    // const setHoveredItem = (payload) =>
    //     new Promise<void>((resolve, reject) => {
    //         dispatch({
    //             type: "SET_HOVERED_ITEM",
    //             payload: payload,
    //         });
    //         resolve();
    //     });

    const setVideo = (item) =>
        new Promise<void>((resolve, reject) => {
            dispatch(fetchVideo(item.videoId));
            setPrevNextVideo(item.videoId);
            resolve();
        });

    const onImageHover = (event: any, item: any, i: any, j: any) => {
        const width = event.target.closest("a").offsetWidth;

        if (hoveredItem.isPagination) {
            dispatch({
                type: "SET_HOVERED_ITEM",
                payload: { isPagination: false },
            });
            return;
        }

        if (i === -1 && j === -1) {
            dispatch(fetchVideo(item.videoId));
            setPrevNextVideo(item.videoId);
        } else {
            delay.current = setTimeout(() => {
                while (j + 1 > hoveredItem.itemsInRow) {
                    j = j - hoveredItem.itemsInRow;
                }

                const payload =
                    item.videoId === hoveredItem.item.videoId
                        ? {
                              row: isTopic ? allRows.flat() : row,
                              item,
                              width,
                              i,
                              j,
                              isHovered: true,
                          }
                        : { row: isTopic ? allRows : row, item, width, i, j };

                setVideo(item).then(() => {
                    dispatch({
                        type: "SET_HOVERED_ITEM",
                        payload: payload,
                    });
                });
                // setHoveredItem(payload).then(() => {
                //     dispatch(fetchVideo(item.videoId));
                //     setPrevNextVideo(item.videoId);
                // });
            }, 400);
        }
    };

    return (
        <Fragment key={rowIndex}>
            {row &&
                row.map((item: any, j: any) => {
                    if (item) {
                        return (
                            <a
                                className="playlist-video"
                                key={item.id}
                                href={void 0}
                                onClick={(event) =>
                                    onVideoClick(event, item, -1, -1)
                                }
                                onMouseOver={(event) => {
                                    onImageHover(event, item, rowIndex, j);
                                }}
                                onMouseOut={() => clearTimeout(delay.current)}
                            >
                                <img
                                    key={item.id}
                                    src={
                                        item.thumbnails && item.thumbnails.high
                                            ? item.thumbnails.high.url
                                            : item.thumbnails.medium
                                            ? item.thumbnails.medium.url
                                            : item.thumbnails.default.url
                                    }
                                />
                            </a>
                        );
                    }
                })}
        </Fragment>
    );
};

VideoTile.defaultProps = {
    isTopic: false,
};
