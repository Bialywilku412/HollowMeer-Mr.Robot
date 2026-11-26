import { useFetch } from "../../hooks/useFetch";
import type { Beast } from "../../types/Beast";
import type { BeastData } from "../../api/beasts";
import * as regionsApi from "../../api/regions";
import { useState, type FormEvent } from "react";

type BeastFormProps = {
    editingBeast: Beast | null;
    onSave: (data: BeastData) => Promise<boolean>;
}

export function BeastAddForm({ editingBeast, onSave} : BeastFormProps){
    const [name, setName] = useState(editingBeast?.name ?? "");
    const [regionId, setRegionId] = useState(editingBeast?.region.id ?? 0,);
    const [description, setDescription] = useState(editingBeast?.description ?? "");
    const [imageUrl, setImageUrl] = useState(editingBeast?.imageUrl ?? "");
    const [formError, setFormError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const { data: regions } = useFetch(regionsApi.getAll, []);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (name.trim() === "" || regionId === 0) {
            setFormError("A beast needs a name and region")
            return;
        }

        setFormError(null);
        setSaving(true);

        const saved = await onSave({
            name,
            regionId,
            description,
            imageUrl
        });

        setSaving(false);
        if (saved && !editingBeast) {
            setName("");
            setRegionId(0);
            setDescription("");
            setImageUrl("");
        }
    }
    
    return(
        <>
            <form onSubmit={handleSubmit} className="add-form">
                <h2>{editingBeast ? "Edit beast" : "Add beast"}</h2>
                <label> Beast name:
                    <input
                        type="text"
                        className="item-form"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <label> Beast region:
                    <select
                        className="item-form"
                        value={regionId}
                        onChange={(event) => setRegionId(Number(event.target.value))}
                    >
                        <option value={0}>Choose a region</option>
                        {(regions ?? []).map((region) => (
                            <option key={region.id} value={region.id}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label> Beast description:
                    <input
                        type="text"
                        className="item-form"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label>
                <label> Drawing: 
                    <input
                        type="file"
                        className="item-form"
                        value={imageUrl ?? ""}
                        onChange={(event) => setImageUrl(event.target.value)}
                    />
                </label>
                <button 
                    type="submit"
                    className="btn btn--seal"
                >
                    {editingBeast ? "Save" : "Add"}
                </button>
            </form>
        </>
    );
}