import {  type Quest } from "./Quest";

type QuestCardProps =
{
    quest: Quest;
    onDelete: (id: number) => void;
    onEdit: (quest: Quest) => void;
};
export function QuestCard({quest, onDelete, onEdit} :QuestCardProps)
{
    return (
    <div key={quest.id} className="quest-card">
        <h2>{quest.name}</h2>
        <p><strong>Host:</strong> {quest.host}</p>
        <p><strong>Description:</strong> {quest.description}</p>
        <p><strong>Date:</strong> {quest.date} days</p>
        <button onClick={() => onEdit(quest)}>Edit</button>
        <button onClick={() => onDelete(quest.id)}>Delete</button>
    </div>
    );
}