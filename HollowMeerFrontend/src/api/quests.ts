import type { Quest } from "../features/Quest/Quest";
import { baseUrl, errorFromResponse } from "./http";

type QuestResponse = {
    id: number;
    name: string;
    host: string;
    description: string;
    date: number;
}
type QuestData = 
{
    name: string;
    host: string;
    description: string;
    date: number;
}
function toRequestBody(data: QuestData) {
    return {
        name: data.name,
        host: data.host,
        description: data.description,
        date: data.date
    }
}

function toQuest(response: QuestResponse): Quest {
    return {
        id: response.id,
        name: response.name,
        host: response.host,
        description: response.description,
        date: response.date
    };

}
export async function GetAll(): Promise<Quest[]> {
    const response = await fetch(`${baseUrl}/api/quests`);
    if (!response.ok) {
        throw await errorFromResponse(response);
    }
    const quests = await response.json() as QuestResponse[];
    return quests.map(toQuest);
}

export async function GetById(id: number): Promise<Quest> {
    const response = await fetch(`${baseUrl}/quests/${id}`);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const quest = await response.json() as QuestResponse;
    return toQuest(quest);
}


export async function create(data: QuestData) : Promise<Quest> {
    const response = await fetch(`${baseUrl}/api/quests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toRequestBody(data)),
    });
    if(!response.ok) {
        throw await errorFromResponse(response);
    }

    const raw: QuestResponse = await response.json();
    return toQuest(raw);
}

