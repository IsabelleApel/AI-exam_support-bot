import "./message.css";

export function Message({ role, content }) {
    const userMsg = role === "user";

    return (
        <section className={`msg-row ${userMsg ? "own" : "bot"}`}>
            <section className="msg-bubble">
                <span className="msg-sender">{role}</span>
                <p className="msg-content">{content}</p>
            </section>
        </section>
    )
};