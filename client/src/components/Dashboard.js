import api from "../api";
import { LayoutDashboard, Users, BarChart3, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Dashboard() {

    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
        setLoading(true);

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/leads`);

        setLeads(res.data);
    } catch (err) {
        console.log(err);
        toast.error("Failed to fetch leads");
    } finally {
        setLoading(false);
    }
    };

    const updateStatus = async (id, status) => {
        try {
        await axios.put(
            `${process.env.REACT_APP_API_URL}/api/leads/${id}`,
            { status }
        );

        toast.success("Updated!");
        fetchLeads();
    } catch (err) {
        toast.error("Update failed");
    }
    };

    const filtered = leads.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div style={{ padding: 40 }}>Loading CRM... 🚀</div>;
    }

    return (
        <div style={{
            display: "flex",
            height: "100vh",
            fontFamily: "Arial",
            background: "linear-gradient(135deg,#f5f7fa,#c3cfe2)"
        }}>

            {/* SIDEBAR */}
            <div style={{
                width: 220,
                background: "#111827",
                color: "white",
                padding: 20
            }}>
                <h2>CRM PRO</h2>
                <p>Dashboard</p>
                <p>Leads</p>
                <p>Analytics</p>
            </div>

            {/* MAIN */}
            <div style={{ flex: 1, padding: 20 }}>

                <h1>Welcome 🚀</h1>

                <input
                    placeholder="Search leads..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: 10 }}>
                    <div>Total: {leads.length}</div>
                    <div>New: {leads.filter(l => l.status === "new").length}</div>
                    <div>Converted: {leads.filter(l => l.status === "converted").length}</div>
                </div>

                {filtered.length === 0 ? (
                    <div>No Leads Found</div>
                ) : (
                    filtered.map((lead, i) => (
                        <motion.div
                            key={lead._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: "white",
                                padding: 15,
                                margin: 10,
                                borderRadius: 10,
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <div>
                                <h3>{lead.name}</h3>
                                <p>{lead.email}</p>
                                <span>{lead.status}</span>
                            </div>

                            <div>
                                <button onClick={() => updateStatus(lead._id, "contacted")}>Contacted</button>
                                <button onClick={() => updateStatus(lead._id, "converted")}>Converted</button>
                            </div>
                        </motion.div>
                    ))
                )}

            </div>
        </div>
    );
}