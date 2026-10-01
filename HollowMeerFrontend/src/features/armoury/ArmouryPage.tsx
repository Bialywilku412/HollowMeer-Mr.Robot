import { useState } from "react";
import ArmouryTable from "./ArmouryTable";
import { ArmouryWeaponForm } from "./ArmouryWeaponForm";
import { weapons, type Weapon } from "./weapons";

function Armoury() {

    const [allWeapons, setAllWeapons] = useState(weapons)
    
    function addWeapon(newWeapon: Omit<Weapon, "id">) {
        setAllWeapons((prev) => [
            ...prev,
            { ...newWeapon, id: Math.max(0, ...prev.map((weapon) => weapon.id)) + 1 },
        ]);
    }

    return (
        <>
            <ArmouryWeaponForm
                onAdd={addWeapon}/>
            <ArmouryTable
                weapons={allWeapons}
            />
        </>
    );
}
export default Armoury;