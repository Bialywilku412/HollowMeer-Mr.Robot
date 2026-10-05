import { useEffect, useState } from "react";
import ArmouryTable from "./ArmouryTable";
import { type Weapon } from "./weapons";
import WeaponAddModal from "./ArmouryWeaponAddModal";

function Armoury() {

    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false)

    async function addWeapon(newWeapon: Omit<Weapon, "id">) {
        try {
            const response = await fetch("/weapons.json", {
                method: "POST",
                body: JSON.stringify(newWeapon)
            });
            if (!response.ok) {
                throw new Error(`Request failed with ${response.status}`);
            }
            setWeapons((prev) => [
                ...prev,
                { ...newWeapon, id: Math.max(0, ...prev.map((weapon) => weapon.id)) + 1 },
            ])
        } catch (err) {
            console.error(err);
            setError("Could not add weapon")
        } finally {
            setLoading(false);
        }
    }

    async function fetchWeapons() {
        try {
            const response = await fetch("/weapons.json");
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            setWeapons(data);
        } catch (err) {
            console.error(err);
            setError("Could not load products. ");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWeapons();
    },[]);

    if (loading) {
        return <p>Loading weapons...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Add</button>
            <WeaponAddModal
                show={showModal}
                setShow={setShowModal}
                onAdd={addWeapon}
            />
            <ArmouryTable
                weapons={weapons}
            />
        </>
    );
}
export default Armoury;