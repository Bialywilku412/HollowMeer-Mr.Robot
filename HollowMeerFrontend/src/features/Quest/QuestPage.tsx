import { useEffect, useState } from "react";
import "./QuestPage.css"
import { type Quest } from "./Quest";
import { QuestList } from "./QuestList";
import { QuestForm } from "./QuestForm";


export function QuestPage()
{
const [quests, setQuests] = useState<Quest[]>([]);
const [loading, setLoading] =useState(true);
const [error, setError] = useState<string | null>(null);
const [editingQuest, setEditingQuest] = useState<Quest | null>(null);

{
    useEffect(() => 
        {
            async function loadQuests() 
            {
             try
             {
                const response  = await fetch("/quests.json");
                if(!response.ok)
                    {
                        throw new Error(`Request failed with status ${response.status}`);
                    }
                    const data = await response.json();
                    setQuests(data);
             }
             catch (err) 
            {
                console.error(err);
                setError("Could not load products.");
            } finally 
            {
                setLoading(false);
            }
        }
        loadQuests();
        }, []);


        function onAdd(name: string, host: string , description: string, date: string)
        {
            const id = setQuests.length + 1;
            const newQuest = { id, name, host, description, date}

            setQuests([...quests, newQuest]);
        }
        function onUpdate(updated: Quest)
        {
            setQuests(quests.map((q) => (q.id === updated.id ? updated: q)));
            setEditingQuest(null);

        }
        function startEditing(quest: Quest)
        {
            setEditingQuest(quest);
        }
        function onCancel()
        {
            setEditingQuest(null);
        }
        function deleteProduct(id: number)
        {
            setQuests(quests.filter((q) => q.id !== id))
        }




    return (
        <div>
            <h1>Quest Page</h1>
            <p>Welcome to the Quest Page!</p>
            <QuestList 
            quests={quests}
            onEdit={startEditing}
            onDelete={deleteProduct}
            />
            <QuestForm
            key={editingQuest?.id ?? "new"}
            editingQuest={editingQuest}
            onAdd={onAdd}
            onUpdate={onUpdate}
            onCancel={onCancel}
             />
            
        </div>
    );
}
}
export default QuestPage;