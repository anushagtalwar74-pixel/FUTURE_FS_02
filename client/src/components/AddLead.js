import { useState } from "react";
import axios from "axios";

export default function AddLead({ onLeadAdded }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [source, setSource] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post("https://YOUR-RENDER-URL.onrender.com/api/login", {
            name,
            email,
            source
        });

        setName("");
        setEmail("");
        setSource("");

        onLeadAdded();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <h3>Add Lead</h3>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ margin: 5 }}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ margin: 5 }}
            />

            <input
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={{ margin: 5 }}
            />

            <br />

            <button type="submit">
                Add Lead
            </button>
        </form>
    );
}