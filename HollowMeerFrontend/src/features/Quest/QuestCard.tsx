import {  type Quest } from "./Quest";

type QuestCardProps =
{
    quest: Quest;
};
export function QuestCard({quest} :QuestCardProps)
{
    return (
    <div key={quest.id} className="quest-card">
        <h2>{quest.name}</h2>
        <p><strong>Host:</strong> {quest.Host}</p>
        <p><strong>Description:</strong> {quest.description}</p>
        <p><strong>Date:</strong> {quest.Date}</p>
    </div>
    );
}