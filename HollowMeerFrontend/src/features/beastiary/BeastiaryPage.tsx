import { useEffect, useState } from "react";
import type { Beast } from "../../types/Beast";
import BeastiaryTable from "./BeastiaryTabel";
import BeastAddModal from "./BeastiaryAddModal";
import * as beastsApi from "../../api/beasts";
import "../armoury/Armoury.css";
import { useFetch } from "../../hooks/useFetch";
import { data } from "react-router";

function BeastiaryPage() {
    const {
            data: beasts,
            loading,
            error,
            setData: setBeasts,
        } = useFetch(beastsApi.getAll, []);
     const [addError, setAddError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    async function handleAdd(data: Omit<Beast, "id">) {
        try {
            setAddError(null);
            const created = await beastsApi.create(data)
            setBeasts([...(beasts ?? []), created]);
        } catch {
            setAddError("Could not add beast");
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
                show={showModal}
                setShow={setShowModal}
                onAdd={handleAdd}
            />
            <div className="parchment">
                {addError && <p className="form-error">{addError}</p>}
                <button className="btn" onClick={() => setShowModal(true)}>Add new beast</button>
                <BeastiaryTable
                    beasts={beasts ?? []}
                />
            </div>
        </>
    );
}

export default BeastiaryPage;