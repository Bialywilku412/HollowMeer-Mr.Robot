import "./Table.css";
import type { Report } from "./reports";

type TableProps = {
    reports: Report[];
    onEdit: (report: Report) => void;
    onDelete: (report: Report) => void;
};

const Table = ({ reports, onEdit, onDelete }: TableProps) => {
    const headers = [
        {
            id: 1,
            key: "questName" as const,
            label: "Quest"
        },
        {
            id: 2,
            key: "region" as const,
            label: "Region"
        },
        {
            id: 3,
            key: "departure" as const,
            label: "Departure"
        },
        {
            id: 4,
            key: "status" as const,
            label: "Status"
        },
        {
            id: 5,
            key: "action" as const,
            label: "Actions"
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
                {reports.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header, index) => {
                            return (
                                <td key={header.id}>
                                    {(() => {
                                        { 
                                            if (header.key === "action") {
                                                if (row.status === "Draft") {
                                                    return (
                                                        <div>
                                                            <button className="table-button edit-button" onClick={() => onEdit(row)}>Edit</button>
                                                            <button className="table-button delete-button" onClick={() => onDelete(row)}>Delete</button>
                                                        </div>
                                                    );
                                                }
                                                return "-";
                                            } 
                                        }
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