import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Report } from "./reports";
import "./ArchiveForm.css";

type ArchiveProps = {
    onAdd: (report: Report) => void;
    onCancel: () => void;
    onDelete: (report: Report) => void;
    initialReport?: Report;
}

export function ArchiveForm({ onAdd, onCancel, onDelete, initialReport }: ArchiveProps) {
    const [questName, setQuestName] = useState(initialReport?.questName ?? "");
    const [region, setRegion] = useState(initialReport?.region ?? "");
    const [departure, setDeparture] = useState(initialReport 
        ? new Date(initialReport.departure).toISOString().split("T")[0]
        : new Date().getFullYear().toString() + "-" +
        (new Date().getMonth() + 1).toString().padStart(2, "0") + "-" +
        new Date().getDate().toString().padStart(2, "0")
    );

    function saveReport(status: Report["status"]) {
        if (questName.trim() === "" ||
            region.trim() === "" ||
            departure.trim() === "") {
                return;
            }
        onAdd({
            questName: questName,
            region: region,
            departure: new Date(departure),
            status: status,
            action: status === "Completed" ? "View" : "Edit or Delete"
        });
        setQuestName("");
        setRegion("");
        setDeparture("");
    }

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        saveReport("Completed");
    }

    return (
    <div className="form-overlay">
        <form className="archive-form" onSubmit={handleSubmit}>
            <h3>Add report</h3>
            <label>
                Quest name
                <input
                    className="form-input"
                    type="text"
                    value={questName}
                    onChange={(event) => setQuestName(event.target.value)}
                    placeholder="Enter quest name"
                />
            </label>

            <label>
                Region
                <input
                    className="form-input"
                    type="text"
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                    placeholder="Enter region"
                />
            </label>

            <label>
                Departure date
                <input
                    className="form-input"
                    type="date"
                    value={departure}
                    onChange={(event) => setDeparture(event.target.value)}
                />
            </label>
            
            <button type="submit">Add</button>
            <button type="button" onClick={() => saveReport("Draft")}>Save as draft</button>
            <button type="button" onClick={onCancel}>Cancel</button>
            {initialReport &&  (
                <button
                    type="button"
                    onClick={() => onDelete(initialReport)}
                >Delete</button>
            )}
        </form>
    </div>
    );
}

export default ArchiveForm;



// Wanneer de knop geklikt wordt dan kan de gebruiker een nieuwe report maken en 
// die wordt toegevoegd aan de JSON en komt voor in de table.

// 1. Een report kan niet gewijzigd worden.
// 2. Een report kan niet verwijderd worden.
// 3. Een report kan worden opgeslagen als een draft en dus later aangepast worden.
// 4. Als een report is opgeslagen als een draft dan kan de gebruiker geen nieuwe
//    report maken totdat het geen draft is.
// 5. Een draft kan gewijzigd worden.
// 6. Een draft kan verwijderd worden.

// STAPPENPLAN:
// 1. Status heeft een vaste value die wordt aangegeven wanneer
//    een report is aangemaakt.
//    Report aangemaakt -> Completed.
//    Report opgeslagen als draft -> Draft.
//    Report gecanceld -> Geen report.

// 2. Status = Completed -> Zie report in beter overzicht.
//    Status = Draft -> Wijzig de report en dan krijgt de gebruiker
//                      de opties:
//                      - Add
//                      - Save as draft
//                      - Cancel (editing)
//                      - Delete

// 3. Bij de region row krijgt de gebruiker een rij van de regio's
//    en kan hij/zij eentje kiezen.

// 4. De report kan nu opgeslagen worden als:
//    Report -
//    questName: naam
//    region: gekozenRegion
//    departure: gekozenDatum
//    status: Completed (const)
//    action (button): View

//    Draft - 
//    questName: naam
//    region: gekozenRegion
//    departure: gekozenDatum
//    status: Draft (const)
//    action (button): Edit or Delete