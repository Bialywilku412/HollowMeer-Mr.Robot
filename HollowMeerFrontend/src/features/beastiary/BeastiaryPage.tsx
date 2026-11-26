import { useState } from "react";
import type { BeastData } from "../../api/beasts";
import BeastiaryTable from "./BeastiaryTabel";
import BeastAddModal from "./BeastiaryAddModal";
import { useBeasts } from "./useBeasts";
import "../armoury/Armoury.css";

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