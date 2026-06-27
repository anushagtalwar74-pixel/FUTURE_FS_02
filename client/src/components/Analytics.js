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

export default function Analytics({ leads }) {

    const data = [
        { name: "New", value: leads.filter(l => l.status === "new").length },
        { name: "Contacted", value: leads.filter(l => l.status === "contacted").length },
        { name: "Converted", value: leads.filter(l => l.status === "converted").length }
    ];

    const barData = [
        {
            name: "Leads",
            new: data[0].value,
            contacted: data[1].value,
            converted: data[2].value
        }
    ];

    const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

    return (
        <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
            
            {/* PIE CHART */}
            <PieChart width={300} height={250}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            {/* BAR CHART */}
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