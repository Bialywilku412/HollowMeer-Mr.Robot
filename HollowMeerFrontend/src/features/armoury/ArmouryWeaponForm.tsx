import { useNavigate } from "react-router";
import type { Weapon } from "./weapons";
import { useState, type FormEvent } from "react";
import Navbar from "../../components/Navbar";

type WeaponFormProps = {
    onAdd: (weapon: Omit<Weapon, "id">) => void
}

export function ArmouryWeaponForm({ onAdd } : WeaponFormProps){
    const [newWeapon, setNewWeapon] = useState<Omit<Weapon, "id">>({
        name: "",
        type: "",
        condition: "",
        isDangerous: false,
        note: ""
    })

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onAdd(newWeapon);
    }
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={newWeapon.name}
                        onChange={(e) => setNewWeapon({ ...newWeapon, name: e.target.value })}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={newWeapon.type}
                        onChange={(e) => setNewWeapon({ ...newWeapon, type: e.target.value })}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={newWeapon.condition}
                        onChange={(e) => setNewWeapon({ ...newWeapon, condition: e.target.value })}
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={newWeapon.isDangerous}
                        onChange={(e) => setNewWeapon({ ...newWeapon, isDangerous: e.target.checked })}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={newWeapon.note}
                        onChange={(e) => setNewWeapon({ ...newWeapon, note: e.target.value })}
                    />
                </label>
                <label>
                    <button type="submit">add</button>
                </label>
            </form>
        </>
    );
}