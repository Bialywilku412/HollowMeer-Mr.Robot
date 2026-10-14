import type { Quest } from "./Quest";
import { QuestCard } from "./QuestCard";

type QuestListProps =
{
 quests: Quest[];
 onEdit: (quest: Quest) => void;
 onDelete: (id: number) => void;
};

export function QuestList({quests} :QuestListProps)
{
    return(
        <div>
                     {quests.map((product) => (
                <QuestCard key={product.id} quest={product} />
                
            ))}
        </div>
    );
}

