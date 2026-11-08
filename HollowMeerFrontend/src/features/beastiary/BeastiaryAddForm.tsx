import type { Beast } from "../../types/Beast";
import { useState, type FormEvent } from "react";

type BeastFormProps = {
    editingBeast: Beast | null;
    onAdd?: (name: string, region: string, description: string, imageUrl: string) => void;
    onUpdate?: (beast: Beast) => void;
    setShow: (show: boolean) => void;
}

export function BeastAddForm({ setShow, onAdd, editingBeast, onUpdate} : BeastFormProps){
    const [name, setName] = useState(editingBeast?.name ?? "");
    const [region, setRegion] = useState(editingBeast?.region ?? "");
    const [description, setDescription] = useState(editingBeast?.description ?? "");
    const [imageUrl, setImageUrl] = useState(editingBeast?.imageUrl ?? "");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (name.trim() === "") {
            return;
        }
        if (editingBeast) {
            onUpdate?.({ id: editingBeast.id, name, region, description, imageUrl });
        } else {
            onAdd?.(name, region, description, imageUrl);
        }
        setName("");
        setRegion("");
        setDescription("");
        setImageUrl("");
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
                    <input
                        type="text"
                        className="item-form"
                        value={region}
                        onChange={(event) => setRegion(event.target.value)}
                    />
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