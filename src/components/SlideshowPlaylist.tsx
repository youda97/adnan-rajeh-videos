import axios from "axios";
import React, { useEffect, useState } from "react";
import { Slideshow } from "./Slideshow";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/playlistItems";
const RESULTS = 50;

interface Props {
    playlist: string;
}

export const SlideshowPlaylist = ({ playlist }: Props) => {
    const [playlistItems, setPlaylistItems] = useState<any>({
        loading: true,
        items: [],
        error: "",
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            await axios(
                `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&playlistId=${playlist}&part=id,snippet,status&order=date&maxResults=${RESULTS}`
            ).then(
                (response: any) => {
                    let data: any = [];
                    response.data.items.forEach((item: any) => {
                        const id = item.id;
                        const playlistId = item.snippet.playlistId;
                        const title = item.snippet.title;
                        const description = item.snippet.description;
                        const publishedAt = item.snippet.publishedAt;
                        const thumbnails = item.snippet.thumbnails;
                        const videoId = item.snippet.resourceId.videoId;
                        const status = item.status.privacyStatus;

                        if (status === "public" && videoId) {
                            if (!data.length) {
                                data.push({
                                    id,
                                    playlistId,
                                    title,
                                    description,
                                    publishedAt,
                                    thumbnails,
                                    videoId,
                                    status,
                                });
                            } else if (
                                data.every((item) => item.videoId !== videoId)
                            ) {
                                data.push({
                                    id,
                                    playlistId,
                                    title,
                                    description,
                                    publishedAt,
                                    thumbnails,
                                    videoId,
                                    status,
                                });
                            }
                        }
                    });

                    setPlaylistItems({
                        loading: false,
                        items: data,
                        error: "",
                    });
                },
                (error) => {
                    // Only checking for any http errors.
                    // console.error("Error fetching data: ", error);
                    setPlaylistItems({
                        loading: false,
                        items: [],
                        error: error,
                    });
                }
            );
        } catch (e) {
            // Any unexpected errors.
            // console.log(e);
            setPlaylistItems({ loading: false, items: [], error: e });
        }
    };

    if (playlistItems.loading) return <>loading...</>;
    if (playlistItems.error !== "") return <>Error!</>;

    return (
        <>
            {playlistItems.items.length ? (
                <Slideshow playlistItems={playlistItems} />
            ) : null}
        </>
    );
};
