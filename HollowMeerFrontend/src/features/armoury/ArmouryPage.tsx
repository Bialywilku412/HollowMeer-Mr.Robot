
import ArmouryTable from "./ArmouryTable";
import type { WeaponData } from "../../api/weapons";
import WeaponAddModal from "./ArmouryWeaponAddModal";
import { useWeapons } from "./useWeapons";
import { useState } from "react";

export function Armoury() {

    const {
        weapons,
        loading,
        error,
        saveError,
        search,
        setSearch,
        addWeapon,
    } = useWeapons();
    const [showModal, setShowModal] = useState(false);

    async function handleAdd(data: WeaponData) {
        const response = await addWeapon(data);
        if (response) setShowModal(false);
        return response;
    }

    if (loading) {
        return <p>Loading weapons...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <WeaponAddModal
                editingWeapon={null}
                onSave={handleAdd}
                show={showModal}
                setShow={setShowModal}
            />
            <div className="parchment">
                <input
                    type="search"
                    placeholder="Search weapons..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {saveError && <p className="form-error">{saveError}</p>}
                <button className="btn" onClick={() => setShowModal(true)}>Add new weapon</button>
                <ArmouryTable
                    weapons={weapons ?? []}
                /> 
                <span className="blood" aria-hidden="true"
                    style={{ "--x": "90%", "--y": "92%", "--size": "130px" } as React.CSSProperties}
                />
            </div>
        </>
    );
}
export default Armoury;