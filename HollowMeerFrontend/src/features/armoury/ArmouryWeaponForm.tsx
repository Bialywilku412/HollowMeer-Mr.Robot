import type { WeaponData } from "../../api/weapons";
import type { Weapon } from "../../types/Weapon";
import * as weaponTypesApi from "../../api/weaponTypes";
import * as weaponConditionsApi from "../../api/weaponConditions";
import { useFetch } from "../../hooks/useFetch";
import { useState, type FormEvent } from "react";

type WeaponFormProps = {
    editingWeapon: Weapon | null;
    onSave: (data: WeaponData) => Promise<boolean>;
}

export function ArmouryWeaponForm({ editingWeapon, onSave } : WeaponFormProps){
    const [name, setName] = useState(editingWeapon?.name ?? "");
    const [weaponTypeId, setWeaponTypeId] = useState(editingWeapon?.weaponType.id ?? 0,);
    const [weaponConditionId, setWeaponConditionId] = useState(editingWeapon?.weaponCondition.id ?? 0,);
    const [isDangerous, setIsDangerous] = useState(editingWeapon?.isDangerous ?? false);
    const [note, setNote] = useState(editingWeapon?.note ?? "");
    const [formError, setFormError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const { data: weaponTypes, error: weaponTypesError } = useFetch(weaponTypesApi.getAll, []);
    const { data: weaponConditions, error: weaponConditionsError } = useFetch(weaponConditionsApi.getAll, []);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (name.trim() === "" || weaponTypeId === 0 || weaponConditionId === 0) {
            setFormError("A weapon needs a name, type and condition")
            return;
        }
        
        setFormError(null);
        setSaving(true);

        const saved = await onSave({
            name,
            weaponTypeId,
            weaponConditionId,
            isDangerous,
            note  
        });

        setSaving(false);

        if (saved && !editingWeapon) {
            setName("");
            setWeaponTypeId(0);
            setWeaponConditionId(0);
            setIsDangerous(false);
            setNote("");
        }
    }
    
    return(
        <>
            <form onSubmit={handleSubmit} className="add-form">
                <h2>{editingWeapon ? "Edit weapon" : "Add weapon"}</h2>
                <label> Weapon Name:
                    <input
                        type="text"
                        className="item-form"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <label> Weapon Type:
                    <select
                        className="item-form"
                        value={weaponTypeId}
                        onChange={(event) => setWeaponTypeId(Number(event.target.value))}
                    >
                        <option value={0}>Choose a weapon type</option>
                        {(weaponTypes ?? []).map((weaponType) => (
                            <option key={weaponType.id} value={weaponType.id}>
                                {weaponType.name}
                            </option>
                        ))}
                    </select>
                    {weaponTypesError && <p>Could not load the types.</p>}
                </label>
                <label> Weapon Condition:
                    <select
                        className="item-form"
                        value={weaponConditionId}
                        onChange={(event) => setWeaponConditionId(Number(event.target.value))}
                    >
                        <option value={0}>Choose a weapon condition</option>
                        {(weaponConditions ?? []).map((weaponCondition) => (
                            <option key={weaponCondition.id} value={weaponCondition.id}>
                                {weaponCondition.name}
                            </option>
                        ))}
                    </select>
                    {weaponConditionsError && <p>Could not load the conditions.</p>}
                </label>
                <label> Dangerous?
                    <input
                        type="checkbox"
                        className="item-form"
                        checked={isDangerous}
                        onChange={(event) => setIsDangerous(event.target.checked)}
                    />
                </label>
                <label> Note:
                    <input
                        type="text"
                        className="item-form"
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                    />
                </label>
                <button 
                    type="submit"
                    className="btn btn--seal"
                    disabled={saving}
                >
                    {saving ? "Saving..." : editingWeapon ? "Save" : "Add"}
                </button>
                {formError && <p>{formError}</p>}
            </form>
        </>
    );
}