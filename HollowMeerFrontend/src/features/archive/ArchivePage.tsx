import { useState, useEffect } from "react";
import type { Report } from "./reports";
import { ArchiveForm } from "./ArchiveForm";
import Table from "./Table";
import "./ArchivePage.css";

export default function Archive() {
    const [reports, setReports] = useState<Report[]>(() => {
        const savedReports = localStorage.getItem("reports");

        if (savedReports) {
            const parsedReports: Report[] = JSON.parse(savedReports);
            return parsedReports.map((report) => ({...report, departure: new Date(report.departure)}));
        }
        return [];
    }); 

    useEffect(() => {
        localStorage.setItem("reports", JSON.stringify(reports));
    }, [reports]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingReport, setEditingReport] = useState<Report | null>(null);

    function addReport(report: Report) {
        if (editingReport) {
            setReports(reports.map(existingReport => existingReport === editingReport ? report : existingReport));
        }
        else {
            setReports([...reports, report]);
        }
        setEditingReport(null);
        setIsFormOpen(false);
    }

    function deleteReport(reportToDelete: Report) {
        if (reportToDelete.status !== "Draft") {
            return;
        }
        setReports(reports.filter(report => report !== reportToDelete));
        setEditingReport(null);
        setIsFormOpen(false);
    }

    function editReport(reportToEdit: Report) {
        if (reportToEdit.status !== "Draft") {
            return;
        }
        setEditingReport(reportToEdit);
        setIsFormOpen(true);
    }

    return (
        <div className="archive-page">
            <h1>Archive</h1>
            {reports.length === 0 ? (<p>No reports</p>) : <Table reports={reports} onEdit={editReport} onDelete={deleteReport} />}
            <button className="add-report-button"
                onClick={() => setIsFormOpen(true)}
                disabled={reports.some(report => report.status === "Draft")}
            >Add report</button>
            {isFormOpen && (
                <ArchiveForm
                    key={editingReport?.questName ?? "new-report"}
                    onAdd={addReport}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setEditingReport(null);
                    }}
                    onDelete={deleteReport}
                    initialReport={editingReport ?? undefined}
                />
            )}
            
        </div>
    );
}