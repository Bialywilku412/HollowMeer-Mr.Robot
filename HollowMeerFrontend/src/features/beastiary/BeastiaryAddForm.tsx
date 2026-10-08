import type { Beast } from "../../types/Beast";
import { useState, type FormEvent } from "react";

type BeastFormProps = {
    onAdd: (beast: Omit<Beast, "id">) => void
    setShow: (show: boolean) => void
}

export function BeastWeaponForm({ setShow, onAdd } : BeastFormProps){
    const [newBeast, setNewBeast] = useState<Omit<Beast, "id">>({
        name: "",
        region: "",
        description: "",
        drawing: ""
    })

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onAdd(newBeast);
        setShow(false);
    }
    
    return(
        <>
            <form onSubmit={handleSubmit} className="add-form">
                <label> Beast name:
                    <input
                        type="text"
                        className="item-form"
                        value={newBeast.name}
                        onChange={(e) => setNewBeast({ ...newBeast, name: e.target.value })}
                    />
                </label>
                <label> Beast region:
                    <input
                        type="text"
                        className="item-form"
                        value={newBeast.region}
                        onChange={(e) => setNewBeast({ ...newBeast, region: e.target.value })}
                    />
                </label>
                <label> Beast description:
                    <input
                        type="text"
                        className="item-form"
                        value={newBeast.description}
                        onChange={(e) => setNewBeast({ ...newBeast, description: e.target.value })}
                    />
                </label>
                <label> Drawing: 
                    <input
                        type="file"
                        className="item-form"
                        value={newBeast.drawing ?? ""}
                        onChange={(e) => setNewBeast({ ...newBeast, drawing: e.target.value })}
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