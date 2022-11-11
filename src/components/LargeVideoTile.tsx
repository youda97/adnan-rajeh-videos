import React, { useEffect, useRef } from "react";
import { Eye, ThumbsUp } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    isTopic: boolean;
}

export const LargeVideoTile = ({ isTopic }: Props) => {
    const videos = useSelector((state: any) => state.video);
    const hoveredItem = useSelector((state: any) => state.hoveredItem);
    const dispatch: any = useDispatch();

    const largeInfoDisplay = useRef<any>(null);

    useEffect(() => {
        if (hoveredItem.isVideoOpen) {
            largeInfoDisplay.current &&
                largeInfoDisplay.current.classList.add("hide");
        }
    }, [hoveredItem.isVideoOpen]);

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

    const onLargeImageLeave = () => {
        dispatch({
            type: "SET_FAVORITE_ITEM",
            payload: {
                isHovered: false,
            },
        });
    };

    const getVideoLargeClassNames = () => {
        if (hoveredItem.isHovered && !videos.loading) {
            if (hoveredItem.columnIndex === 0) {
                return " playlist-video--large-open left";
            } else if (hoveredItem.columnIndex + 1 === hoveredItem.itemsInRow) {
                return " playlist-video--large-open right";
            } else {
                return " playlist-video--large-open";
            }
        } else {
            return " playlist-video--large-closed";
        }
    };

    const onVideoClick = () => {
        hoveredItem.row.forEach((item: any, index: any) => {
            if (item.videoId === hoveredItem.item.videoId) {
                dispatch({
                    type: "SET_FAVORITE_ITEM",
                    payload: {
                        videoPrev: hoveredItem.row[index - 1],
                        videoNext: hoveredItem.row[index + 1],
                    },
                });
            }
        });

        dispatch({
            type: "SET_FAVORITE_ITEM",
            payload: { isHovered: false, isVideoOpen: true },
        });
    };

    return (
        <>
            <a
                ref={largeInfoDisplay}
                href={void 0}
                onClick={(e) => onVideoClick()}
                style={{
                    top: hoveredItem.positionTop + "px",
                    left: hoveredItem.positionLeft + "px",
                    width: hoveredItem.width + "px",
                }}
                className={"playlist-video--large" + getVideoLargeClassNames()}
                onMouseLeave={onLargeImageLeave}
            >
                <img
                    key={hoveredItem.item.id}
                    src={
                        hoveredItem.item && hoveredItem.item.thumbnails
                            ? hoveredItem.item.thumbnails.high
                                ? hoveredItem.item.thumbnails.high.url
                                : hoveredItem.item.thumbnails.medium
                                ? hoveredItem.item.thumbnails.medium.url
                                : hoveredItem.item.thumbnails.default.url
                            : ""
                    }
                />
                <div className="playlist-video__info">
                    {!videos.loading && videos.items.length ? (
                        <>
                            <div className="title">{videos.items[0].title}</div>
                            <div className="metadata">
                                <Eye size="14" />
                                <div className="statistics">
                                    {videos.items[0].viewCount}
                                </div>
                                <ThumbsUp size="14" />
                                <div className="statistics">
                                    {videos.items[0].likeCount}
                                </div>
                                <div className="duration">
                                    {formatDuration(videos.items[0].duration)}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>Loading...</>
                    )}
                </div>
            </a>
        </>
    );
};

LargeVideoTile.defaultProps = {
    isTopic: false,
};
