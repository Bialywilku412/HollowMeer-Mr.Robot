import { useState, type FormEvent } from "react";
import type { Quest } from "./Quest";
type QuestFormProps =
{
    editingQuest: Quest | null;
    onAdd: (name: string, host: string, description: string, date: string ) => void;
    onUpdate: (quest: Quest) => void;
    onCancel: () => void;
}
export function QuestForm({editingQuest, onAdd, onUpdate, onCancel }: QuestFormProps)
    {
        const [name, setName] = useState(editingQuest?.name ?? "");
        const [host, setHost] = useState(editingQuest?.host ?? "");
        const [description, setDescription] = useState(editingQuest?.description ?? "");
        const [date, setDate] = useState(editingQuest?.date ?? "");
        const [editingid, setEditingId] = useState<number | null>(null);
    

        function handleSubmit(event: FormEvent)
        {
            event.preventDefault();
            if(name.trim() === "" || host.trim() === "" || description.trim() === "" || date.trim() === "" )
                {
                    return;
                }
            if(editingQuest)
                {
                    onUpdate({id: editingQuest.id ,name, host, description, date });
                }
            else
                {
                    onAdd(name, host, description, date);
                }
            setDate("");
            setName("");
            setDescription("");
            setHost("");
            
        }


        return (
    <form onSubmit={handleSubmit}>
      <h2>{editingQuest ? "Edit": "Add quest"}</h2>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        value={host}
        onChange={(event) => setHost(event.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        type="text"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <button type="submit">{editingQuest ? "Save" : "Add"}</button>
      {editingQuest && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}

    </form>

);
    }