import type { Weapon } from "./weapons";
import { useState, type FormEvent } from "react";

type WeaponFormProps = {
    onAdd: (weapon: Omit<Weapon, "id">) => void
    setShow: (show: boolean) => void
}

export function ArmouryWeaponForm({ setShow, onAdd } : WeaponFormProps){
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
        setShow(false);
    }
    
    return(
        <>
            <form onSubmit={handleSubmit} className="add-form">
                <label> Weapon name:
                    <input
                        type="text"
                        className="item-form"
                        value={newWeapon.name}
                        onChange={(e) => setNewWeapon({ ...newWeapon, name: e.target.value })}
                    />
                </label>
                <label> Weapon Type:
                    <input
                        type="text"
                        className="item-form"
                        value={newWeapon.type}
                        onChange={(e) => setNewWeapon({ ...newWeapon, type: e.target.value })}
                    />
                </label>
                <label> Weapon condition:
                    <input
                        type="text"
                        className="item-form"
                        value={newWeapon.condition}
                        onChange={(e) => setNewWeapon({ ...newWeapon, condition: e.target.value })}
                    />
                </label>
                <label> Dangerous?:
                    <input
                        type="checkbox"
                        className="item-form"
                        checked={newWeapon.isDangerous}
                        onChange={(e) => setNewWeapon({ ...newWeapon, isDangerous: e.target.checked })}
                    />
                </label>
                <label> Note:
                    <input
                        type="text"
                        className="item-form"
                        value={newWeapon.note}
                        onChange={(e) => setNewWeapon({ ...newWeapon, note: e.target.value })}
                    />
                </label>
                <button 
                    type="submit"
                    className="submit-btn"
                >
                    add
                </button>
            </form>
        </>
    );
}