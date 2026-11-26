import {useState } from "react";
import type { Beast } from "../../types/Beast";
import type { BeastData } from "../../api/beasts";
import BeastiaryTable from "./BeastiaryTabel";
import BeastAddModal from "./BeastiaryAddModal";
import * as beastsApi from "../../api/beasts";
import "../armoury/Armoury.css";
import { useFetch } from "../../hooks/useFetch";
import { useBeasts } from "./useBeasts";

function BeastiaryPage() {
    const {
        beasts,
        loading,
        error,
        saveError,
        search,
        setSearch,
        addBeast,
    } = useBeasts();
    const [showModal, setShowModal] = useState(false);

    async function handleAdd(data: BeastData) {
        const response = await addBeast(data);
        if (response) setShowModal(false);
        return response;
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
                onSave={handleAdd}
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