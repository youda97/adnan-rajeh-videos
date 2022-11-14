import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentVideos } from "../redux/features/recentVideoSlice";
import { fetchPlaylists } from "../redux/features/playlistSlice";
import { SlideshowPlaylist } from "./SlideshowPlaylist";
import { Error } from "./Error";
import { Slideshow } from "./Slideshow";
import { LargeVideoTile } from "./LargeVideoTile";
import { VideoModal } from "./VideoModal";

interface Props {}

export const Home = ({}: Props) => {
    const recentVideos = useSelector((state: any) => state.recentVideo);
    const playlists = useSelector((state: any) => state.playlist);
    const hoveredItem = useSelector((state: any) => state.hoveredItem);
    const settings = useSelector((state: any) => state.settings);

    const dispatch: any = useDispatch();

    const [showNotification, setShowNotification] = React.useState(true);

    const slideshowRef = useRef<any>(null);
    const containerRef = useRef<any>(null);

    useEffect(() => {
        // Very expensive call
        dispatch(fetchRecentVideos());
        dispatch(fetchPlaylists());

        setTimeout(() => {
            setShowNotification(false);
        }, 9000);
    }, []);

    useEffect(() => {
        if (slideshowRef.current) {
            const slideshowRow = slideshowRef.current.firstElementChild;
            const header = slideshowRow.querySelector(".row-header a");
            const carousel = slideshowRow.querySelector(".playlist__content");
            const videoTile = slideshowRow.querySelector(".playlist-video");
            let rowIndex = 0;

            playlists.items.forEach((item: any, index: any) => {
                if (item.id === hoveredItem.item.playlistId) {
                    rowIndex = index + 1;
                }
            });

            if (carousel) {
                const headerStyles = getComputedStyle(header);
                const carouselStyles = getComputedStyle(carousel);

                const positionTop =
                    header.offsetHeight +
                    parseInt(headerStyles.marginBottom, 10) +
                    rowIndex * slideshowRow.offsetHeight;
                const positionLeft =
                    parseInt(carouselStyles.paddingLeft, 10) +
                    hoveredItem.columnIndex * videoTile.offsetWidth;

                dispatch({
                    type: "SET_HOVERED_ITEM",
                    payload: {
                        positionLeft,
                        positionTop,
                        rowIndex,
                        isHovered: true,
                    },
                });
            }
        }
    }, [hoveredItem.item.videoId]);

    return (
        <div className="container" ref={containerRef}>
            {recentVideos.loading && <div>Loading...</div>}
            {!recentVideos.loading && recentVideos.error ? (
                <Error error={recentVideos.error} />
            ) : null}

            {!recentVideos.loading &&
            Object.keys(recentVideos).length &&
            recentVideos.items.length ? (
                <>
                    <div>
                        <iframe
                            className="youtube-overlay"
                            src={
                                "https://www.youtube.com/embed/" +
                                recentVideos.items[0].videoId +
                                `?autoplay=${
                                    settings.autoplay ? "1" : "0"
                                }&mute=${
                                    settings.autoplay ||
                                    (!settings.autoplay && settings.mute)
                                        ? "1"
                                        : "0"
                                }&rel=0&modestbranding=1&autohide=1&showinfo=0`
                            }
                            title={recentVideos.items[0].title}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>

                        {showNotification &&
                        (settings.autoplay ||
                            (!settings.autoplay && settings.mute)) ? (
                            <div className="notification-wrapper">
                                <div className="toast">
                                    <div className="caret"></div>
                                    <p>Click button to unmute</p>
                                </div>
                            </div>
                        ) : (
                            <div className="no-toast"></div>
                        )}
                    </div>

                    <div className="slideshows" ref={slideshowRef}>
                        <Slideshow playlistItems={recentVideos} />

                        {playlists.items.map((item: any) => (
                            <SlideshowPlaylist playlist={item.id} />
                        ))}

                        <LargeVideoTile />
                        <VideoModal />
                    </div>
                </>
            ) : null}
        </div>
    );
};
