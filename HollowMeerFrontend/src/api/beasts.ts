import type { Beast } from "../types/Beast";
import { baseUrl, errorFromResponse } from "./http";

type BeastResponse = {
    id: number;
    name: string;
    region: string;
    description: string;
    imageUrl: string
}

function toBeast(raw: BeastResponse): Beast {
    return {
        id: raw.id,
        name: raw.name,
        region: raw.region,
        description: raw.description,
        imageUrl: raw.imageUrl
    };
}

export async function getAll(): Promise<Beast[]> {
    const response = await fetch(`${baseUrl}/api/beasts`);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: BeastResponse[] = await response.json();
    return raw.map(toBeast);
}

export async function getById(id: number): Promise<Beast> {
    const response = await fetch(`${baseUrl}/api/beasts/${id}`);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: BeastResponse = await response.json();
    return toBeast(raw);
}

export async function deleteById(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/api/beasts/${id}`, {
        method: "DELETE"
    });
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
}

export async function create(newBeast: Omit<Beast, "id">) : Promise<Beast> {
    const response = await fetch(`${baseUrl}/api/beasts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBeast)
    });

    if(!response.ok) {
        throw await errorFromResponse(response);
    }

    const raw: BeastResponse = await response.json();
    return toBeast(raw);
}