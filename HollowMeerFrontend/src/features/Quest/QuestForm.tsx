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
      <h3>Name</h3>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
      />
      <h3>Host</h3>
      <input
        type="text"
        value={host}
        placeholder="Host"
        onChange={(event) => setHost(event.target.value)}
      />
      <h3>Description</h3> 
      <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(event) => setDescription(event.target.value)}
      />
      <h3>Date</h3>
      <input
        type="number"
        value={date}
        placeholder="Date"
        onChange={(event) => setDate(event.target.value)}
      />
      <br></br>
      <button type="submit">{editingQuest ? "Save" : "Add"}</button>
      {editingQuest && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}

    </form>

);
    }