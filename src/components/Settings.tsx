import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

export const Settings = ({}: Props) => {
    const settings = useSelector((state: any) => state.settings);
    const dispatch: any = useDispatch();

    const setMute = () => {
        dispatch({
            type: "SET_SETTINGS",
            payload: { mute: !settings.mute },
        });
    };

    const setAutoplay = () => {
        dispatch({
            type: "SET_SETTINGS",
            payload: { autoplay: !settings.autoplay },
        });
    };

    const setTheme = () => {
        dispatch({
            type: "SET_SETTINGS",
            payload: { theme: !settings.theme },
        });
    };

    return (
        <div className="container settings">
            <div className="justify-content-center">
                <div className="settings-box">
                    <fieldset>
                        <div className="name">Stat videos on mute</div>
                        <div className="info">
                            <div className="info-text">
                                {!settings.mute ? "Unmuted" : "Muted"}
                            </div>
                            <div className="switch">
                                <input
                                    type="checkbox"
                                    id="start-on-mute"
                                    checked={settings.mute}
                                    onChange={() => setMute()}
                                />
                                <label htmlFor="start-on-mute"></label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="settings-box">
                    <fieldset>
                        <div className="name">Autoplay</div>
                        <div className="info">
                            <div className="info-text">
                                {!settings.autoplay
                                    ? "Videos are NOT auotplayed"
                                    : "Videos are auotplayed"}
                            </div>
                            <div className="switch">
                                <input
                                    type="checkbox"
                                    id="autoplay"
                                    checked={settings.autoplay}
                                    onChange={() => setAutoplay()}
                                />
                                <label htmlFor="autoplay"></label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="settings-box">
                    <fieldset>
                        <div className="name">Light/Dark mode</div>
                        <div className="info">
                            <div className="info-text">
                                {!settings.theme ? "Light mode" : "Dark mode"}
                            </div>
                            <div className="switch">
                                <input
                                    type="checkbox"
                                    id="theme"
                                    checked={settings.theme}
                                    onChange={() => setTheme()}
                                />
                                <label htmlFor="theme"></label>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};
