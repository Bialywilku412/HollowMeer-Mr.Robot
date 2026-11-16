import { useEffect, useState } from "react";
import "./QuestPage.css"
import { type Quest } from "./Quest";
import { QuestList } from "./QuestList";
import { QuestForm } from "./QuestForm";
import * as QuestsApi from "../../api/quests";
import { useFetch } from "../../hooks/useFetch";


export function QuestPage()
{
const {
  data: quests,
  loading,
  error,
  setData: setQuests,
} = useFetch(QuestsApi.GetAll, []);
const [editingQuest, setEditingQuest] = useState<Quest | null>(null);





      async function onAdd(name: string, host: string , description: string, date: number)
        {
                 try {
                     const created = await QuestsApi.create({ name, host, description, date})
                     setQuests([...(quests ?? []), created]);

                 } catch (err) {
                     console.error(
                         err instanceof Error ? err.message : "Could not save the quest.",
                     );
                 }
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

        if (loading) {
            return <p>Loading quests...</p>;
        }

        if (error) {
            return <p>{error}</p>;
        }




    return (
        <main className="quest-page">
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
            
        </main>
    );
}

export default QuestPage;