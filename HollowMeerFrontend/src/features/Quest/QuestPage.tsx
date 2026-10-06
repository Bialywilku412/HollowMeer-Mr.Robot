import { useEffect, useState } from "react";
import "./QuestPage.css"
import { type Quest } from "./Quest";
import { QuestList } from "./QuestList";


export function QuestPage()
{
const [quests, setQuests] = useState<Quest[]>([]);
const [loading, setLoading] =useState(true);
const [error, setError] = useState<string | null>(null);

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




    return (
        <div>
            <h1>Quest Page</h1>
            <p>Welcome to the Quest Page!</p>
            <QuestList quests={quests}/>
            
        </div>
    );
}
}
export default QuestPage;