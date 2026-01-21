import { useEffect, useState } from "react";
import { getContracts, saveContracts } from "../storage/contractStorage";
import { STATUS_TRANSITIONS } from "../utils/contractLifecycle";

function Dashboard() {
    const [contracts, setContracts] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        setContracts(getContracts());
    }, []);

    function updateStatus(contractId, newStatus) {
        const updated = contracts.map((c) =>
            c.id === contractId ? { ...c, status: newStatus } : c
        );
        setContracts(updated);
        saveContracts(updated);
    }

    function filterContracts() {
        if (filter === "All") return contracts;
        if (filter === "Active")
            return contracts.filter(
                (c) => !["Locked", "Revoked"].includes(c.status)
            );
        if (filter === "Signed")
            return contracts.filter((c) => c.status === "Signed");
        if (filter === "Pending")
            return contracts.filter((c) =>
                ["Created", "Approved", "Sent"].includes(c.status)
            );
        return contracts;
    }

    function statusStyle(status) {
        const colors = {
            Created: "#6c757d",
            Approved: "#0d6efd",
            Sent: "#0dcaf0",
            Signed: "#198754",
            Locked: "#212529",
            Revoked: "#dc3545",
        };

        return {
            backgroundColor: colors[status] || "#999",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            display: "inline-block",
        };
    }


    return (
        <div>
            <h2>Contract Dashboard</h2>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option>All</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Signed</option>
            </select>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blueprint</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filterContracts().map((c) => (
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.blueprintName}</td>
                            <td>
                                <span style={statusStyle(c.status)}>{c.status}</span>
                            </td>
                            <td>
                                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                    <button
                                        onClick={() =>
                                            (window.location.href = `/contracts/${c.id}`)
                                        }
                                    >
                                        View
                                    </button>

                                    {STATUS_TRANSITIONS[c.status].map((next) => (
                                        <button
                                            key={next}
                                            onClick={() => updateStatus(c.id, next)}
                                        >
                                            {next}
                                        </button>
                                    ))}
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
