import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentVideos } from "../redux/features/recentVideoSlice";
import { Slideshow } from "./Slideshow";

interface Props {}

export const Home = ({}: Props) => {
    const recentVideos = useSelector((state: any) => state.recentVideo);
    const dispatch: any = useDispatch();

    const [showNotification, setShowNotification] = React.useState(true);

    useEffect(() => {
        dispatch(fetchRecentVideos());

        setTimeout(() => {
            setShowNotification(false);
        }, 9000);
    }, []);

    return (
        <div className="container">
            {recentVideos.loading && <div>Loading...</div>}
            {!recentVideos.loading && recentVideos.error ? (
                <div>Error: {recentVideos.error}</div>
            ) : null}

            {!recentVideos.loading &&
                Object.keys(recentVideos).length &&
                recentVideos.items.length && (
                    <>
                        <div>
                            <iframe
                                className="youtube-overlay"
                                src={
                                    "https://www.youtube.com/embed/" +
                                    recentVideos.items[0].videoId +
                                    "?autoplay=1&mute=1&rel=0&modestbranding=1&autohide=1&showinfo=0"
                                }
                                title={recentVideos.items[0].title}
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                            {showNotification ? (
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

                        <Slideshow playlist={recentVideos} />
                    </>
                )}
        </div>
    );
};
