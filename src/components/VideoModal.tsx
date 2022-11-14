import React, { useEffect, useRef } from "react";
import { Eye, PlayCircle, ThumbsUp, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo } from "../redux/features/videoSlice";

interface Props {}

export const VideoModal = ({}: Props) => {
    const videos = useSelector((state: any) => state.video);
    const hoveredItem = useSelector((state: any) => state.hoveredItem);
    const settings = useSelector((state: any) => state.settings);
    const dispatch: any = useDispatch();

    const videoModal = useRef<any>(null);

    useEffect(() => {
        if (hoveredItem.isVideoOpen) {
            document.body.classList.add("menu-open");
            videoModal.current.classList.add("modal-open");
        } else {
            document.body.classList.remove("menu-open");
            videoModal.current.classList.remove("modal-open");
        }
    }, [hoveredItem.isVideoOpen]);

    const modalClose = () => {
        dispatch({
            type: "SET_HOVERED_ITEM",
            payload: { isVideoOpen: false },
        });
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

    const formatDate = (date: any) => {
        const newDate = new Date(date);
        const myDate =
            newDate.getDate() +
            "/" +
            (newDate.getMonth() + 1) +
            "/" +
            newDate.getFullYear();
        return String(myDate);
    };

    const setPrevNextVideo = (id: any) => {
        hoveredItem.row.forEach((item: any, index: any) => {
            if (item.videoId === id) {
                dispatch({
                    type: "SET_HOVERED_ITEM",
                    payload: {
                        videoPrev: hoveredItem.row[index - 1],
                        videoNext: hoveredItem.row[index + 1],
                    },
                });
            }
        });
    };

    const loadPrevNextVideo = (item: any) => {
        dispatch(fetchVideo(item.videoId));
        setPrevNextVideo(item.videoId);
    };

    return (
        <div className="modal-wrapper" onClick={() => modalClose()}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                ref={videoModal}
            >
                {hoveredItem.isVideoOpen && !videos.loading && videos.items && (
                    <div className="video-container">
                        <div className="iframe-container">
                            <iframe
                                className="video"
                                height="520"
                                src={
                                    "https://www.youtube.com/embed/" +
                                    videos.items[0].id +
                                    `?autoplay=${
                                        settings.autoplay ? "1" : "0"
                                    }&mute=${
                                        settings.mute ? "1" : "0"
                                    }&rel=0&modestbranding=1`
                                }
                                title={videos.items[0].title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="video-info__container">
                            <div className="video-info">
                                <div
                                    className="close-button"
                                    onClick={() => modalClose()}
                                >
                                    <X />
                                </div>
                                <div className="video-info--left">
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
                                            {formatDuration(
                                                videos.items[0].duration
                                            )}
                                        </div>
                                        <div className="published">
                                            {formatDate(
                                                videos.items[0].publishedAt
                                            )}
                                        </div>
                                    </div>
                                    <div className="title">
                                        {videos.items[0].title}
                                    </div>
                                    <div className="description">
                                        {videos.items[0].description}
                                    </div>
                                </div>

                                <div className="video-info--right">
                                    {videos.items[0].tags && (
                                        <>
                                            <span className="tag-label">
                                                Tags:
                                            </span>
                                            <div className="tags">
                                                {videos.items[0].tags.map(
                                                    (tag: any, index: any) => {
                                                        return (
                                                            tag +
                                                            (index ===
                                                            videos.items[0].tags
                                                                .length -
                                                                1
                                                                ? ""
                                                                : ", ")
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="prevnext">
                                {hoveredItem.videoPrev &&
                                Object.keys(hoveredItem.videoPrev).length ? (
                                    <div className="prevnext-item">
                                        <span>Previous Video:</span>
                                        <a
                                            className="prevnext-video"
                                            href={void 0}
                                            onClick={() =>
                                                loadPrevNextVideo(
                                                    hoveredItem.videoPrev
                                                )
                                            }
                                        >
                                            <img
                                                src={
                                                    hoveredItem.videoPrev
                                                        .thumbnails &&
                                                    hoveredItem.videoPrev
                                                        .thumbnails.high
                                                        ? hoveredItem.videoPrev
                                                              .thumbnails.high
                                                              .url
                                                        : hoveredItem.videoPrev
                                                              .thumbnails.medium
                                                        ? hoveredItem.videoPrev
                                                              .thumbnails.medium
                                                              .url
                                                        : hoveredItem.videoPrev
                                                              .thumbnails
                                                              .default.url
                                                }
                                            />
                                            <div className="play-icon">
                                                <PlayCircle size="40" />
                                            </div>
                                        </a>
                                    </div>
                                ) : null}

                                {hoveredItem.videoNext &&
                                Object.keys(hoveredItem.videoNext).length ? (
                                    <div className="prevnext-item">
                                        <span>Next Video:</span>
                                        <a
                                            className="prevnext-video"
                                            href={void 0}
                                            onClick={() =>
                                                loadPrevNextVideo(
                                                    hoveredItem.videoNext
                                                )
                                            }
                                        >
                                            <img
                                                src={
                                                    hoveredItem.videoNext
                                                        .thumbnails &&
                                                    hoveredItem.videoNext
                                                        .thumbnails.high
                                                        ? hoveredItem.videoNext
                                                              .thumbnails.high
                                                              .url
                                                        : hoveredItem.videoNext
                                                              .thumbnails.medium
                                                        ? hoveredItem.videoNext
                                                              .thumbnails.medium
                                                              .url
                                                        : hoveredItem.videoNext
                                                              .thumbnails
                                                              .default.url
                                                }
                                            />
                                            <div className="play-icon">
                                                <PlayCircle size="40" />
                                            </div>
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="modal-overlay" tabIndex={-1}></div>
        </div>
    );
};
