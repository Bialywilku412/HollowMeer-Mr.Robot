import "./Table.css";

const Table = () => {
    const headers = [
        {
            id: 1,
            key: "QUEST" as const,
            label: "Quest"
        },
        {
            id: 2,
            key: "REGION" as const,
            label: "Region"
        },
        {
            id: 3,
            key: "DEPARTURE" as const,
            label: "Departure"
        },
        {
            id: 4,
            key: "STATUS" as const,
            label: "Status"
        },
        {
            id: 5,
            key: "ACTIONS" as const,
            label: "Actions"
        }
    ];

    const data = [
        {
            ID: 1,
            QUEST: "Slay the beasts",
            REGION: "South-America",
            DEPARTURE: new Date("2026-10-05"),
            STATUS: "Completed",
            ACTIONS: "View"
        }
    ];

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>
                            <span>{header.label}</span>
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header, index) => {
                            return (
                                <td key={header.id}>
                                    {(() => {
                                        const value = row[header.key];
                                        return value instanceof Date
                                            ? value.toLocaleDateString("en-GB").replaceAll("/", "-")
                                            : value;
                                    })()}
                                </td>
                            );  
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;