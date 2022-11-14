import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

interface Props {}

export const Help = ({}: Props) => {
    const [formResult, setFormResult] = useState<any>({
        sent: false,
        success: false,
        message: "",
    });

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                process.env.REACT_APP_EMAIL_SERVICE_ID,
                process.env.REACT_APP_EMAIL_TEMPLATE_ID,
                form.current,
                process.env.REACT_APP_EMAIL_PUBLIC_KEY
            )
            .then(
                (result) => {
                    setFormResult({
                        sent: true,
                        success: true,
                        message: "Email was sent",
                    });
                    e.target.reset();
                },
                (error) => {
                    setFormResult({
                        sent: true,
                        success: false,
                        message: error.text,
                    });
                }
            );
    };

    return (
        <div className="container help">
            {formResult.sent ? (
                <div className="toast-container">
                    <div
                        className={
                            "ui-toast" +
                            (formResult.success ? " success" : " error")
                        }
                    >
                        <div className="message">{formResult.message}</div>
                    </div>
                </div>
            ) : null}

            <div className="justify-content-center">
                <h2>Help</h2>
                <div className="help-box">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="user_name"
                                required={true}
                                placeholder="Who are you?"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="user_email"
                                required={true}
                                placeholder="name@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="message"
                                required={true}
                                rows={10}
                                wrap="soft"
                                placeholder="Type your message here..."
                            />
                        </div>

                        <input
                            className="send-button"
                            type="submit"
                            value="Send"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};
