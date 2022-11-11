import React, { useEffect, useState } from "react";
import logo from "../images/error.png";

interface Props {
    error: any;
}

export const Error = ({ error }: Props) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getErrorCode = () => {
        if (error.message) {
            var number = error.message.match(/\d/g);
            number = number.join("");
            return number;
        }
    };

    return (
        <div className="error">
            {width > 745 ? (
                <div className="column">
                    <img src={logo} />
                </div>
            ) : null}
            <div className="column">
                <h1>{getErrorCode()}</h1>
                <h2>Something went wrong</h2>
                <p>
                    {error.name}: {error.message}
                </p>
            </div>
        </div>
    );
};
