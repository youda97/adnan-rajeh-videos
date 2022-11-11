import axios from "axios";
import React, { useEffect, useState } from "react";
import { parse } from "node-html-parser";
import fetch from "node-fetch";

interface Props {}

const channelID = "UCV4_IPy-P9Gbdvxn-FygEOg";

export const Livestream = ({}: Props) => {
    const [isStreaming, setIsStreaming] = useState(false);

    const getLiveStream = async () => {
        const response = await fetch(
            `https://youtube.com/channel/${channelID}/live`,
            { mode: "no-cors" }
        );
        const text = await response.text();
        const html = parse(text);

        const canonicalURLTag = html.querySelector("link[rel=canonical]");

        if (canonicalURLTag) {
            const canonicalURL = canonicalURLTag.getAttribute("href");
            const isChannelStreaming = canonicalURL.includes("/watch?v=");

            setIsStreaming(isChannelStreaming);
        } else {
            setIsStreaming(false);
        }
    };

    useEffect(() => {
        getLiveStream();
    }, []);

    return (
        <div className="container livestream">
            {isStreaming ? "Coming soon..." : "No live videos"}
        </div>
    );
};
