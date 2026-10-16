import type { Quest } from "./Quest";
import { QuestCard } from "./QuestCard";

type QuestListProps =
{
 quests: Quest[];
 onEdit: (quest: Quest) => void;
 onDelete: (id: number) => void;
};

export function QuestList({quests, onDelete, onEdit} :QuestListProps)
{
    return(
        <div className="quest-container">
                     {quests.map((product) => (
                <QuestCard key={product.id} quest={product} onDelete={onDelete} onEdit={onEdit} />
                
            ))}
        </div>
    );
}

