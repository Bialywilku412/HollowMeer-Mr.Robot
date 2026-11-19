import { useEffect, useState } from "react";
import ArmouryTable from "./ArmouryTable";
import type { Weapon } from "../../types/Weapon";
import type { WeaponData } from "../../api/weapons";
import * as weaponsApi from "../../api/weapons";
import WeaponAddModal from "./ArmouryWeaponAddModal";
import { useFetch } from "../../hooks/useFetch";

function Armoury() {

    const {
            data: weapons,
            loading,
            error,
            setData: setWeapons,
        } = useFetch(weaponsApi.getAll, []);
    const [showModal, setShowModal] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    async function addWeapon(data: WeaponData) {
        try {
            const created = await weaponsApi.create(data);
            setWeapons([...(weapons ?? []), created]);
            setSaveError(null);
            setShowModal(false);
        } catch (err) {
            setSaveError(
                err instanceof Error ? err.message : "Could not save the weapon.",
            );
        }
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
                onAdd={addWeapon}
                show={showModal}
                setShow={setShowModal}
            />
            <div className="parchment">
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