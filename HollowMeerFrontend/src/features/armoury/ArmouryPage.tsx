import { useState } from "react";
import ArmouryTable from "./ArmouryTable";
import { ArmouryWeaponForm } from "./ArmouryWeaponForm";
import { weapons, type Weapon } from "./weapons";

function Armoury() {
    function addWeapon() {

    }

    return (
        <>
            <ArmouryWeaponForm
                onAdd={addWeapon}/>
            <ArmouryTable
                weapons={weapons}
            />
        </>
    );
}
export default Armoury;