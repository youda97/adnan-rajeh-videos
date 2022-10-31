import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentVideos } from "../redux/features/recentVideoSlice";

interface Props {}

export const Youtube = ({}: Props) => {
    const recentVideo = useSelector((state: any) => state.recentVideo);
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(fetchRecentVideos());
    }, []);

    return (
        <div className="container">
            {recentVideo.loading && <div>Loading...</div>}
            {!recentVideo.loading && recentVideo.error ? (
                <div>Error: {recentVideo.error}</div>
            ) : null}

            {!recentVideo.loading &&
                Object.keys(recentVideo.recentVideos).length &&
                recentVideo.recentVideos.items.length && (
                    <>
                        <div>
                            <iframe
                                className="youtube-overlay"
                                src={
                                    "https://www.youtube.com/embed/" +
                                    recentVideo.recentVideos.items[0].id
                                        .videoId +
                                    "?autoplay=1&mute=1&rel=0&controls=0&modestbranding=1&autohide=1&showinfo=0"
                                }
                                title={
                                    recentVideo.recentVideos.items[0].snippet
                                        .title
                                }
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <h1 className="recent-videos__title">Recent Videos</h1>
                        <div className="recent-videos__content">
                            {recentVideo.recentVideos.items.map(
                                (video: any) => (
                                    <iframe
                                        key={video.id.videoId}
                                        className="recent-video"
                                        width="560"
                                        height="315"
                                        src={
                                            "https://www.youtube.com/embed/" +
                                            video.id.videoId +
                                            "?rel=0&modestbranding=1"
                                        }
                                        title={video.snippet.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )
                            )}
                        </div>
                    </>
                )}
        </div>
    );
};
