import {useState } from "react";
import type { Beast } from "../../types/Beast";
import type { BeastData } from "../../api/beasts";
import BeastiaryTable from "./BeastiaryTabel";
import BeastAddModal from "./BeastiaryAddModal";
import * as beastsApi from "../../api/beasts";
import "../armoury/Armoury.css";
import { useFetch } from "../../hooks/useFetch";

function BeastiaryPage() {
    const {
            data: beasts,
            loading,
            error,
            setData: setBeasts,
        } = useFetch(beastsApi.getAll, []);
    const [showModal, setShowModal] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    async function addBeast(data: BeastData) {
        try {
            const created = await beastsApi.create(data)
            setBeasts([...(beasts ?? []), created]);
            setSaveError(null);
            setShowModal(false);
        } catch (err) {
            setSaveError(
                err instanceof Error ? err.message : "Could not save the beast.",
            );
        }
    }

    if (loading) {
        return <p>Loading beasts...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return(
        <>
            <BeastAddModal
                editingBeast={null}
                onAdd={addBeast}
                show={showModal}
                setShow={setShowModal}
            />
            <div className="parchment">
                {saveError && <p className="form-error">{saveError}</p>}
                <button className="btn" onClick={() => setShowModal(true)}>Add new beast</button>
                <BeastiaryTable
                    beasts={beasts ?? []}
                />
            </div>
        </>
    );
}

export default BeastiaryPage;