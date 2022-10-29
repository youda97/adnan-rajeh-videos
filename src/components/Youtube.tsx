import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/features/videoSlice";

interface Props {}

export const Youtube = ({}: Props) => {
    const video = useSelector((state: any) => state.video);
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(fetchVideos());
    }, []);

    return (
        <div className="container">
            {video.loading && <div>Loading...</div>}
            {!video.loading && video.error ? (
                <div>Error: {video.error}</div>
            ) : null}

            {!video.loading &&
                Object.keys(video.videos).length &&
                video.videos.items.length && (
                    <>
                        <iframe
                            className="youtube-overlay"
                            src={
                                "https://www.youtube.com/embed/" +
                                video.videos.items[0].id.videoId +
                                "?autoplay=0&mute=1&modestbranding=1&autohide=1&showinfo=0"
                            }
                            title={video.videos.items[0].snippet.title}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>

                        <h1 className="recent-videos__title">Recent Videos</h1>
                        <div className="recent-videos__content">
                            {video.videos.items.map((video: any) => (
                                <iframe
                                    key={video.id.videoId}
                                    className="recent-video"
                                    width="560"
                                    height="315"
                                    src={
                                        "https://www.youtube.com/embed/" +
                                        video.id.videoId
                                    }
                                    title={video.snippet.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ))}
                        </div>
                    </>
                )}
        </div>
    );
};
