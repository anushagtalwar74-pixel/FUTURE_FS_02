import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

export default function Analytics({ leads = [] }) {

    const newCount = leads.filter(l => l.status === "new").length;
    const contactedCount = leads.filter(l => l.status === "contacted").length;
    const convertedCount = leads.filter(l => l.status === "converted").length;

    const data = [
        { name: "New", value: newCount },
        { name: "Contacted", value: contactedCount },
        { name: "Converted", value: convertedCount }
    ];

    const barData = [
        {
            name: "Leads",
            new: newCount,
            contacted: contactedCount,
            converted: convertedCount
        }
    ];

    const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

    return (
        <div style={{ display: "flex", gap: 40, marginTop: 20 }}>

            <PieChart width={300} height={250}>
                <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <BarChart width={400} height={250} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new" fill="#f59e0b" />
                <Bar dataKey="contacted" fill="#3b82f6" />
                <Bar dataKey="converted" fill="#22c55e" />
            </BarChart>

        </div>
    );
}